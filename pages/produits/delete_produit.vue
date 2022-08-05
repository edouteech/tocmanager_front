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
</div><br>
        <nav aria-label="Page navigation example " v-if="res_data != null">
          <ul class="pagination">
            <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
            <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
            
            <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
          </ul>
        </nav>
            <!-- <pre> {{res_data}}</pre> --><br><br> 
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
            links: [],
            res_data: null,
            showModal: false,
            produit: "",
            identifiant : "0",
            produits: [],
        }
    },   

    mounted () {
         this.$axios.get('/get/product',{params: {
            // compagnie_id: this.$auth.$storage.getUniversal('company_id'),
            page: page
          }})                
        .then(response => {console.log(response.data.data);
            this.produits = response.data.data
            this.res_data= response.data.data })        
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
  overflow: auto;
}
.action{
    display: flex;
    margin: 0 15%;
}
.table{
	margin-top: 5%;
  text-align: center;
}   
tbody tr:last-of-type{
    border-bottom: 2px solid rgb(241, 20, 20);
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