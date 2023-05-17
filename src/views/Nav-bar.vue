<script>
	 import axios from 'axios'
     import { ref } from 'vue';
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
        .then(response=>{console.log(response)}, (err) => console.log(err.response.data)) 

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

			<ul id="nav-bar">
				<li class="active"><router-link to="/list_annonce">Accueil</router-link></li>
				<li><a href="#">annonces</a>
					<div class="sub-menu-1">
						<ul>
                            <li> <a href="#">fil d'annonces</a></li>
							<li> <a href="#">mes Annonces</a></li>
							
							
		 				</ul>
					</div>
				</li>
				<li><a href="#">Jobs</a>
					<div class="sub-menu-1">
						<ul>
							<li> <a href="#">mes Jobs</a></li>
							<li> <a href="#">mes demaines</a></li>
							<li> <a href="#">jobs termine</a></li>
		 				</ul>
					</div>
					
				</li>
                <li><a href="#">message</a>
				</li>
				<li><a href="#">stats</a>
				</li>
				<div id="annonce" @click="myFunction"><span id="add">+</span>Cree une annonce</div>
				
               
                <div><input id="deconnect" type="button" value="deconnecter"></div>
			</ul>
		</header> 
		<dialog id="myDialog">
    		<form class="form">
        		<div class="lock" @click="fonction">+</div>      
       			<p class="form-title">Cree une annonce</p>
				<div class="input-container">
				<input placeholder="title" type="text" v-model="titre">
				
				</div>
      
				<div class="input-container">
				<input placeholder="desciption" type="description" v-model="description">

				
				</div>
				<div class="input-container">
				<input placeholder="entrer le budget" type="number" v-model="budget">

				
				</div>
				<div class="input-container">
				<input placeholder="domaine " type="text" v-model="domaine">

				
				</div>
         		
        		 <button class="submit" type="submit" @click="valid">
         		envoyer l'Annonce
      </button>

      
   </form>

  </dialog>
		
    </div>
</template>

<style scoped>
            *{
				margin: 0;
				padding: 0;
				text-decoration: none;
				box-sizing: border-box;
			}
			
			.menu-bar{
				background:   #4F46E5;
                font-family: sans-serif;
				/* text-align: center;  */
               
			}
            #nav-bar{
                margin-left: 180px;
            }
		#deconnect,.menu-bar ul{
				display: inline-flex;
				list-style: none;
				color: white;
			}
            #deconnect:active{
                background-color: black;
                color: aliceblue;
            }
           
			#deconnect,	.menu-bar ul li{
				width: 120px;
				margin: 10x;
				padding:   10px;
				cursor: pointer;
				font-size: 22px;
				
			}
			.menu-bar ul li:hover,.menu-bar ul li:focus{
				color: rgb(7, 6, 6);
				border-radius: 3px;
                transition: 0.6s;
                background-color: rgb(209, 209, 203);
                font-size: 23px;
			}
            #deconnect{
				height: 40px;
                color: black;
                background-color: aliceblue;
                margin-top: 10px;
                border-radius: 4px;
                width: 150px;
				margin-left: 100px;
            }
			.sub-menu-1{
				display: none;
			

			}
	 		.menu-bar ul li:hover .sub-menu-1 {
				display: block;
				position: absolute;
                background-color: rgb(209, 209, 203);
				margin-top: 10px;
				margin-left: -10px;
				border-radius: 3px;

			}
			.menu-bar ul li:hover .sub-menu-1 ul{
				display: block;
				margin: 10px;
			} 

			.menu-bar ul li:hover .sub-menu-1 ul li{
				width: 150px;
				padding: 10px;
				border-bottom: 10px;
				background: transparent;
				text-align: left;
			}
		
			.menu-bar ul li:hover .sub-menu-1 ul li a{
				font-size: 17px;
				color: rgb(19, 18, 18);
			}
			
			.menu-bar ul li:hover .sub-menu-1 ul li a:hover{
                    font-size: 18px;
			}
			 
			#annonce{
				margin-top: 10px;
				color: rgb(12, 5, 117);
				background-color:#dee4e7 ;
				/* margin-left: 100px; */
				border-radius: 4px;
				width: 200px;
				font-size: 20px;
				height: 40px;
				cursor: pointer;
				margin-bottom: 5px;
			}
			#add{
				font-size: 30px;
			}
			/* ajoue annonce css */
			
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