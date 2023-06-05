const express=require('express');
const app=express();
const cookieParser = require('cookie-parser');
const session=require('express-session');
const cors = require ('cors')
const mysql =require('mysql');
const bodyparser=require('body-parser');
const connection=require('express-myconnection')
var nodemailer = require('nodemailer');
const md5=require('md5');


app.use(bodyparser.urlencoded({extended:false}))
app.use(cookieParser());
app.use(session({secret:'secret session',resave:false,saveUnitialized:false}))

const  auth=(req,res,next)=>{
	// console.log("req.session ",req.session)
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
var smtpTransport = nodemailer.createTransport({
	service: "Gmail",
	auth: {
		user: "rodesnzie@gmail.com",
		pass: "myolacglqdznplhn"
	}
});

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
	
	if(email!="" && nom!="" && passe!="" && competence!=""&& passe.length>8){
		if(email.includes('@')==true && email.includes('.com')==true){
			req.getConnection((erro,conn)=>{
			if(erro){
				console.log("erreur d'envoi de requette")
			}
			else{
				try{
					conn.query(`select email from personne where email="${email}" `,(erreur,resultat)=>{
						if(erreur){
							console.log('erreur de connexion');
							res.status(422).send({message:"erreur de connexion",status:false})
						}else{
							if(resultat.length>0){
								console.log('cette utilisateur existe deja !');
								res.status(220).send({message:"l'email que vous utiliser existe deja  ",status:false})
							}
							else{		
								hashedPassword=md5(passe) 
								console.log("emal" +email+" nom "+nom+" passe"+hashedPassword)
								conn.query (`insert into personne(email,nom,passe,competence) values("${email}", "${nom}", "${hashedPassword}", "${competence}")`);
								console.log("good jobs ")
								res.status(200).send({message:"votre compte a ete cree avec succes",status:true})
							}
						}
	
					});
						
						
						
						
					}catch(erro){
					console.log(erro);
				}
			}
			})
		}
		else{
			res.send({message:"veillez entrer une email valide ",status:false})
		}
	}
	else{
		res.send({message:"veillez remplir tous les champs",status:false})
	}
	
	console.log("l'ajout a bien ete effectuer !:) ")
})

/** route pour la connexion  */

app.post('/connexion',(req,res)=>{
	
	var email=req.body.email;
	var passe=req.body.passe;
	var secret=email;
	// console.log('md5 ici'+md5(passe))
	// console.log("email"+email)
	req.getConnection((erro,conn)=>{
		if(erro){
			console.log(erro)
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
								if(resultat[0].email!=email){
									res.send({message:"incorect email or password",etat:false})
								}
								else{

									var id=resultat[0].id;
								var nom=resultat[0].nom;
								console.log(data_email =resultat[0].email);
								console.log(data_email =resultat[0].passe);
								var data_email =resultat[0].email;
								var data_password=resultat[0].passe;
								   if( md5(passe)!=data_password){
									   console.log("email ou mot de passe incorect");
									   res.send({message:"incorect email or password",etat:false})
								   } else {
									console.log("bienvenu Mr  "+data_email)
									let sess = req.session;
									sess.email = data_email;
									sess.nom=resultat[0].nom;
									sess.User=id;
									date=new Date(new Date().getTime()+2268000000)
									res.cookie('pseudo',nom,{maxAge:date,sameSite:'None',secure:true,httpOnly:true})
									res.cookie('email',email,{maxAge:date,sameSite:'None',secure:true,httpOnly:true})
									// console.log("la variables de session "+sess.email);
									res.send({message:"vous etes connecte !",etat:true})
									
							  	   }
								}
								
								} else {
								console.log('no user');
								res.send({message:"incorect email or password",etat:false})
								}
							}
					});
					
				}catch(erro){
				// console.log(erro);
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
		console.log('dans la requette')
		if(erro){
			console.log("erreur d'envoi de requette"+erro.message)
			res.send({message:"desole un probleme est survenu en haut",statut:false})
		}
		else{
			console.log('dans le else')
			try{
				console.log('dans le try')
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
		  
		}
		else{
			try{
					conn.query(`select * from annonces order by id desc`,(erreur,resultat)=>{
						if(erreur){
							
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
										domaine: resultat[i].domaine,
										email:resultat[i].email_Personne,
										pseudo:resultat[i].pseudo_personne,
									}
									tableau.push(annonce);
								}
								if(req.session.User){console.log("la variables de  existe voici l'identification "+req.session.User);}
								
							
								res.status(200).send({message:tableau,status:true})
								
								
						} else {
								res.status(422).send({message:"aucune annonce pour le moment",status:false})
							}
						}
					});
				}catch(erro){
			}
		}
	})
	

})

app.post('/postuler',(req,res)=>{
	var id_annonce=req.body.id_annonce;
	var email_auteur=req.body.email_auteur
	var currentDate=new Date();
	var date=currentDate.toString();
	console.log("voici l'email de l'auter"+email_auteur)
	
	req.getConnection((erro,conn)=>{
		if(erro){
			console.log("1")
			console.log("erreur d'envoi de requette"+erro.message)
			res.send({message:"desole un probleme est survenu en haut",statut:false})
		}
		else{
			console.log("2")
			if(email_auteur==req.cookies.email){
				console.log("3")
				res.send({message:"impossible pour vous de postuler pur cette annonce"})
			}
			else{
				console.log("4")
				conn.query(`select * from postuler where id_annonce=${id_annonce} and email_personne='${req.cookies.email}'`,(erreur,resultat)=>{
					if(erreur){
						console.log("5")
						console.log(erreur)
					}else{
						console.log("6")
						if(resultat.length>0){
							console.log("7")
							res.send({message:"il est possible que vous avez deja postuler pour cette annonce  ",statut:false})
						}
						else{
							console.log("8")
							var email=req.cookies.pseudo;
							// console.log(req.cookies.pseudo);
	
							try{
								console.log("9")
								if(req.cookies && req.cookies.email&&req.cookies.pseudo){
									console.log("10")
								conn.query (`insert into postuler(id_Annonce,email_personne,pseudo_personne,dates,email_auteur) values("${id_annonce}", "${req.cookies.email}", "${req.cookies.pseudo}","${date}","${email_auteur}")`);
								console.log("l'ajout a bien ete effectuer !:) ")
								res.send({message:`votre demande a bien ete envoyer `,statut:true}) 
							}
								}catch(erro){	
									console.log("11")		
								res.send({message:"desole un probleme est survenu  veillez recommencer plutard ",statut:false})
							}
						}
					}
	
					
					
				})
			}
			
			
		  	
		}
	})
	console.log("1")
	
})


app.post('/commentaire',(req,res)=>{
	var id_annonce=req.body.id_annonce;
	var description=req.body.description;
	var currentDate=new Date();
	var date=currentDate.toString();
	req.getConnection((erro,conn)=>{
		if(erro){
			res.send({message:"desole un probleme est survenu en haut",statut:false})
		}
		else{
			conn.query(`select * from commentaire where id_annonce=${id_annonce} and email_personne='${req.cookies.email}'`,(erreur,resultat)=>{
				if(erreur){

				}else{
					if(resultat.length>0){
						res.send({message:"desoler vous n'avez droit qu'a un quel commentaire  ",statut:false})
					}
					else{
						var email=req.cookies.pseudo;
							try{
								if(req.cookies && req.cookies.email&&req.cookies.pseudo){
								conn.query (`insert into commentaires (id_Annonce,email_Personne,pseudo_personne,dates,description) values (${id_annonce}, "${req.cookies.email}", "${req.cookies.pseudo}","${date}","${description}")`,(er,result)=>{
										if(er){
											res.send({message:"vous avez deja commenter cette Annonce"})
										}
										else{

										res.send({message:`votre commentaire a bien ete envoyer !`,statut:true}) 
										}
								});
								
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

app.post('/List_commentaire',(req,res)=>{
	var id_Annonce=req.body.id_annonce;
	req.getConnection((erro,conn)=>{
		if(erro){
		}
		else{
			try{
					conn.query(`select * from commentaires where id_annonce="${id_Annonce}" `,(erreur,resultat)=>{
						if(erreur){
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
										date: (resultat[i].dates).substring(3,20),
									}
									tableau.push(commentaire);
								}
						
								res.status(200).send({message:tableau,diver:"tout les commentaire ici",status:true})
								
								
						} else {
								res.status(422).send({diver:"aucun commentaire soyez le premier a commenterr",status:false})
							}
						}
					});
				}catch(erro){
			}
		}
	})
	

})

app.get('/list_Query',auth,(req,res)=>{
	
	req.getConnection((erro,conn)=>{
		if(erro){
		}
		else{
			try{
				conn.query(`SELECT * FROM annonces INNER JOIN postuler ON annonces.id=postuler.id_Annonce and postuler.email_Personne="${req.cookies.email}"`,(erreur,resultat)=>{
				if(erreur){
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
									nom:resultat[i].pseudo_personne,
									domaine:resultat[i].domaine,
									email_auteur:resultat[i].email_auteur
									
									}
								tableau.push(demande);
									}
								
								res.status(200).send({message:tableau,diver:"tout vos demandes ici ",status:true})
							} else {
								res.send({diver:"vous n'avez postuler pour aucune annonces",status:false})
							}
						}
				});
			}catch(erro){
		}
	}
})
	

})
app.get('/list_My_annoce',auth,(req,res)=>{
	
	req.getConnection((erro,conn)=>{
		if(erro){
			console.log("erreur d'envoi de requette")
		}
		else{
			try{
				conn.query(`SELECT * FROM annonces  where annonces.email_Personne="${req.cookies.email}"`,(erreur,resultat)=>{
				if(erreur){
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
								date:(resultat[i].date).substring(0,25),
								email:resultat[i].email_Personne,
								domaine:resultat[i].domaine,
								
								}
							tableau.push(demande);
						}
							
							res.status(200).send({message:tableau,diver:"tout vos demandes ici ",status:true})
						} else {
							res.status(422).send({diver:"vous n'avez  encore publier  aucune annonces",status:false})
						}
					}
				});
			}catch(erro){
		}
	}
})
	

})

app.post ('/list_proposition',auth,(req,res)=>{
	var id_Annonce=req.body.id;
	req.getConnection((erro,conn)=>{
		if(erro){
		}
		else{
			try{
				conn.query(`SELECT * FROM personne INNER JOIN postuler ON personne.email=postuler.email_Personne and postuler.id_Annonce="${id_Annonce}"`,(erreur,resultat)=>{
				if(erreur){
						res.status(422).send({message:"erreur de connexion",status:false})
				}
				else{
					if(resultat.length>0){
					let tableau=new Array();
						let proposition;
							for(var i=0;i<resultat.length;i++){
							
								proposition={		
								email:resultat[i].email,				
								pseudo:resultat[i].nom,
								competence:resultat[i].competence,								
								}
							tableau.push(proposition);
						}
							res.status(200).send({message:tableau,diver:"toutes les demande d'emplois ici",status:true})
						} else {
							res.send({diver:"vous n'avez pas encore de demande pour cette annonce",status:false})
						}
					}
				});
			}catch(erro){
			console.log(erro);
		}
	}
})
	

})

app.post('/sendMessage',(req,res)=>{
	var email_recepteur=req.body.email_recepteur;
	var message=req.body.message;
	var currentDate=new Date();
	var date=currentDate.toString();
	
	
	req.getConnection((erro,conn)=>{
		if(erro){
			console.log("erreur d'envoi de requette"+erro.message)
			res.send({message:"desole un probleme est survenu en haut",statut:false})
		}
		else{

			conn.query(`select * from groupe where email_emeteur='${req.cookies.email}' and email_recepteur='${email_recepteur}' or email_emeteur='${email_recepteur}'and email_recepteur='${req.cookies.email}'`,(erreur,resultat)=>{
				if(erreur){
					console.log(erreur)
				}else{
					if(resultat.length>0){
						console.log("voici le"+resultat)
						try{
							id_groupe:resultat[0].id;
							console.log("voici l'id du groupe"+resultat[0].id)
							conn.query(`insert into message(description,dates,id_groupe) values ('${message}','${date}',${resultat[0].id})`)
							res.send({message:`le groupe est existe deja  et le message a ete envoyer `,statut:true}) 
							}catch(erro){			
							res.send({message:"desole un probleme est survenu  veillez recommencer plutard ",statut:false})
						}
					}
					else{
						

						try{
							if(req.cookies && req.cookies.email&&req.cookies.pseudo){
								console.log("voici le recepteur:"+email_recepteur)
							conn.query (`insert into groupe(email_emeteur,email_recepteur,dates) values("${req.cookies.email}", "${email_recepteur}","${date}")`);
							console.log("l'ajout a bien ete effectuer !:) ")
							conn.query(`select * from groupe where email_emeteur='${req.cookies.email}' and email_recepteur='${email_recepteur}' or email_emeteur='${email_recepteur}' and email_recepteur='${req.cookies.email}'`,(erreur,resultat1)=>{
								if(resultat1.length>0){
									console.log(resultat1[0].id);
									 id_groupe:resultat1[0].id;
									 console.log("voici le recepteur encore:"+email_recepteur)
									 conn.query(`insert into message(description,dates,id_groupe) values ('${message}','${date}',${resultat1[0].id})`)
								}
								res.send({message:`le groupe est cree et le message a ete envoyer `,statut:true}) 
							})
							
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

app.get('/authentification',(req,res)=>{

	if(req.session.User){
		res.send({message:"l'id existe donc il est  connecter",etat:true})
						
	}
	else{
		console.log("non connecter")
		res.send({message:"vous n'etez pas connecter",etat:false})
	}
})

app.post('/deconnet',(req,res)=>{
	console.log(req.session.User);
	console.log(req.session.pseudo);
	console.log(req.session.email);
	req.session.destroy();
	res.send({message:"vous etez deconneter",etat:true})
	res.send()
})

app.post('/update',(req,res)=>{
		var to=req.body.email;
		console.log(to)
    var mailOptions = {
        from: "rodesnzie@gmail.com",
        to:to, 
        subject: 'reset your passwork',
		html: '<p><h2>click there to reset you password</h2> <br> <a href="http://localhost:5173/UpdatePasswork" >RESET PASSWORD.com</a>.</p>'
    }
	console.log(to)
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);
			res.send({message:"l'utilisateur n'existe pas",etat:false});
        }else{
			console.log('qwertyy');
			console.log(to)
			res.send({message:" verifier votre boite mail et cliquez sur le liens",etat:true});
        }
    });

	 
	
	
})
app.post('/reinisalise_password',(req,res)=>{
	console.log("hello")
	var email=req.body.email;
	var password=req.body.passe;
	var confirm_password=req.body.confirm_passe;
	console.log(email)
	console.log(password)
	console.log(confirm_password)
	var hash=md5(password) 
	
	console.log(hash)
	req.getConnection((erro,conn)=>{
		if(erro){
			console.log("erreur d'envoi de requette"+erro.message)
			res.send({message:"desole un probleme est survenu en haut",statut:false})
		}
		else{
			try{
				conn.query(`select email from personne where email="${email}" `,(erreur,resultat)=>{
					if((resultat.length>0) && (password==confirm_password)){
						console.log(resultat)
						conn.query(`update personne set passe='${hash}' where email='${email}'`,(erro,resultat)=>{
							console.log("l'ajout a bien ete effectuer !:) ")
							res.send({message:"mots de passe bien reinitialiser ",statut:true}) 
						})
						
					}
					else{
						res.send({message:"cet email n'existe pas",statut:true}) 
					}
				})
				
				}catch(erro){
				console.log(erro);
				res.send({message:"desole un probleme est survenu  en bas ",statut:false})
			}
		  	
		}

	})

})

app.post('/delete_annonce',(req,res)=>{
	var id=req.body.id_annonce
	if(id!='' ||id!=undefined){
		req.getConnection((erro,conn)=>{
			if(erro){
				res.send({message:'ereur de connexion',statut:false})
			}
			else{
				conn.query(`delete  from annonces  where annonces.id = ${id}`,(eror,resultat)=>{
					if(eror){
						res.send({message:"impossible de suprimer cet 'Annonce"})
					}
					else{
							res.send({message:"sppression effectuer avec succes"})
					}
					  
				})
			}
		})
	}
	else{
		res.send({message:"aucune annonce n'as ete envoyer"})
	}
})

app.post('/delete_query',(req,res)=>{
	var id=req.body.id_annonce
	if(id!='' && id!=undefined && req.cookies){
		req.getConnection((erro,conn)=>{
			if(erro){
				res.send({message:'ereur de connexion',statut:false})
			}
			else{
				conn.query(`delete  from postuler  where postuler.id_Annonce = ${id} and postuler.email_Personne='${req.cookies.email}'`,(eror,resultat)=>{
					if(eror){
						res.send({message:"impossible de suprimer cet 'Annonce"})
					}
					else{
							res.send({message:"sppression effectuer avec succes"})
					}
					  
				})
			}
		})
	}
	else{
		res.send({message:"aucune annonce n'as ete envoyer"})
	}
})

app.post('/est_liker',(req,res)=>{
	var id=req.body.id_annonce
	if(req.cookies && req.cookies.email){
		req.getConnection((err,conn)=>{
				conn.query(`select * from likes where email_personne='${req.cookies.email}' and id_annonce=${id}`,(err,result)=>{
					if(err){
						res.send({message:'erreur de connexion',statut:false})
					}
					else{
						if(result.length>0){
							res.send({etat:true})
						}
						else{
							res.send({etat:false})
						}
					}
				})
		})
	}
})

app.post('/liker',(req,res)=>{
	var id_annonce=req.body.id_annonce;

	if(id_annonce!="" && req.cookies.email){
		req.getConnection((err,conn)=>{

			if(err){
				res.send({message:'erreur de connexion',statut:false})
			}
			else{
				
					conn.query(`insert into likes (id_annonce,email_personne) values(${id_annonce},'${req.cookies.email}') `,(erreur,resulta)=>{
						if(erreur){
							res.send({message:'impossible',statut:false})
						}
						else{
							res.send({message:'vous avez liker cette annonce',statut:true})
						}
					})
					
			}
		})
	}
})
app.post('/Delete_like',(req,res)=>{
	var id_annonce=req.body.id_annonce;
	console.log(id_annonce,req.cookies.email)

	if(id_annonce!="" && req.cookies.email){
		req.getConnection((err,conn)=>{

			if(err){
				console.log('impossible probleme de reseau')
				res.send({message:'erreur de connexion',statut:false})
			}
			else{
				
					conn.query(`Delete from  likes where id_annonce=${id_annonce} and email_personne='${req.cookies.email}' `,(erreur,resulta)=>{
						if(erreur){
							console.log('impossible' +erreur)
							res.send({message:'impossible',statut:false})
						}
						else{
							console.log('vous avez supprimer ce like')
							res.send({message:'vous avez liker cette annonce',statut:true})
						}
					})
					
			}
		})
	}
})

app.post('/get_User_profil',(req,res)=>{
	var email=req.body.email;
	
console.log("voici l'email "+email)
	req.getConnection((erro,conn)=>{
			if(erro){
				
				res.send({message:"erreur de connexion" ,statut:false})
			}
			else{
				
				conn.query(`select * from personne where email='${email}'`,(err,result)=>{
					if(err){
						res.send({message:'erreur',statut:false})
					}
					else{
						
						if(result.length>0){
							let infos
								infos={
									email:result[0].email,
									nom:result[0].nom,
									competence:result[0].competence,
								}
													
								res.send({message:infos,statut:true})
							
						}
					}
				})
			}
	})
})
app.post('/get_nbr_Annonce',(req,res)=>{
	var email=req.body.email;
	console.log("l'email ici 1"+email)

	req.getConnection((erro,conn)=>{
			if(erro){
				console.log("l'email ici 2 "+email)
				res.send({message:"erreur de connexion" ,statut:false})
			}
			else{
				console.log("l'email ici  3"+email)
				conn.query(`select count(*) as nbr from annonces where email_personne='${email}'`,(err,result)=>{
					if(err){
						res.send({message:'erreur',statut:false})
					}
					else{
						console.log("l'email ici  4"+email)
						if(result.length>0){
							let nombres_annonce

							nombres_annonce=result[0].nbr
									
								
													
								console.log("les infos ici   "+nombres_annonce)
								res.send({message:nombres_annonce,statut:true})
							
						}
					}
				})
			}
	})
})

app.post('/Update_Annonce',(req,res)=>{
	var titre=req.body.titre_annonce;
	var description=req.body.description_annonce;
	var domaine=req.body.domaine_annonce;
	var budget=req.body.budget_annonce;
	var id=req.body.id_annonce;
	

	req.getConnection((erro,conn)=>{
	
		if(erro){
			console.log("erreur d'envoi de requette"+erro.message)
			res.send({message:"desole un probleme est survenu en haut",statut:false})
			return 
		}
		else{
			
			try{
			
				
					conn.query (`update  annonces set titre='${titre}',desription='${description}',domaine='${domaine}',budget='${budget}' where id=${id}`,(err,resulta)=>{
						if(err){
							console.log("erreur "+err)
							res.send({message:"impossibles de modifier cette annonce pour le momment"})

							return
						}
						else{
							console.log("l'ajout a bien ete effectuer !:) ")
							res.send({message:"votre annonce a bien ete modifier ",statut:true}) 

							return
						
						}
				});
				
				
				}catch(erro){
				console.log(erro);
				res.send({message:"desole un probleme est survenu  en bas ",statut:false})
				return
			}
		  	
		}
	})
	
})

app.post('/get_info_annonce',(req,res)=>{
	var id=req.body.id_Annonce;
	

	req.getConnection((erro,conn)=>{
			if(erro){
			
				res.send({message:"erreur de connexion" ,statut:false})
			}
			else{
			
				conn.query(`select *  from annonces where id='${id}'`,(err,result)=>{
					if(err){
						res.send({message:'erreur',statut:false})
					}
					else{
						
						if(result.length>0){
							let infos
							infos={
								email_Personne:result[0].email_Personne,
								budget:result[0].Budget,
								date:(result[0].date).substring(0,25),
								titre:result[0].Titre,
								domaine:result[0].domaine,
								description:result[0].Desription
							}
							res.send({message:infos,statut:true})
							
						}
					}
				})
			}
	})
})


app.listen(3001);
console.log('le serveur tourne sur le port 3001 ')
