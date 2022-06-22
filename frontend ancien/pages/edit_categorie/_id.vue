<template>
<div class="general">
        <div class="haut">
            <div class="user">
             <img src="../images/user.png" alt="logo" srcset="">
             <span class="user_name">{{$auth.user.name}}</span> 
             <button type="button" class="bg-red-700 text-white rounded p-3 ml-8" @click="logout">Déconnexion</button>    
            </div>
        </div>

    <div class="espace">
             
  <form action="" method="POST">

        <h1>Modifier les infos de la catégorie</h1>	
         <div class="input-form">			
            <input type="text" placeholder='Entrer le nom de la categorie' v-model="form.name" autocomplete="off" required>
            <span class="error">{{error_champ.name}}</span>
        </div>     
        <div class="submit-form">
            <input type="submit" id='submit' v-on:click.prevent="submit()" value="Modifier la categorie" name="submit">				          
        </div>

    </form>
  
    </div>
  <SideBar/> 
</div>

</template>

<script>
import SideBar from '../nav.vue'
export default {
    components: {
      SideBar,  
    },

    data () {
        return{
            categorie: "",
            categories: [],
            form: {
                id: '',
                name: '',             
            },
            error_message: "",
            error_champ: [],
        }
    },

    mounted() {
        this.$axios
          .get('/index/categorie/'+ this.$route.params.id)
          .then(response => 
        {console.log(response.data.data[0] )
        let categorie = response.data.data[0];
        // this.categories = response.data.data
         this.form.name = categorie.name    
        }
        )
            
    },

    methods: {
      async logout(){
          this.$auth.logout();
          this.$router.push('/login');
      },


      submit(){          
              this.$axios.put('/update/categorie', {
              id: this.$route.params.id,
              name: this.form.name,
             
              })
              .then(response =>{
                  this.$router.push({
                    path:'/categorie/list_categorie',})
              })
          
      }
    }

    
}
</script>

<style>

</style>
