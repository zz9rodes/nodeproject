<script>
     import axios from 'axios'
     import { ref } from 'vue';
     import { useRoute } from 'vue-router'

     export default{
	setup(){
        const route = useRoute()
    var email_recepteur=route.query.email;
    // var propositions=ref([]);
    var Messages=ref([])
    var message=ref('')
    
	const  sendMessage =(ev)=>{
                ev.preventDefault()
                axios.post('http://localhost:3001/sendMessage',{
                   message:message.value,
                   email_recepteur:email_recepteur
                }, {withCredentials:true})
        .then(response=>{console.log(response) 
        },
        (err)=>
        {
            if (err.response && err.response.data) 
            {
                // console.log(err.response.data)
                // alert("vous devez vous connecter")
            }
            else {
                console.log(err)
            }
        }) 
        console.log(propositions.value);


    }   
    const  list_Message=()=>{
                axios.get('http://localhost:3001/list_Message', {withCredentials:true})
        .then(response=>{console.log(response) 
            Messages.value=response.data.message},
        (err)=>
        {
            if (err.response && err.response.data) 
            {
                // console.log(err.response.data)
                // alert("vous devez vous connecter")
            }
            else {
                console.log(err)
            }
        }) 
        // console.log(Messages.value);

    }   
    list_Message()
   
	
	return{
        Messages,
        message,
        sendMessage,
        propositions,
      
    }
}
		
	}
</script>

<template>
    <div>
        <section>
            <h3>Message</h3>

        </section>
        <form action="" @submit="sendMessage">
            <input type="text" v-model="message">
            <input type="submit">
        </form>
    </div>
</template>

<style scoped>



</style>