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
    var status=ref()
	const  list_Query=()=>{
                axios.get('http://localhost:3001/list_Query', {withCredentials:true})
        .then(response=>{console.log(response) 
            Querys.value=response.data.message},
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


    const Delete=(id)=>{
      var result=confirm("voulez vous vraiment supprimer ?")
      if(result==true){

        axios.post("http://localhost:3001/delete_query", {
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
        message
    }
}
		
	}
</script>

<template>
    <div class="container">  
      <h1 style="text-align: center; ">your   posts </h1>
    <ul>  
      <div  id="ligne">
          <div class=" titre">titre</div>
          <div class=" titre"> domaine</div>
          <div class=" titre"> budget (fCfa)</div>
          <div class=" titre"> auteur</div>
            <div class=" titre"> dates</div>
          <div class=" titre"> suprimer</div>
      </div>
         
        <div v-for="Query in Querys"   class="boucle " id="ligne">
          <div class="ele">{{Query.titre}} </div>
          <div class="ele"> {{Query.domaine}}</div>
          <div class="ele"> {{Query.budget}} Fcfa</div>
          <!-- <div class="ele"> {{Query.date.substring(0.25)}}</div> -->
          <div class="ele"> 
            <RouterLink style="text-decoration: none;" :to="'/postuler?title=' + Query.titre+'&id='+Query.id+'&description='+Query.description+'&budget='+Query.budget+'&date='+Query.date+'&domaine='+Query.domaine" > 
              @{{ Query.nom }}
            </RouterLink>
          </div>
          <div class="ele"> {{Query.date}} </div>
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
