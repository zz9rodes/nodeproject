<script>
import { RouterLink, RouterView } from 'vue-router'
import axios from 'axios'
export default {
  setup(){
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
    email:'',
    nom:'',
    password:'',
    competence:'',
    numcompte:''    
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
          numcompte:this.numcompte
        }
        )
      .then(response=>{console.log(response)}, (err) => console.log(err)) 
    
    }
    
  }
  
}
</script>
<template>
    <div>
            
    <form class="form">
       <p class="form-title">Cree un compte</p>
        <div class="input-container">
          <input placeholder="Enter email" type="email" v-model="email">
         
      </div>
      <div class="input-container">
          <input placeholder="Enter name" type="text" v-model="nom"> 
        </div>
        <div class="input-container">
          <input placeholder="Enter password" type="password" v-model="password">

          
        </div>
        <div class="input-container">
          <input placeholder="competence" type="text" v-model="competence">
        </div>
        <div class="input-container">
          <input placeholder="account number" type="text" v-model="numcompte">
        </div>
         <button class="submit" type="submit" @click="valid">
        Sign in
      </button>

      <p class="signup-link">
        No account?
        <router-link to="/connexion">Se_Connecter</router-link>
    
      </p>
   </form>
    </div>
</template>


<style scoped>
      .form {
  background-color: #fff;
  display: block;
  padding: 1rem;
  max-width: 450px;
  border-radius: 0.5rem;
  margin-left: 50px;
  margin-bottom: 80px;
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
  border: 1.3px solid #4f5155;
  margin: 8px 0;
}

.input-container input {
  background-color: #fff;
  padding: 1rem;
  padding-right: 3rem;
  font-size: 0.875rem;
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

.submit {
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