<template >
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Achats </h3>
      <User_info />
    </nav>

    <div class="app-main__outer p-5">
        <div class="print" @click="generatePdf()" ><i class="fa fa-print text-primary" aria-hidden="true"></i><span class="text-end mx-2">Imprimer</span></div>
        
      <br>
      
      <div class="d-flex align-items-end flex-column">
          <p><strong> M/Mme {{supplier.name}}</strong> </p>
          <p><strong> Fournisseur {{compagny.name}}</strong> </p>
          <p><strong> {{supplier.phone}}</strong> </p>
      </div><br>
      <div class="p-2 mb-2 bg-secondary text-white text-center"><h4>Informations sur la facture</h4></div><br>
      <div class="">
        <p><strong>Numéro de la facture : {{id}}</strong> </p>
        <p><strong> Date de la facture : {{date_buy}}</strong> </p>
        <p><strong> N° Fournisseur : {{supplier.id}}</strong> </p>
      </div>
      <!-- <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th>Date de l'achat</th>
              <th>Fournisseur concerné </th>
              <th>Montant de la facture</th>
              <th>Montant restant à payer </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{date_buy}}</td>
              <td>{{supplier.name}}</td>
              <td>{{montant}}</td>
              <td>{{rest}}</td>
            </tr>
          </tbody>
        </table>  <br><br> 
        <h5><p class="text-center">Listes des produits de la facture</p></h5> -->
        <table class="facture table table-hover ">
          <thead>
            <tr class="table-success">
              <th>Nom du produit</th>
              <th>Quantité </th>
              <th>Prix unitaire </th>
              <th>Total HT</th>
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
                  <td class="p-2">Montant restant à décaisser</td>
                  <td class="py-2 px-5"><strong class="text-warning">{{rest}} F CFA</strong></td>
                </tr>
              </tbody>
            </table>  
        <br><br> 
        <hr>
        <div class="caisse" v-if="rest > 0">
          <h4>Ajouter des décaissements pour cette facture</h4><br><br>
                <div  v-if="number == 0">
                <div class="alert alert-danger justify-content-center" role="alert" v-if="error_rest != null">
                  {{error_rest}} 
                </div></div>
                <form action="" method="POST">
                    <div class="form-group col-md-6">					
                      <input type="date" class="form-control" placeholder="Entrer la date de ce décaissement " v-model="form.date" autocomplete="off" id="date" required>       
                    </div> <br>
                    <div class="form-group col-md-6">        
                      <input type="number" class="form-control" placeholder="Entrer le montant à décaisser " v-model="form.montant" id="montant" required>
                    </div> <br><br>
                        
                    <button type="submit" class="btn btn-success" @click.prevent="submit()">Ajouter ...</button>          
                </form>  <br><br><hr>
        </div>
        <div class="decaissement">
          <h4>Liste des décaissements pour cette facture</h4>
          <table class="table table-hover">
            <thead>
              <tr class="table-primary">
                <th>Date décaissement</th>
                <th>Montant </th>
              </tr>
            </thead>
            <tbody>
              <tr  v-for="(decaissement, i) in decaissements" :key="i">
                <td>{{decaissement.date}}</td>
                <td>{{decaissement.montant}}</td>
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
export default {
    layout: "voir",
    components: {
    Sidebar,
    User_info
},

    data () {
      return {
        error_rest: null,
        res_data: null,
        date_decaissement: '',
        montant_decaissement: '',
        date_buy: '',
        montant: '',
        supplier: [],
        rest: '',
        number : 0,
        decaissements: [],
        tax: '',
        id: '',
        compagny:[],
        factures: [],
        form: {
            date:  moment().format("YYYY-MM-DD"),
            montant: '',
            phone: '',
            nature:'',
            compagnie_id: ''
        },
      }
    },

    mounted(){
      this.$axios.get('/buys/'+ this.$route.params.id,
        {
            params: {
              compagnie_id: localStorage.getItem('auth.company_id')
            }
        }).then(response => {
          // console.log(response.data.data);
        this.id = response.data.data[0].id,
        this.factures = response.data.data[0].buy_lines,
        this.date_buy = moment(response.data.data[0].date_buy).format("D MMM YYYY, h:mm:ss a"),
        this.supplier = response.data.data[0].supplier,
        this.montant = response.data.data[0].amount,
        this.rest = response.data.data[0].rest
        this.tax = response.data.data[0].tax
        this.compagny = response.data.data[0].supplier.compagny
      }) 
      this.recupFacture()
    },

    methods: {

        generatePdf() {
            window.print();
        },

        async submit(){
          if(this.form.montant > this.rest){
               this.error_rest = "Le montant à encaisser ne doit pas etre supérieur à la somme due"
               var that = this;
               that.form.montant='';
              }
          else{
            await  this.$axios.post('/decaissements',{
              montant: this.form.montant,
              date: this.form.date,
              supplier_id: this.supplier.id,
              user_id: this.$auth.user.id,
              buy_id: this.$route.params.id,
              compagnie_id: localStorage.getItem('auth.company_id')
            }).then(response =>{ 
                console.log( response ) 
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
            }).catch( error => console.log( error ) )
                //  console.log(this.form.name)     
          }           
        },
            
        recupInfos(){
          this.$axios.get('/buys/'+ this.$route.params.id,
            {
                params: {
                  compagnie_id: localStorage.getItem('auth.company_id')
                }
            })
          .then(response => {
            // console.log(response.data.data);
            this.date_buy = response.data.data[0].date_buy,
            this.supplier = response.data.data[0].supplier,
            this.montant = response.data.data[0].amount,
            this.rest = response.data.data[0].rest
      }) 
        },

        recupFacture(page){
          this.$axios.get('/decaissements',
            {
                params: {
                  page : page,
                  buy_id: this.$route.params.id,
                  compagnie_id: localStorage.getItem('auth.company_id')
                }
            }
          ).then(response => 
          {
            // console.log(response);
            this.decaissements = response.data.data.data
            this.res_data= response.data.data
            // this.links = response.data.data.links
            let firstE = response.data.data.links.shift()
            let lastE = response.data.data.links.splice(-1,1);
          })
        },


    },
}
</script>

<style scoped>
.text-end{
  font-size: 13px;
}

.print i{
  font-size: 25px;
}

.print{
  border: 1px solid black;
  width: 150px;
  border-radius: 5px;
  padding: 15px;
  cursor: pointer;
}

.print:hover{
  background-color: rgb(236, 244, 251);
}

.app-main__outer{
  overflow: auto;
}

@media print {
  /* .navbar {
    display: none !important;
  } */
  .print, .caisse , .decaissement{
    display: none !important;
  }
  nav{
    display: none !important;
  }
  footer{
    display: none !important;
  }
  
}

.fa{
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}
.table{
	margin-top: 5%;
  text-align: center;
  justify-content: center;

}         


thead tr{
    background-color: transparent;
}

tbody tr:last-of-type{
    border-bottom: 2px solid rgb(140, 140, 250);
}

.total td{
    border: 1px solid black;
}

.facture tbody tr:last-of-type{
  border-bottom: 2px solid rgb(140, 250, 149);
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
