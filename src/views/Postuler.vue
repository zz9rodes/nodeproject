<script>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router'




export default{
 
    setup(){
      const router = useRouter()
       var description=ref('')
       var status=ref('')
       var look_comments=ref(false)
       var look=ref(true)
       var commentaires=ref([]);
       var etat=ref(false)
       var infos=ref([])
       var infos_annonce=ref({})
       var nombres_annonce=ref()
        const route = useRoute()
        // console.log(route.query.id)
        var Id=route.query.id;
        var email_auteur=route.query.Kthd_eo;
        let randomNumberlike = Math.floor(Math.random() * 500);
        let randomNumberpostule= Math.floor(Math.random() * 160);
    const copyLink=()=>{
      navigator.clipboard.writeText(window.location.href);
    }
    const look_comment=(ev)=>{
        look_comments.value=true;
        look.value=false;
    }
    const hide_comment=(ev)=>{
        look_comments.value=false;
        look.value=true;
       
    }
    const send_commentaire=(ev)=>{
        // ev.preventDefault()
        axios.post('http://localhost:3001/commentaire',{
            id_annonce:Id,
            description:description.value,
        },{withCredentials:true}
        ) .then(response=>{console.log(response) 
            alert(response.data.message) ,
            location.reload()
          }, (err) => console.log(err.response)) 
    }

    const Postuler=(ev)=>{
        ev.preventDefault()
        axios.post('http://localhost:3001/postuler',{
            id_annonce:Id,
            email_auteur:email_auteur,
        },{withCredentials:true}
        ) .then(response=>{console.log(response) 
            alert(response.data.message)}, (err) => console.log(err.response)) 
    }

    const list_commentaires = ()=> {
        axios.post('http://localhost:3001/List_commentaire',{
          id_annonce:Id,
        },{withCredentials:true})
            .then(response=>{
            // console.log(response)
          commentaires.value=response.data.message
         
        } , 
        (err) => {
            if (err.response && err.response.data) {

            console.log(err.response.data)
            } else {

            console.log(err)
            
            }
        }) 
        // console.log(commentaires.value);
        

    }
    list_commentaires()
    const open=()=>{
      var profil=document.getElementById("myDialoge");
      profil.showModal();
    }
   const lock=()=>{
    var profil=document.getElementById("myDialoge");
    profil.close();
   }

   const est_liker = async ()=> {

      return await axios.post('http://localhost:3001/est_liker',{
          id_annonce:Id,
        },{withCredentials:true})
            .then(response=>{
           
            etat.value=response.data.etat;  
            console.log("voici l'etat de est_liker :"+etat.value)
            if(etat.value){
              var like=document.getElementById('like')
              like.style.backgroundColor="#F00E48 "
              like.style.fill="white"
              return etat;
            }  
            else{
              var like=document.getElementById('like')
              like.style.fill="black"
              like.style.backgroundColor ="transparent"
              return etat;
            }
        } , 
        (err) => {
            if (err.response && err.response.data) {

            console.log(err.response.data)
            } else {

            console.log(err)
            
            }
        })      
    }

    const liker= async ()=>{
      var result= await est_liker()
      
      if(result.value){
        axios.post('http://localhost:3001/Delete_like',{
          id_annonce:Id,       
      },{withCredentials:true}
        ).then(response=>{
              var like=document.getElementById('like')
              like.style.fill="black"
              like.style.backgroundColor ="transparent"

        },
        (erro)=>{
          
        })
      }
      else{
        axios.post('http://localhost:3001/liker',{
          id_annonce:Id,       
      },{withCredentials:true}
        ).then(response=>{
              var like=document.getElementById('like')
              like.style.backgroundColor="#F00E48 "
              like.style.fill="white"
        },
        (erro)=>{
         
        })
      }

   } 
   const get_User_profil=()=>{
    console.log(route.query.Kthd_eo) 
    axios.post('http://localhost:3001/get_User_profil',{
      email:route.query.Kthd_eo
     
    },{withCredentials:true}
    ).then(response=>{
      console.log(response.data)
        infos.value=response.data.message
        console.log("les infos ici "+ infos)
    },(erro)=>{
      console.log("une erreur")
    })
   }
   const get_nbr_Annonce=()=>{
    axios.post('http://localhost:3001/get_nbr_Annonce',{
      email:route.query.Kthd_eo
    },{withCredentials:true}
    ).then(response=>{
      nombres_annonce.value=response.data.message
        // console.log("les infos ici "+ nombres_annonce)
    },(erro)=>{
      console.log("une erreur")
    })
   }

   const authentification = ()=> {
        axios.get('http://localhost:3001/authentification',{withCredentials:true})
            .then(response=>{
            // console.log(response)
          // message.value=response.data.message
          status.value=response.data.etat
          if(status.value!=true){
            router.push({name:'home'}) 
          //  window.location.replace("/connexion");
           }
         
        } , 
        (err) => {
            if (err.response && err.response.data) {
              // console.log(err.response.data)
            alert("vous devez vous connecter")
            } else {
              console.log(err)
            }
        }) 
    
  }


  const get_info_annonce=()=>{
    axios.post('http://localhost:3001/get_info_annonce',{
      id_Annonce:Id
    },{withCredentials:true}
    ).then(response=>{
        // console.log(response.data)
        infos_annonce.value=response.data.message
        // console.log("les infos  de l'annonce ici  "+ infos_annonce.email)
    },(erro)=>{
      console.log("une erreur")
    })
   }

   get_User_profil()
    est_liker()
    get_nbr_Annonce()
    authentification()
    get_info_annonce()

   
        return{
            open,
            lock,
            copyLink,
            randomNumberlike,
            randomNumberpostule,
            Postuler,
            description,
            send_commentaire,
            commentaires,
            look_comment,
            look_comments,
            hide_comment,
            look,
            liker,
            infos,
            nombres_annonce,
            infos_annonce    
        }
      
        

    },
    
    
}
</script>
<template>
    <div>
        <div id="annonce">
              <div class="descriptions">  
                <dialog id="myDialoge" style=" width: 600px; border: none; border-radius: 6px; ">
                      <div class="card-client">
                      <h2><div style="flex: 1;">{{ infos.nom }} </div>  </h2>  
                      <div style="flex: 1;">{{ infos.email }}</div>
                          <svg xmlns="http://www.w3.org/2000/svg" style="margin-left: 80% ; fill: rgb(5, 5, 5);cursor: pointer; "  @click="lock"  height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
                        <div class="user-picture">
                          <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" style="fill:black">
                            <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                          </svg>
                        </div>
                        <p class="name-client" style="display: flex;"> 
                          
                          
                          
                            
                            <div style="flex: 2;">
                               competence:  {{ infos.competence  }}
                            </div >                                                   
                         

                            <div style="flex: 2;"> deja {{ nombres_annonce }}  annonces a son actif  </div>    
                             
                         
                        
                        </p>

                        
                        <div class="social-media">
                          <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                            </svg>
                            <span class="tooltip-social">Twitter</span>
                          </a>
                          
                          <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                              <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                            </svg>
                            <span class="tooltip-social">Facebook</span>
                          </a>
                          
                        </div>
                      </div>
	              </dialog>
                <div class="card">
                <div class="card-author">
                    
                      <p class="author-avatar" @click="open">
                      <span>
                        <div class="user-picture">
                          <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                          </svg>
                        </div>

                      </span>
                    </p>
                    
                   
                    
                    

                    <div class="author-name">
                      <div class="author-name-prefix">Author</div>
                      <a style="margin-left: 50px;">{{ infos_annonce.email_Personne}}</a>
                      
                      <div class="con-like"  @click="liker" style="border-radius: 10px;">
                         <svg xmlns="http://www.w3.org/2000/svg" id="like"  style="border-radius: 10px;" height="48" viewBox="0 -960 960 960" width="48"><path d="m480-121-41-37q-105.768-97.121-174.884-167.561Q195-396 154-451.5T96.5-552Q80-597 80-643q0-90.155 60.5-150.577Q201-854 290-854q57 0 105.5 27t84.5 78q42-54 89-79.5T670-854q89 0 149.5 60.423Q880-733.155 880-643q0 46-16.5 91T806-451.5Q765-396 695.884-325.561 626.768-255.121 521-158l-41 37Zm0-79q101.236-92.995 166.618-159.498Q712-426 750.5-476t54-89.135q15.5-39.136 15.5-77.72Q820-709 778-751.5T670.225-794q-51.524 0-95.375 31.5Q531-731 504-674h-49q-26-56-69.85-88-43.851-32-95.375-32Q224-794 182-751.5t-42 108.816Q140-604 155.5-564.5t54 90Q248-424 314-358t166 158Zm0-297Z"/></svg>
                          <h3>   </h3>   
                     </div>
                      
                      </div>
                  </div>

                  <header class="card-header">
                   
                    <span class="title" style="margin-left: 100px;">{{infos_annonce.titre }}</span>
                  </header>
                  <main class="info">
                       {{ infos_annonce.description }}                       
                  </main>
                  

                    <div class="tags">
                    
                    <a href="#"> Buget : {{ infos_annonce.budget }} Fcfa</a>
                    <a href="#" style="float:  right;">{{ infos_annonce.date }}</a>
                    </div>

                   
                </div>
                  
                   
              </div>                         
                    
                  
                    
               
              
            <div class="btn">
                          
                <a href="#"   style="text-decoration: none;"> <p class="btn-postuler" @click="Postuler">  Postuler maintenant</p> </a>   <h3> </h3>    
                  
                <p class="btn-postuler" @click="copyLink" > copier le liens</p>     
          
              

                <div class="liste">
                                      <div id="comment">
                                        <form action="" @submit="send_commentaire">
                                          <span > <input class="commentaires"  type="text"  style="" v-model="description" placeholder="" required>  <input type="submit"  value="envoyer"></span>

                                        </form>
                                      </div> 

                                      <p><span id='look_comment' v-if="look" @click="look_comment" style="cursor: pointer; color: blue;">derouler                                      
                                        <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="48"><path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z"/></svg>
                                      </span>
                                        
                                          <section v-if="look_comments"  >
                                            <br>
                                              <section v-for="commentaire in commentaires ">
                                                  <div id="commentaire">
                                                      <span class="pseudo">{{ commentaire.pseudo }}</span>
                                                      <p>
                                                        {{ commentaire.description }}
                                                      </p>
                                                  </div>
                                              </section>
                                            <br><span @click="hide_comment" style="cursor: pointer; color: blue;">masquer                                            
                                                  <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="58"><path d="m283-345-43-43 240-240 240 239-43 43-197-197-197 198Z"/></svg>
                                            </span><br>
                                            <br>
                                            
                                          </section>
                                          
                                      </p> 
                  
                  </div>    
            
            </div>
                     
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text&display=swap');
@import url('https://fonts.googleapis.com/css2? family=Dosis&display=swap');


#annonce{
    border-right: 20px;
    transform: scale(0.9);
    display: flex;
    flex-direction:row;
    background-color: rgb(248, 249, 250);
    
    }
    .btn-postuler:hover{
        
    }
    .btn{
      
        flex: 1;
        margin-top: 80px;
        margin-right: 50px;
        margin-left: 20px;
        text-decoration: none;
        /* background-color: #256e9e; */
  }
    .descriptions{
        flex:2;
    }
    .description{
        margin-left: 100px;
    
    }
     
    
    .btn-postuler{
      padding: 6px;
        cursor: pointer;
        height: 40px; 
        color: rgb(243, 243, 247);
        background-color: rgb(24, 20, 218);
        border-radius: 7px;
        text-decoration: none;
        font-size: 22px;
        width: 80%;
        text-align:center;
    }
    .btn-postuler:active{
      background-color: green;
    }

    
    .liste{
      /* border: #0e0e0f 2px;
      margin: 10px; */
    }
    #comment{
   
    display: flex;
    margin-top: 20px; 
}
input[type="submit"]{
  width: 100px;
  color: whitesmoke;
  background-color: green;
  height: 40px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

}
input[type="submit"]:active{
  background-color: whitesmoke;
  color: green;
}
#envoyer{
  font-size: 36px;
  color: blue;
  transform: rotate(45deg);
}
.commentaires{
    border: solid rgb(84, 125, 138); 
    height: 40px;
    border-radius: 5px;
    font-size: 24px;
    width: 70%;
}
    p{
        font-size: 21px;
       
    }
   #commentaire{
    margin-top: 9px;
    background-color: #fff;
    display: block;
    margin-bottom: 80x;
    margin-left: 50px;
    border-radius: 0.5rem;
    border: solid rgb(230, 230, 221) 1px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

   }
   .pseudo{
    margin: 12px;
    border: solid rgb(197, 197, 193) 1px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

   }
/* ici les infos */

.card {
  margin-top: 40px;
  margin-left: 30px;
  margin-bottom: 200px;
  display: flex;
  position: relative;
  flex-direction: column;
  min-height: auto;
  min-width: 250px;
  border-radius: 16px;
  box-shadow: -1rem 0 3rem #00000067;
  transition: .2s;
  font-family: 'Inter', sans-serif;
}

.info{
  text-align: center;
  color: #11040e;
  font-size: 17px;
  padding: 20px;
  padding-bottom: 80px;
  font-family: 'Dosis', sans-serif;
	margin-top: 40px;
	width: 80%;
	max-height: 80%;
  height: auto;
  min-height: 30%;
	margin-left: 60px;
	border-radius: 8px;
  border: solid rgb(230, 230, 221) 2px;
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

}
.info:hover{
	transform: scale(1.01);
	transition: 1.2s all ease;
}

.card-author {
  position: relative;
  display: grid;
  grid-template-columns: 75px 1fr;
  align-items: center;
}

.author-name {
  color: #11040e;
  font-size: 16px;
  font-weight: 500;
}

.author-name-prefix {
  color: #e52e71;
  font-weight: 600;
  margin-left: 80px;
}

.author-avatar span {
  margin-top: -20px;
  cursor: pointer;
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  /* background: #e455b9; */
  margin: 16px 10px;
}

.half-circle {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 48px;
  fill: none;
  stroke: #ff8a00;
  stroke-width: 8;
  stroke-linecap: round;
}

.card-header {
  color: #7a7a8c;
}

.card-header p {
  font-size: 14px;
  margin: 0 0 1rem;
  color: #7a7a8c;
}

.card-header .title {
  font-size: 25px;
  margin: .25rem 0 auto;
  cursor: pointer;
  font-family: 'Arial Black', sans-serif;
}

.card-header .title:hover {
  background: black;
  text-shadow: none;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tags {
  margin: 1rem 0 2rem;
  padding: .5rem 0 1rem;
  line-height: 2;
  margin-bottom: 0;
}

.tags a {
  font-style: normal;
  font-weight: 700;
  color: #0e0e0f;
  text-transform: uppercase;
  font-size: 16px;
  padding: .2rem .85rem .25rem;
  position: relative;
  text-decoration: none;
}

.tags a:hover {
  background: linear-gradient(90deg,#ff8a00,#e52e71);
  text-shadow: none;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  background-clip: text;
  border-color: white;
}
/* pop-up */

.card-client {
  width: 90%;
  padding-top: 25px;
  padding-bottom: 25px;
  margin-left: 20px;
  padding-right: 20px;
  box-shadow: 0 6px 10px rgba(207, 212, 222, 1);
  border-radius: 10px;
  text-align: center;
  color: #050505;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
}



.user-picture {
  overflow: hidden;
  object-fit: cover;
  width: 5rem;
  height: 5rem;
  border: 4px solid #070707;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.user-picture svg {
  width: 2.5rem;
  fill: currentColor;
}

.name-client {
  margin: 0;
  margin-top: 20px;
  font-weight: 600;
  font-size: 18px;
}

.name-client span {
  display: block;
  font-weight: 200;
  font-size: 16px;
}

.social-media:before {
  content: " ";
  display: block;
  width: 100%;
  height: 2px;
  margin: 20px 0;
  background: #7cdacc;
}

.social-media a {
  position: relative;
  margin-right: 15px;
  text-decoration: none;
  color: inherit;
}

.social-media a:last-child {
  margin-right: 0;
}

.social-media a svg {
  width: 1.1rem;
  fill: currentColor;
}

/*-- Tooltip Social Media --*/
.tooltip-social {
  background: #262626;
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  padding: 0.5rem 0.4rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -90%);
  transition: all 0.2s ease;
  z-index: 1;
}
/**like */

.con-like {
  --red: #ee427b;
  position: relative;
  width: 50px;
  height: 50px;
  float: right;
  margin: 50px;
}

.con-like .like {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 20;
  cursor: pointer;
}

.con-like .checkmark {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.con-like .outline,
.con-like .filled {
  fill: var(--red);
  position: absolute;
}

.con-like .filled {
  animation: kfr-filled 0.5s;
  display: none;
}

.con-like .celebrate {
  position: absolute;
  animation: kfr-celebrate 0.5s;
  animation-fill-mode: forwards;
  display: none;
}

.con-like .poly {
  stroke: var(--red);
  fill: var(--red);
}

.con-like .like:checked ~ .checkmark .filled {
  display: block
}

.con-like .like:checked ~ .checkmark .celebrate {
  display: block
}

@keyframes kfr-filled {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes kfr-celebrate {
  0% {
    transform: scale(0);
  }

  50% {
    opacity: 0.8;
  }

  100% {
    transform: scale(1.2);
    opacity: 0;
    display: none;
  }
}

</style>