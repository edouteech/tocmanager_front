<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Produits </h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer p-5">
      <h4>Liste des produits dans le magazin</h4><br>
      <div class="d-flex">
          <div class="col-md-10">
            <form class="d-flex col-md-7" role="search">
              <input class="form-control me-2" type="search" placeholder="recherche..." v-model="element_search" @input="search()" aria-label="Search" >
              <button class="btn btn-outline-success btn_recherche" type="submit" @click.prevent="search()"><i class="fa fa-search" aria-hidden="true"></i></button>
            </form>
          </div>
          <NuxtLink  to="/produits/add_produit" v-for="(user, i) in users" :key="i" class="web-btn"><button class="custom-btn btn-3" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1"><span>Ajouter nouveau produit</span></button></NuxtLink>
      </div>

      <div class="mobile-btn my-4">
          <NuxtLink  to="/produits/add_produit" v-for="(user, i) in users" :key="i"><button class="custom-btn btn-3" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1"><span>Ajouter nouveau produit</span></button></NuxtLink>
        
      </div>

      <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
        {{error}} 
      </div>
      
      <div class="table-responsive search_result" v-if="this.element_search != ''" >
        <!-- <div >{{result.name}}</div> -->
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
           <tr  v-for="(result, j) in results" :key="j">
              <td>{{result.name}}</td>
              <td>{{result.category.name}}</td>
              <td>{{result.quantity}}</td>
              <td class="controler"><div class="replace"><input :id="'real_quantity_'+produit.id" type="number" class="form-control w-75" placeholder="------" autocomplete="off" required><i class="fa fa-check-circle text-primary" aria-hidden="true" @click="replaceQuantity(produit.id)"></i></div></td>
                <td>{{result.price_sell}}</td>
                <td>{{result.price_buy}}</td>
                <!-- <td>{{result.stock_min}}</td>
                <td>{{result.stock_max}}</td> -->
                <td>{{result.quantity * result.price_sell}}</td>
                <td>
                  <div class="action"  v-for="(user, i) in users" :key="i">
                    <div @click="voirProduit(result.id)" v-if=" compagny == user.pivot.compagnie_id"><i class="fa fa-info-circle" aria-hidden="true"></i></div>
                    <NuxtLink :to="'/produits/'+result.id" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                    <div @click="deleteProduit(result.id)" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                    <div class="cursor-pointer" v-b-tooltip.hover title="Télécharger l'état de stock" @click="pdfExporte(result)" v-if="compagny == user.pivot.compagnie_id"><i class="fa fa-download text-success" aria-hidden="true"></i></div>
                  </div>
                </td>
              </tr>
            </tbody>
        </table>
      </div>
      
      <div class="table-responsive">
        <table class="table table-hover" v-if="this.element_search == ''">
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
                <td v-if="produit.category != null">{{produit.category.name}}</td>
                <td v-else>---</td>
                <td>{{produit.quantity}}</td>
                <td class="controler"><div class="replace"><input :id="'real_quantity_'+produit.id" type="number" class="form-control w-75" placeholder="------" autocomplete="off" required><i class="fa fa-check-circle text-primary" aria-hidden="true" @click="replaceQuantity(produit.id)"></i></div></td>
                <td>{{produit.price_sell}}</td>
                <td>{{produit.price_buy}}</td>
                <!-- <td>{{produit.stock_min}}</td>
                <td>{{produit.stock_max}}</td> -->
                <td>{{produit.quantity * produit.price_sell}}</td>
                <td>
                  <div class="action"  v-for="(user, i) in users" :key="i">
                    <div @click="voirProduit(produit.id)" v-if=" compagny == user.pivot.compagnie_id"><i class="fa fa-info-circle" aria-hidden="true"></i></div>
                    <NuxtLink :to="'/produits/'+produit.id" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                    <div @click="deleteProduit(produit.id)" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                    <div class="cursor-pointer" v-b-tooltip.hover title="Télécharger l'état de stock" @click="pdfExporte(produit)" v-if="compagny == user.pivot.compagnie_id"><i class="fa fa-download text-success" aria-hidden="true"></i></div>
                  </div>
                </td>
              </tr>
            </tbody>
        </table>
        <p class="text-center"><strong>{{total}} produit(s) au total </strong></p><hr class="text-primary">
      </div><br><br>
    <form class="justify-content-end btn-group" role="search">
      <input type="file" id="file" ref="file" @change="handleFileUpload()" />
       <button class="btn btn-outline-success web-btn" type="submit" @click.prevent="submitFile()">Importer</button>
       <button class="btn btn-outline-dark mx-2 web-btn" type="submit" @click.prevent="pdf()">Exporter en pdf</button>
       <button class="btn btn-outline-dark mx-2 web-btn" type="submit" @click.prevent="exp()" v-if="role == 'admin'">Exporter en excel</button>

       <div class="d-flex mt-4">
          <button class="btn btn-outline-success mobile-btn" type="submit" @click.prevent="submitFile()" title="Importer fichier"><i class="fa fa-upload" aria-hidden="true"></i></button>

          <button class="btn btn-outline-dark mx-2 mobile-btn" type="submit" @click.prevent="pdf()" title="Exporter en pdf"><i class="fa fa-file-pdf-o" aria-hidden="true"></i></button>

          <button class="btn btn-outline-dark mx-2 mobile-btn" type="submit" @click.prevent="exp()" v-if="role == 'admin'" title="Exporter en excel"><i class="fa fa-file-excel-o" aria-hidden="true"></i></button>
        </div>
    </form><br>
    <div class="d-flex col-md-2 my-4">
      <label class="title my-2">Affichage</label> 
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
    </div>

        <nav class="page" aria-label="Page navigation example " v-if="res_data != null">
          <ul class="pagination">
            <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
            <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
            
            <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
          </ul>
        </nav>
  </div>          <!-- <pre> {{res_data}}</pre> --><br><br> 
<voirProduit :prod_id='identifiant0' :id= 'identifiant1' :nom= 'identifiant2' :quantite= 'identifiant3' :vente= 'identifiant4' :achat= 'identifiant5' :min= 'identifiant6' :max= 'identifiant7' :group= 'identifiant8' v-show="showModal" @close-modal="showModal = false"/>
<deleteModal :identifiant= 'key' v-show="showModalDelete" @close-modal="showModalDelete = false" @conf="setMessage"/>  
<exportModal v-show="exportModal" @close-modal="exportModal = false"/>  
<listpdfModal v-show="listModal" @close-modal="listModal = false"/> 
<pdfModal :prod="id_prod" :prod_name="nom_prod" v-show="pdfModal" @close-modal="pdfModal = false"/>  
</div>

</template>

<script>
import listpdfModal from './listpdfModal.vue'
import pdfModal from './pdfModal.vue'
import deleteModal from './deleteModal.vue'
import exportModal from './exportModal.vue'
import voirProduit from './voir_produit.vue'
import Sidebar from '../sidebar.vue'
import Userinfo from '../user_info.vue'
export default {
  layout: "empty",
  auth: true,
  components: {
    Sidebar,  
    voirProduit,
    Userinfo,
    deleteModal,
    exportModal,
    pdfModal,
    listpdfModal
  },

  data () {
    return {
      total: '',
      file: '',
      element_search: '',
      results: '',
      links: [],
      error: null,
      res_data: null,
      showModal: false,
      identifiant0 : '',
      identifiant1 : "",
      identifiant2 : "",
      identifiant3 : "",
      identifiant4 : "",
      identifiant5 : "",
      identifiant6 : "",
      identifiant7 : "",
      identifiant8: '',
      produits: [],
      produit: "",
      compagnie_id: "",
      category_id0:'',
      name0: '',
      // quantity0: '',
      price_sell0: '',      
      price_buy0: '',
      stock_min0: '',
      stock_max0: '',
      users: '',
      compagny: '',
      form: {
          nombre: '',
      },
      key: "",
      showModalDelete: false,
      exportModal: false,
      pdfModal: false,
      id_prod: "",
      nom_prod:"",
      role: '',
      listModal: ""
    }
  },

  mounted () {
      this.refresh()
      this.users = this.$auth.$state.user.roles;
      this.compagny = localStorage.getItem('auth.company_id');
      this.role = localStorage.getItem('auth.roles');
      
  },

  methods: {
        exp(){
            this.exportModal = true
        },

        pdfExporte(produit){
          // console.log(produit)
          this.pdfModal = true,
          this.id_prod = produit.id
          this.nom_prod = produit.name
        },

        pdf() {
          this.listModal = true
        },

       submitFile(){
          let formData = new FormData();
          formData.append('fichier', this.file);

          this.$axios.post('/products/import',
            formData,
            {
              headers: {
                  'Content-Type': 'multipart/form-data'
              },
              params: {
                compagnie_id: localStorage.getItem('auth.company_id')
              }
            }
          ).then(response => {
            // console.log(response);
            if(response.data.status == "success"){
              this.refresh()
              // alert("L'importation s'est bien effectuée ...");
                
             }else{
              // alert("Echec de l'importation. Veuillez réessayer !!!");
              this.error= "Echec de l'importation. Veuillez réessayer !!!"
             }
          })
        },

        Export(){
           this.$axios.get('/products',{
              params: {
                export: true,
                compagnie_id: localStorage.getItem('auth.company_id')
              },
              responseType: 'blob'
          }).then((response) => {
              // Let's create a link in the document that we'll
              // programmatically 'click'.
              const link = document.createElement('a');
      
              // Tell the browser to associate the response data to
              // the URL of the link we created above.
              link.href = window.URL.createObjectURL(
                  new Blob([response.data])
              );
      
              // Tell the browser to download, not render, the file.
              link.setAttribute('download', 'report.xlsx');
      
              // Place the link in the DOM.
              document.body.appendChild(link);
      
              // Make the magic happen!
              link.click();
          }); // Please catch me!

            // this.refresh()
        },

        handleFileUpload(){
          this.file = this.$refs.file.files[0];
        },
        
        search(){
          this.$axios.get('/products',{params: {
            compagnie_id: localStorage.getItem('auth.company_id'),
            search: this.element_search
          }
          })
          .then(response => {
            // console.log(response.data);
          this.results = response.data.data.data 
          
          })
        },
        deleteProduit(id){
          this.showModalDelete = true
            this.key = id    
                  
         },

        setMessage(){
          this.refresh()
        },
          

        refresh(page=1){
          this.$axios.get('/products',{params: {
            compagnie_id: localStorage.getItem('auth.company_id'),
            page: page,
            per_page : this.form.nombre
          }
          })
          .then(response => 
            {
              // console.log(response.data);
              this.produits = response.data.data.data
              this.res_data= response.data.data
              this.total = response.data.data.total;
              let firstE = response.data.data.links.shift()
              let lastE = response.data.data.links.splice(-1,1);
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
            this.identifiant0 = response.data.data[0].id
             this.identifiant2 = response.data.data[0].name
             this.identifiant3 = response.data.data[0].quantity
             this.identifiant4 = response.data.data[0].price_sell      
             this.identifiant5 = response.data.data[0].price_buy
             this.identifiant6 = response.data.data[0].stock_min
             this.identifiant7 = response.data.data[0].stock_max 
             if(response.data.data[0].category|| response.data.data[0].tax_group ){
              this.identifiant1 = response.data.data[0].category.name
             this.identifiant8 = response.data.data[0].tax_group 
             }
             else{
              this.identifiant1 = "Pas de catégorie associée"
              this.identifiant8 = "Relié à aucun groupe"
             }
            }) 
               
        },

        replaceQuantity(id){  
          let input_btn = "real_quantity_"+id;
          let quantity0 = document.getElementById(input_btn).value
          // console.log(document.getElementById(input_btn).value); 
          this.$axios.get('/products/'+id,{
            params: {
              compagnie_id: localStorage.getItem('auth.company_id')
            }
          })               
          .then(response => {
            //  console.log(response.data.data[0] )        
            let produit = response.data.data[0];            
              // console.log(this.name0)             
            this.$axios.put('products/' +id,{
                id: this.produit.id,
                category_id: produit.category_id ,
                name: produit.name,
                quantity: quantity0,
                price_sell: produit.price_sell,
                price_buy: produit.price_buy,
                stock_min: produit.stock_min,
                stock_max: produit.stock_max,
                tax_group: produit.tax_group,
                compagnie_id: localStorage.getItem('auth.company_id')
            }).then(response =>{console.log(response)
              // console.log(this.name0)
            this.refresh()
            document.getElementById(input_btn).value = ''
            })  
          })                   
        }

    },
   
}
</script>

<style scoped>
.page{
    display: flex;    
}

.btn-group{
  display: flex
}

.nombre{
  margin: 0 ;
}

.title{
  margin: 0.5% 2% 0 10%;
  font-weight: bold;
}
.app-main__outer{
  overflow: auto;
}
.fa{
  margin: 2px 10px;
  font-size: 18px;
  cursor: pointer;
}
.table{
	margin-top: 5%;
  text-align: center;
}          

.replace{
  display: flex;
}

.controler{
  width: 15%;
}

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
  /* width: 180px;
  height: 40px; */
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


@media screen and (max-width: 600px) {

  .replace i{
    margin: 5px 2px;
    font-size: 20px;
  }

}

.mobile-btn{
  display: none;
}



@media screen and (max-width: 900px) {
  /* .btn_recherche{
    display:none;
  } */

  .mobile-btn{
    display: block;
  }

  .web-btn{
    display: none;
  }

  .btn-group{
    display: inline;
  }

  .btn-group .btn{
    margin: 10px 0;
  }
}
</style>
