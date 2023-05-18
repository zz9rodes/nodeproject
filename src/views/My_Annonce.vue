<script>
	 import axios from 'axios'
     import { ref } from 'vue';
     import { RouterLink, RouterView } from 'vue-router'
	export default{
	setup(){
	
    var Annonces=ref([]);
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
    list_Annonce()
	
	return{
        Annonces
    }
}
		
	}
</script>

<template>
    <div>
     <tableau>
        <!-- <h3 style="margin-left: 100px; text-decoration:;">ces annonce sont en attentes de reponse</h3> -->
        <table  cellpadding="5" id="titre">
            <tr>
                <td class="titre">Titre</td>
                <td>Domaine</td>
                <td>Budget</td>
                <td>Date</td>
                <td>Etat</td>
                <td>Allez voir</td>
            </tr> 
        </table> 
        <table v-for="Annonce in Annonces" class="annonce" cellpadding="5">   
     
            <tr>
                    <td> {{Annonce.titre}}</td>
                    <td>{{Annonce.domaine}}</td>
                    <td>{{Annonce.budget}}</td>
                    <td>{{Annonce.date.substring(0.25)}}</td>
                    <td>
                        <div class="loader">
                            <div class="bar1"></div>
                            <div class="bar2"></div>
                            <div class="bar3"></div>
                            <div class="bar4"></div>
                            <div class="bar5"></div>
                            <div class="bar6"></div>
                            <div class="bar7"></div>
                            <div class="bar8"></div>
                            <div class="bar9"></div>
                            <div class="bar10"></div>
                            <div class="bar11"></div>
                            <div class="bar12"></div>
                        </div> 
                    </td>
                    <td>     <RouterLink :to="'/postuler?title=' + Annonce.titre+'&id='+Annonce.id+'&description='+Annonce.description+'&budget='+Annonce.budget+'&date='+Annonce.date+'&domaine='+Annonce.domaine" style="text-decoration: none;"><h4>Voire</h4> </RouterLink></td>
            </tr>
        
        </table>
     </tableau>
      
        
      
    </div>
</template>

<style scoped>
td{
    width: 140px;

}
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
