<template>
<div class="contenu">
    <h3>Liste des produits supprimés</h3>
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
          <td>
            <button  @click="supProduit(produit.id)">Supprimer définitivement</button>
            <button @click="restaurerProduit(produit.id)">Restaurer ce client</button>
          </td>
        </tr>
        </tbody>

    </table>

    <SideBar/>
</div>

</template>

<script>
import axios from "axios";
import bootstrap from "bootstrap"
bootstrap
import SideBar from './sidebar.vue'
export default {
  name: 'CorbeilleProduit',
  components: {
    SideBar,
    
  },
    data () {
    return {
    produit: "",
    produits: [],
    }
    },   
 methods: {
    supProduit(id){
      console.log(id);
       axios
      .delete('http://localhost:8000/destroy/product/' +id)
      .then(response => 
        {console.log(response);
        this.produit = response.data.data
        }
        )
    },
    restaurerClient(id){
      console.log(id);
       axios
      .get('http://localhost:8000/restore/product' +id)
      .then(response => 
        {console.log(response);
        this.produit = response.data.data
        }
        )
    }
  },
  mounted () {
    axios
      .get('http://localhost:8000/api/get/product')
    //   .then(response => (this.clients = response.data.data))
      .then(response => 
        {console.log(response);
        this.produits = response.data.data
        }
        )
  }
}

  

</script>

<style lang="scss">

</style>