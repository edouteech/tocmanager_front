<template>
<div>
    <link href="https://demo.dashboardpack.com/architectui-html-free/main.css" rel="stylesheet">
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css' rel='stylesheet'>
    <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/npm/daterangepicker/daterangepicker.css" />

        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name_side">Compagnies </h3>
        </nav>
    
        <div class="app-main__outer py-5 px-2">
          <h4>Informations de la compagnie</h4><br>
          <!-- <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="recherche..." v-model="element_search" @input="search()" aria-label="Search" >
              <button class="btn btn-outline-success" type="submit" @click.prevent="search()">Rechercher</button>
          </form> -->
        <br><br>
        <div class="lignes"></div><br>
            <div class="row col-md-12">
                <div class="col-md-6">
                    <p class=" fsize-2">Nom de la compagnie :<strong class="text-uppercase"> {{compagny}}</strong></p>
                    <p class=" fsize-1">Email de la compagnie :<strong> {{email}}</strong></p>
                    <p class=" fsize-1">Numéro de téléphone de la compagnie :<strong class="text-uppercase"> {{phone}}</strong></p>
                </div>
                <div class="col-md-6 trait-abonnement" v-if="info_abonnement">
                    <p class=" fsize-2">Type d'abonnement :
                        <strong class="text-uppercase" v-if="info_abonnement.plan_id == 1">Abonnement mensuel</strong>
                        <strong class="text-uppercase" v-else>Abonnement annuel</strong>
                    </p>
                    <p class=" fsize-1" v-if="info_abonnement.ends_at">Fin abonnement :<strong> {{dateFin_abonnement}}</strong></p>
                    <p class=" fsize-1" v-else>Fin de la période d'essai :<strong> {{dateFin_essai}}</strong></p>
                    <!-- <p class=" fsize-1">Numéro de téléphone de la compagnie :<strong class="text-uppercase"> {{phone}}</strong></p> -->
                </div>
            </div>
        <div class="lignes"></div><br><br>
            <div class="d-flex justify-content-center">
                <button class="btn btn-outline-danger cursor-pointer btn-sup" @click.prevent="supAll()">
                 <!-- <i class="fa fa-trash-o cursor-pointer" aria-hidden="true"></i> -->
                 <span>Supprimer toutes les informations relatives à la compagnie</span>
            </button>
            </div>
        <br><br>

        <p class="text-center fsize-2">Liste des utilisateurs de la compagnie</p>
        <table class="table table-hover" v-if="this.element_search == ''">
              <thead>
                <tr class="table-primary" >
                        <th>Noms</th>
                        <th>Numéros de téléphone</th>
                        <th>Emails</th>
                        <th>Pays</th>
                  </tr>
                </thead>
              
                <tbody>
                  <tr  v-for="(user, i) in users" :key="i">
                    <td>{{user.user.name}}</td>
                    <td>{{user.user.phone}}</td>
                    <td>{{user.user.email}}</td>
                    <td>{{user.user.country}}</td>
                  </tr>
                </tbody>
            </table><br><br><br><br>
            <div class="card-body">
                <div class="tab-content row">
                    <div class="tab-pane fade show active col-md-12 col-lg-6" id="tabs-eg-77">
                        <h6 class=" text-center fsize-2 font-weight-normal">Liste des clients de {{compagny}}</h6><br>
                        <div class="scroll-area">
                            <div class="scrollbar-container">
                                <ul class="rm-list-borders rm-list-borders-scroll list-group list-group-flush">
                                    <li class="list-group-item">
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper fsize-2 text-muted">
                                                Noms des clients
                                                <div class="widget-content-right text-muted">
                                                    <div class="fsize-2 text-muted">
                                                        <span>Numéros de téléphone</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li> <br>
                                    <li class="list-group-item" v-for="(client, j) in clients" :key="j">
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper fsize-1">
                                                {{client.name}}
                                                <div class="widget-content-right">
                                                    <div class="fsize-1 text-muted">
                                                        <span>{{client.phone}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade show active col-md-12 col-lg-6" id="tabs-eg-77">
                        <h6 class=" text-center fsize-2 font-weight-normal">Liste des fournisseurs de {{compagny}}</h6><br>
                        <div class="scroll-area">
                            <div class="scrollbar-container">
                                <ul class="rm-list-borders rm-list-borders-scroll list-group list-group-flush">
                                    <li class="list-group-item">
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper fsize-2 text-muted">
                                                Noms des fournisseurs
                                                <div class="widget-content-right text-muted">
                                                    <div class="fsize-2 text-muted">
                                                        <span>Numéros de téléphone</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li> <br>
                                    <li class="list-group-item " v-for="(supplier, i) in suppliers" :key="i">
                                        <div class="widget-content p-0">
                                            <div class="widget-content-wrapper fsize-1">
                                                {{supplier.name}}
                                                <div class="widget-content-right">
                                                    <div class="fsize-1 text-muted">
                                                        <span>{{supplier.phone}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                    
                                </ul>
                            </div>
                        </div> 
                    </div>
                </div>
            </div><br><br><br><div class="ligne"></div><br><br><br><br>
            <div class="row">
                <div class="col-md-12 col-lg-6">
                    <div class="main-card mb-3 card">
                        <div class="card-header">Liste des produits de {{compagny}}
                        </div>
                        <div class="scroll-area">
                            <div class="scrollbar-container">
                                <div class="table-responsive">
                                    <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th class="text-center">Nom du produit</th>
                                            <th class="text-center">Quantité</th>
                                            <th class="text-center">Prix d'achat</th>
                                            <th class="text-center">Prix de vente</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="(product, k) in products" :key="k">
                                            <td class="text-center">
                                                        {{product.name}}
                                            </td>
                                            <td class="text-center">{{product.quantity}}</td>
                                            <td class="text-center">
                                                <div class="badge badge-success fsize-1">{{product.price_buy}}</div>
                                            </td>
                                            <td>
                                                <div class="badge badge-danger fsize-1">{{product.price_sell}}</div>
                                            </td>
                                        </tr>
                                
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="d-block text-center card-footer">
                            10 dernières ventes
                        </div> -->
                    </div>
                </div>
                <div class="col-md-12 col-lg-6">
                    <div class="main-card mb-3 card">
                        <div class="card-header">Liste des catégories de produits de {{compagny}}
                        </div>
                        <div class="scroll-area">
                            <div class="scrollbar-container">
                                <div class="table-responsive">
                            <table class="align-middle mb-0 table table-borderless table-striped table-hover">
                                <thead>
                                <tr>
                                    <th class="text-center">Nom de la catégorie</th>
                                    <th class="text-center">Catégorie parente associée</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(categorie, l) in categories" :key="l">
                                    <td class="text-center">
                                                {{categorie.name}}
                                    </td>
                                    <td v-if="categorie.parent != null">{{categorie.parent.name}}</td>
                                    <td v-else>---</td>
                                </tr>
                        
                                </tbody>
                            </table>
                        
                        
                                </div>
                            </div>
                        </div>
                        <!-- <div class="d-block text-center card-footer">
                            10 dernières ventes
                        </div> -->
                    </div>
                </div>
            </div>
            
        </div> 
<deleteInfoCompagnieModal :identifiant= 'key' v-show="showModal" @close-modal="showModal = false" @conf="setMessage"/> 
</div>
</template>

<script>
import deleteInfoCompagnieModal from './deleteInfoCompagnieModal.vue'
import Sidebar from '../sidebar.vue'
import moment from "moment";
export default {
  auth: true,
  layout: "empty",
  components: {
    Sidebar,  
    deleteInfoCompagnieModal
  },
  data () {
    return {
        id_compagny :'',
        key:'',
        showModal: false,
        element_search: '',
        compagny: '',
        email: '',
        phone: '',
        categories: [],
        clients: [],
        compagnie_users: [],
        products: [],
        suppliers: [],
        users: [],
        info_abonnement: "",
        dateFin_abonnement: "",
        dateFin_essai: ""
    }
    },

    methods:{
        supAll(){
          this.showModal = true
            this.key = this.id_compagny   
        },

        recup(){
            this.$axios.get('/admin/compagnies/'+ this.$route.params.id)
            .then(response => {
                // console.log(response.data.data[0]);
                this.id_compagny = response.data.data[0].id
                this.compagny = response.data.data[0].name
                this.email = response.data.data[0].email
                this.phone = response.data.data[0].phone
                this.categories = response.data.data[0].categories
                this.clients = response.data.data[0].clients
                this.suppliers = response.data.data[0].suppliers
                this.products = response.data.data[0].products
                this.users = response.data.data[0].compagnie_users 
            }) 
        },
        
        abonnement(){
            this.$axios.get('/index/abonnement/compagnie/'+ this.$route.params.id)
            .then(response => {
                // console.log(response.data.data);
                this.info_abonnement = response.data.data[0]
                this.dateFin_abonnement = moment(response.data.data[0].ends_at).format("D MMM YYYY, h:mm:ss a")
                this.dateFin_essai = moment(response.data.data[0].trial_ends_at).format("D MMM YYYY, h:mm:ss a")               
            }) 
        },

        
        setMessage(){
            this.recup()
            this.abonnement()
        },
    },
    
    mounted(){
        this.recup()
        this.abonnement()
    },

    
}
</script>

<style scoped>
.btn-sup{
    padding: 10px;
    font-size: 14px;
}

.trait-abonnement{
    border-left: 2px solid black;
    margin-bottom: 15px;
}

li:hover{
    background-color: rgb(207, 237, 247);
}

.ligne{
    border-bottom: 2px solid blue;
}

.lignes{
    border-bottom: 2px solid rgb(0, 0, 5);
}

.page{
    display: flex;    
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
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}
.table{
    margin-top: 5%;
  text-align: center;
}        


thead tr{
    background-color: transparent;
}


tbody tr:last-of-type{
    border-bottom: 2px solid rgb(140, 250, 217);
}
.action{
   display: flex;
}

.custom-btn {
  /* width: 220px;
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
  width: 220px;
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
