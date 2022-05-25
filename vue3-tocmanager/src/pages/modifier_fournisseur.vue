<template>
  <div class="contenu">
    
  <form action="" method="POST">
    <h3>Données du fournisseur à modifier </h3>
    <table class="tableau">
        <thead>
            <tr>
                <th>N°</th>
                <th>Nom</th>
                <th>Numéro de téléphone</th>
                <th>Email</th>
                <th>Nature</th>
            </tr>
        </thead>
        
        <tbody>
        <tr  v-for="(fournisseur, a) in fournisseurs" :key="a">
          <td>{{fournisseur.id}}</td>
          <td>{{fournisseur.name}}</td>
          <td>{{fournisseur.phone}}</td>
          <td>{{fournisseur.email}}</td>
          <td>{{fournisseur.nature}}</td>
        </tr>
        </tbody>
    </table> 

        <h1>Modification</h1>
  
        <div class="input-form">						
            <input type="text" placeholder="id" v-model="form.id" autocomplete="off" required>
            <span class="error">{{error_champ.id}}</span>
        </div> 	
         <div class="input-form">			
            <input type="text" placeholder='Entrer le nom du client' v-model="form.name" autocomplete="off" required>
            <span class="error">{{error_champ.name}}</span>
        </div>     
        <div class="input-form">        
            <input type="text" placeholder="Entrer le numero de téléphone du client " v-model="form.phone" required>
            <span class="error">{{error_champ.phone}}</span>
        </div>
       
        <div class="input-form">    
            <input type="email" placeholder="Entrer l'email du client " v-model="form.email" autocomplete="off" required>
            <span class="error">{{error_champ.email}}</span>
        </div>
        <div class="input-form"> 
            <input type="text" placeholder="Entrer la nature du client " v-model="form.nature" autocomplete="off" required>
            <span class="error">{{error_champ.nature}}</span>
        </div>
        <div class="submit-form">
            <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer le fournisseur" name="submit">				          
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
    name: 'ModifierFournisseur',
    components:{
        SideBar
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
        console.log(this.$route.params.id);
        axios
         .get('http://localhost:8000/api/index/fournisseur/'+ this.$route.params.id,)
         .then(response => 
        {console.log(response);
        this.fournisseurs = response.data.data
        }
        )
            
    },
            
    methods: {
        submit(){    
      var that = this;       
     
            axios.put('http://localhost:8000/api/update/fournisseur', this.form)
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