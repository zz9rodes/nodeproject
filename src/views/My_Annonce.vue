<script>
	 import axios from 'axios'
     import { ref } from 'vue';
     import { RouterLink, RouterView } from 'vue-router'
     import { useRouter, useRoute } from 'vue-router'
	export default{
	setup(){
    const route = useRouter()
    var Annonces=ref([]);
    var status=ref()
	const  list_Annonce=()=>{
                axios.get('http://localhost:3001/list_My_annoce', {withCredentials:true})
        .then(response=>{console.log(response) 
            Annonces.value=response.data.message},
        (err)=>
        {
            if (err.response && err.response.data) 
            {
                console.log(err.response.data)
                // alert("vous devez vous connecter")
            }
            else {
                console.log(err)
            }
        }) 
        console.log(Annonces.value);

    }  
    const authentification = ()=> {
        axios.get('http://localhost:3001/authentification',{withCredentials:true})
            .then(response=>{
            console.log(response)
          // message.value=response.data.message
          status.value=response.data.etat
          if(status.value!=true){
            route.push({name:'home'}) 
          
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
        
  } 
    list_Annonce()
    authentification()
	
	return{
        Annonces
    }
}
		
	}
</script>

<template>
    <div class="container">
        <h1 style="text-align: center;">your   posts </h1>
    <ul>  
      <div  id="ligne">
          <div class=" titre">titre</div>
          <div class=" titre"> domaine</div>
          <div class=" titre"> budget (fcfa)</div>
          <div class=" titre"> date</div>
          <div class=" titre"> allez vers</div>
          <div class=" titre"> modifier</div>
          <div class=" titre suprimer"> suprimer</div>
          <div class=" titre"> propositions</div>
      </div>
         
        <div v-for="Annonce in Annonces"   class="boucle " id="ligne">
          <div class="ele">{{Annonce.titre}} </div>
          <div class="ele"> {{Annonce.domaine}}</div>
          <div class="ele"> {{Annonce.budget}} Fcfa</div>
          <div class="ele"> {{Annonce.date.substring(0.25)}}</div>
          <div class="ele"> 
            <RouterLink :to="'/postuler?title=' + Annonce.titre+'&id='+Annonce.id+'&description='+Annonce.description+'&budget='+Annonce.budget+'&date='+Annonce.date+'&domaine='+Annonce.domaine" style="text-decoration: none;"> 
                
<svg xmlns="http://www.w3.org/2000/svg" height="28" class="view" viewBox="0 -960 960 960" width="48"><path d="M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.353-58Q433-388 400.5-420.735q-32.5-32.736-32.5-79.5Q368-547 400.735-579.5q32.736-32.5 79.5-32.5Q527-612 559.5-579.265q32.5 32.736 32.5 79.5Q592-453 559.265-420.5q-32.736 32.5-79.5 32.5ZM480-200q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359-740 257.5-674.5 156-609 102-500q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"/></svg>
            </RouterLink>
          </div>
          <div class="ele">
                

            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="48"><path d="M180-180h44l443-443-44-44-443 443v44Zm614-486L666-794l42-42q17-17 42-17t42 17l44 44q17 17 17 42t-17 42l-42 42Zm-42 42L248-120H120v-128l504-504 128 128Zm-107-21-22-22 44 44-22-22Z"/></svg>          </div>
          <div class="ele">
            <RouterLink :to="'/list_prposition?title=' + Annonce.titre+'&id='+Annonce.id+'&description='+Annonce.description+'&budget='+Annonce.budget+'&date='+Annonce.date+'&domaine='+Annonce.domaine" style="text-decoration: none;"> 
                  
<svg xmlns="http://www.w3.org/2000/svg" height="26" viewBox="0 -960 960 960" width="48"><path d="M295.615-160q-22.442 0-38.913-16.471-16.471-16.471-16.471-38.913v-518.462H200v-30.77h154.154v-26.154h251.692v26.154H760v30.77h-40.231v518.462q0 23.057-16.163 39.221Q687.443-160 664.385-160h-368.77ZM689-733.846H271v518.462q0 10.769 7.308 17.692 7.307 6.923 17.307 6.923h368.77q9.231 0 16.923-7.692Q689-206.154 689-215.384v-518.462ZM395.461-273.692h30.77v-378.231h-30.77v378.231Zm138.308 0h30.77v-378.231h-30.77v378.231ZM271-733.846v543.077-543.077Z"/></svg>
            </RouterLink>
          </div>
          <div class="ele">
            <RouterLink :to="'/list_proposition?title=' + Annonce.titre+'&id='+Annonce.id+'&description='+Annonce.description+'&budget='+Annonce.budget+'&date='+Annonce.date+'&domaine='+Annonce.domaine" style="text-decoration: none;"> 
                            
              <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 -960 960 960" width="48"><path d="M222-255q63-44 125-67.5T480-346q71 0 133.5 23.5T739-255q44-54 62.5-109T820-480q0-145-97.5-242.5T480-820q-145 0-242.5 97.5T140-480q0 61 19 116t63 109Zm257.814-195Q422-450 382.5-489.686q-39.5-39.686-39.5-97.5t39.686-97.314q39.686-39.5 97.5-39.5t97.314 39.686q39.5 39.686 39.5 97.5T577.314-489.5q-39.686 39.5-97.5 39.5Zm.654 370Q398-80 325-111.5q-73-31.5-127.5-86t-86-127.266Q80-397.532 80-480.266T111.5-635.5q31.5-72.5 86-127t127.266-86q72.766-31.5 155.5-31.5T635.5-848.5q72.5 31.5 127 86t86 127.032q31.5 72.532 31.5 155T848.5-325q-31.5 73-86 127.5t-127.032 86q-72.532 31.5-155 31.5ZM480-140q55 0 107.5-16T691-212q-51-36-104-55t-107-19q-54 0-107 19t-104 55q51 40 103.5 56T480-140Zm0-370q34 0 55.5-21.5T557-587q0-34-21.5-55.5T480-664q-34 0-55.5 21.5T403-587q0 34 21.5 55.5T480-510Zm0-77Zm0 374Z"/></svg>            </RouterLink>
          </div>
        </div>
    </ul>
      
    </div>
</template>

<style scoped>
*{
  font-family:'Lucida Sans Regular', 'Lucida Grande', Geneva, Verdana;

}
.container{
  
  margin-top: 60px;
  margin-left: 30px;
  padding: 50px;
  border: solid rgb(209, 209, 199) 1px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05),0 4px 6px 18px rgba(0, 0, 0, 0.05);
  width: 90%;
  border-radius: 7px;

}

.titre{
  height: 40px;
  font-size:  24px;
}
.dem-link{
  width: 200px;
}
.boucle,#ligne{
    display:flex;
    flex-direction:row;
    height: 50px;
    margin-left: -50px;
    margin-top: 10px;
    border: solid rgb(173, 172, 168) 1px;
    height: 70px;
    border-radius: 4px;
    cursor: text;
  }
  .boucle,#ligne:hover{
    border:none
  }
  .ele,.titre{
   
    flex:1;
  	padding:5px;
  } 
  .ele{
    margin-top: 20px;
    font-size: 15px;
    font-weight:bolder;
  }

.boucle:nth-child(even) {
  background-color:#f0e0c3;
}
.boucle:nth-child(odd) {
  background-color:#a5dfdf;
}
.view{
  fill: rgb(243, 247, 243);
  margin-left: 50px;
}
</style>
