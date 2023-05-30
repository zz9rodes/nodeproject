<script>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'
    import axios from 'axios'
    import { useRouter, useRoute } from 'vue-router'
    export default{
        setup(){
          const router = useRouter()
          var email=ref('');
          var password=ref('');
          var confirm_password=ref('');
          var etat =ref('')
        const  ResetPasswork=(ev)=>{
                ev.preventDefault()
                axios.post('http://localhost:3001/reinisalise_password',
          {
            email:email.value,
            passe:password.value,
            confirm_passe:confirm_password.value
          }, {withCredentials:true}
        )
        .then(response=>{
          console.log(response)
          etat.value=response.data.etat;
          if(etat.value==true){
            router.push({name:'home'})
          }

        }, (err) => console.log(err.response.data)) 

            }

        return{
                email,
                password,
                confirm_password,
                ResetPasswork,
       }

        },
      }

</script>

<template>
    <div>
        <form class="form">
       <p class="form-title">Reset your passwork</p>
       
          your email
        <div class="input-container">
          <input placeholder="your email" type="email" v-model="email" required>
        </div>
      
       <div class="input-container">
        your new password
          <input placeholder="Enter password" type="password" v-model="password"  minlength="9" required>
        </div>
      
        <div class="input-container">
            confirm the password
          <input placeholder="confirm password" type="password" v-model="confirm_password"  minlength="9" required> 
        </div>
        
         <button class="submit" type="submit" @click="ResetPasswork">
       update password
      </button>

      
   </form>

    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2? family=Quicksand&display=swap');
*{
  font-family:'Lucida Sans Regular', 'Lucida Grande', Geneva, Verdana;
  font-family:'Lucida Sans Regular', 'Lucida Grande', Geneva, Verdana;
}
.form {
margin-top: 100px;
margin-left: 50px;
background-color: #fff;
display: block;
padding: 1rem;
max-width: 450px;
margin-bottom: 80x;
margin-left: 50px;
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
</style>