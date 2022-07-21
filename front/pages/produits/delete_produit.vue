<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Produits </h3>
    </nav>

    <div class="contenu">
      <h4>Produits supprimés</h4>
       <table class="table table-hover">
          <thead>
            <tr class="table-success">
                        <th >
                            Catégories
                        </th>
                        <th >
                            Noms 
                        </th>
                        <th >
                            Quantités
                        </th>
                        <th>
                            Prix de vente
                        </th>
                        <th>
                            Prix d'achat
                        </th>
                        <th>
                            Stock minimal
                        </th>
                        <th>
                            Stock maximal
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr  v-for="(produit, i) in produits" :key="i"
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td class="w-4 p-4">
                            <div class="flex items-center">
                                <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                            </div>
                        </td>

                        <td>{{produit.category_id}}</td>
                        <td>{{produit.name}}</td>
                        <td>{{produit.quantity}}</td>
                        <td>{{produit.price_sell}}</td>
                        <td>{{produit.price_buy}}</td>
                        <td>{{produit.stock_min}}</td>
                        <td>{{produit.stock_max}}</td>                           
                        <td><div class="action">
                            <div class="sup" @click="supProduit(produit.id)">Supprimer définitivement</div>
                            <div class="restore" @click="restaurerProduit(produit.id)">Restaurer ce produit</div></div>
                        </td>
                    </tr>
                    
                </tbody>
            </table>

    </div>
<deleteModal :infos= 'identifiant' v-show="showModal" @close-modal="showModal = false"/>


</div>
</template>


<script>
import deleteModal from './modal_delete.vue'
import Sidebar from '../sidebar.vue'
export default {
    layout: "empty",
    components: {
        Sidebar,   
        deleteModal, 
    },

    data () {
        return {
            showModal: false,
            produit: "",
            identifiant : "0",
            produits: [],
        }
    },   

    mounted () {
         this.$axios.get('/get/product')        
        .then(response => {console.log(response.data.data);
            this.produits = response.data.data })        
    },

    methods: {
        restaurerProduit(id){
            console.log(id);
            this.$axios.get('/restore/product/' +id)         
            .then(response => {console.log(response);
                this.produit = response.data.data
                this.$router.push({path:'/produits/list_produit',})
                })         
        },

        supProduit(id){
             console.log(id); 
            this.showModal = true;
            this.identifiant= id;               
        },
    },
  
}
</script>

<style scoped>
.contenu{
  margin: 5%;

}
.action{
    display: flex;
}
.sup{
    border: 1px solid black;
    border-radius: 15px;
    padding: 5px;
    margin: 15px;
    cursor: pointer;
    
}

.sup:hover{
    color: #fff;
    background-color: red;
}

.restore{
    cursor: pointer;
    border: 1px solid black;
    border-radius: 15px;
    margin: 15px;
    padding: 5px;
}

.restore:hover{
    color: #fff;
    background-color: green;
}

.w-full{
    text-align: center;
}

</style>