<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './views/Nav-bar.vue'
import Footer from './views/Footer.vue'
import Profil from './components/Profil.vue'




</script>

<template>
    <div >
      <!-- <router-link to="/connexion">inscription</router-link> -->
      
        <header style="margin: 0; padding: 0;">
          <NavBar/>
        </header>
    </div>
    
       

      <div class="section" id="centre"> 
          
        <RouterView/>
        
     
      </div>

      <!-- <div class="section" id="droite">
        
          <Profil/>
        </div> -->

   
    <Footer/>
   

    
  

 
  
</template> 

<style scoped>
header{
/* height: 300px; */
}




#centre{

  background-color: rgb(150, 51, 51);
  height: 200%;
}
  


</style>
