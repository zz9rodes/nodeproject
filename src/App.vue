<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './views/Nav-bar.vue'
import Footer from './views/Footer.vue'
import Profil from './components/Profil.vue'

  


</script>

<template>
  <html>
    <body>
      <div id="content">
        <!-- <router-link to="/connexion">inscription</router-link> -->
      
          <header style="margin: 0; padding: 0;">
              <NavBar/>
          </header>
          <div class="section" id="centre"> 
           <RouterView/>         
          </div>
      </div>

     <Footer/> 
    </body>
  </html>   
</template> 



<style scoped>
*{
  padding: 0;
  margin: 0;
  font-family:'Lucida Sans Regular', 'Lucida Grande', Geneva, Verdana;
  
}html,body {
  height: 100%;
}

body {
  display: flex;
  flex-direction: column;
}

#content {
  flex-grow: 1;
}

Footer {
  flex-shrink: 0;
  margin-top: 100px;
  color: green;
}
	</style>