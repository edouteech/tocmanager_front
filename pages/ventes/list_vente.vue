<template >
  <div>
      <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
        <Sidebar /><h3 class="name">Ventes </h3>
        <Userinfo />
      </nav>
  
      <div class="app-main__outer p-5">
        <h4>Liste des ventes effectuées</h4><hr><br>
        <NuxtLink  to="/ventes/vente" v-for="(user, i) in users" :key="i"><button class="custom-btn btn-3" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1"><span>Nouvelle vente</span></button></NuxtLink>
        <table class="table table-hover">
            <thead>
              <tr class="table-primary">
                <th>Date facture</th>
                <th>Client concerné</th>
                <th>Montant facture </th>
                <th>Montant du</th>
                <th>Moyen de paiement</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="(vente, i) in ventes" :key="i">
                <td>{{vente.date_sell}}</td>
                <td>{{vente.client.name}}</td>
                <td>{{vente.amount}}</td>
                <td>{{vente.rest}}</td>
                <td>{{vente.payment}}</td>
                <td><div class="action" v-for="(user, i) in users" :key="i">
                      <NuxtLink :to="'/ventes/voir/'+vente.id" v-if=" compagny == user.pivot.compagnie_id"><i class="fa fa-info-circle text-info" aria-hidden="true"></i></NuxtLink>
                      <div class="cursor-pointer" @click.prevent="print(vente.id)" v-if=" compagny == user.pivot.compagnie_id"><i class="fa fa-print text-primary" aria-hidden="true"></i></div>
                      <NuxtLink :to="'/ventes/'+vente.id" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_edition == 1"><i class="fa fa-pencil-square-o text-dark" aria-hidden="true"></i></NuxtLink>
                      <div class="cursor-pointer" @click.prevent="deleteVente(vente.id)" v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></div>
                      <div class="cursor-pointer" @click.prevent="generateOtherpdf(vente.id)" v-if=" compagny == user.pivot.compagnie_id"><i class="fa fa-print text-warning" aria-hidden="true"></i></div>
                    </div>
                </td>
              </tr>
            </tbody>
          </table> 
      <p class="text-center"><strong>{{total}} facture(s) au total </strong></p><hr class="text-primary">
          <br><br> 
          <nav aria-label="Page navigation example "  class="d-flex" v-if="res_data != null">
            <ul class="pagination">
              <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
              <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
              
              <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
            </ul>
            <form action="">
                <div class="nombre d-flex">
                    <label class="title mx-5 my-2"><strong> Affichage:</strong></label> 
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
      <br> 
  
      <div class="imprim" id="impression">
        <div class="d-flex align-items-end flex-column">
            <p><strong> M/Mme {{client.name}}</strong> </p>
            <p><strong> Client {{compagn.name}}</strong> </p>
            <p><strong> {{client.phone}}</strong> </p>
        </div><br>
        <div class="p-2 mb-2 bg-secondary text-white text-center"><h4>Informations sur la facture</h4></div><br>
        <div class="">
          <p><strong>Numéro de la facture : {{id}}</strong> </p>
          <p><strong> Date de la facture : {{date_sell}}</strong> </p>
          <p><strong> N° Client : {{client.id}}</strong> </p>
        </div>
  
          <table class="table table-hover facture">
            <thead>
              <tr class="table-secondary">
                <th class="py-4">Nom du produit</th>
                <th class="py-4">Quantité </th>
                <th class="py-4">Prix unitaire </th>
                <th class="py-4">Total HT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(facture, j) in factures" :key="j">
                <td>{{facture.product.name}}</td>
                <td>{{facture.quantity}}</td>
                <td>{{facture.price}}</td>
                <td>{{facture.amount}} F CFA</td>
              </tr>
            </tbody>
          </table>  <br><br> 
          
              <div class="d-flex align-items-end flex-column mb-4" v-if="qr_info != null">
                <img :src="'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+qr_info.qrcode" alt="QRcode" />
                <div class="d-flex align-items-start flex-column mb-4">
                  <p> <strong>Mecef_counteurs :</strong>{{qr_info.mecef_counteurs}}</p>
                  <p> <strong>Mecef_nim: </strong>{{qr_info.mecef_nim}}</p>
                  <p><strong>Mecef_date :</strong> {{qr_info.mecef_date}}</p>
                  <p><strong>CodeMECeFDGI : </strong>{{qr_info.codeMECeFDGI}}</p>
                </div>
              </div>
          <table  class="total d-flex align-items-end flex-column">
            <tbody>
              <tr>
                <td class="p-2">Taxe</td>
                <td class="py-2 px-5">{{tax}} F CFA</td>
              </tr>
              <tr>
                <td class="p-2"><strong>TOTAL</strong></td>
                <td class="py-2 px-5"><strong>{{montant}} F CFA</strong></td>
              </tr>
              <tr>
                <td class="p-2">Montant restant à encaisser</td>
                <td class="py-2 px-5"><strong class="text-warning">{{rest}} F CFA</strong></td>
              </tr>
            </tbody>
          </table>  <br><br> 
      </div>

  <Impression :date_sell= 'identifiant1' :client= 'identifiant2' :factures= 'identifiant3' :montant= 'identifiant4' :rest= 'identifiant5' :tax= 'identifiant6' :qr_info= 'identifiant7' v-show="showModal" @close-modal="showModal = false"/>
         
  <!-- Footer -->
    <footer class="text-center text-lg-start bg-dark text-white">
        <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css' rel='stylesheet'>
      <!-- Section: Social media -->
      <section
        class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
      >
        <!-- Left -->
        <div class="me-5 d-none d-lg-block">
          <img src="../../static/images/logo.png" class="logo-img" alt="">
        </div>
        <!-- Left -->
  
        <!-- Right -->
        <div>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-google"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-github"></i>
          </a>
        </div>
        <!-- Right -->
      </section>
      <!-- Section: Social media -->
  
  
      <!-- Copyright -->
      <div class="text-center p-2" style="background-color: rgba(0, 0, 0, 0.05);">
        Copyright © 2022 - Tous droits réservés TocManager-dS
      </div>
      <!-- Copyright -->
    </footer>
  <!-- Footer -->
  </div>
  
  </template>
  
  
  <script>
  import Impression from './impression.vue';  
  import moment from "moment";
  import Sidebar from '../sidebar.vue'
  import Userinfo from '../user_info.vue'
  export default {
    auth: true,
    layout: "voir",
    components: {
      Sidebar,
      Userinfo,
      Impression  
    },
     data () {
        return {
          links: [],
          res_data: null,
          showModal: false,
          identifiant1: '',
          identifiant2: '',
          identifiant3: '',
          identifiant4: '',
          identifiant5: '',
          identifiant6: '',
          identifiant7: '',
          ventes: [],
          vente: "",
          total: '',
          users: '',
          compagny:'',
          form: {
              nombre: '',
          },
          date_sell: '',
          montant: '',
          client: [],
          rest: '',
          tax: '',
          id: '',
          compagn:[],
          factures: [],
          qrcode: null,
          qr_info: null, 
        }
      },
      methods: {
          deleteVente(id){
            console.log(id)
            this.$axios.delete('/sells/'+id,{params: {
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }
            })
            .then(response =>{
              // console.log(response);
              this.refresh()})                
          },
          
          refresh(page=1){
            this.$axios.get('/sells',{params: {
              compagnie_id: this.$auth.$storage.getUniversal('company_id'),
              page: page,
              per_page : this.form.nombre }   
            })        
            .then(response => 
            {
              // console.log(response);
              this.ventes = response.data.data.data
              this.res_data= response.data.data
              this.total = response.data.data.total
              let firstE = response.data.data.links.shift()
              let lastE = response.data.data.links.splice(-1,1);
            })  
          },
  
          recupClient(){
            this.$axios.get('/clients',{params: {
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }
            })
            .then(response => {
            this.clients = response.data.data.data })
          },
  
  
          async print(id){
            await this.$axios.get('/sells/'+ id,{
              params: {
                compagnie_id: this.$auth.$storage.getUniversal('company_id')
              }
            }).then(response => {
              console.log(response);
              this.id = response.data.data[0].id,
              this.factures = response.data.data[0].sell_lines,
              this.date_sell = moment(response.data.data[0].date_sell).format("D MMM YYYY, h:mm:ss a"),
              this.client = response.data.data[0].client,
              this.montant = response.data.data[0].amount,
              this.rest = response.data.data[0].rest
              this.tax = response.data.data[0].tax
              this.compagn = response.data.data[0].client.compagny
              this.qr_info = response.data.data[0].facture
            }) 
            this.generatePdf()
          },
  
          generatePdf() {
              // window.print();
              var fact = document.getElementById('impression')
              window.print(fact) ;
          },

          async generateOtherpdf(id){
              // console.log(id)
              await this.$axios.get('/sells/'+ id,{
                  params: {
                    compagnie_id: this.$auth.$storage.getUniversal('company_id')
                  }
                }).then(response => {
                  // console.log(response);
                  this.showModal = true;
                  // this.id = response.data.data[0].id,
                  this.identifiant3 = response.data.data[0].sell_lines,
                  this.identifiant1 = moment(response.data.data[0].date_sell).format("D MMM YYYY, h:mm:ss a"),
                  this.identifiant2 = response.data.data[0].client,
                  this.identifiant4 = response.data.data[0].amount,
                  this.identifiant5 = response.data.data[0].rest
                  this.identifiant6 = response.data.data[0].tax
                  // this.compagn = response.data.data[0].client.compagny
                  this.identifiant7 = response.data.data[0].facture
                }) 
          }
          
      },
      mounted () {
        this.refresh()
        this.recupClient()
        this.users = this.$auth.$state.user;
        this.compagny = localStorage.getItem('auth.company_id');
        // console.log(this.$auth)
      }
  }
  </script>
  
  <style scoped>
  .app-main__outer{
    overflow: auto;
  }
  
  .imprim{
    display:none
  }
  
  
  @media print {
    .navbar {
      display: none !important;
    }
    .app-main__outer{
      display: none !important;
    }
    .imprim {
         display: block;
         padding: 5%;
      }
    /* nav, .trait, .other_page{
      display: none !important;
    } */
    footer{
      display: none !important;
    }
    @page {
          margin-left: 0.5in;
          margin-right: 0.5in;
          margin-top: 0;
          margin-bottom: 0;
    }
  
    
  }
  .fa{
    margin: 0 5px;
    font-size: 22px;
    cursor: pointer;
  }
  .table{
      margin-top: 2%;
    text-align: center;
    justify-content: center;
  
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
  