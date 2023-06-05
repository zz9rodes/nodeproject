<script>
	 import axios from 'axios'
     import { ref } from 'vue';
     import { useRouter, useRoute } from 'vue-router'
     import { RouterLink, RouterView } from 'vue-router'
	export default{
	setup(){
    const route = useRouter()
    var Querys=ref([]);
    var message=ref('')
    var messages=ref('')
    var etat= ref()
    var status=ref()
	const  list_Query=()=>{
                axios.get('https://55e0-154-72-162-124.ngrok-free.app/list_Query', {withCredentials:true})
        .then(response=>{console.log(response.data.diver) 
          if(response.data.status){
            Querys.value=response.data.message
            etat.value=false
          }

        else{
          messages.value=response.data.diver
          etat.value=true
        }
          
          },
          
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
        console.log(Querys.value);

    }   
    list_Query()
    /**authentification */
    const authentification = ()=> {
        axios.get('https://55e0-154-72-162-124.ngrok-free.app/authentification',{withCredentials:true})
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


    const Delete=(id)=>{
      var result=confirm("voulez vous vraiment supprimer ?")
      if(result==true){

        axios.post("https://55e0-154-72-162-124.ngrok-free.app/delete_query", {
              id_annonce: id,
            }, { withCredentials: true })
                .then(response => {
                console.log(response); 
                message.value=response.data.message;
                location.reload()    
              },
            (err) => 
              // console.log(err.response.data)
              console.log('error  '+err)
            );
      }
      else{

      }
            
  }

  authentification()
	
	return{
        Querys,
        Delete,
        message,
        messages,
        etat
    }
}
		
	}
</script>

<template>
  <div v-if="etat" style="text-align: center; font-size: 45px; color: black; margin-top: 120px;"> {{ messages }} </div>
    <div class="container" v-else> 
      <h1 style="text-align: center; ">your   posulations </h1>
    <ul>    
      <div  id="ligne">
          <div class=" titre">title</div>
          <div class=" titre"> domain</div>
          <div class=" titre"> budget (fCfa)</div>
          <!-- <div class=" titre"> auteur</div> -->
          <div class=" titre"> dates</div>
          <div class=" titre"> to watch</div>
          <div class=" titre"> delete</div>
      </div>
         
        <div v-for="Query in Querys"   class="boucle " id="ligne">
          <div class="ele">{{Query.titre}} </div>
          <div class="ele"> {{Query.domaine}}</div>
          <div class="ele"> {{Query.budget}} Fcfa</div>
          <!-- <div class="ele"> 
            <RouterLink style="text-decoration: none;" :to="'/postuler?title=' + Query.titre+'&id='+Query.id+'&description='+Query.description+'&budget='+Query.budget+'&date='+Query.date+'&domaine='+Query.domaine" > 
              @{{ Query.email_auteur }}
            </RouterLink>
          </div> -->
          <div class="ele"> {{Query.date}} </div>
          <div class="ele">
            <RouterLink :to="'/postuler?id='+Query.id+'&Kthd_eo='+Query.email_auteur" style="text-decoration: none;"> 
                
                <svg xmlns="http://www.w3.org/2000/svg" height="38" style="fill:black; " class="view" viewBox="0 -960 960 960" width="48"><path d="M480.118-330Q551-330 600.5-379.618q49.5-49.617 49.5-120.5Q650-571 600.382-620.5q-49.617-49.5-120.5-49.5Q409-670 359.5-620.382q-49.5 49.617-49.5 120.5Q310-429 359.618-379.5q49.617 49.5 120.5 49.5Zm-.353-58Q433-388 400.5-420.735q-32.5-32.736-32.5-79.5Q368-547 400.735-579.5q32.736-32.5 79.5-32.5Q527-612 559.5-579.265q32.5 32.736 32.5 79.5Q592-453 559.265-420.5q-32.736 32.5-79.5 32.5ZM480-200q-146 0-264-83T40-500q58-134 176-217t264-83q146 0 264 83t176 217q-58 134-176 217t-264 83Zm0-300Zm-.169 240Q601-260 702.5-325.5 804-391 857-500q-53-109-154.331-174.5-101.332-65.5-222.5-65.5Q359-740 257.5-674.5 156-609 102-500q54 109 155.331 174.5 101.332 65.5 222.5 65.5Z"/></svg>
                </RouterLink>
          </div>
          <div class="ele">
                  <svg xmlns="http://www.w3.org/2000/svg"  @click="()=>Delete(Query.id)" style="cursor: pointer; margin-left: 20px;"  height="38" viewBox="0 -960 960 960" width="48"><path d="M295.615-160q-22.442 0-38.913-16.471-16.471-16.471-16.471-38.913v-518.462H200v-30.77h154.154v-26.154h251.692v26.154H760v30.77h-40.231v518.462q0 23.057-16.163 39.221Q687.443-160 664.385-160h-368.77ZM689-733.846H271v518.462q0 10.769 7.308 17.692 7.307 6.923 17.307 6.923h368.77q9.231 0 16.923-7.692Q689-206.154 689-215.384v-518.462ZM395.461-273.692h30.77v-378.231h-30.77v378.231Zm138.308 0h30.77v-378.231h-30.77v378.231ZM271-733.846v543.077-543.077Z"/></svg>
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
.container{
  margin-left: 20px;
  margin-top: 50px;
  padding: 50px;
  border: solid rgb(209, 209, 199) 1px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05),0 4px 6px 18px rgba(0, 0, 0, 0.05);
  width: 90%;
  border-radius: 7px;

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
