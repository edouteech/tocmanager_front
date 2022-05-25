<template>
  <div class="contenu">
    
  <form action="" method="POST">
    <h3>Données du produit à modifier </h3>
    <table class="tableau">
        <thead>
            <tr>
                <th>Identifiant de la catégorie</th>
                <th>Nom du produit</th>
                <th>Quantité ajoutée</th>
                <th>Prix d'achat</th>
                <th>Prix de vente</th>
                <th>Stock minimal</th>
                <th>Stock maximal</th>
                <th>Actions</th>
            </tr>
        </thead>
        
        <tbody>
        <tr  v-for="(produit, i) in produits" :key="i">
          <td>{{produit.category_id}}</td>
          <td>{{produit.name}}</td>
          <td>{{produit.quantity}}</td>
          <td>{{produit.price_sell}}</td>
          <td>{{produit.price_buy}}</td>
          <td>{{produit.stock_min}}</td>
          <td>{{produit.stock_max}}</td>
         </tr>
        </tbody>
    </table> 

        <h1>Modification</h1>
        <div class="input-form">					
            <input type="text" placeholder="Entrer l'id de la catégorie " v-model="form.category_id" autocomplete="off" required>
            <span class="error">{{error_champ.category_id}}</span>
        </div>     
        <div class="input-form">					
            <input type="text" placeholder="Entrer le nom du produit " v-model="form.name" autocomplete="off" required>
            <span class="error">{{error_champ.name}}</span>
        </div> 
        <div class="input-form">        
            <input type="text" placeholder="Entrer la quantité ajoutée" v-model="form.quantity" required>
            <span class="error">{{error_champ.quantity}}</span>
        </div>
       
        <div class="input-form">    
            <input type="email" placeholder="Entrer le prix d'achat" v-model="form.price_sell" autocomplete="off" required>
            <span class="error">{{error_champ.price_sell}}</span>
        </div>
        <div class="input-form"> 
            <input type="text" placeholder="Entrer le prix de vente" v-model="form.price_buy" autocomplete="off" required>
            <span class="error">{{error_champ.price_buy}}</span>
        </div>
        <div class="input-form"> 
            <input type="text" placeholder="Entrer le stock minimal" v-model="form.stock_min" autocomplete="off" required>
            <span class="error">{{error_champ.stock_min}}</span>
        </div>
        <div class="input-form"> 
            <input type="text" placeholder="Entrer le stock maximal" v-model="form.stock_max" autocomplete="off" required>
            <span class="error">{{error_champ.stock_max}}</span>
        </div>
        <div class="submit-form">
            <input type="submit" id='submit' v-on:click.prevent="submit()" value="Ajouter le produit" name="submit">				          
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
    name: 'ModifierProduit',
    components:{
        SideBar
    },
    data () {
      return{
          produit: "",
          produits: [],
          form: {
              category_id: '',
              name: '',
              quantity: '',
              price_sell: '',
              price_buy:'',
              stock_min:'',
              stock_max:'',
          },
          error_message: "",
          error_champ: [],
      }
    },
    mounted() {
        console.log(this.$route.params.id);
        axios
         .get('http://localhost:8000/api/index/product/'+ this.$route.params.id,)
         .then(response => 
        {console.log(response);
        this.produits = response.data.data
        }
        )
            
    },
            
    methods: {
        submit(){    
      var that = this;       
     
            axios.put('http://localhost:8000/api/update/product', this.form)
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