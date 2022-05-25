<template>
<div class="contenu">
    <h3>Liste des produits dans le magazin</h3>
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
            <router-link :to="'/modifierproduit/'+produit.id"><button>Modifier</button></router-link>
            <button @click="deleteProduit(Produit.id)">Supprimer</button>
          </td>
        </tr>
        </tbody>

    </table>
  <SideBar/> 
</div>

</template>

<script>
import axios from "axios";
import bootstrap from 'bootstrap'
bootstrap
import SideBar from './sidebar.vue'
export default {
  name: 'ListProduit',
  components: {
    SideBar,
    
  },
   data () {
    return {
      produits: [],
      produit: "",
    }
  },
  methods: {

    deleteProduit(id){
      console.log(id);
       axios
      .delete('http://localhost:8000/api/delete/product/' +id)
      .then(response => 
        {console.log(response);
        this.client = response.data.data
        }
        )
    }
  },
  mounted () {
    axios
    .get('http://localhost:8000/api/index/product')
    .then(response => 
        {console.log(response);
        this.produits = response.data.data
        }
        )
  }
}
</script>

<style lang="scss" >
.contenu{

  position:absolute;
  height: 100%;
  width: calc(100% - 280px);
  left: 280px;

  .text{
      font-size: 25px;
      font-weight: 500;
      color: #11101d;
      margin: 12px;
  }
  .tableau{
	border-collapse: collapse;
	min-width: 800px;
	width: auto;
	box-shadow: 0 5px 50px rgba(122, 115, 115, 0.918);
	border: 2px solid #ddd;
	text-align: center;
	margin-top: 1%;
	font-size: 18px;
       
    thead tr{
        background-color: rgb(140, 140, 250);
    }
    th, td{
        padding: 15px 20px;
    }
    tbody, tr, td, th{
        border: 1px solid #ddd
    }

    tbody tr:nth-child(even){
        background-color: rgb(233, 233, 255);
    }

    tbody tr:last-of-type{
        border-bottom: 2px solid rgb(140, 140, 250);
    }
}
}

</style>
