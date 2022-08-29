<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Produits </h3>
    </nav>

    <div class="contenu">
      <h4>Liste des produits dans le magazin</h4>
      <NuxtLink  to="/produits/add_produit"><button class="custom-btn btn-3"><span>Ajouter nouveau produit</span></button></NuxtLink>
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
                    
                    <th>Nom</th>
                    <th>Nom de la catégorie</th>
                    <th>Quantité en stock</th>
                    <th>Quantité réelle</th>
                    <th>Prix de vente</th>
                    <th>Prix d'achat</th>
                    <!-- <th>Stock minimal</th>
                    <th>Stock maximal</th> -->
                    <th>Valorisation du produit</th>
                    <th>Actions</th>
                </tr>
            </thead>
          
            <tbody>
              <tr  v-for="(produit, i) in produits" :key="i">
                
                <td>{{produit.name}}</td>
                <td>{{produit.category.name}}</td>
                <td>{{produit.quantity}}</td>
                <td class="controler"><div class="replace"><input type="number" class="form-control w-75" placeholder="---" v-model="quantity0" autocomplete="off" required><img src="/images/ok.png" alt="logo" srcset="" @click="replaceQuantity(produit.id)"></div></td>
                <td>{{produit.price_sell}}</td>
                <td>{{produit.price_buy}}</td>
                <!-- <td>{{produit.stock_min}}</td>
                <td>{{produit.stock_max}}</td> -->
                <td>{{produit.quantity * produit.price_sell}}</td>
                <td><div class="action">
                  <div @click="voirProduit(produit.id)"><i class="fa fa-info-circle" aria-hidden="true"></i></div>
                  <NuxtLink :to="'/produits/'+produit.id"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                  <div @click="deleteProduit(produit.id)"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                  </div>
                </td>
              </tr>
            </tbody>
        </table>
   <br><br>
        <nav aria-label="Page navigation example " v-if="res_data != null">
          <ul class="pagination">
            <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
            <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
            
            <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
          </ul>
        </nav>
  </div>          <!-- <pre> {{res_data}}</pre> --><br><br> 
<voirProduit :id= 'identifiant1' :nom= 'identifiant2' :quantite= 'identifiant3' :vente= 'identifiant4' :achat= 'identifiant5' :min= 'identifiant6' :max= 'identifiant7' v-show="showModal" @close-modal="showModal = false"/>
</div>

</template>

<script>
import voirProduit from './voir_produit.vue'
import Sidebar from '../sidebar.vue'
export default {
  layout: "empty",
  auth: true,
  components: {
    Sidebar,  
    voirProduit
  },

  data () {
    return {
      links: [],
      res_data: null,
      showModal: false,
      identifiant1 : "",
      identifiant2 : "",
      identifiant3 : "",
      identifiant4 : "",
      identifiant5 : "",
      identifiant6 : "",
      identifiant7 : "",
      produits: [],
      produit: "",
      compagnie_id: "",
      category_id0:'',
      name0: '',
      quantity0: '',
      price_sell0: '',      
      price_buy0: '',
      stock_min0: '',
      stock_max0: ''

    }
  },

  mounted () {
      this.refresh()
  },

  methods: {
        deleteProduit(id){
          console.log(id);
          this.$axios.delete('/products/' +id)
          .then(response => 
            {
              console.log(response.data.data);
              this.refresh()
            }
          )         
        },

        refresh(page=1){
          this.$axios.get('/products',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id'),
            page: page
          }
          })
          .then(response => 
            {
              console.log(response.data.data.data);
              this.produits = response.data.data.data
              this.res_data= response.data.data
              let firstE = response.data.data.links.shift()
              let lastE = response.data.data.links.splice(-1,1);
            }
          )
        },
        voirProduit(id){
            this.showModal = true;
            this.$axios.get('products/'+ id).then(response => {console.log(response.data.data[0]);
             this.identifiant1 = response.data.data[0].category.name
             this.identifiant2 = response.data.data[0].name
             this.identifiant3 = response.data.data[0].quantity
             this.identifiant4 = response.data.data[0].price_sell      
             this.identifiant5 = response.data.data[0].price_buy
             this.identifiant6 = response.data.data[0].stock_min
             this.identifiant7 = response.data.data[0].stock_max      
            }) 
               
        },

        replaceQuantity(id){   
          this.$axios
                .get('/products/'+id)
                .then(response => 
                {console.log(response.data.data[0] )
                let produit = response.data.data[0];
                // this.produits = response.data.data        
                  this.category_id0 = produit.category_id;
                  this.name0 = produit.name;
                  this.quantity = produit.quantity;
                  this.price_sell0 = produit.price_sell;
                  this.price_buy0 = produit.price_buy;
                  this.stock_min0 = produit.stock_min;
                  this.stock_max0 = produit.stock_max
                }
                )     
            this.$axios.put('products/' +id,{
                id: this.produit.id,
                category_id: this.category_id0 ,
                name: this.name0,
                quantity: this.quantity0,
                price_sell: this.price_sell0,
                price_buy: this.price_buy0,
                stock_min: this.stock_min0,
                stock_max: this.stock_max0,
                compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }).then(response =>{console.log(response)
            this.refresh()
            this.quantity0 = ''
            })                     
        }

    },
   
}
</script>

<style scoped>
.contenu{
  margin: 5%;
  overflow: auto;
}
.fa{
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}
.table{
	margin-top: 5%;
  text-align: center;
}          

.replace{
  display: flex;
}

.replace img{
  width: 20%;
  cursor: pointer;
}

.controler{
  width: 15%;
}
.replace input{
  margin-left: 10%;
}
/* .replace_button{
  width: 20%;
} */

thead tr{
    background-color: transparent;
}


tbody tr:last-of-type{
    border-bottom: 2px solid rgb(140, 140, 250);
}
.action{
   display: flex;
}

.custom-btn {
  width: 180px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
}
.btn-3 {
  background: rgb(0,172,238);
background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
  width: 180px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;
  
}
.btn-3 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-3:before,
.btn-3:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
   background: rgba(2,126,251,1);
  transition: all 0.3s ease;
}
.btn-3:before {
  height: 0%;
  width: 2px;
}
.btn-3:after {
  width: 0%;
  height: 2px;
}
.btn-3:hover{
   background: transparent;
  box-shadow: none;
}
.btn-3:hover:before {
  height: 100%;
}
.btn-3:hover:after {
  width: 100%;
}
.btn-3 span:hover{
   color: rgba(2,126,251,1);
}
.btn-3 span:before,
.btn-3 span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
   background: rgba(2,126,251,1);
  transition: all 0.3s ease;
}
.btn-3 span:before {
  width: 2px;
  height: 0%;
}
.btn-3 span:after {
  width: 0%;
  height: 2px;
}
.btn-3 span:hover:before {
  height: 100%;
}
.btn-3 span:hover:after {
  width: 100%;
}
</style>
