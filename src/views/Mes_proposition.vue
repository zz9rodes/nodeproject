<script>
	 import axios from 'axios'
     import { ref } from 'vue';
     import { RouterLink, RouterView } from 'vue-router'
     import { useRoute } from 'vue-router'
    
     export default{
	setup(){
    const route = useRoute()
    var propositions=ref([]);
    var message=ref('');
    var statut=ref(true)
    var Id=route.query.id;
    console.log("id ici "+Id);
    var titre=route.query.title;
    var description=route.query.description;
    var domaine=route.query.domaine;
    var date=route.query.date
	const  list_Proposition =()=>{
                axios.post('http://localhost:3001/list_proposition',{
                    id:Id
                }, {withCredentials:true})
        .then(response=>{
          console.log(response) 
          if(response.data.status==true){
            propositions.value=response.data.message
            statut.value=false
          }
          else{
            message.value=response.data.diver
            statut.value=response.data.status
          }
            
          },
        (err)=>
        {
            if (err.response && err.response.data) 
            {
                console.log(err.response.data)
             
            }
            else {
                console.log(err)
            }
        }) 
        console.log(propositions.value);

    }   
    list_Proposition()
	
	return{
        propositions,
        Id,
        titre,
        domaine,
        description,
        date,
        message,
        statut
    }
}
		
	}
</script>

<template>
     <div class="container">  
      
    <ul>  
          <h3 v-if="statut" class="error">{{ message }}  vous n'avez pas encore de demandes pour cette annonce
            <br><br>
            <span style="color:black">titre de l'annonce :</span> {{ titre }}
              <!-- <p style="text-align: center; ">vos demandes d'emplois pour l'annonce "{{ titre }}" </p> -->
          </h3>
        <div v-else style="display: flex; flex-direction: column;">
          <h3 class="erro"> 
            <br><br>
            <span style="color:black ; float: left; ">Titre de l'annonce :</span> {{ titre }}
              <!-- <p style="text-align: center; ">vos demandes d'emplois pour l'annonce "{{ titre }}" </p> -->
          </h3>
          <div  id="ligne" >
       
          <div class=" titre">email</div>
          <div class=" titre">nom</div>
          <div class=" titre">competence</div>
          <div class=" titre">domaine</div>
          <div class=" titre">titre</div>
          <div class=" titre">depuis le </div>
          <div class=" titre">Profil</div>
      </div>
        </div>
      
         
        <div v-for="proposition in propositions"   class="boucle " id="ligne">
         
         
          <div class="ele"> {{proposition.email}}</div>
          <div class="ele"> {{proposition.pseudo}} </div>
         <div class="ele"> {{proposition.competence}} </div>
          <div class="ele"> {{domaine}}</div>
          <div class="ele">{{titre}} </div>
          <div class="ele"> {{date}}</div>
          <div class="ele">
                  <svg xmlns="http://www.w3.org/2000/svg" style="cursor:pointer"  height="38" viewBox="0 -960 960 960" width="48"><path d="M295.615-160q-22.442 0-38.913-16.471-16.471-16.471-16.471-38.913v-518.462H200v-30.77h154.154v-26.154h251.692v26.154H760v30.77h-40.231v518.462q0 23.057-16.163 39.221Q687.443-160 664.385-160h-368.77ZM689-733.846H271v518.462q0 10.769 7.308 17.692 7.307 6.923 17.307 6.923h368.77q9.231 0 16.923-7.692Q689-206.154 689-215.384v-518.462ZM395.461-273.692h30.77v-378.231h-30.77v378.231Zm138.308 0h30.77v-378.231h-30.77v378.231ZM271-733.846v543.077-543.077Z"/></svg>
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
  
  /* margin-top: 60px; */
  margin-left: 30px;
  padding: 50px;
  border: solid rgb(209, 209, 199) 1px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05),0 4px 6px 18px rgba(0, 0, 0, 0.05);
  width: 90%;
  border-radius: 7px;

}
.error{
  text-align: center;
  font-size: 30px;
  color: red;
}
.erro{
  float: left;
  margin-bottom: 80px;
  font-size: 30px;
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
