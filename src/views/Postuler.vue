<script>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue';
import axios from 'axios';
import { useRoute } from 'vue-router'



export default{
 
    setup(){
       var description=ref('')
       var look_comments=ref(false)
       var look=ref(true)
       var commentaires=ref([]);
        const route = useRoute()
        console.log(route.query.id)
        var Id=route.query.id;
        let randomNumberlike = Math.floor(Math.random() * 500);
        let randomNumberpostule= Math.floor(Math.random() * 160);
    const copyLink=()=>{
        alert("vous avez copier le liens")
    navigator.clipboard.writeText(window.location.href);
    }
    const look_comment=(ev)=>{
        look_comments.value=true;
        look.value=false;
    }
    const hide_comment=(ev)=>{
        look_comments.value=false;
        look.value=true;
       
    }
    const send_commentaire=(ev)=>{
        // ev.preventDefault()
        axios.post('http://localhost:3001/commentaire',{
            id_annonce:Id,
            description:description.value,
        },{withCredentials:true}
        ) .then(response=>{console.log(response) 
            alert(response.data.message) ,
            location.reload()
          }, (err) => console.log(err.response)) 
    }

    const Postuler=(ev)=>{
        ev.preventDefault()
        axios.post('http://localhost:3001/postuler',{
            id_annonce:Id
        },{withCredentials:true}
        ) .then(response=>{console.log(response) 
            alert(response.data.message)}, (err) => console.log(err.response)) 
    }

    const list_commentaires = ()=> {
        axios.post('http://localhost:3001/List_commentaire',{
          id_annonce:Id,
        },{withCredentials:true})
            .then(response=>{
            console.log(response)
          commentaires.value=response.data.message
         
        } , 
        (err) => {
            if (err.response && err.response.data) {

            console.log(err.response.data)
            } else {

            console.log(err)
            
            }
        }) 
        console.log(commentaires.value);
        

    }
    list_commentaires()
    const open=()=>{
      var profil=document.getElementById("myDialoge");
      profil.showModal();
    }
   const lock=()=>{
    var profil=document.getElementById("myDialoge");
    profil.close();
   }
    
        return{
            open,
            lock,
            copyLink,
            randomNumberlike,
            randomNumberpostule,
            Postuler,
            description,
            send_commentaire,
            commentaires,
            look_comment,
            look_comments,
            hide_comment,
            look,


        }

    },
    
}
</script>
<template>
    <div>
        <div id="annonce">
              <div class="descriptions">  
                <dialog id="myDialoge" style=" width: 600px; border: none; border-radius: 6px;">
                      <div class="card-client">
                        
                          <svg xmlns="http://www.w3.org/2000/svg" style="margin-left: 80% ; fill: whitesmoke;cursor: pointer; "  @click="lock"  height="48" viewBox="0 -960 960 960" width="48"><path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>
                        <div class="user-picture">
                          <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                          </svg>
                        </div>
                        <p class="name-client"> {{ $route.query.email }}
                          <span>
                            {{ $route.query.pseudo }}
                          </span>
                        </p>
                        <div class="social-media">
                          <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
                            </svg>
                            <span class="tooltip-social">Twitter</span>
                          </a>
                          
                          <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                              <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
                            </svg>
                            <span class="tooltip-social">Facebook</span>
                          </a>
                          
                        </div>
                      </div>
	              </dialog>
                <div class="card">
                <div class="card-author">
                    
                      <p class="author-avatar" @click="open">
                      <span>
                        <div class="user-picture">
                          <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                            <path d="M224 256c70.7 0 128-57.31 128-128s-57.3-128-128-128C153.3 0 96 57.31 96 128S153.3 256 224 256zM274.7 304H173.3C77.61 304 0 381.6 0 477.3c0 19.14 15.52 34.67 34.66 34.67h378.7C432.5 512 448 496.5 448 477.3C448 381.6 370.4 304 274.7 304z"></path>
                          </svg>
                        </div>

                      </span>
                    </p>
                    
                   
                    
                    

                    <div class="author-name">
                      <div class="author-name-prefix">Author</div>
                      <a style="margin-left: 50px;">{{ $route.query.email }}</a>
                      
                      </div>
                  </div>

                  <header class="card-header">
                   
                    <span class="title" style="margin-left: 100px;">{{ $route.query.title }}</span>
                  </header>
                  <main class="info">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam culpa fugit et nobis ea dignissimo
                      s tempore assumenda mollitia veniam sunt nulla fugiat ipsa quo quae, fuga aut quam earum velit 
                      praesentium exercitationem non unde repudiandae quibusdam. Perferendis, ea asperiores, 
                      nostrum commodi ipsam velit voluptatem blanditiis illum qui odio non autem vero ut dolorum 
                      inventore aspernatur officia corrupti dicta nam, eum porro omnis error debitis saepe! Quaerat,
                       veritatis soluta impedit aut quos magni ducimus inventore asperiores voluptates suscipit aspernatur 
                      
                        
                        
                  </main>
                  

                    <div class="tags">
                    
                    <a href="#"> Buget : {{ $route.query.budget }} Fcfa</a>
                    <a href="#" style="float:  right;">{{ $route.query.date }}</a>
                    </div>

                   
                </div>
                <div >
                                      <div id="comment">
                                        <span > <input class="commentaires"  type="text"  style="" v-model="description" placeholder="">  <input type="submit" @click="send_commentaire" value="envoyer"></span>
                                      </div> 

                                      <p><span id='look_comment' v-if="look" @click="look_comment" style="cursor: pointer; color: blue;">voir les commentaires</span>
                                        
                                          <section v-if="look_comments"  >
                                            <br>
                                            <br><span @click="hide_comment" style="cursor: pointer; color: blue;">masquer  </span><br>
                                            <br>
                                            
                                          </section>
                                      </p> 
                  
                 </div>   
                   
                </div>                         
                    
                  
                    
               
              
            <div class="btn">
                          
                <a href="#"   style="text-decoration: none;"> <p class="btn-postuler" @click="Postuler">  Postuler maintenant</p> </a>  
                  
                <p class="btn-postuler" @click="copyLink" > copier le liens</p>     
                <h3>  {{ randomNumberlike }} personnes ont like  </h3>   
                <h3>  {{ randomNumberpostule }} personnes ont Postuler  </h3>   
            
            </div>
                     
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Crimson+Text&display=swap');
@import url('https://fonts.googleapis.com/css2? family=Dosis&display=swap');


#annonce{
    border-right: 20px;
    transform: scale(0.9);
    display: flex;
    flex-direction:row;
    background-color: rgb(248, 249, 250);
    
    }
    .btn-postuler:hover{
        
    }
    .btn{
        width: 20%;
        margin-top: 80px;
        margin-right: 50px;
        margin-left: 20px;
        text-decoration: none;
  }
    .descriptions{
        border-right: solid rgb(20, 17, 20) 2px;
        width: 80%;
        margin-left:10px;
    }
    .description{
        margin-left: 100px;
    
    }
     
    
    .btn-postuler{
      padding: 6px;
        cursor: pointer;
        height: 40px; 
         width: 230px;
         color: rgb(243, 243, 247);
        background-color: rgb(24, 20, 218);
        border-radius: 7px;
        text-decoration: none;
        font-size: 22px;
    }
    .btn-postuler:active{
      background-color: green;
    }

    
    
    #comment{
    margin-left: 60px;
    display: flex;
    margin-top: 20px;
    
}
input[type="submit"]{
  width: 100px;
  color: whitesmoke;
  background-color: green;
  height: 40px;
  width: 100px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

}
input[type="submit"]:active{
  background-color: whitesmoke;
  color: green;
}
#envoyer{
  font-size: 36px;
  color: blue;
  transform: rotate(45deg);
}
.commentaires{
    width: 300px;
    border: solid rgb(84, 125, 138); 
    height: 50px;
    border-radius: 5px;
    font-size: 24px;
}
    p{
        font-size: 21px;
       
    }
   


.con-like {
  --red: #ee427b;
  position: relative;
  width: 50px;
  height: 50px;
}

.con-like .like {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0;
  z-index: 20;
  cursor: pointer;
}

.con-like .checkmark {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.con-like .outline,
.con-like .filled {
  fill: var(--red);
  position: absolute;
}

.con-like .filled {
  animation: kfr-filled 0.5s;
  display: none;
}

.con-like .celebrate {
  position: absolute;
  animation: kfr-celebrate 0.5s;
  animation-fill-mode: forwards;
  display: none;
}

.con-like .poly {
  stroke: var(--red);
  fill: var(--red);
}

.con-like .like:checked ~ .checkmark .filled {
  display: block
}

.con-like .like:checked ~ .checkmark .celebrate {
  display: block
}

@keyframes kfr-filled {
  0% {
    opacity: 0;
    transform: scale(0);
  }

  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

@keyframes kfr-celebrate {
  0% {
    transform: scale(0);
  }

  50% {
    opacity: 0.8;
  }

  100% {
    transform: scale(1.2);
    opacity: 0;
    display: none;
  }
}

#coeur{
    margin-left: 80%;
}


/* ici les infos */

.card {
  margin-top: 100px;
  display: flex;
  position: relative;
  flex-direction: column;
  height: 600px;
  width: 790px;
  min-width: 250px;
  padding: 1rem;
  border-radius: 16px;
  box-shadow: -1rem 0 3rem #00000067;
  transition: .2s;
  font-family: 'Inter', sans-serif;
  margin-left: 40px;
}

.info{
  font-size: 14px;
  padding: 20px;
  padding-bottom: 80px;
  font-family: 'Dosis', sans-serif;
	margin-top: 40px;
	width: 80%;
	max-height: 80%;
  height: auto;
  min-height: 30%;
	background-color: #5783bd;
	margin-left: 60px;
	border-radius: 4px;
	box-shadow: 4px -4px 0 rgb(204, 201, 201);
}
.info:hover{
	transform: scale(1.01);
	transition: 1.2s all ease;
}

.card-author {
  position: relative;
  display: grid;
  grid-template-columns: 75px 1fr;
  align-items: center;
}

.author-name {
  color: #11040e;
  font-size: 16px;
  font-weight: 500;
}

.author-name-prefix {
  color: #e52e71;
  font-weight: 600;
  margin-left: 80px;
}

.author-avatar span {
  margin-top: -20px;
  cursor: pointer;
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  /* background: #e455b9; */
  margin: 16px 10px;
}

.half-circle {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 48px;
  fill: none;
  stroke: #ff8a00;
  stroke-width: 8;
  stroke-linecap: round;
}

.card-header {
  color: #7a7a8c;
}

.card-header p {
  font-size: 14px;
  margin: 0 0 1rem;
  color: #7a7a8c;
}

.card-header .title {
  font-size: 25px;
  margin: .25rem 0 auto;
  cursor: pointer;
  font-family: 'Arial Black', sans-serif;
}

.card-header .title:hover {
  background: black;
  text-shadow: none;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.tags {
  margin: 1rem 0 2rem;
  padding: .5rem 0 1rem;
  line-height: 2;
  margin-bottom: 0;
}

.tags a {
  font-style: normal;
  font-weight: 700;
  color: #0e0e0f;
  text-transform: uppercase;
  font-size: 16px;
  /* border: 3px solid #28242f; */
  /* border-radius: 2rem; */
  padding: .2rem .85rem .25rem;
  position: relative;
  text-decoration: none;
}

.tags a:hover {
  background: linear-gradient(90deg,#ff8a00,#e52e71);
  text-shadow: none;
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-box-decoration-break: clone;
  box-decoration-break: clone;
  background-clip: text;
  border-color: white;
}
/* pop-up */

.card-client {
  background: #256e9e;
  width: 90%;
  padding-top: 25px;
  padding-bottom: 25px;
  /* text-align: center; */
  margin-left: 20px;
  /* padding-right: 20px; */
  border: 4px solid #7cdacc;
  box-shadow: 0 6px 10px rgba(207, 212, 222, 1);
  border-radius: 10px;
  text-align: center;
  color: #fff;
  font-family: "Poppins", sans-serif;
  transition: all 0.3s ease;
}



.user-picture {
  overflow: hidden;
  object-fit: cover;
  width: 5rem;
  height: 5rem;
  border: 4px solid #7cdacc;
  border-radius: 999px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

.user-picture svg {
  width: 2.5rem;
  fill: currentColor;
}

.name-client {
  margin: 0;
  margin-top: 20px;
  font-weight: 600;
  font-size: 18px;
}

.name-client span {
  display: block;
  font-weight: 200;
  font-size: 16px;
}

.social-media:before {
  content: " ";
  display: block;
  width: 100%;
  height: 2px;
  margin: 20px 0;
  background: #7cdacc;
}

.social-media a {
  position: relative;
  margin-right: 15px;
  text-decoration: none;
  color: inherit;
}

.social-media a:last-child {
  margin-right: 0;
}

.social-media a svg {
  width: 1.1rem;
  fill: currentColor;
}

/*-- Tooltip Social Media --*/
.tooltip-social {
  background: #262626;
  display: block;
  position: absolute;
  bottom: 0;
  left: 50%;
  padding: 0.5rem 0.4rem;
  border-radius: 5px;
  font-size: 0.8rem;
  font-weight: 600;
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -90%);
  transition: all 0.2s ease;
  z-index: 1;
}

</style>