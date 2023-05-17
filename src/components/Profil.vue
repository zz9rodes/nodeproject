
<script>
// import { send } from 'express/lib/response';
    import axios from 'axios'
    import {ref} from "vue"
    export default{
     setup(){
            const modifier=()=>{
            var profilPic=document.getElementById('photo');
            var input =document.getElementById('update');
            profilPic.src=URL.createObjectURL(input.files[0]);
           
                }
           
             const send=(ev)=>{
                ev.preventDefault()
                axios.post('http://localhost:3001/profil',
            {
            titre:this.titre ,
           })
            .then(response=>{
			console.log(response)
			eror.value=response.data.statut;
            }, 
	            (err) => console.log(err.response.data)) 

            }    

        return {
            modifier,
            send,
         }                  

            }
          
    }
</script>

<template>
    <div>
        <section id="profil">
        <h1>mon profil</h1>
        <img src="../assets/R.jpg" id="photo" alt=""><br>
        <label for="update" ></label> 
        <form @submit="send">
            <span>
                <input type="file" name="photo" id="update" accept="image/jpg ,image/png,image./peg" >
            </span>
            <button @click="modifier" style="margin-left:100px ;margin-bottom: 50px;">modifier</button>
        </form>
        
        <p>@Speudo</p>
        <hr>
           
               
              
              
               
         
        </section>
    </div>
</template>

<style scoped>
#photo{
    margin-left: 20%;
    border-radius: 50%;
    width: 40%;
}
label{
    font-size: 200%;
    display: block;
    width: 20px;
    height: 40px;
    border-radius: 4px;
    margin-left: 140px;
}
#profil{
    width: 100%;
    height: 1000px;
    background-color: rgb(250, 248, 249);
    border-radius: 17px;
   
}

</style>