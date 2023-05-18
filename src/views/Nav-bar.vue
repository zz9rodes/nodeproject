<script>
	 import axios from 'axios'
     import { ref } from 'vue'
	 import { RouterLink, RouterView } from 'vue-router'
	export default{
		setup(){
		  var titre=ref('');
          var description=ref('');
		  var budget=ref('');
		  var domaine=ref('');
			
    const myFunction=()=> {
		var x = document.getElementById("myDialog");
      		var y = document.getElementById("annuler");
      x.showModal();
    }

    const fonction=()=>{
		var x = document.getElementById("myDialog");
      	x.close('animalNotChosen');
    }
	const  valid=(ev)=>{
                ev.preventDefault()
                axios.post('http://localhost:3001/Annonce',
          {
            titre:titre.value,
            description:domaine.value,
			budget:budget.value,
			domaine:domaine.value,
          }, {withCredentials:true}
        )
        .then(response=>{console.log(response)
		alert(response.data.message)
		location.reload()}, (err) => console.log(err.response.data)) 

    }
	
	return{
		myFunction,
		fonction,
		titre,
        description,
		budget,
		domaine,
        valid,

	}
	

	}
		
	}
    </script>
<template>
    <div>
        <header class="menu-bar">
            <div class="logo"> <h1>Logo</h1> </div>
			<div class="contenair">
				<ul class="nav-bar">
				<li><router-link to="/list_annonce" class="link">actuts</router-link></li>
				<li><router-link to="/list_annonce" class="link">my post</router-link></li>
				<li><router-link to="#" class="link">my publication</router-link></li>
                <li><router-link to="/list_annonce" class="link">my apply</router-link></li>
				<li><router-link to="/list_annonce" class="link">my propositions</router-link></li>
				<li><router-link to="/list_annonce" class="link">my stats</router-link></li>
				<li><router-link to="/list_annonce" class="link">message</router-link></li>
				<div id="annonce" @click="myFunction"><span id="add">+</span>Cree une annonce</div>
				</ul>
			</div>
			
		</header> 
		<dialog id="myDialog">
    		<form class="form" @submit="valid">
        		<div class="lock" @click="fonction">+</div>      
       			<p class="form-title">Cree une annonce</p>
				<div class="input-container">
				<input placeholder="title" type="text" v-model="titre" required>
				
				</div>
      
				<div class="input-container">
				<input placeholder="desciption" type="description" v-model="description" required>

				
				</div>
				<div class="input-container">
				<input placeholder="entrer le budget" type="number" v-model="budget" required>

				
				</div>
				<div class="input-container">
				<input placeholder="domaine " type="text" v-model="domaine" required>

				
				</div>
         		
        		 <button class="submit" type="submit" >
         		envoyer l'Annonce
      </button>

      
   </form>

  </dialog>
		
    </div>
</template>

<style scoped>
         * {
				margin: 0;
				padding: 0;
				text-decoration: none;
				box-sizing: border-box;  
				 
			} 
			ul{
    			list-style: none;
  				padding: 0;
  				margin: 0;
			
  			}
			  li{
				display: inline;
     			margin: 10px;
				color: rgb(8, 5, 5);
			}
			.menu-bar{
				background-color:#dee4e7 ;
				height: 200px;
			}	
			.contenair{
				background-color: #b7b3be;
				height: 100px;
				padding-top: 20px;
			}
			.link{
				color: #000;
				font-size: 20px;
			}
		.menu-bar ul{
			margin-left: 80px;
				display: inline-flex;
				list-style: none;
			}
           
		
			#annonce{
				margin-top: 0px;
				background-color:#2b0e94 ;
				color: #ddd7d7;
				margin-left:50px;
				padding-left: 3px;
				border-radius: 4px;
				width: 200px;
				font-size: 20px;
				height: 40px;
				cursor: pointer;
				margin-bottom: 5px;
			}
			#add{
				font-size: 33px;
			}			
      .form {
  background-color: #fff;
  display: block;
  padding: 1rem;
  /* max-width: 450px; */
  border-radius: 49px;
  /* border-radius: 0.5rem; */
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.form-title {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  text-align: center;
  color: #000;
}

.input-container {
  position: relative;
}

.input-container input, .form button {
  outline: none;
  border: 0.3px solid #4f5155;
  margin: 8px 0;
}

.input-container input {
  background-color: #fff;
  padding: 1rem;
  padding-right: 3rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 300px;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.input-container span {
  display: grid;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding-left: 1rem;
  padding-right: 1rem;
  place-content: center;
}

.input-container span svg {
  color: #9CA3AF;
  width: 1rem;
  height: 1rem;
}
dialog{
  border: none;
  margin-left: 38%;
  margin-top: 100px;
}
.submit:active{
	background-color: aliceblue;
	color: #2f0a75;
}
.submit {
  display: block;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: #4F46E5;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 70%;
  border-radius: 0.5rem;
  text-transform: uppercase;
  cursor: pointer;
}

.signup-link {
  color: #6B7280;
  font-size: 0.875rem;
  line-height: 1.25rem;
  text-align: center;
}

.signup-link a {
  text-decoration: underline;
}
.lock{
  margin-left: 400px;
  font-size: 50px;
  font-family: 'Courier New', Courier, monospace;
  transform: rotate(45deg);
  cursor: pointer;

}
 

</style>