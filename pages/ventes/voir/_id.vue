<template >
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Ventes </h3>
      <User_info />
    </nav>

    <div class="alert alert-danger d-flex" role="alert" v-if="error != null" >
      <div>{{error}} </div>
      
      <div  v-for="(user, i) in users" :key="i">
        <NuxtLink to="/update_compagnie" v-if="compagn == user.pivot.compagnie_id && user.pivot.droits_admin == 1">
          <!-- <button type="submit" class="btn btn-warning mx-5">Compléter les informations de la compagnie</button> -->
        </NuxtLink>

        <NuxtLink to="" class="text-danger" v-else>Veuillez contacter l'administrateur pour résoudre le problème !!!</NuxtLink>
      </div>
    </div>


    <div class="app-main__outer p-5">
      
      <div class="d-flex align-items-end flex-column">
        <!-- <div class="print" @click="generatePdf()" ><i class="fa fa-print text-primary" aria-hidden="true"></i><span class="text-end mx-2">Impression A4</span></div> -->
        <!-- <div class="other_print mx-5" @click="generatePdf()"><i class="fa fa-print text-primary" aria-hidden="true"></i><span class="text-end mx-2">Autre format d'impression</span></div> -->
        <button type="submit" class="btn btn-success mx-5" @click.prevent="validerFactureNormalise()" v-if="qr_info != null">Valider la facture normalisée</button>
        <button type="submit" class="btn btn-primary mx-5" @click.prevent="genererFactureNormalise()" v-else>Générer la facture normalisée</button>
        <NuxtLink :to="'/ventes/'+this.$route.params.id"><button type="submit" class="btn btn-dark mx-5 my-3">Modifier la vente</button></NuxtLink> 
      </div>
        <br>

        <div class="d-flex align-items-start flex-column">
            <div class="entreprise-photo my-3" v-if="compagny.logo">
              <img :src="$config.webURL + compagny.logo" alt="profil" class="profil" width="70" height="50">
            </div>
            <p><strong> Société {{compagny.name}}</strong></p>
            <p><strong> Email: {{compagny.email}}</strong></p>
            <p><strong> Tél: {{compagny.phone}}</strong></p>
          </div>
          <div class="d-flex align-items-end flex-column client-info">
          <p><strong> M/Mme {{client.name}}</strong> </p>
          <p><strong> Client {{compagny.name}}</strong> </p>
          <p><strong> {{client.phone}}</strong> </p>
      </div><br>
      <div class="p-2 mb-2 bg-secondary text-white text-center"><h4>Informations sur la facture</h4></div><br>
      <div class="">
        <p><strong>Numéro de la facture : {{id}}</strong> </p>
        <p><strong> Date de la facture : {{date_sell}}</strong> </p>
        <p><strong> N° Client : {{client.id}}</strong> </p>
      </div>
      <!-- <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th>Date de la vente</th>
              <th>Client concerné </th>
              <th>Montant de la factue </th>
              <th>Somme due </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{date_sell}}</td>
              <td>{{client.name}}</td>
              <td>{{montant}}</td>
              <td>{{rest}}</td>
            </tr>
          </tbody>
        </table>  <br><br> 
        <h5><p class="text-center">Listes des produits de la facture</p></h5> -->
      <div class="table-responsive">
        <table class="table table-hover facture">
          <thead>
            <tr class="table-secondary">
              <th class="py-4">Nom du produit</th>
              <th class="py-4">Quantité </th>
              <th class="py-4">Prix unitaire </th>
              <th class="py-4">Total</th>
              <th class="py-4">Total après réduction</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(facture, j) in factures" :key="j">
              <td>{{facture.product.name}}</td>
              <td>{{facture.quantity}}</td>
              <td>{{facture.price}}</td>
              <td>{{facture.amount}} F CFA</td>
              <td>{{facture.amount_after_discount}} F CFA</td>
            </tr>
          </tbody>
        </table>  
      </div><br><br> 
        
            <div class="d-flex align-items-end flex-column mb-4 recap" v-if="qrcode != null">
              <img :src="'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+qrcode" alt="QRcode" />
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
              <td class="p-2"><strong>TOTAL Hors Taxe</strong></td>
              <td class="py-2 px-5"><strong>{{montant_ht}} F CFA</strong></td>
            </tr>
            <tr>
              <td class="p-2">Taxe</td>
              <td class="py-2 px-5">{{tax}}</td>
            </tr>
            <tr>
              <td class="p-2"><strong>TOTAL TTC</strong></td>
              <td class="py-2 px-5"><strong>{{montant_ttc}} F CFA</strong></td>
            </tr>
            <tr>
              <td class="p-2">Réduction</td>
              <td class="py-2 px-5">{{discount}} F CFA</td>
            </tr>
            <tr>
              <td class="p-2"><strong>Net à payer</strong></td>
              <td class="py-2 px-5"><strong>{{montant}} F CFA</strong></td>
            </tr>
            <tr>
              <td class="p-2">Montant restant à encaisser</td>
              <td class="py-2 px-5"><strong class="text-warning">{{rest}} F CFA</strong></td>
            </tr>
          </tbody>
        </table>  
      <br><br> 
        
        <hr class="trait">
          <div class="caisse" v-if="rest > 0">
          <h4>Ajouter des encaissements pour cette facture</h4><br><br>
                <div  v-if="number == 0">
                <div class="alert alert-danger justify-content-center" role="alert" v-if="error_rest != null">
                  {{error_rest}} 
                </div></div>
                <form action="" method="POST">
                    <div class="form-group col-md-6">					
                      <input type="date" class="form-control" placeholder="Entrer la date de l'encaissement " v-model="form.date" autocomplete="off" id="date" required>       
                    </div> <br>
                    <div class="form-group col-md-6">        
                      <input type="number" class="form-control" placeholder="Entrer le montant à encaisser " v-model="form.montant" id="montant" required>
                    </div> <br>
                    <div class="form-group col-md-6">
                        <select class="form-control" v-model="form.payment">
                            <option value="">Choississez une méthode de paiement</option>
                            <option v-for="(methode, j) in methodes" :key="j" :value="methode">{{methode}}</option>
                        </select>
                    </div>
                    
                    
                    <br>
                        
                    <button type="submit" class="btn btn-success" @click.prevent="submit()">Ajouter ...</button>          
                </form>  <br><br><hr class="trait">
          </div>
        <div class="encaissement">
          <h4>Liste des encaissements pour cette facture</h4>
          <table class="table table-hover">
            <thead>
              <tr class="table-primary">
                <th>Date encaissement</th>
                <th>Montant </th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="(encaissement, i) in encaissements" :key="i">
                <td>{{encaissement.date}}</td>
                <td>{{encaissement.montant}}</td>
              </tr>
            </tbody>
          </table>  <br>
          <nav aria-label="Page navigation example px-8 " v-if="res_data != null">
            <ul class="pagination">
              <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="recupFacture(res_data.current_page - 1)">Précédent</a></li>
              <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="recupFacture(link.label)">{{link.label}}</a></li>
              
              <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="recupFacture(res_data.current_page + 1)">Suivant</a></li>
            </ul>
          </nav>
        </div><br><br> 
    </div>

    <div class="hidden_page">
      <p><strong> Date de la facture : {{date_sell}}</strong> </p>
      <p><strong> M/Mme {{client.name}}</strong> </p>
      <p><strong>Téléphone : {{client.phone}}</strong> </p>
      <br><hr>
      <div class="d-flex">
          <div class="py-4 px-2 w-25">Nom du produit</div>
          <div class="py-4 px-2 w-25">Quantité </div>
          <div class="py-4 px-2 w-25">Prix unitaire </div>
          <div class="py-4 px-2 w-25">Total</div>
          <div class="py-4 px-2 w-25">Total après réduction</div>
      </div>
      <div class="d-flex" v-for="(facture, j) in factures" :key="j">
          <div class="px-2 w-25">{{facture.product.name}}</div>
          <div class="px-2 w-25">{{facture.quantity}}</div>
          <div class="px-2 w-25">{{facture.price}}</div>
          <div class="px-2 w-25">{{facture.amount}} F CFA</div>
          <div class="px-2 w-25">{{facture.amount_after_discount}} F CFA</div>
      </div><br><br>
      <hr><br>
      <div >
          <p><strong> Total Hors Taxe : {{montant_ht}} F CFA</strong> </p>
          <p> Taxe : {{tax}}</p>
          <p><strong> Total TTC : {{montant_ttc}} F CFA</strong> </p>
          <p> Réduction: {{discount}} F CFA</p>
          <p><strong> Net à payer : {{montant}} F CFA</strong> </p>
          <p><strong> Montant restant à encaisser : {{rest}} F CFA</strong> </p>
      </div>

      <div class="text-center" v-if="qr_info != null">
          <img :src="'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+qr_info.qrcode" alt="QRcode" />
          <div class="">
              <p> <strong>Mecef_counteurs :</strong>{{qr_info.mecef_counteurs}}</p>
              <p> <strong>Mecef_nim: </strong>{{qr_info.mecef_nim}}</p>
              <p><strong>Mecef_date :</strong> {{qr_info.mecef_date}}</p>
              <p><strong>CodeMECeFDGI : </strong>{{qr_info.codeMECeFDGI}}</p>
          </div>
      </div>
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
        <img src="../../../static/images/logo.png" class="logo-img" alt="">
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
import moment from "moment";
import Sidebar from '../../sidebar.vue'
import User_info from "~/pages/user_info.vue";
import Impression from './impression.vue';
export default {
    layout: "voir",
    components: {
        Sidebar,
        User_info,
        Impression
},

    data () {
      return {
        showModal : false,
        error_rest: null,
        res_data: null,
        date_encaissement: '',
        montant_encaissement: '',
        date_sell: '',
        montant: '',
        client: [],
        rest: '',
        number : 0,
        tax: '',
        discount:'',
        montant_ht: '',
        montant_ttc: '',
        id: '',
        compagny:[],
        encaissements: [],
        factures: [],
        form: {
            date:  moment().format("YYYY-MM-DD"),
            montant: '',
            phone: '',
            payment: "ESPECES",
            nature:'',
            compagnie_id: ''
        },
        qrcode: null,
        error: null,
        qr_info: null, 
        identifiant1: '',
        identifiant2: '',
        identifiant3: '',
        identifiant4: '',
        identifiant5: '',
        identifiant6: '',
        identifiant7: '',
        methodes: ''
      }
    },

    mounted(){
      // console.log(this.$auth)
      this.payment()
      this.refresh()
      this.recupFacture()
      this.compagn = localStorage.getItem('auth.company_id');
      this.users = this.$auth.$state.user.roles;
    },

    methods: {
        payment(){
            this.$axios.get('/invoice/payments',{params: {
            compagnie_id: localStorage.getItem('auth.company_id')
          }
          }).then(response =>
            {
                // console.log(response); 
                this.methodes = response.data.data })
        },
        moment: function () {
          return moment();
        },
        generatePdf() {
            window.print();
        },
        // generateOtherPdf() {
        //   this.showModal = true;
          
        //      this.identifiant1 = this.date_sell
        //      this.identifiant2 = this.client
        //      this.identifiant3 = this.factures
        //      this.identifiant4 = this.montant 
        //      this.identifiant5 = this.rest 
        //      this.identifiant6 = this.tax 
        //      this.identifiant7 = this.qr_info 
        // },

        refresh(){
          this.$axios.get('/sells/'+ this.$route.params.id,{
            params: {
              compagnie_id: localStorage.getItem('auth.company_id')
            }
          }).then(response => {
            // console.log(response.data.data[0]);
            this.id = response.data.data[0].id,
            this.factures = response.data.data[0].sell_lines,
            this.date_sell = moment(response.data.data[0].date_sell).format("D MMM YYYY, h:mm:ss a"),
            this.client = response.data.data[0].client,
            this.montant = response.data.data[0].amount,
            this.montant_ht = response.data.data[0].amount_ht,
            this.montant_ttc = response.data.data[0].amount_ttc,
            this.discount = response.data.data[0].discount,
            this.rest = response.data.data[0].rest
            this.tax = response.data.data[0].tax
            this.compagny = response.data.data[0].client.compagny
            this.qrcode = response.data.data[0].facture.qrcode
            this.qr_info = response.data.data[0].facture
          }) 
        },

        async submit(){
            if(this.form.montant > this.rest){
                var that = this;
                this.error_rest = "Le montant à encaisser ne doit pas etre supérieur à la somme due";
                that.form.montant='';
              }
            else{
              await  this.$axios.post('/encaissements',{
                montant: this.form.montant,
                date: this.form.date,
                client_id: this.client.id,
                user_id: this.$auth.user.id,
                sell_id: this.$route.params.id,
                payment: this.form.payment,
                compagnie_id: localStorage.getItem('auth.company_id')
              }).then(response =>{ 
                  // console.log( response ) 
                  // this.$emit('conf', { date_encaissement: this.form.date, montant_encaissement: this.form.montant })

                  if(response.data.status == "success"){
                    var that = this;
                    this.number = 1;
                    that.form.montant='';
                    that.form.date='';
                    this.recupFacture(),
                    this.recupInfos()
                  
                  }
                  else{
                      this.errors = response.data.data
                      // this.$router.push({path:'/clients/add_client'});
                  }
                
             
              })
              .catch( err => console.log( err ) )
                  //  console.log(this.form.name)
            }                
        },

        recupInfos(){
          this.$axios.get('/sells/'+ this.$route.params.id,{
            params: {
              compagnie_id: localStorage.getItem('auth.company_id')
            }
          }).then(response => {
            // console.log(response.data.data);
            this.date_sell = response.data.data[0].date_sell,
            this.client = response.data.data[0].client,
            this.montant = response.data.data[0].amount,
            this.rest = response.data.data[0].rest
          }) 
        },
          
            
        // AddEncaissement(payload) {
        //     this.recupFacture(),
        //     this.recupInfos()
        // },

        recupFacture(page){
          this.$axios.get('/encaissements',
            {
                params: {
                  page : page,
                  sell_id: this.$route.params.id,
                  compagnie_id: localStorage.getItem('auth.company_id')
                }
            }
          ).then(response => 
          {
            // console.log(response);
            this.encaissements = response.data.data.data
            this.res_data= response.data.data
            // this.links = response.data.data.links
            let firstE = response.data.data.links.shift()
            let lastE = response.data.data.links.splice(-1,1);
          })
        },

        
        validerFactureNormalise(){
          this.$axios.get('/sells/valid/'+this.$route.params.id,{params: {
            compagnie_id: localStorage.getItem('auth.company_id')
          }
          })
            .then(response =>{ 
                // console.log( response ) 
                  this.refresh()
                  this.error = response.data.message
                
            }).catch( err => console.log( err ) )

        },

        genererFactureNormalise(){
          this.$axios.get('/sells/invoice/'+this.$route.params.id,{params: {
            compagnie_id: localStorage.getItem('auth.company_id')
          }
          })
            .then(response =>{ 
                // console.log( response ) 
                // if(response.status == 'success'){
                  this.refresh()
                // }
                // else{
                  this.error = response.data.message
                // } 
            }).catch( err => console.log( err ) )

        },
   
    },
}
</script>

<style scoped>
.client-info{
  margin-top: -10%;
}

.logo-img{
    width: 170px;
}
.text-end{
  font-size: 13px;
}

.hidden_page{
  display: none;
}

.print i, .other_print i{
  font-size: 25px;
}

.print, .other_print{
  border: 1px solid black;
  /* width: 200px; */
  border-radius: 5px;
  padding: 15px;
  cursor: pointer;
}

.print:hover, .other_print:hover{
  background-color: rgb(236, 244, 251);
}


.app-main__outer{
  overflow: auto;
}

/* @media print {
  .app-main__outer{
    display: none !important;
  }
  footer{
    display: none !important;
  }
  
} */

@media print {
  .navbar {
    display: none !important;
  }
  /* .print, .caisse , .encaissement, .btn{
    display: none !important;
  }
  nav, .trait, .other_page{
    display: none !important;
  } */
  footer, .app-main__outer{
    display: none !important;
  }
  .hidden_page{
    display: block;
    padding:5% ;
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
	margin-top: 3%;
  text-align: center;
  justify-content: center;

}         

.total td{
    border: 1px solid black;
}

tbody tr:last-of-type{
    border-bottom: 2px solid rgb(140, 140, 250);
}

thead tr{
    background-color: transparent;
}

/* @media screen and (max-width: 900px) {
  .recap{
    margin-right: -15%;
  }
} */



.facture tbody tr:last-of-type{
  border-bottom: 2px solid rgb(0, 0, 0);
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
