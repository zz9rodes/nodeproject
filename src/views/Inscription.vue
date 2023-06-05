<script>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import axios from 'axios'
import { ref } from 'vue'
export default {
  setup(){
    var router=useRouter()
    var message=ref('')
    var message_ok=ref('')
    const myFunction=()=> {
    var x = document.getElementById("myDialog");
    x.showModal();
  }
    return{
      myFunction,
    } 
  },
  data() {
    return {
    message:'',
    email:'',
    nom:null,
    password:'',
    competence:'',
    numcompte:'',
    message_ok:''
    }
  },
  methods:{
    valid(ev){
      ev.preventDefault()
      axios.post('http://localhost:3001/inscription',
        {email:this.email ,
          nom:this.nom,
          passe:this.password,
          competence:this.competence,
        }
        )
      .then(response=>{
        console.log(response)
        if(response.data.status==true){
            this.$router.push({name:'connexion'})
          }
        else if(response.data.status==false){
          console.log("la function avant")
            this.message=response.data.message;
            setTimeout( this.ErroMessage(),2000)
            // this.ErroMessage()
           
        }
        
    }, (err) => console.log(err)) 
    
    },

    showERROR(){
          var x = document.getElementById("EROR_MESSAGE_BOX");
          x.showModal();
        },
       hiddenERROR(){
        var x = document.getElementById("EROR_MESSAGE_BOX");
          	x.close();
        }  ,

       ErroMessage(){
       console.log("la function")
        setTimeout(this.showERROR, "0000")
       
        setTimeout(this.hiddenERROR, "2000")
        this.email=""
        this.password=""
        this.competence=""
        this.nom=""
      }
    
  }
  
}
</script>
<template>
    <div>
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <form class="form" @submit="valid">
    <!-- <div class="eror">{{ message }} </div>   -->
    <div class="valid">{{ message_ok }}</div>
       <p class="form-title">Cree un compte</p>
       
        <div class="input-container">
          <input placeholder="Enter email" type="email" v-model="email" required>
         
      </div>
      <div class="input-container">
          <input placeholder="Enter name" type="text" v-model="nom" required> 
        </div>
        <div class="input-container">
          <input placeholder="Enter password" type="password" v-model="password" minlength="9" required>

          
        </div>
        <div class="input-container">
          <input placeholder="competence" type="text" v-model="competence" required>
        </div>
        
         <button class="submit" type="submit" >
        Sign up
      </button>

      <p class="signup-link">
      
        <router-link to="/connexion">Se_Connecter</router-link>
    
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
            {{ message }} 
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
}
      .form {
  background-color: #fff;
  display: block;
  padding: 1rem;
  max-width: 450px;
  border-radius: 0.5rem;
  margin-left: 100px;
  margin-bottom: 80px;
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

.eror ,.valid{
  animation: blink 3s linear infinite;
}
.eror{
  color: red;
  font-size: 24px;
}
.valid{
  color: rgb(43, 139, 56);
  font-size: 24px;
}
.input-container {
  position: relative;
  border: none;
  
}

.input-container input, .form button {
  outline: none;
  border: 1.3px solid #e8ecf0;
  margin: 8px 0;
}

.input-container input {
  font-family: 'Quicksand', sans-serif;
  cursor:pointer;
  background-color: #fff;
  padding: 1rem;
  padding-right: 3rem;
  font-size: 22px;
  line-height: 1.25rem;
  width: 300px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
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