<template>
  <div class="contenu">
    <h3>Données de la vente à modifier </h3>
    <table class="tableau">
        <thead>
            <tr>
                <th>Dates des achats</th>
                <th>Taxes appliquées</th>
                <th>Déductions</th>
                <th>Montants</th>
                <th>Restes</th>
                <th>Identifiants de l'utilisateur</th>
                <th>Identifiants du vendeur</th>
                <th>Identifiants du client</th>

            </tr>
        </thead>
        
        <tbody>
        <tr  v-for="(vente, i) in ventes" :key="i">
          <td>{{vente.date_sell}}</td>
          <td>{{vente.tax}}</td>
          <td>{{vente.discount}}</td>       
          <td>{{vente.rest}}</td>
          <td>{{vente.user_id}}</td>
          <td>{{vente.supplier_id}}</td>
          <td>{{vente.client_id}}</td>
        </tr>
        </tbody>
    </table> 

  <form action="" method="POST">

        <h1>Modification</h1>
          <div class="input-form">					
            <input type="date" placeholder="Entrer la date de vente " v-model="form.date_sell" autocomplete="off" required>
            <span class="error">{{error_champ.date_sell}}</span>
        </div>
        <div class="input-form">    
            <input type="tel" pattern="[0-9+ ]+" placeholder="Entrer la taxe appliquée" v-model="form.tax" autocomplete="off" required>
            <span class="error">{{error_champ.tax}}</span>
        </div>
        <div class="input-form">    
            <input type="tel" pattern="[0-9+ ]+" placeholder="Entrer la remise faite sur le prix" v-model="form.discount" autocomplete="off" required>
            <span class="error">{{error_champ.discount}}</span>
        </div>
        <div class="input-form">    
            <input type="tel" pattern="[0-9+ ]+" placeholder="Entrer le montant" v-model="form.amount" autocomplete="off" required>
            <span class="error">{{error_champ.amount}}</span>
        </div>
        <div class="input-form">    
            <input type="tel" pattern="[0-9+ ]+" placeholder="Entrer le reste" v-model="form.rest" autocomplete="off" required>
            <span class="error">{{error_champ.rest}}</span>
        </div>
        <div class="input-form"> 
            <input type="text" placeholder="Entrer l'identifiant de l'utilisateur'" v-model="form.user_id" autocomplete="off" required>
            <span class="error">{{error_champ.user_id}}</span>
        </div>
        <div class="input-form"> 
            <input type="text" placeholder="Entrer l'identifiant du vendeur" v-model="form.supplier_id" autocomplete="off" required>
            <span class="error">{{error_champ.supplier_id}}</span>
        </div>
        <div class="input-form">    
            <input type="tel" pattern="[0-9+ ]+" placeholder="Entrer la ligne d'achat" v-model="form.client_id" autocomplete="off" required>
            <span class="error">{{error_champ.client_id}}</span>
        </div>
        <div class="submit-form">
            <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer l'achat" name="submit">				          
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
    name: 'ModifierVente',
    components:{
        SideBar
    },
    data () {
      return{
            form: {
              date_sell: '',
              tax: '',
              discount: '',
              amount:'',
              rest:'',
              user_id:'',
              supplier_id:'',
              client_id:'',
  
             
          },
          error_message: "",
          error_champ: [],
      
      }
    },
    mounted() {
        console.log(this.$route.params.id);
        axios
         .get('http://localhost:8000/api/index/vente/'+ this.$route.params.id,)
         .then(response => 
        {console.log(response);
        this.ventes = response.data.data
        }
        )
            
    },
            
    methods: {
        submit(){    
      var that = this;       
     
            axios.put('http://localhost:8000/api/update/vente', this.form)
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