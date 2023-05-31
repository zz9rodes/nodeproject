<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import NavBar from './views/Nav-bar.vue'
import Home from './views/HomeView.vue'
import Footer from './views/Footer.vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'


const route = useRouter()
var status=ref()
var nav=ref(false)
const authentification = ()=> {
        axios.get('http://localhost:3001/authentification',{withCredentials:true})
            .then(response=>{
            console.log(response)
          message.value=response.data.message
          status.value=response.data.etat
          if(status.value!=true){
            route.push({name:'home'}) 
            nav.value=false
          //  window.location.replace("/connexion");
           }
           
         
        } , 
        (err) => {
            if (err.response && err.response.data) {
              console.log(err.response.data)
            alert("vous devez vous connecter")
            } else {
              console.log(err)
            }
        }) 
        console.log(annonces.value);
  }


</script>

<template>
  <html>
    <body>
      <div id="content">
        <!-- <router-link to="/list_proposition">inscription</router-link> -->
      
          <header style="margin: 0; padding: 0;">
              <NavBar />
              <!-- <Home/> -->
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