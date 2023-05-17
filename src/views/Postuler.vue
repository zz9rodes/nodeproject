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
        ev.preventDefault()
        axios.post('http://localhost:3001/commentaire',{
            id_annonce:Id,
            description:description.value,
        },{withCredentials:true}
        ) .then(response=>{console.log(response) 
            alert(response.data.message)}, (err) => console.log(err.response)) 
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
        axios.get('http://localhost:3001/List_commentaire',{withCredentials:true})
            .then(response=>{
            console.log(response)
          commentaires.value=response.data.message
         
        } , 
        (err) => {
            if (err.response && err.response.data) {

            console.log(err.response.data)
            // alert("vous devez vous connecter")
            // this.$router.push('/connexion')
            } else {

            console.log(err)
            
            }
        }) 
        console.log(commentaires.value);
        

    }
    list_commentaires()
   
    
        return{
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
                <div class="photo" > </div> 
                <div id="coeur">
                    <div class="con-like">
                    <input title="like" type="checkbox" class="like">
                    <div class="checkmark">
                        <svg viewBox="0 0 24 24" class="outline" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                        </svg>
                        <svg viewBox="0 0 24 24" class="filled" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                        </svg>
                        <svg class="celebrate" width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="10,10 20,20" class="poly"></polygon>
                        <polygon points="10,50 20,50" class="poly"></polygon>
                        <polygon points="20,80 30,70" class="poly"></polygon>
                        <polygon points="90,10 80,20" class="poly"></polygon>
                        <polygon points="90,50 80,50" class="poly"></polygon>
                        <polygon points="80,80 70,70" class="poly"></polygon>
                        </svg>
                    </div>
                    </div>
                </div>
                <div class="rows" id="titre"> 
                    
                  <div class="imp padd"><p  > <span >Titre</span> : <h3>{{ $route.query.title }}</h3> </p>  </div>    
                    
                </div>
                <div class="description">
                    <div class="pair padd" >
                         <p > <span>Description</span> : <h3>{{$route.query.description}}</h3></p>
                     
                    </div>
                </div>
                    
                    <div id="domaine">
                       <p class="imp padd"> <span>Domaine </span> :<h3>{{ $route.query.domaine }}</h3> </p>  
                    </div>
                    
                    <div >
                        <p id="budget" style="opacity: 1;" class="pair padd">  <h3><span style="font-size:18px ;"> Remuneration :</span> {{$route.query.budget}} Fcfa</h3> </p>
                        <p id="date" class="imp padd">  a ete envoyer le : <h3>{{$route.query.date}}</h3>  </p>
                        <div id="comment">
                          <span > <input id="commentaire"  type="text"  style="" v-model="description">  <input type="submit" @click="send_commentaire" value="envoyer"></span>
                        </div> 

                        <p><span id='look_comment' v-if="look" @click="look_comment" style="cursor: pointer; color: blue;">voir les commentaires</span>
                          
                            <section v-if="look_comments"  >
                              <br>
                              <br><span @click="hide_comment" style="cursor: pointer; color: blue;">masquer  </span><br>
                              <br>
                               <div class="list_comment" v-for="commentaire in commentaires"> 


                               </div>
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
#domaine{
    margin-bottom: 20px;
    margin-left: 100px;
}
#titre{
    margin-left: 100px;
}
#budget,#date{
    margin-left: 100px;
    font-size: 20px;
    
}

#annonce{
    border-right: 20px;
    transform: scale(0.9);
    border-bottom-right-radius: none;
    display: flex;
    flex-direction:row;
    border-radius: 18px;
    background-color: rgb(248, 249, 250);
    border-bottom: solid black;
    width: 100%;
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
    .imp{
            background-color: rgb(231, 236, 240);
            min-height: 140px;
            border-radius: 4px;
        }    
    .pair{
            background-color: rgb(210, 226, 240);
            min-height: 140px;
            border-radius: 4px;
    }
    .padd{
            padding: -50px;
    }
    .btn-postuler{
        cursor: pointer;
        height: 40px; 
         width: 200px;
         color: rgb(243, 243, 247);
        background-color: rgb(24, 20, 218);
        border-radius: 7px;
        text-decoration: none;
        font-size: 22px;
    }
    .btn-postuler:active{
      background-color: green;
    }

    .photo{
        color: rgb(18, 61, 99);
        width: 80px;
        height: 80px;
        border-radius: 50%;
        background-color: rgb(104, 6, 88);
        margin-top: 10px;
        margin-left: 20px;
    }
    #comment{
    /* background-color: #9EC8DE; */
    margin-left: 180px;
    display: flex;
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
#commentaire{
    width: 300px;
    /* margin-left:180px; */
    height: 50px;
    font-size: 24px;
}
    p{
        font-size: 21px;
       
    }
    span{
        font-size:23px;
        color: black;
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

</style>