<script>
import { RouterLink, RouterView } from 'vue-router'

import { ref } from 'vue'
import axios from 'axios'
import { useRouter, useRoute } from 'vue-router'
 
    
    export default{
    setup() {
        const router = useRouter();
        const route = useRoute();
        const id = route.params.userId;
        var email = ref("");
        var password = ref("");
        var look=ref(true)
        var etat = ref("");
        var message=ref('')
        var message_conn=ref('')
        var message_verif=ref('')
        var params=ref(route.params.userId )
        var exe="auteur"
         /**fonction pour envoyer la connexion */
        const Se_Connecter = (ev) => {
            ev.preventDefault();
            axios.post("https://55e0-154-72-162-124.ngrok-free.app/connexion", {
                email: email.value,
                passe: password.value,
            }, { withCredentials: true })
                .then(response => {
                console.log(response);
                etat.value = response.data.etat;
               
                if (etat.value == true) {
                    router.push({ name: "list_annonce" });
                }
                else{
                  ErroMessage()
                }
            },   
            (err) => console.log(err.response.data)
            );
        }
        /**fonction pour envoyer l'email de verification */
          const updatePasswork =(ev)=>{
                ev.preventDefault()
                axios.post('https://55e0-154-72-162-124.ngrok-free.app/update',
          {
            email:email.value,
          }, {withCredentials:true}
        )
        .then(response=>{
          console.log(response)
          etat.value=response.data.etat;
          message_verif.value=response.data.message
              
            }, (err) => {
              console.log(err.response.data)
            }
            )
        }
        /** fonction pour le cachez la connexion  */
        const voire=()=>{
          look.value=false;
          message_verif.value=''
        }
         /** fonction pour le cachez l'envois d'email  */
         const cacher=()=>{
          look.value=true;
          message.value='';
        }
        const hiddenERROR=()=>{
        var x = document.getElementById("EROR_MESSAGE_BOX");
          	x.close();
        } 
        const showERROR=()=>{
          var x = document.getElementById("EROR_MESSAGE_BOX");
          x.showModal();
        }
      const ErroMessage=()=>{
       console.log("la function")
        setTimeout(showERROR, "0000")
       
        setTimeout(hiddenERROR, "2000")
        email.value=""
        password.value=""
      }
        return {
            voire,
            cacher,
            look,
            email,
            password,
            message,
            message_verif,
            message_conn:"incoret email or password  ! please try againt",
            Se_Connecter,
            updatePasswork,
            params,
            id
        };
    },
    
}

</script>

<template>

    <div>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <form class="form"  v-if="look" @submit="Se_Connecter"> 
     
      <div class="eror"> </div>  
       <p class="form-title">Login</p>
        <div class="input-container">
          <input placeholder="Enter email" type="email" v-model="email" required>
        </div>
      
        <div class="input-container">
          <input placeholder="Enter password" type="password" v-model="password" required>

          
        </div>
        
         <button class="submit" type="submit" >
       Se Connecter
      </button>

      <p class="signup-link" @click="voire" style="font-size: 19px; text-decoration: none; cursor: pointer;"> 
       <!-- <h3 @click="voire">mot de passe oublier </h3>  -->
        <a to="/updating" style="font-size: 19px; text-decoration: none;" @click="voire">mot de passe oublier </a>
      </p>
   </form>
 
    <form class="form" v-else  @submit="updatePasswork">
      <div class="eror">{{ message_verif }}</div>
       <p class="form-title">send your email</p>
        <div class="input-container">
          <input placeholder="Enter email" type="email" v-model="email" required>
        </div>
      
        
        
         <button class="submit" type="submit" >
        Send

      </button>
      <p class="signup-link" style="font-size: 19px; text-decoration: none; cursor: pointer;"> 
      <a to="/connexion" style="font-size: 19px; text-decoration: none;" @click="cacher">Se conneter</a>
      </p>
    </form>
    <dialog id="EROR_MESSAGE_BOX" style="outline: none; border: none; border-radius: 5px;">
      <div class="card"> 
  
        <div class="header"> 
          
          <div class="Fail dismiss">
            <span class="material-icons">
              close
              </span>
          </div>
            
          <div>
            {{ message_conn }} 
          </div>
              
          </div> 
      </div>
    </dialog>

    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2? family=Quicksand&display=swap');
*{
  font-family:'Lucida Sans Regular', 'Lucida Grande', Geneva, Verdana;
  font-family:'Lucida Sans Regular', 'Lucida Grande', Geneva, Verdana;
}
.form {
/* margin-left: 50px; */
background-color: #fff;
display: block;
padding: 1rem;
max-width: 450px;
margin-bottom: 80x;
margin-left: 100px;
border-radius: 0.5rem;
border: solid rgb(230, 230, 221) 1px;
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.form-title {
font-size: 1.25rem;
line-height: 1.75rem;
font-weight: 600;
text-align: center;
color: #000;
}

.input-container {
position: relative;
}
 
.input-container input, .form button {
outline: none;
border: 1.3px solid #e8ecf0;
margin: 8px 0;
}

.input-container input {
  font-family: 'Quicksand', sans-serif;
background-color: #fff;
padding: 1rem;
padding-right: 3rem;
font-size: 22px;
line-height: 1.25rem;
width: 300px;
border-radius: 0.5rem;
box-shadow: 0 1px 2px 0 rgba(236, 233, 233, 0.05);
}

.input-container span {
display: grid;
position: absolute;
top: 0;
bottom: 0;
right: 0;
padding-left: 1rem;
padding-right: 1rem;
place-content: center;
}

.input-container span svg {
color: #9CA3AF;
width: 1rem;
height: 1rem;
}

.submit:active{
  background-color: #d6d8db;
  color: #4F46E5;
}
.submit {
  cursor: pointer;
display: block;
padding-top: 0.75rem;
padding-bottom: 0.75rem;
padding-left: 1.25rem;
padding-right: 1.25rem;
background-color: #4F46E5;
color: #ffffff;
font-size: 0.875rem;
line-height: 1.25rem;
font-weight: 500;
width: 70%;
border-radius: 0.5rem;
text-transform: uppercase;
border: none;
}

.signup-link {
color: #6B7280;
font-size: 0.875rem;
line-height: 1.25rem;
text-align: center;
}

.signup-link a {
text-decoration: underline;
}

.eror {
  /* animation: blink 3s linear infinite; */
}
.eror{
  color: rgb(211, 25, 25);
  font-size: 24px;
}
.eror ,.valid{
  animation: blink 3s linear infinite;
}
@keyframes blink {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 0.5;
  }
  30% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  70% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
<style scoped>
.card {
overflow: hidden;
position: relative;
text-align: left;
border-radius: 0.5rem;
max-width: 290px;
box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
background-color: #fff;
width: 400px;
}
.EROR_MESSAGE_BOX{
width: 300px;
}


.dismiss:hover {
background-color: #ee0d0d;
border: 2px solid #ee0d0d;
color: #fff;
}

.header {
padding: 1.25rem 1rem 1rem 1rem;
}


.Done , .Fail {
display: flex;
margin-left: auto;
margin-right: auto;
background-color: #e2feee;
flex-shrink: 0;
justify-content: center;
align-items: center;
width: 3rem;
height: 3rem;
border-radius: 9999px;
animation: animate .6s linear alternate-reverse infinite;
transition: .6s ease;
}
.Fail{
background-color: #ee0d0d;}

.Done svg {
color: #066137;
width: 2rem;
height: 2rem;
}

.content {
margin-top: 0.75rem;
text-align: center;
}

.title {
color: #066e29;
font-size: 1rem;
font-weight: 600;
line-height: 1.5rem;
}

.message {
margin-top: 0.5rem;
color: #595b5f;
font-size: 0.875rem;
line-height: 1.25rem;
}

.actions {
margin: 0.75rem 1rem;
}

.history {
display: inline-flex;
padding: 0.5rem 1rem;
background-color: #1aa06d;
color: #ffffff;
font-size: 1rem;
line-height: 1.5rem;
font-weight: 500;
justify-content: center;
width: 100%;
border-radius: 0.375rem;
border: none;
cursor: pointer;
box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}


@keyframes animate {
from {
transform: scale(1);
}

to {
transform: scale(1.09);
}
}
</style>