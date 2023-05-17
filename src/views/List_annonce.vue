<script>
import {ref} from 'vue'
import axios from 'axios'
import { RouterLink, RouterView } from 'vue-router'
export default{
    setup(){
     
        const modifier=()=>{
            var profilPic=document.getElementById('photo');
            var input =document.getElementById('update');
            profilPic.src=URL.createObjectURL(input.files[0]);
        }
         
    
    var annonces=ref([]);

   
   
    const Se_Connecter = ()=> {
        axios.get('http://localhost:3001/List_annonce',{withCredentials:true})
            .then(response=>{
            console.log(response)
          annonces.value=response.data.message
         
        } , 
        (err) => {
            if (err.response && err.response.data) {

            console.log(err.response.data)
            alert("vous devez vous connecter")
            this.$router.push('/connexion')
            } else {

            console.log(err)
            
            }
        }) 
        console.log(annonces.value);
        

    }
    Se_Connecter()
    return {
        modifier,
        annonces,
        nombres:[{nombre:"1"},{nombre:"2"},{nombre:"3"}],
        
      
    }
},




}


</script>


<template>
    <div >
        
       
     <div id="doc">
        
        <section id="section">
            <div v-for="annonce in annonces" id="annonces">
                <div id="annonce">
                    <RouterLink :to="'/postuler?title=' + annonce.titre+'&id='+annonce.id+'&description='+annonce.description+'&budget='+annonce.budget+'&date='+annonce.date+'&domaine='+annonce.domaine" style="text-decoration: none;">
                  
                        <div class="rows"> 
                        <h1 id="titre">{{ annonce.titre }}</h1>
                       
                          <input type="email" :value="annonce.id" v-mode="id" hidden>
                
                      
                       </div>
                    <div id="description">
                        <span> {{annonce.description}} </span>
                    </div>
                    <div id="domaine">
                        <span> {{annonce.domaine}} </span>
                    </div>
                    
                    <div >
                        <span id="budget" style="background-color: azure; opacity: 1;">  j'ai un budget de  : {{annonce.budget}}Fcfa</span>
                        <span id="date">  a ete envoyer le :{{annonce.date}} </span>
                    </div>
                    <hr>
                    </RouterLink>
                   
                
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
#amis{
    width: 100%;
    height: 80%;
    background-color: rgb(220, 233, 235);
    border-radius: 17px;
    margin-top: 200px;
}
*{
    font-family: 'Changa', sans-serif;
    font-size: 100%;
    
}


template{
    background-color: turquoise;
}


#doc{
    display: flex;
    flex-direction: row;
    width: 100%;
}
#domaine{
    margin-bottom: 20px;
}
#domaine,#titre{
    margin-left: 70px;
}
 #annonces{
    display: flex;
    flex-direction: row;
    width: 100%;
} 
#annonce{
    transition: 0.8s;
    transform: scale(0.9);
    border-bottom-right-radius: none;
    display: flex;
    flex-direction:column;
    border-radius: 18px;
    background-color: rgb(248, 249, 250);
    border-bottom: solid black;
    width: 100%;
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
    color: rgba(3, 2, 15, 0.952);
    font-size: 24px;
}
#description{
    color: rgb(0, 0, 0);
    margin-left: 80px;
    margin-bottom: 50px;
    font-size: 17px;
    background-color: rgb(143, 143, 138);
    width: 80%;
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



 .con-like {
  --red: #ee427b;
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