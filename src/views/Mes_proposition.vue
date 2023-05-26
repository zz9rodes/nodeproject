<script>
	 import axios from 'axios'
     import { ref } from 'vue';
     import { RouterLink, RouterView } from 'vue-router'
     import { useRoute } from 'vue-router'
    
     export default{
	setup(){
    const route = useRoute()
    var propositions=ref([]);
    var Id=route.query.id;
    var titre=route.query.title;
    var description=route.query.description;
    var domaine=route.query.domaine;
	const  list_Proposition =()=>{
                axios.post('http://localhost:3001/list_proposition',{
                    id:Id
                }, {withCredentials:true})
        .then(response=>{console.log(response) 
            propositions.value=response.data.message},
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
        console.log(propositions.value);

    }   
    list_Proposition()
	
	return{
        propositions,
        Id,
        titre,
        domaine,
        description,
    }
}
		
	}
</script>

<template>
    <div>
     <tableau>
        <h3 style="margin-left: 100px; text-decoration:;">les propositions de votre annonce </h3>
        <table  cellpadding="5" id="titre">
            <tr>
                
                <td>titre du post</td>
                <td>domaine</td>
                <td>description</td>
                <td>pseudo</td>
              
                <td>competence</td>
                <td>Reponse</td>
                <td>contacter</td>
                <td class="dem-link">voire profil</td>
                <td class="email">G-mail</td>
            </tr> 
        </table> 
        <table v-for="proposition in propositions" class="annonce" cellpadding="5">   
     
            <tr>
                    <td>{{titre}}</td>
                    <td>{{domaine}}</td>
                    <td>{{description}}</td>
                    <td>{{proposition.email}}</td>
                    
                    <td>{{proposition.competence}}</td>
                    <td>
                      <RouterLink :to="'/postuler?title='+'&id='+'&description='+'&budget='+'&date='+'&domaine='" style="text-decoration: none;"><h4>supprimer</h4> </RouterLink>
                    </td>
                    <td>
                      <RouterLink :to="'/messagerie?email='+proposition.email" style="text-decoration: none;"><h4>message</h4> </RouterLink>
                    </td>
                    <td class="dem-link" >  asdfghj  </td> 
                    <td class="email"><a href="proposition.email">Send mail</a></td>
            </tr>
        
        </table>
     </tableau>
      
        
      
    </div>
</template>

<style scoped>
td{
    width: 130px;

}
/* .dem-link{
  width: 200px;
} */
table{
   
    border-collapse: collapse;
    border-radius: 2px;
}
.annonce:nth-child(even) {
  background-color:#D0D8DD;
}
.annonce:nth-child(odd) {
  background-color:#7DBCC2;
}
table, td {
  /* border: 1px solid black; */
 
}
#titre{
   background-color: #516BEC;
   border-bottom: 2px solid black;
   height: 70px;
   font-size: 23px ;
}
tableau{
    border-radius: 6px;
}
.email{
  width: 100px;
  text-decoration: none;
}
a{
  text-decoration: none;
  color: black;
}

/*animation */
.loader {
  position: relative;
  width: 54px;
  height: 54px;
  border-radius: 10px;
}

.loader div {
  width: 4%;
  height: 14%;
  background: rgb(128, 128, 128);
  position: absolute;
  left: 50%;
  top: 30%;
  opacity: 0;
  border-radius: 50px;
  box-shadow: 0 0 3px rgba(0,0,0,0.2);
  animation: fade458 1s linear infinite;
}

@keyframes fade458 {
  from {
    opacity: 1;
  }

  to {
    opacity: 0.25;
  }
}

.loader .bar1 {
  transform: rotate(0deg) translate(0, -130%);
  animation-delay: 0s;
}

.loader .bar2 {
  transform: rotate(30deg) translate(0, -130%);
  animation-delay: -1.1s;
}

.loader .bar3 {
  transform: rotate(60deg) translate(0, -130%);
  animation-delay: -1s;
}

.loader .bar4 {
  transform: rotate(90deg) translate(0, -130%);
  animation-delay: -0.9s;
}

.loader .bar5 {
  transform: rotate(120deg) translate(0, -130%);
  animation-delay: -0.8s;
}

.loader .bar6 {
  transform: rotate(150deg) translate(0, -130%);
  animation-delay: -0.7s;
}

.loader .bar7 {
  transform: rotate(180deg) translate(0, -130%);
  animation-delay: -0.6s;
}

.loader .bar8 {
  transform: rotate(210deg) translate(0, -130%);
  animation-delay: -0.5s;
}

.loader .bar9 {
  transform: rotate(240deg) translate(0, -130%);
  animation-delay: -0.4s;
}

.loader .bar10 {
  transform: rotate(270deg) translate(0, -130%);
  animation-delay: -0.3s;
}

.loader .bar11 {
  transform: rotate(300deg) translate(0, -130%);
  animation-delay: -0.2s;
}

.loader .bar12 {
  transform: rotate(330deg) translate(0, -130%);
  animation-delay: -0.1s;
}


</style>
