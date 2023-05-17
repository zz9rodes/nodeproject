<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './views/Nav-bar.vue'
import Footer from './views/Footer.vue'
import Profil from './components/Profil.vue'




</script>

<template>
    <div >
      <router-link to="/connexion">inscription</router-link>
      
        <header>
          <NavBar/>
        </header>
    </div>
    <main>
       

      <div class="section" id="centre"> 
          
        <RouterView/>
        
     
      </div>

      <div class="section" id="droite">
        
          <Profil/>
        </div>

    </main> 
    <Footer/>
   

    
  

 
  
</template> 

<style scoped>
.menu{
  margin-left: 10px;
}

main{
  display: flex;
  flex-direction:row ;
}
.section{
  margin-top: 80px;
  width: 100%;
  height: 100%;
  border-radius: 4px;
}

#centre{
  background-color: rgb(255, 255, 255);
  margin-left: 10px;
  margin-right: 10px;
  flex: 3;
  height: 1000px;
   
  }
  #droite{
    flex: 1;
  }


</style>
