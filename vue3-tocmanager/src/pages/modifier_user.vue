<template>
  <div class="contenu">
    <h3>Données de l'utilisateur à modifier </h3>
    <table class="tableau">
        <thead>
            <tr>
                <th>Noms</th>
                <th>Emails</th>
                <th>Numéros de téléphone</th>
                <th>Addresses</th>
                <th>Villes</th>
                <th>Pays</th>
                <th>Etats</th>
            </tr>
        </thead>
        
        <tbody>
        <tr  v-for="(utilisateur, i) in utilisateurs" :key="i">
          <td>{{utilisateur.name}}</td>
          <td>{{utilisateur.email}}</td>
          <td>{{utilisateur.phone}}</td>       
          <td>{{utilisateur.address}}</td>
          <td>{{utilisateur.city}}</td>
          <td>{{utilisateur.country}}</td>
          <td>{{utilisateur.state}}</td>
        </tr>
        </tbody>
    </table> 

  <form action="" method="POST">

        <h1>Modification</h1>
        <div class="input-form">					
            <input type="text" placeholder="Entrer le nom " v-model="form.name" autocomplete="off" required>
            <span class="error">{{error_champ.name}}</span>
        </div>
        <div class="input-form">    
            <input type="email" placeholder="Entrer l'email " v-model="form.email" autocomplete="off" required>
            <span class="error">{{error_champ.email}}</span>
        </div>
        <div class="input-form">       
            <input type="password" placeholder="Entrer un mot de passe" v-model="form.password" required>
            <span class="error">{{error_champ.password}}</span>
        </div>
       
        <div class="input-form">    
            <input type="tel" placeholder="Entrer le numéro de téléphone" v-model="form.phone" autocomplete="off" required>
            <span class="error">{{error_champ.phone}}</span>
        </div>
        <div class="input-form"> 
            <input type="text" placeholder="Entrer l'addresse'" v-model="form.address" autocomplete="off" required>
            <span class="error">{{error_champ.address}}</span>
        </div>
        <div class="input-form"> 
            <input type="text" placeholder="Entrer la ville" v-model="form.city" autocomplete="off" required>
            <span class="error">{{error_champ.city}}</span>
        </div>
        <div class="input-form"> 
            <input type="text" placeholder="Entrer le pays" v-model="form.country" autocomplete="off" required>
            <span class="error">{{error_champ.country}}</span>
        </div>
        <div class="input-form">    
            <input type="tel" pattern="[0-9+ ]+" placeholder="Entrer l'état" v-model="form.state" autocomplete="off" required>
            <span class="error">{{error_champ.state}}</span>
        </div>
        <div class="submit-form">
            <input type="submit" id='submit' v-on:click.prevent="submit()" value="Ajouter l'utilisateur" name="submit">				          
        </div>

    </form>

    
    <SideBar/>
</div>

</template>

<script>
import axios from "axios";
import bootstrap from 'bootstrap'
bootstrap
import SideBar from './sidebar.vue'


export default {
    name: 'ModifierUtilisateur',
    components:{
        SideBar
    },
    data () {
      return{
          utilisateur: "",
          utilisateurs: [],
          form: {
              name: '',
              email: '',
              password: '',
              phone:'',
              address:'',
              city:'',
              country:'',
              state:'',
          },
          error_message: "",
          error_champ: [],
      }
    },
    mounted() {
        console.log(this.$route.params.id);
        axios
         .get('http://localhost:8000/api/index/profil/'+ this.$route.params.id,)
         .then(response => 
        {console.log(response);
        this.utilisateurs = response.data.data
        }
        )
            
    },
            
    methods: {
        submit(){    
      var that = this;       
     
            axios.put('http://localhost:8000/api/update/profil', this.form)
            .then(function(response){
                 
                console.log(response.data)
                if (response.data.status == "error") {
                    that.error_message = response.data.message
                    that.error_champ  = response.data.data

                } 
            })
        
        }
    },
  
}


</script>

<style>

</style>