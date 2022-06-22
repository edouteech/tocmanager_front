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
          <h1>Modifier les infos du fournisseur</h1>	
          <div class="input-form">			
              <input type="text" placeholder='Entrer le nom du fournisseur' v-model="form.name" autocomplete="off" required>
              <span class="error">{{error_champ.name}}</span>
          </div>     
          <div class="input-form">        
              <input type="text" placeholder="Entrer le numero de téléphone du fournisseur " v-model="form.phone" required>
              <span class="error">{{error_champ.phone}}</span>
          </div>
        
          <div class="input-form">    
              <input type="email" placeholder="Entrer l'email du fournisseur " v-model="form.email" autocomplete="off" required>
              <span class="error">{{error_champ.email}}</span>
          </div>
          <div class="input-form"> 
              <input type="text" placeholder="Entrer la nature du fournisseur " v-model="form.nature" autocomplete="off" required>
              <span class="error">{{error_champ.nature}}</span>
          </div>
          <div class="submit-form">
              <input type="submit" id='submit' v-on:click.prevent="submit()" value="Modifier les informations" name="submit">				          
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
            fournisseur: "",
            fournisseurs: [],
            form: {
                id: '',
                name: '',
                email: '',
                phone: '',
                nature:''
            },
            error_message: "",
            error_champ: [],
        }
  },
  mounted() {
      this.$axios
        .get('/index/fournisseur/'+ this.$route.params.id)
        .then(response => 
      {console.log(response.data.data )
      // this.fournisseurs = response.data.data
         this.form.name = fournisseur.name,
         this.form.phone = fournisseur.phone,
         this.form.email = fournisseur.email,
         this.form.nature = fournisseur.nature
      }
      )
          
  },

  methods: {
    async logout(){
        this.$auth.logout();
        this.$router.push('/login');
    },

    submit(){          
            this.$axios.put('/update/fournisseur', {
            id: this.$route.params.id,
            name: this.form.name,
            email: this.form.email,
            phone: this.form.phone,
            nature: this.form.nature
            })
            .then(response =>{
                this.$router.push({
                  path:'/fournisseurs/list_fournisseur',})
            })
        
    }
  }
   
}
</script>

<style>

</style>
