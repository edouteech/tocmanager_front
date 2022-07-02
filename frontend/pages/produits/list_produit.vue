<template>
<div class="contain">
     <SideBar/>

 
  <div class="zone">
        <div class="titre">
            Produits
        </div>
        <h3>Liste des produits dans le magazin</h3>
       <NuxtLink class="custom-btn btn-10" to="/produits/add_produit">Ajouter nouveau produit</NuxtLink>
        
        <table class="tableau">
            <thead>
                <tr>
                    <th>Id de la catégorie</th>
                    <th>Nom</th>
                    <th>Quantité</th>
                    <th>Prix de vente</th>
                    <th>Prix d'achat</th>
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
                  <NuxtLink :to="'/edit_produit/'+produit.id"><i class='bx bxs-edit' alt="modifier"></i></NuxtLink>
                  <button @click="deleteProduit(produit.id)"><i class='bx bxs-x-circle text-red-600' ></i></button>
                </td>
              </tr>
            </tbody>

        </table>
    
    </div>

</div>

</template>

<script>
import SideBar from '../nav.vue'
export default {
  auth: true,
  components: {
    SideBar,  
  },

  data () {
    return {
      produits: [],
      produit: "",
      compagnie_id: ""
    }
  },

  mounted () {
      this.refresh()
  },

  methods: {
        deleteProduit(id){
          console.log(id);
          this.$axios.delete('/delete/product/' +id)
          .then(response => 
            {
              console.log(response.data.data);
              this.refresh()
            }
          )         
        },

        refresh(){
          this.$axios.post('/index/product',{
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          })     
          .then(response => 
            {
              console.log(response);
              this.produits = response.data.data.data
            }
          )
        }

    },
   
}
</script>

<style scoped>
.zone p{
    font-size: 18px;
}

.bx{
  margin: 0 10px;
  font-size: 25px;
}

/* .ajout{
  border: 1px solid;
  border-radius: 15px;
  background-color: rgb(233, 250, 215);
  padding: 10px;
  margin-left: 80%;
}

.ajout:hover{
  background-color: green;
  color: #fff;
  
} */
.tableau{
	border-collapse: collapse;
	min-width: 800px;
	width: auto;
	box-shadow: 0 5px 50px transparent;
	border: 2px solid transparent;
	text-align: center;
	margin-top: 1%;
	font-size: 18px;
}      
thead tr{
    background-color: transparent;
}
th, td{
    padding: 15px 20px;
    border: 1px solid #ddd
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

</style>
