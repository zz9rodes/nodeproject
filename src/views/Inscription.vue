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
    nom:'',
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
          var result=confirm("voulez vous vous connecter ?")
          if(result==true){
            this.$router.push({name:'connexion'})
          }
          else{
            this.message_ok=response.data.message;
          }
         
        }
        else if(response.data.status==false){
            this.message=response.data.message;
            console.log(this.message)
        }
        
    }, (err) => console.log(err)) 
    
    }
    
  }
  
}
</script>
<template>
    <div>
            
    <form class="form">
    <div class="eror">{{ message }} </div>  
    <div class="valid">{{ message_ok }}</div>
       <p class="form-title">Cree un compte</p>
       
        <div class="input-container">
          <input placeholder="Enter email" type="email" v-model="email" required>
         
      </div>
      <div class="input-container">
          <input placeholder="Enter name" type="text" v-model="nom" required> 
        </div>
        <div class="input-container">
          <input placeholder="Enter password" type="password" v-model="password" required>

          
        </div>
        <div class="input-container">
          <input placeholder="competence" type="text" v-model="competence" required>
        </div>
        
         <button class="submit" type="submit" @click="valid">
        Sign up
      </button>

      <p class="signup-link">
      
        <router-link to="/connexion">Se_Connecter</router-link>
    
      </p>
   </form>
    </div>
</template>


<style scoped>
@import url('https://fonts.googleapis.com/css2? family=Quicksand&display=swap');
*{
  font-family:'Lucida Sans Regular', 'Lucida Grande', Geneva, Verdana;
}
      .form {
  /* margin-top: 10px; */
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