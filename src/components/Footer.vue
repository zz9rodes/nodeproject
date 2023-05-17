<template>
  <div id="footer">
    <footer>
            <form>
                <input type="email" value="rodes@example.com">
            </form>
       
        <section class="div">
            <div id="pre">
                <p><a><u>Qui sommes nous ?</u></a></p>
                <p><a>Facebook <i class="fa fa-facebook-square" aria-hidden="true"></i></a></p>
                <p><a>Twiter <i class="fa fa-twitter-square" aria-hidden="true"></i></a></p>
                <p><a>Youtube <i class="fa fa-youtube-play" aria-hidden="true"></i></a></p>
                <P><a>Instagram <i class="fa fa-instagram" aria-hidden="true"></i> </a></p>
            </div>

            <div id="deux">
                <p><a><u>Condition d'utilisation</u></a></p>
                <p><a>aide et support</a></p>
                <p><a>accompagnez nous ☺</a></p>
            </div>
            <div id="trois">
            </div>
        </section>
            <hr>
            <p>Author: Rodes Nzie<br>
                <a href="mailto:rodesNzie@gmail.com">email</a>
             </p>
    </footer>
  </div>    
</template>


<style scoped>
#footer{
    /* margin-top: 100%; */
}
a{
text-decoration:none;
}
section{
display:flex;

}
#pre,#deux{
	/* position:relative; */
    left:50px;
    border:none;

}
#deux{
	margin-left:80px;
}

footer { 
  border-radius:7px;
  text-align: center;
  padding: 3px;
  background-color: #070708;
  color: white;
}
</style>