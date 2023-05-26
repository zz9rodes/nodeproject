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
    <div>
        <h1 style="text-align: center; margin-top: 100px;margin-bottom: 100px;">your   posts </h1>
    <ul>  
      <div  id="ligne">
          <div class=" titre">titre</div>
          <div class=" titre"> domaine</div>
          <div class=" titre"> budget (fCfa)</div>
          <div class=" titre"> dates</div>
          <div class=" titre"> allez vers</div>
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
        </div>
    </ul>
      
    </div>
</template>

<style scoped>
*{
  font-family:'Lucida Sans Regular', 'Lucida Grande', Geneva, Verdana;

}
.titre{
  /* background-color: rgb(130, 136, 135); */
  height: 40px;
  font-size:  24px;
  /* border: solid rgb(184, 184, 175) 1px; */
}
.dem-link{
  width: 200px;
}
.boucle,#ligne{
    display:flex;
    flex-direction:row;
    height: 50px;
    margin-top: 10px;
    border: solid rgb(173, 172, 168) 1px;
    height: 70px;
    border-radius: 4px;
  }
  .boucle,#ligne:hover{
    border:none
  }
  .ele,.titre{
    /* padding:20px; */
    flex:1;
  	padding:5px;
  } 
  .ele{
    /* margin-left: 0px; */
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
