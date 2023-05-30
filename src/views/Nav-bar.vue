<script>
	 import axios from 'axios'
     import { ref } from 'vue'
	 import { RouterLink, RouterView } from 'vue-router'
	 import { useRouter, useRoute } from 'vue-router'
	export default{
		setup(){
		  const router = useRouter()
		  var titre=ref('');
          var description=ref('');
		  var budget=ref('');
		  var domaine=ref('');
		  var status=ref(false)
		  const looK=()=>{
				status=true;
		  }
		  const	nolook=()=>{
				status=false;
		  }
			
    const myFunction=()=> {
		var x = document.getElementById("myDialog");
      		var y = document.getElementById("annuler");
      x.showModal('animalNotChosen');
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
        .then(response=>
		{
			console.log(response)
			alert(response.data.message)
			location.reload()
		}, 

			(err) => console.log(err.response.data)) 
   		 }
	const  deconnet=(ev)=>{
		var result=confirm("voulez vous vous deconnecter ?")
		if(result==true){
                ev.preventDefault()
                axios.post('http://localhost:3001/deconnet',
          {
			domaine:domaine.value,
          }, {withCredentials:true}
        )
        .then(response=>{console.log(response)
		router.push({name:'home'})
		
		}, (err) => console.log(err.response.data)) 

		}
		else{
		
		}

    }
	
	return{
		deconnet,
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
        <header>
            
			
			<span>
				<li><router-link to="/list_annonce" class="link" style="color: blueviolet;" >actualites</router-link></li>
				<li><router-link to="/list_my_annonce" class="link"> my Publications</router-link></li>
                <li><router-link to="/list_query" class="link">my Postulations</router-link></li>
				<!-- <li><router-link to="/list_annonce" class="link">my Propositions</router-link></li> -->
				<!-- <li><router-link to="/list_annonce" class="link">my stats</router-link></li> -->
				
				<li class="annonce" @click="myFunction">post</li>
				<li class="deconect" @click="deconnet"><span id="add">logout</span></li>
			</span>	
				
			
		</header> 
		<dialog id="myDialog">
			<div class="form-title">Cree une annonce  
				<p class="ferme"  @click="fonction">
					<svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
				</p>
			</div>
    		<form class="form" @submit="valid">
				<div class="input">
					    
					
					<div class="input-container">
					<input placeholder="title" type="text" v-model="titre" required>
					
					</div>
		
					<div class="input-container">
					<input placeholder="desciption" type="description" v-model="description" required id="description">

					
					</div>
					<div class="input-container">
					<input placeholder="entrer le budget" type="number" v-model="budget" required>

					
					</div>
					<div class="input-container">
					<input placeholder="domaine " type="text" v-model="domaine" required>

					
					</div>
         		
						<button class="submit" type="submit" >
						post
						</button>
						<button class="reset" type="reset" @click="fonction">
						annuler
						</button>
				</div>	
				<div class="help">
				<p>besoin Aide</p>	 
					<svg xmlns="http://www.w3.org/2000/svg" @click="looK" style="font-size: 26px;" height="48" viewBox="0 -960 960 960" width="48"><path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z"/></svg>
					<div id="explain">
						<h3 style=" font-size: 17px;">Remplir les information <br>
							Titre	:ici il s'agit du titre donner a votre annonce <br>
							Domaine :ici il du domaine professionnnel conserner par votre annonce de votre annonce <br> 
							Budget: ici il s'agit des du budget prevut pour votre annonce , eventuellement negociables 

							<pre> remonter   					<svg xmlns="http://www.w3.org/2000/svg" @click="looK" style="font-size: 26px;" height="48" viewBox="0 -960 960 960" width="48"><path d="M480-345 240-585l43-43 197 198 197-197 43 43-240 239Z"/></svg>
</pre>
						</h3>

					</div>
				</div>
        		
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
				font-family: 'Quicksand', sans-serif;
			} 
			header{
    			
    			background-color: #F7F9F9 ;
    			width: 90%;
				margin-left: 100px;
				border-radius: 8px;
			}
			
			header li{
  			display: inline-flex;
			padding-left: 20px;
			}
			
			
			  li{
				display: inline;
     			margin: 10px;
				color: rgb(8, 5, 5);
				font-size: 18px;
			}
			
			.link{
				color: #000;
				font-size: 1.2em;
				padding: 7px;
			}
			.link:hover{
				color:#d3cfd8 ;
				background-color: #6b11e0 ;
				border-radius: 4px;
				transition: 0.4s all ease;
			}
		.annonce{
				background-color:#6b11e0 ;
				color: #ddd7d7;
				border-radius: 4px;
				width: 100px;
				padding: 5px;
				font-size: 20px;
				height: 40px;
				cursor: pointer;
				margin-left: 200px;
			}
			.deconect{
				padding: 5px;
				background-color:#6b11e0 ;
				color: #ddd7d7;
				width: auto;
				height: 40px;
				font-size: 20px;
				border-radius: 4px;
				cursor: pointer;
				margin-left: 100px;
				margin-top: -3s0px;
			}
			.deconect:active,.annonce:active{
				background-color: #f0eef3;
				color: #6b11e0;
			}
					
.form {
	display: flex;
	background-color: #fff;
	display: flex;
	flex-direction:row ;
	padding: 1rem;
	box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);

}
.input{
	flex:3;
}

.form-title  {
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 20px;
  color: #000;
}
.help{
	margin-left: 30px;
	flex: 2;
}

.input-container {
  position: relative;
  
}


.input-container input, .form button {
  outline: none;
  border: 1.3px solid #e6e8ee;
  margin: 8px 0;
}

.input-container input {
  background-color: #fff;
  padding: 1rem;
  padding-right: 3rem;
  font-size: 22px;
  line-height: 1.25rem;
  width: 80%;
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
  border-radius: 7px;
  border: none;
  margin-left: 14%;
  margin-top: 40px;
  width: 1000px;
}

.submit:active,.reset:active{
	background-color: aliceblue;
	color: #2f0a75;
}
.submit {
  display: block;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: #0db33f;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  width: 80%; 
  border-radius: 0.5rem;
  text-transform: uppercase;
  cursor: pointer;
}
.reset {
  display: block;
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  background-color: #e24a1c;
  color: #ffffff;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
   width: 80%; 
  border-radius: 0.5rem;
  text-transform: uppercase;
  cursor: pointer;
}


.lock{
  margin-left: 400px;
  font-size: 50px;
  font-family: 'Courier New', Courier, monospace;
  transform: rotate(45deg);
  cursor: pointer;
}
#description{
	min-height: 100px;
}
.ferme{
	margin-left: 80%;
	cursor: pointer;
}
.ferme svg{
	background-color: #e24a1c; 
	fill:#ddd7d7
}


.ferme svg {
  border-radius: 10px;
}
</style>