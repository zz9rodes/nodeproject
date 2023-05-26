<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import Registre from '../views/Inscription.vue'
import Login from '../views/Connexion.vue'
import { RouterLink, RouterView } from 'vue-router'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

var look=ref(false);


const login=()=>{
  look.value=true;
}

const Singup=()=>{
  look.value=false;
}

</script>
<template>
 <div>

  <header>
    
      <h2>{{ salut }}</h2>
      <span>
        <li @click="Singup" v-if="look">Signup </li> 
        <li @click="login" v-else>Login </li> 
     
        <li>Contact us</li> 
      </span>
     
  </header>
  <main>

      <div id="register">
            <Login v-if="look"/>
            <Registre v-else/>
      </div>
      <div id="container">
        <div class="car-ctn">
            <div class="carreau" id="orange">  </div>
            <div class="carreau" id="bleu"> </div>
        </div>
      
        <div class="car-ctn">
            <div class="carreau" id="vert"></div>
            <div class="carreau" id="jaune"></div>
        </div>    
      </div>
  </main>



  
 </div>
</template>
<style scoped>
@import url('https://fonts.googleapis.com/css2? family=Quicksand&display=swap');
*{
 
  padding: 0;
  margin: 0;
  
  font-size: 21px;
  list-style: none; 
}
.car-ctn{
  /* box-shadow: 12px 10px rgb(227, 238, 243); */
  /* border: solid black; */
  height: 400px;
  /* box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); */
  
}
main{
  display: flex;
  flex-direction: row;
  margin-top: 70px;
}
#jaune{
  background-color: #EEE82C;
  border-bottom-right-radius:  9px;
}
#bleu{
  background-color: #19BBEA ;
  border-bottom-left-radius:  9px;
}
#vert{
  background-color: #0CDC6E;
  border-top-right-radius:  9px;
}
#orange{
  border-top-left-radius: 9px;
  background-color: #EA9219 ;
}
#vert:active,#jaune:active,#orange:active,#bleu:active{
  transform: scale(1.2);
}
#vert,#jaune,#orange,#bleu{
  cursor: pointer;
  margin: 5px;
  transition: 2s all ease;
  
}
.carreau{
  height: 170px;
  color: rgb(14, 13, 14);
  width: 200px;
}

header{
    text-align:  center;
    background-color: #F7F9F9 ;
    width: 100%;
}

header li{
  display: inline-flex;
  padding: 30px;
}
#container{
  display: flex;
  flex-direction: row;
  margin-left: 200px;
  padding: 100px;
    
}
li:hover,li:active{
  transition: 100ms all ease-in-out;
  transform: rotate(04deg);
  margin-bottom: 5px;
  color: #CD5C5C;
  cursor: pointer;
}


 </style>