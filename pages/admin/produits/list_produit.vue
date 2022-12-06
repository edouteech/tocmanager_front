<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name">Produits </h3>
        </nav>
    
        <div class="app-main__outer p-5">
          <h4>Liste des produits de la plateforme</h4><br>
          <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="recherche..." v-model="element_search" @input="search()" aria-label="Search" >
              <button class="btn btn-outline-success" type="submit" @click.prevent="search()">Rechercher</button>
          </form>
          <div class="search_result table-responsive" v-if="this.element_search != ''">
            <!-- <div >{{result.name}}</div> -->
            <table class="table table-hover">
              <thead>
                <tr class="table-primary">
                        
                        <th>Nom</th>
                        <th>Nom de la catégorie</th>
                        <th>Quantité</th>
                        <!-- <th>Quantité réelle</th> -->
                        <th>Prix de vente</th>
                        <th>Prix d'achat</th>
                        <th>Compagnie associée</th>
                    </tr>
                </thead>
              <tbody>
               <tr  v-for="(result, j) in results" :key="j" @click="voirProduit(result.id)">
                  <td>{{result.name}}</td>
                  <td>{{result.category.name}}</td>
                  <td>{{result.quantity}}</td>
                  <td>{{result.price_sell}}</td>
                  <td>{{result.price_buy}}</td>
                  <td>{{result.compagny.name}}</td>
                  </tr>
                </tbody>
            </table>
          </div><br>
          <div class="table-responsive">
            <table class="table table-hover" v-if="this.element_search == ''">
              <thead>
                <tr class="table-primary">
                        <th>Nom</th>
                        <th>Nom de la catégorie</th>
                        <th>Quantité</th>
                        <!-- <th>Quantité réelle</th> -->
                        <th>Prix de vente</th>
                        <th>Prix d'achat</th>
                        <th>Compagnie associée</th>
                        <!-- <th>Stock minimal</th>
                        <th>Stock maximal</th> -->
                        <!-- <th>Valorisation du produit</th> -->
                        <!-- <th>Actions</th> -->
                    </tr>
                </thead>
              
                <tbody>
                  <tr  v-for="(produit, i) in produits" :key="i" >
                    
                    <td>{{produit.name}}</td>
                    <td>{{produit.category.name}}</td>
                    <td>{{produit.quantity}}</td>
                    <!-- <td class="controler"><div class="replace"><input :id="'real_quantity_'+produit.id" type="number" class="form-control w-75" placeholder="------" autocomplete="off" required><i class="fa fa-check-circle text-primary" aria-hidden="true" @click="replaceQuantity(produit.id)"></i></div></td> -->
                    <td>{{produit.price_sell}}</td>
                    <td>{{produit.price_buy}}</td>
                    <td>{{produit.compagny.name}}</td>
                  </tr>
                </tbody>
            </table>
            <p class="text-center"><strong>{{total}} produit(s) au total </strong></p><hr class="text-primary">
          </div><br><br>
        <!-- <form class="d-flex justify-content-end" role="search"><input type="file" id="file" ref="file" @change="handleFileUpload()" /> <button class="btn btn-outline-dark" type="submit" @click.prevent="submitFile()">Importer</button></form><br><br> -->
            <nav class="page" aria-label="Page navigation example " v-if="res_data != null">
              <ul class="pagination">
                <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
                <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
                
                <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
              </ul>
              <div class="d-flex mx-3">
              <label class="title mt-1">Affichage</label> 
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
            </nav>
      </div>          <!-- <pre> {{res_data}}</pre> --><br><br> 
    <voirProduit :id= 'identifiant1' :nom= 'identifiant2' :quantite= 'identifiant3' :vente= 'identifiant4' :achat= 'identifiant5' :min= 'identifiant6' :max= 'identifiant7' :compagny= 'identifiant8' v-show="showModal" @close-modal="showModal = false"/>
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
          total: '',
          file: '',
          element_search: '',
          results: '',
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
          identifiant8 : "",
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
          form: {
              nombre: '',
          }
    
        }
      },
    
      mounted () {
          this.refresh()
      },
    
      methods: {
           submitFile(){
              let formData = new FormData();
              formData.append('fichier', this.file);
    
              this.$axios.post('/products/import',
                formData,
                {
                  headers: {
                      'Content-Type': 'multipart/form-data'
                  }
                }
              ).then(response => {console.log(response);
                if(response.data.status == "success"){
                  this.refresh()
                  alert("L'importation s'est bien effectuée ...");
                    
                 }else{
                  alert("Echec de l'importation. Veuillez réessayer !!!");
                 }
              })
            },
    
            handleFileUpload(){
              this.file = this.$refs.file.files[0];
            },
            
            search(){
              this.$axios.get('/admin/products',{params: {
                search: this.element_search
              }
              })
              .then(response => {console.log(response.data);
              this.results = response.data.data.data 
              
              })
            },
            deleteProduit(id){
              console.log(id);
              this.$axios.delete('/products/' +id,{
                params: {
                  compagnie_id: this.$auth.$storage.getUniversal('company_id')
                }
              }).then(response => 
                {
                  console.log(response.data.data);
                  this.refresh()
                }
              )         
            },
              
    
            refresh(page=1){
              this.$axios.get('/admin/products',{params: {
                compagnie_id: this.$auth.$storage.getUniversal('company_id'),
                page: page,
                per_page : this.form.nombre
              }
              })
              .then(response => 
                {
                  console.log(response.data);
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
                this.$axios.get('/products/'+ id,{
                params: {
                  // compagnie_id: this.$auth.$storage.getUniversal('company_id')
                }
              }).then(response => {console.log(response.data.data[0]);
                 this.identifiant1 = response.data.data[0].category.name
                 this.identifiant2 = response.data.data[0].name
                 this.identifiant3 = response.data.data[0].quantity
                 this.identifiant4 = response.data.data[0].price_sell      
                 this.identifiant5 = response.data.data[0].price_buy
                 this.identifiant6 = response.data.data[0].stock_min
                 this.identifiant7 = response.data.data[0].stock_max
                 this.identifiant8 = response.data.data[0].compagny.name   
                }) 
                   
            },
    
            replaceQuantity(id){  
              let input_btn = "real_quantity_"+id;
              let quantity0 = document.getElementById(input_btn).value
              console.log(document.getElementById(input_btn).value); 
              this.$axios.get('/products/'+id,{
                params: {
                  compagnie_id: this.$auth.$storage.getUniversal('company_id')
                }
              })               
              .then(response => { console.log(response.data.data[0] )        
                let produit = response.data.data[0];            
                  console.log(this.name0)             
                this.$axios.put('products/' +id,{
                    id: this.produit.id,
                    category_id: produit.category_id ,
                    name: produit.name,
                    quantity: quantity0,
                    price_sell: produit.price_sell,
                    price_buy: produit.price_buy,
                    stock_min: produit.stock_min,
                    stock_max: produit.stock_max,
                    compagnie_id: this.$auth.$storage.getUniversal('company_id')
                }).then(response =>{console.log(response)
                  console.log(this.name0)
                this.refresh()
                document.getElementById(input_btn).value = ''
                })  
              })                   
            }
    
        },
       
    }
    </script>
    
    <style scoped>    
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
      margin: 5px 10px;
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

    @media screen and (max-width: 900px) {
    .page{
      display: inline;
    }
  }
    
    
    @media screen and (max-width: 600px) {
    
      .replace i{
        margin: 5px 2px;
        font-size: 20px;
      }

    
    }
    </style>
    