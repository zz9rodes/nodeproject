<script>
	 import axios from 'axios'
     import { ref } from 'vue';
     import { RouterLink, RouterView } from 'vue-router'
     import { useRouter, useRoute } from 'vue-router'
    
     export default{
	setup(){
    const route = useRoute()
    const router = useRouter()
    var propositions=ref([]);
    var message=ref('');
    var messages=ref('');
    var statut=ref(true)
    var status=ref()
    var Id=route.query.id;
    console.log("id ici "+Id);
    var titre=route.query.title;
    var description=route.query.description;
    var domaine=route.query.domaine;
    var date=route.query.date
	const  list_Proposition =()=>{
                axios.post('https://55e0-154-72-162-124.ngrok-free.app/list_proposition',{
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
            statut.value=true
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

    const sendEmail =(ev)=>{
                ev.preventDefault()
                axios.post('https://55e0-154-72-162-124.ngrok-free.app/update',
          {
            email:email.value,
          }, {withCredentials:true}
        )
        .then(response=>{
          console.log(response)
          etat.value=response.data.etat;
                if(etat.value==true){
                router.push({name:'UpdatePasswork'})
              }
              else{
                console.log('no user')
              }
            }, (err) => {
              console.log(err.response.data)
            }
            )
        }
	
        const authentification = ()=> {
        axios.get('https://55e0-154-72-162-124.ngrok-free.app/authentification',{withCredentials:true})
            .then(response=>{
            console.log(response)
          messages.value=response.data.message
          status.value=response.data.etat
          if(status.value!=true){
            router.push({name:'home'}) 
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
        // console.log(annonces.value);
  }
  authentification()
	return{sendEmail,
        propositions,
        Id,
        titre,
        domaine,
        description,
        date,
        message,
        messages,
        statut
    }
}
		
	}
</script>

<template>
      <div v-if="statut">
     
          <h3 class="error">
            {{ message }}  
          </h3>
      </div>
      <div class="container" v-else>  
      
       <ul>  
          
        <div  style="display: flex; flex-direction: column;">
          <h3 class="erro"> 
            <br><br>
            <span style="color:black ; float: left; ">Titre de l'annonce :</span> {{ titre }}
          </h3>
          <div  id="ligne" >
       
          <div class=" titre">email</div>
          <div class=" titre">nom</div>
          <div class=" titre">competence</div>
          <div class=" titre">domaine</div>
          <div class=" titre">titre</div>
          <div class=" titre">depuis le </div>
          <div class=" titre">Messase</div>
       </div>
        </div>
      
         
        <div v-for="proposition in propositions"   class="boucle " id="ligne">
         
         
          <div class="ele"> {{proposition.email}}</div>
          <div class="ele"> {{proposition.pseudo}} </div>
         <div class="ele"> {{proposition.competence}} </div>
          <div class="ele"> {{domaine}}</div>
          <div class="ele">{{titre}} </div>
          <div class="ele"> {{date}}</div>
          <div class="ele" style="background-color: rgb(40, 145, 214); min-height: 27px; color: aliceblue; min-width: 90px; margin: 10px;  border-radius: 6px; padding: 10px; cursor: pointer; opacity: 0.7;">   Send Message        </div>
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
.error{
  text-align: center;
  font-size: 30px;
  color: rgb(0, 0, 0);
  margin-top: 150px;
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
