<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name_side">Catégories de produits </h3>
          <Userinfo />
        </nav>
    
    
        <div class="app-main__outer py-5 px-2">
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
            {{error}}
            </div>
             <h4>Informations concernant cette catégorie</h4><hr>
            
            <br>
             <table class="table table-hover">
                <thead>
                  <tr class="table-success">
                        <th>A savoir</th>
                        <th>Catégorie</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nom de la catégorie</td>
                    <td>{{nom}}</td>
                  </tr>
                  <tr>
                    <td>Catégorie apparentée</td>
                    <td>{{parent}}</td>
                  </tr>
                  <tr>
                    <td>Quantité de produits en stock</td>
                    <td>{{stock}}</td>
                  </tr>
                  <tr>
                    <td>Valorisation de la catégorie</td>
                    <td>{{valorisation}}</td>
                  </tr>
                </tbody>
              </table>
                <br><br><br>
              <div class="list_categorie" v-if="total != 0">
                    <h5 class="text-center">Liste des produits de cette catégorie</h5>
                    <table class="table table-hover text-center prod-table">
                        <thead>
                            <tr class="table-primary ">
                                <th>Nom du produit</th>
                                <th>Prix d'achat</th>
                                <th>Prix de vente</th>
                                <th>Quantité en stock</th>
                                <th>Groupe de taxation</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  v-for="(product, i) in products" :key="i" @click="voirProduit(product.id)">
                                <td>{{product.name}}</td>
                                <td>{{product.price_buy}}</td>
                                <td>{{product.price_sell}}</td>
                                <td>{{product.quantity}}</td>
                                <td>{{product.tax_group}}</td>
                            </tr>
                        </tbody>
                    </table>

                    <p class="text-center total"><strong>{{total}} catégorie(s) au total </strong></p><hr class="text-primary">
                    <br><br> 
                    <!-- <form class="d-flex justify-content-end" role="search"><input type="file" id="file" ref="file" @change="handleFileUpload()" /> <button class="btn btn-outline-dark" type="submit" @click.prevent="submitFile()">Importer</button><button class="btn btn-outline-info mx-5" type="submit" @click.prevent="Export()">Exporter</button></form><br><br> -->
                    <nav class="d-flex" aria-label="Page navigation example " v-if="res_data != null ">
                    <ul class="pagination">
                        <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
                        <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
                        
                        <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
                    </ul>
                    <label class="title mx-4">Affichage :</label> 
                    <form action="">
                    <div class="nombre">
                        <!-- -->
                        <select class="form-control" v-model="form.nombre" required @click.prevent="refresh()">
                            <option disabled value>10</option>
                            <option value="25" >25</option>
                            <option value="50">50</option>
                            <option value="10">100</option>
                        </select>
                    </div>
                    </form>
                    </nav>
              </div>

            <voirProduit :id= 'identifiant1' :nom= 'identifiant2' :quantite= 'identifiant3' :vente= 'identifiant4' :achat= 'identifiant5' :min= 'identifiant6' :max= 'identifiant7' :group= 'identifiant8' v-show="showModal" @close-modal="showModal = false"/>

        </div>
    </div>

</template>

<script>
import voirProduit from '../../produits/voir_produit.vue'
import Sidebar from '../../sidebar.vue'
import Userinfo from '../../user_info.vue'
export default {
    layout: "empty",
    auth: true,
    components: {
        Sidebar,
        Userinfo,
        voirProduit
    },
    data () {
        return{
          nom: '',
          parent: '',
          stock: '',
          valorisation: '',
          error: null,
          products: '',
          res_data: '',
          total: '',
          form:{
            nombre: ''
          },
        showModal: false,
        identifiant1 : "",
        identifiant2 : "",
        identifiant3 : "",
        identifiant4 : "",
        identifiant5 : "",
        identifiant6 : "",
        identifiant7 : "",
        identifiant8: '',
        }
    },
    mounted(){
        this.voir() 
        this.refresh()
    },
    
    methods: {
       voir(){
          this.$axios.get('/categories/'+ this.$route.params.identifiant,{
            params: {
              compagnie_id: localStorage.getItem('auth.company_id')
            }
          }).then(response => {
            console.log(response.data.data[0]);
             this.nom = response.data.data[0].name
             this.stock = response.data.data[0].stock_produit
             this.valorisation = response.data.data[0].valorisation
             if(response.data.data[0].parent != null){
                this.identifiant2 = response.data.data[0].parent.name  
             }else{
                this.identifiant2 = "Pas de catégorie parente associée"
             }
             
             })               
        },

        refresh(page=1){
            this.$axios.get('/categories/'+ this.$route.params.identifiant + '/products',{params: {
            compagnie_id: localStorage.getItem('auth.company_id'),
              page: page,
              per_page : this.form.nombre
            }
            }).then(response => {
                console.log(response ) 
                this.products = response.data.data.data
                this.res_data= response.data.data
                this.total = response.data.data.total;
                let firstE = response.data.data.links.shift()
                let lastE = response.data.data.links.splice(-1,1);
            // this.name = response.data.data[0].name,
            // this.parent = response.data.data[0].parent.name,
            // this.stock = response.data.data[0].stock_produit,
            // this.valorisation = response.data.data[0].stock_produit
            // this.created_at = moment(response.data.data[0].created_at).format("YYYY-MM-D")

          }        
        )   
        },

        voirProduit(id){
            this.showModal = true;
            this.$axios.get('products/'+ id,{
            params: {
              compagnie_id: localStorage.getItem('auth.company_id')
            }
          }).then(response => {
            // console.log(response.data.data[0]);
             this.identifiant1 = response.data.data[0].category.name
             this.identifiant2 = response.data.data[0].name
             this.identifiant3 = response.data.data[0].quantity
             this.identifiant4 = response.data.data[0].price_sell      
             this.identifiant5 = response.data.data[0].price_buy
             this.identifiant6 = response.data.data[0].stock_min
             this.identifiant7 = response.data.data[0].stock_max 
             this.identifiant8 = response.data.data[0].tax_group     
            }) 
               
        },
    },
  
}                       

</script>

<style scoped>
.prod-table, .total, nav{
    font-size: 13px;
}



.title{
    margin: 1% 0;
}


.app-main__outer{
  overflow: auto;
}

.fa{
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}
.table{
	margin-top: 2%;

}      

input::placeholder {
    font-size: 15px;
    opacity: 0.5;
}
</style>