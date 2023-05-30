<script>
import {ref} from 'vue'
import axios from 'axios'
import { RouterLink, RouterView } from 'vue-router'

import { useRouter, useRoute } from 'vue-router'
export default{
    setup(){     
    const route = useRouter()
     var annonces=ref([])
     var message=ref()
     var status=ref()
      const Se_Connecter = ()=> {
        axios.get('http://localhost:3001/List_annonce',{withCredentials:true})
            .then(response=>{
            console.log(response)
          annonces.value=response.data.message
                        
        } , 
        (err) => {
            if (err.response && err.response.data) {
              console.log(err.response.data)
            // alert("vous devez vous connecter")
            } else {
              console.log(err)
            }
        }) 
        console.log(annonces.value);
  }
  const authentification = ()=> {
        axios.get('http://localhost:3001/authentification',{withCredentials:true})
            .then(response=>{
            console.log(response)
          message.value=response.data.message
          status.value=response.data.etat
          if(status.value!=true){
            route.push({name:'home'}) 
          //  window.location.replace("/connexion");
           }
         
        } , 
        (err) => {
            if (err.response && err.response.data) {
              console.log(err.response.data)
            alert("vous devez vous connecter")
            } else {
              console.log(err)
            }
        }) 
        console.log(annonces.value);
  }
    Se_Connecter()
    authentification()
  
    return {
        status,
        message,
        annonces,
        nombres:[{nombre:"1"},{nombre:"2"},{nombre:"3"}],
       }
},




}


</script>


<template>
    <div >
        
       
     <div id="doc" style="margin-top: 160px;">
        
        <section id="section" >
        
            <div v-for="annonce in annonces" id="annonces">
              
                    <div class="card">
                      <RouterLink :to="'/postuler?id='+annonce.id+'&Kthd_eo='+annonce.email" style="text-decoration: none;">
                     
                           <div class="header">
                              <p  id="titre" style="">
                               {{ annonce.titre }}
                               {{ annonce.email }}
                              </p>
                            </div>
                            <div class="info"> 
                              <p class="title" style="width: 40%;" >{{ annonce.domaine }}</p>
                              <p class="title">{{ annonce.description }} </p>
                            </div>
                      </RouterLink>      
                            <div class="footer">
                            <div id="comment">
                              <div class="likes" >
                                <div class="con-like">
                                 <input title="like" type="checkbox" class="like">
                                  <div class="checkmark">
                                      <svg viewBox="0 0 24 24" class="outline" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                                      </svg>
                                      <svg viewBox="0 0 24 24" class="filled" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                                      </svg>
                                      <svg class="celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                                      <polygon points="10,10 20,20" class="poly"></polygon>
                                      <polygon points="10,50 20,50" class="poly"></polygon>
                                      <polygon points="20,80 30,70" class="poly"></polygon>
                                      <polygon points="90,10 80,20" class="poly"></polygon>
                                      <polygon points="90,50 80,50" class="poly"></polygon>
                                      <polygon points="80,80 70,70" class="poly"></polygon>
                                      </svg>
                                                                    
                                </div>
                                </div>
                              </div>
                 
                            </div>
                              <p class="tag action" >Budget {{ annonce.budget }} Fcfa</p>
                              <button type="button" class="action">{{ annonce.date }} </button>
                            </div>
                         
                         
                        </div>
                 
                   
                
                      
            
            </div> 
        </section>
      
     </div>
    </div>
    
</template>

<style scoped> 
@import url('https://fonts.googleapis.com/css2? family=Lora&family=Poppins:ital,wght@1,300&display=swap');
@import url('https://fonts.googleapis.com/css2? family=Changa:wght@600&family=Lora&family=Poppins:ital,wght@1,300&display=swap');

#update{
    display: none;
}

*{
  font-family:'Lucida Sans Regular', 'Lucida Grande', Geneva, Verdana;
    font-size: 100%;
    
}


#domaine{
    margin-bottom: 20px;
}
#domaine,#titre{
    margin-left: 70px;
}

#link{
    color: darkgreen;
    height: 100%;
    width: 100%;
    margin-left: 400px;
    text-decoration: none;
    font-size: 20px;
    border-radius: 50px;
}
#titre{
  margin-left: 40px;
  margin-top: 10px;
    font-size: 17px ;
   color: black; 
   margin-top: 13px; 
   font-weight: bold;
}
#description{
    color: rgb(0, 0, 0);
    margin-left: 80px;
    margin-bottom: 50px;
    font-size: 17px;
    background-color: rgb(236, 236, 229);
    height: auto;
}
#budget{
    margin-left: 20px;
}
#date{
    margin-left: 100px;
}

.rows{
    display: flex;
    flex-direction: row;
}
.card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 0.75rem;
  background-color: rgb(255, 255, 255);
  width: 80%;
  height: 300px;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,.1),
  0 2px 4px -2px rgba(0,0,0,.1);
  margin-top: 20px;
  margin-left: 100px;
  border: solid rgb(230, 230, 221) 2px;
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

}

.header {
  width: 40%;
  position: relative;
  background-clip: border-box;
  margin-top: 1.5rem;
  margin-left: 1rem;
  margin-right: 1rem;
  border-radius: 4px;
  height: 3rem;
  border: solid rgb(230, 230, 221) 2px;
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

}

.info {
  border: none;
  padding: 1.5rem;
  text-align: center;
}

.title {
  color: rgb(5, 5, 5);
  letter-spacing: 0;
  line-height: 1.375;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  border: solid rgb(230, 230, 221) 1px;
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

}

.footer {
  padding: 0.75rem;
  border: 1px solid rgb(236 239 241);
  display: flex;
  align-items: center;
  justify-content: space-between;
  }

.tag {
  font-weight: 300;
  font-size: 17px;
  display: block;
  margin-left: 100px ;
  font-weight: bold;
}
.action:active{
    background-color:rgb(255 255 255);
    color:rgb(33 150 243);
}
.action {
    
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  cursor: pointer;
  border: none;
  outline: none;
  box-shadow: 0 4px 6px -1px rgba(33,150,243,.4),0 2px 4px -2px rgba(33,150,243,.4);
  color: rgb(255 255 255);
  text-transform: uppercase;
  font-weight: 700;
  font-size: .75rem;
  padding: 0.75rem 1.5rem;
  background-color: rgb(33 150 243);
  border-radius: 0.5rem;
}

.con-like {
  --red: rgb(230, 110, 130);
  position: relative;
  width: 50px;
  height: 50px;
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