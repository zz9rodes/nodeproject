const express=require('express');
const app=express();
const cookieParser = require('cookie-parser');
const session=require('express-session');
const cors = require ('cors')
const mysql =require('mysql');
const bodyparser=require('body-parser');
const connection=require('express-myconnection')

const md5=require('md5');


app.use(bodyparser.urlencoded({extended:false}))
app.use(cookieParser());
app.use(session({secret:'secret session',resave:false,saveUnitialized:false}))

const  auth=(req,res,next)=>{
	console.log("req.session ",req.session)
	if(req.session && req.session.User>=0){
		next();
	}
	else{
		res.status(400).send({message:'failed',statut:'erreur'})
	}
}

const objetConnection=
{
	host:'localhost',
	user:'root',
	password:'',
	port:3306,
	database:'newbd'
};

app.use(connection(mysql,objetConnection,'request'));
console.log("le serveur est cree")
app.use(express.json())
app.use(cors({
	credentials:true,
	origin:'http://localhost:5173',
	methods: ['GET',"POST","PUT"]
}));
/* route  pour l'inscription */
app.post('/inscription',(req,res)=>{
	var email=req.body.email;
	var nom=req.body.nom;
	var passe=req.body.passe;
	var competence=req.body.competence;
	var numcompte=req.body.numcompte;
	var hashedPassword='6qwertyu';
	

	req.getConnection((erro,conn)=>{
		if(erro){
			console.log("erreur d'envoi de requette")
		}
		else{
			try{
				conn.query(`select email from personne `,(erreur,resultat)=>{
					if(erreur){
						console.log('erreur de connexion');
						res.status(422).send({message:"erreur de connexion",status:false})
					}else{
						if(resultat.length>0){
							for(var i=0;i<resultat.length;i++){
								if(resultat[i].email==email){
									console.log('cette utilisateur existe deja !');
									res.status(220).send({message:"une erreur est survenue veillez verifier ",status:false})
								}
							}
							hashedPassword=md5(passe) 
							conn.query (`insert into personne(email,nom,passe,competence) values("${email}", "${nom}", "${hashedPassword}", "${competence}")`);
							
							res.status(200).send({message:"votre compte a ete cree avec succes",status:true})

						
							
							
						}
					}

				});
					
					
					
					
				}catch(erro){
				console.log(erro);
			}
		}
	})
	console.log("l'ajout a bien ete effectuer !:) ")
})

/** route pour la connexion  */

app.post('/connexion',(req,res)=>{
	
	var email=req.body.email;
	var passe=req.body.passe;
	var secret=email;
	console.log('md5 ici  '+md5(passe))
	console.log(email)
	req.getConnection((erro,conn)=>{
		if(erro){
			console.log("erreur d'envoi de requette")
			res.send({message:"desole probleme de reseau",status:false})
		}
		else{
			try{
					conn.query(`select * from personne where email="${email}" `,(erreur,resultat)=>{
						if(erreur){
							console.log('erreur de connexion');
							res.status(422).send({message:"erreur de connexion",status:false})
						}
						else{
							if(resultat.length>0){
							var id=resultat[0].id;
							var nom=resultat[0].nom;
								console.log(data_email =resultat[0].email);
								console.log(data_email =resultat[0].passe);
								var data_email =resultat[0].email;
								var data_password=resultat[0].passe;
								   if( md5(passe)!=data_password){
									   console.log("echec de connexion mot de passe incoret");
									   res.send({message:"email ou mots de passe incorect",statut:false})
								   } else {
									console.log("bienvenu Mr  "+data_email)
									let sess = req.session;
									sess.email = data_email;
									sess.nom=resultat[0].nom;
									sess.User=id;
									date=new Date(new Date().getTime()+2268000000)
									res.cookie('pseudo',nom,{maxAge:date,sameSite:'None',secure:true,httpOnly:true})
									res.cookie('email',email,{maxAge:date,sameSite:'None',secure:true,httpOnly:true})
									console.log(req.cookies['email']);
									res.send({message:"vous etes connecte !",statut:true})
									
							  	   }
								} else {
								console.log('no user');
								res.status(422).send({message:"no user",status:false})
								}
							}
					});
					
				}catch(erro){
				console.log(erro);
			}
		}
	})

})

/* route pour la creation d'annonce  */

app.post('/Annonce',(req,res)=>{
	var titre=req.body.titre;
	var description=req.body.description;
	var domaine=req.body.domaine;
	var budget=req.body.budget;
	var currentDate=new Date();
	var date=currentDate.toString();
	console.log('voici la date :'+date)
	req.getConnection((erro,conn)=>{
		if(erro){
			console.log("erreur d'envoi de requette"+erro.message)
			res.send({message:"desole un probleme est survenu en haut",statut:false})
		}
		else{
			try{
				if(req.cookies && req.cookies.email){
				conn.query (`insert into annonces(titre,desription,domaine,budget,date,email_personne) values("${titre}", "${description}", "${domaine}", "${budget}","${date}","${req.cookies.email}")`);
				console.log("l'ajout a bien ete effectuer !:) ")
				res.send({message:"votre annonce a bien ete cree ",statut:true}) 
			}
				}catch(erro){
				console.log(erro);
				res.send({message:"desole un probleme est survenu  en bas ",statut:false})
			}
		  	
		}
	})
	
})

/** route pour lister les annonces */

app.get('/List_Annonce',auth,(req,res)=>{

	req.getConnection((erro,conn)=>{
		if(erro){
			console.log("erreur d'envoi de requette")
		}
		else{
			try{
					conn.query(`select * from annonces `,(erreur,resultat)=>{
						if(erreur){
							console.log('erreur de connexion');
							res.status(422).send({message:"erreur de connexion",status:false})
						}
						else{
							if(resultat.length>0){
								let tableau=new Array();
								let annonce;
								for(var i=0;i<resultat.length;i++){
									
									annonce={
										id: resultat[i].id,
										titre: resultat[i].Titre,
										description: resultat[i].Desription,
										budget: resultat[i].Budget,
										date:(resultat[i].date).substring(0,25),
										domaine: resultat[i].domaine
									}
									tableau.push(annonce);
								}
								console.log('les annonces')
							
								res.status(200).send({message:tableau,status:true})
								
								
						} else {
								res.status(422).send({message:"aucune annonce pour le moment",status:false})
							}
						}
					});
				}catch(erro){
				console.log(erro);
			}
		}
	})
	

})

app.post('/postuler',(req,res)=>{
	var id_annonce=req.body.id_annonce;
	var currentDate=new Date();
	var date=currentDate.toString();
	
	
	req.getConnection((erro,conn)=>{
		if(erro){
			console.log("erreur d'envoi de requette"+erro.message)
			res.send({message:"desole un probleme est survenu en haut",statut:false})
		}
		else{

			conn.query(`select * from postuler where id_annonce=${id_annonce} and email_personne='${req.cookies.email}'`,(erreur,resultat)=>{
				if(erreur){
					console.log(erreur)
				}else{
					if(resultat.length>0){
						res.send({message:"il est possible que vous avez deja postuler pour cette annonce  ",statut:false})
					}
					else{
						var email=req.cookies.pseudo;
						// console.log(req.cookies.pseudo);

						try{
							if(req.cookies && req.cookies.email&&req.cookies.pseudo){
							conn.query (`insert into postuler(id_Annonce,email_personne,pseudo_personne,dates) values("${id_annonce}", "${req.cookies.email}", "${req.cookies.pseudo}","${date}")`);
							console.log("l'ajout a bien ete effectuer !:) ")
							res.send({message:`votre demande a bien ete envoyer `,statut:true}) 
						}
							}catch(erro){			
							res.send({message:"desole un probleme est survenu  veillez recommencer plutard ",statut:false})
						}
					}
				}

				
				
			})
			
		  	
		}
	})
	
})


app.post('/commentaire',(req,res)=>{
	var id_annonce=req.body.id_annonce;
	var description=req.body.description;
	var currentDate=new Date();
	var date=currentDate.toString();
	
	
	req.getConnection((erro,conn)=>{
		if(erro){
			console.log("erreur d'envoi de requette"+erro.message)
			res.send({message:"desole un probleme est survenu en haut",statut:false})
		}
		else{

			conn.query(`select * from commentaire where id_annonce=${id_annonce} and email_personne='${req.cookies.email}'`,(erreur,resultat)=>{
				if(erreur){
					console.log(erreur)
				}else{
					if(resultat.length>0){
						console.log("deja enregistrer")
						res.send({message:"desoler vous n'avez droit qu'a un quel commentaire  ",statut:false})
					}
					else{
						var email=req.cookies.pseudo;
								
			
						try{
								if(req.cookies && req.cookies.email&&req.cookies.pseudo){
								conn.query (`insert into commentaire(id_Annonce,email_personne,pseudo_personne,dates,description) values("${id_annonce}", "${req.cookies.email}", "${req.cookies.pseudo}","${date}","${description}")`);
								// res.cookie('ID_ANNONCE',id_annonce,{maxAge:dates,sameSite:'None',secure:true,httpOnly:true})
								// res.cookie('email',email,{maxAge:date,sameSite:'None',secure:true,httpOnly:true})
								console.log("l'ajout a bien ete effectuer !:) ")
								res.send({message:`votre commentaire a bien ete envoyer !`,statut:true}) 
							}
							}catch(erro){	
										console.log(erro.message)		
										res.send({message:"desole un probleme est survenu  veillez recommencer plutard ",statut:false})
						}
								
					}
				}

				
				
			})
			
		  	
		}
	})
	
})

app.post('/List_commentaire',(req,res)=>{
	var id_Annonce=req.body.id_annonce;
	req.getConnection((erro,conn)=>{
		if(erro){
			console.log("erreur d'envoi de requette")
		}
		else{
			try{
					conn.query(`select * from commentaire where id_annonce="${id_Annonce}" `,(erreur,resultat)=>{
						if(erreur){
							console.log('erreur de connexion');
							res.status(422).send({message:"erreur de connexion",status:false})
						}
						else{
							if(resultat.length>0){
								let tableau=new Array();
								let commentaire;
								for(var i=0;i<resultat.length;i++){
									
									commentaire={						
										email: resultat[i].email_Personne,
										pseudo: resultat[i].pseudo_personne,
										description: resultat[i].description,
										date: resultat[i].dates,
									}
									tableau.push(commentaire);
								}
								console.log('les commentaires')
								console.log(tableau)
							
								res.status(200).send({message:tableau,diver:"tout les commentaire ici",status:true})
								
								
						} else {
								res.status(422).send({diver:"aucun commentaire soyez le premier a commenterr",status:false})
								console.log(id_Annonce);
							}
						}
					});
				}catch(erro){
				console.log(erro);
			}
		}
	})
	

})

app.get('/list_Query',(req,res)=>{
	
	req.getConnection((erro,conn)=>{
		if(erro){
			console.log("erreur d'envoi de requette")
		}
		else{
			try{
				conn.query(`SELECT * FROM annonces INNER JOIN postuler ON annonces.id=postuler.id_Annonce and postuler.email_Personne="${req.cookies.email}"`,(erreur,resultat)=>{
				if(erreur){
						console.log('erreur de connexion');
						res.status(422).send({message:"erreur de connexion",status:false})
				}
				else{
					if(resultat.length>0){
					let tableau=new Array();
						let demande;
							for(var i=0;i<resultat.length;i++){
							
								demande={		
								id:resultat[i].id,				
								titre:resultat[i].Titre,
								budget:resultat[i].Budget,
								description:resultat[i].Desription,
								date:(resultat[i].dates).substring(0,25),
								email:resultat[i].email_Personne,
								domaine:resultat[i].domaine,
								
								}
							tableau.push(demande);
						}
							console.log('les demandes')
							console.log(tableau)
							res.status(200).send({message:tableau,diver:"tout vos demandes ici ",status:true})
						} else {
							res.status(422).send({diver:"vous n'avez postuler pour aucune annonces",status:false})
						}
					}
				});
			}catch(erro){
			console.log(erro);
		}
	}
})
	

})
app.get('/list_My_annoce',(req,res)=>{
	
	req.getConnection((erro,conn)=>{
		if(erro){
			console.log("erreur d'envoi de requette")
		}
		else{
			try{
				conn.query(`SELECT * FROM annonces  where annonce.email_Personne="${req.cookies.email}"`,(erreur,resultat)=>{
				if(erreur){
						console.log('erreur de connexion');
						res.status(422).send({message:"erreur de connexion",status:false})
				}
				else{
					if(resultat.length>0){
					let tableau=new Array();
						let demande;
							for(var i=0;i<resultat.length;i++){
							
								demande={		
								id:resultat[i].id,				
								titre:resultat[i].Titre,
								budget:resultat[i].Budget,
								description:resultat[i].Desription,
								date:(resultat[i].dates).substring(0,25),
								email:resultat[i].email_Personne,
								domaine:resultat[i].domaine,
								
								}
							tableau.push(demande);
						}
							console.log('les demandes')
							console.log(tableau)
							res.status(200).send({message:tableau,diver:"tout vos demandes ici ",status:true})
						} else {
							res.status(422).send({diver:"vous n'avez postuler pour aucune annonces",status:false})
						}
					}
				});
			}catch(erro){
			console.log(erro);
		}
	}
})
	

})




app.listen(3001);
console.log('le serveur tourne sur le port 3001 ')
