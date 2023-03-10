<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name_side">Ventes </h3>
      <User_info />
    </nav>

    <div class="app-main__outer py-5 px-2">
        <div class="alert alert-danger justify-content-center" role="alert" v-if="error">
            {{error}} 
        </div>
        <h4>Modifier les infomations de cette vente</h4><hr>
            <form action="" method="POST">
                <div class="row">        
                    <div class="col-md-6">    
                        <div class="ajout-client">  
                            <v-select 
                                placeholder="Choississez le client"
                                v-model="form.client_id"
                                label="name"
                                :options="clients"
                                :reduce="(client) => client.id"
                                append-to-body
                            />   
                            <button class="btn btn-info btn_ajout"  @click.prevent="showModal = true">
                                <i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter un client
                            </button>                
                        </div>
                    </div>
                    <div class="col-md-6 facture-date my-auto">
                        <span class="creation"> Date de création :</span> <input class="form-control"  type="datetime-local"  v-model="form.date_sell"/>                  
                    </div>
                </div> <hr>
                
                <div class="add_buttons row col-md-12 boom"> 
                    <div class="d-flex col-md-8">
                        <div class="col-md-4"><button class="btn btn-outline-primary col-md-11 mx-auto" @click.prevent="showProduit = true"><i class="fa fa-plus-circle" aria-hidden="true"></i><br> Nouveau produit</button></div> 
                        <div class="col-md-8"><button class="btn btn-outline-warning col-md-12 mx-auto" @click.prevent="addLine()"><i class="fa fa-plus-circle" aria-hidden="true"></i><br> Ajouter un article</button></div>           
                    </div>
                    <div class="col-md-4 mt-2">
                        <div class="d-flex code_recherche">
                            <input class="form-control " type="search" placeholder="code..." v-model="codeProd"  aria-label="Search" @input="searchCode()" @click.prevent="searchCode()">
                            <button class="btn btn-outline-success" type="submit" @click.prevent="codeAdd()"><i class="fa fa-plus" aria-hidden="true"></i></button>
                        </div>
                        <div class="alert alert-danger justify-content-center" role="alert" v-if="codeError">
                            {{codeError}} 
                        </div> 
                    </div>                    
                </div>
                <!-- {{ form.sell_lines }} -->
                <div class="commande table-responsive">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Désignation</th>
                                <th scope="col">Quantité voulue</th>
                                <th scope="col">Prix unitaire</th>
                                <th scope="col">Total</th>  
                                <th scope="col">Réduction (Prix ou %)</th>
                                <th scope="col">Total après réduction</th>  
                                <!-- <th scope="col">Taxe appliquée (%)</th> -->                   
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr v-for="(line, index) in form.sell_lines" :key="index" v-show="line._destroy != 1">
                                <td class="table-coll">
                                    <v-select 
                                        placeholder="Choississez..."
                                        v-model="line.product_id"
                                        label="name"
                                        :options="produits"
                                        :selectable="(produit) => produit.quantity > 0"
                                        :reduce="(produit) => produit.id"
                                        append-to-body
                                        @input="productChange(line.product_id, index)"
                                    >
                                        <template #option="{ name, code, quantity }" style="background-color: blue;">
                                            
                                        <div :style="(quantity<=0)?'color: red;':''" >{{ name }} [{{quantity}}] ({{ code }})</div>
                                        </template>
                                    </v-select>
                                </td>
                                <td class="table-cole"><input class="form-control" type="number" v-model="line.quantity" autocomplete="off" @change="quantityChange(index)" required></td> 
                                <td class="table-col"><input class="form-control" type="num" v-model="line.price" autocomplete="off" disabled ></td>
                                <td class="table-col"><input class="form-control" type="num" v-model="line.amount" autocomplete="off" disabled></td>
                                <td class="table-col"><div><input class="form-control" type="text" v-model="line.discount"  autocomplete="off" required @change="reduceChange(index)"></div></td>
                                <!-- <td class="table-col"><input class="form-control" type="number" v-model="form.tax" min="0" max="0" autocomplete="off"  required></td>                   -->
                                <td class="table-col"><input class="form-control" type="num" v-model="line.amount_after_discount" autocomplete="off" disabled></td>
                                <td @click="deleteLine(index)"><i class="fa fa-trash-o text-danger cursor-pointer" aria-hidden="true"></i></td>
                            </tr>
                        </tbody>
                    </table>   
                    <div class="alert alert-danger justify-content-center" role="alert" v-if="errors_amount">
                        Veuillez ajouter une ligne de vente
                    </div>  
                </div><br>
                <br>
                <div class="row">
                    <div class="form-group col-md-4"> 
                        <strong>Réduction (Prix ou %)</strong> <div  @change="taxChange()"><input class="form-control received" type="text" v-model="form.discount"  autocomplete="off"  required @change="reduceAmount()"></div>
                    </div>
                    <div class="form-group col-md-4"> 
                        <strong>Montant Total Hors-Taxe</strong> <input class="form-control received" type="number" v-model="form.amount_ht"  autocomplete="off"  disabled>
                    </div>
                    
                    <div class="form-group col-md-4 ">
                        <div class="form-group ">
                            Méthode de paiement
                        <select class="form-control" v-model="form.payment">
                            <option value="">Choississez</option>
                            <option v-for="(methode, j) in methodes" :key="j" :value="methode">{{methode}}</option>
                        </select>
                        </div>
                    </div>
                </div><br>
 
                <hr><br>
                <div class="row">
                    <div class="form-group col-md-3 ">
                        <strong>Taxe [0 -100]%</strong> <div><input class="form-control received" type="number" v-model="form.tax"  autocomplete="off" placeholder="Exemple : 18" @change="taxChange()"></div>
                    </div>
                    <div class="form-group col-md-3">
                        <strong>Montant Total TTC </strong><input class="form-control received" type="number" v-model="form.amount_ttc"  autocomplete="off"  disabled>
                    </div>
                    <div class="form-group col-md-3"> 
                        Somme reçue: <input class="form-control received" type="number" v-model="form.amount_received"  autocomplete="off"  required>
                    </div>
                    <div class="form-group col-md-3"> 
                        Echéance de paiement: 
                        <select v-model="echeance" class="form-control">
                            <option disabled value="">Choisissez</option>
                            <option value="30" >30</option>
                            <option value="60">60</option>
                            <option value="90">90</option>
                        </select>
                    </div>
                </div>
                <div class="alert alert-danger justify-content-center" role="alert" v-if="errors_tax">
                        Veuillez ajouter la taxe
                </div>  
                <div class="alert alert-danger justify-content-center" role="alert" v-if="amount_error != null">
                    {{amount_error}} 
                </div> 
                <br><br><br><br>
                <div class="col-md-6 mx-auto">
                    <button class="custom-btn btn-5 col-md-12" v-on:click.prevent="submit()" :disabled="load">Modifier la facture <span  v-if="this.form.amount != ''"> pour  <span class="text-dark mx-3"  >{{this.form.amount}} F CFA</span></span></button>
                </div>
            </form>
        
    </div>
    <ajoutModal v-show="showModal" @close-modal="showModal = false"/>
    <SavedModal v-show="showSaved" @close-modal="showSaved = false"/>
    <produitModal v-show="showProduit" @close-modal="showProduit = false"/>
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
        Copyright © 2022 - Tous droits réservés TocManager
      </div>
      <!-- Copyright -->
    </footer>
  <!-- Footer -->
</div>
 
</template>

<script>
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css';
import moment from "moment";
import SavedModal from './SavedModal.vue'
import ajoutModal from './ajoutModal.vue'
import produitModal from './produitModal.vue'
import Sidebar from '../sidebar.vue'
import User_info from "../user_info.vue";
export default {
    layout: "voir",
    auth:true,
    components: {
    Sidebar,
    ajoutModal,
    SavedModal,
    produitModal,
    User_info,
    vSelect
},

    data () {
        return{
            load: false,
            amount_error: null,
            showModal: false,
            showSaved: false,
            showProduit: false,
            clients: [],
            client: "",
            produits: [],
            form:{
                user_id: '',
                date_sell: '',
                client_id: '',
                amount: '',
                tax: '0',
                discount: '',
                amount_received: '0',
                sell_lines: [],
                payment: "ESPECES",
                amount_ttc: '',
                amount_ht: ''          
            },
            errors: [],
            error: null,
            user: '',
            compagny: '',
            methodes: '',
            element_searchCli: '',
            element_searchProd: '',
            designations: '',
            acteurs: '',
            afficheCli: 0,
            afficheProd: 0,
            recherche: '',
            echeance: "",
            errors_tax: null,
            errors_amount: null,
            codeProd: '',
            codeError: null
        }
    },

    mounted () {
      this.user = localStorage.getItem('auth.user_id')
      this.compagny = localStorage.getItem('auth.company_id');   
      this.refresh()
      this.recupProduct()
      this.payment()
      this.recupFacture()
               
    },
    
    methods: {
        
        choiceProd(designation,i){
            console.log(i);
            let line = this.form.sell_lines[i]
            this.element_searchProd = designation.name
            line.product_id = designation.id
            this.afficheProd = 0
        },
        
        searchProd(){
          this.afficheProd =1
          this.$axios.get('/products',{params: {
            compagnie_id: localStorage.getItem('auth.company_id'),
            search: this.element_searchProd,
            is_paginated: 0
          }
          })
          .then(response => {
            // console.log(response.data);
            this.designations = response.data.data 
          
          })
        },

        
        choiceCli(acteur){
            this.element_searchCli = acteur.name
            this.form.client_id = acteur.id
            this.afficheCli= 0
        },
        
        searchCli(){
          this.afficheCli =1
          this.$axios.get('/clients',{params: {
            compagnie_id: localStorage.getItem('auth.company_id'),
            search: this.element_searchCli,
            is_paginated: 0
          }
          })
          .then(response => {
            // console.log(response.data);
            this.acteurs = response.data.data 
          
          })
        },

        recupFacture(){
            this.$axios.get('/sells/'+ this.$route.params.id,{params: {
                compagnie_id: localStorage.getItem('auth.company_id')
            }
            })
            .then(response => {
                // console.log(response.data.data[0] )
                let vente = response.data.data[0];
                // this.categories = response.data.data
                this.form.date_sell = moment(vente.date_sell).format("YYYY-MM-DDThh:mm"),
                this.form.client_id = vente.client.id,
                this.form.sell_lines = vente.sell_lines,   
                this.form.tax = vente.tax,
                this.form.discount = vente.discount,
                this.form.amount = vente.amount
                this.form.amount_ht = vente.amount_ht
                this.form.amount_ttc = vente.amount_ttc
                this.form.payment = vente.payment
                this.form.amount_received = vente.amount - vente.rest
            }) 
        },

        addLine(){
            this.form.sell_lines.push({product_id: "", price: 0, quantity: 1, discount: 0, amount: 0, amount_after_discount: 0, compagnie_id: localStorage.getItem('auth.company_id'), date: this.form.date_sell});           
        },

        deleteLine(index){
        //   console.log(this.form.sell_lines[index].id);
            this.form.discount = 0
            this.form.tax = 0
          if(this.form.sell_lines[index].id){
            this.form.sell_lines[index]["_destroy"] = 1
            let lineDestroy = this.form.sell_lines[index].amount_after_discount
            this.$forceUpdate()
            let sum = 0;
            for (let j = 0; j < this.form.sell_lines.length; j++) {
                sum += this.form.sell_lines[j].amount_after_discount;
            }
            this.form.amount_ht = sum - lineDestroy;
            this.form.amount_ttc = sum - lineDestroy;
            this.form.amount =  this.form.amount_ttc;
          }
          else{
            this.form.sell_lines.splice(index, 1)
            let sum = 0;
            for (let j = 0; j < this.form.sell_lines.length; j++) {
                sum += this.form.sell_lines[j].amount_after_discount;
            }
            this.form.amount_ht = sum;
            this.form.amount_ttc = sum;
            this.form.amount =  this.form.amount_ttc;
          }
        },
        
        payment(){
            this.$axios.get('/invoice/payments',{params: {
            compagnie_id: localStorage.getItem('auth.company_id')
          }
          }).then(response =>
            {
                // console.log(response); 
                this.methodes = response.data.data })
        },
        
        async submit(){
            this.load =true
            await this.$axios.get('/sells/'+ this.$route.params.id,{params: {
                compagnie_id: localStorage.getItem('auth.company_id')
            }
            })
            .then(response => {
                // console.log(response.data.data[0] )
                let vente = response.data.data[0];
                    this.$axios.put('/sells/' +this.$route.params.id,{
                        id: this.$route.params.id,
                        date_sell: this.form.date_sell,
                        tax: this.form.tax,
                        discount: this.form.discount,
                        amount: this.form.amount,
                        amount_ht: this.form.amount_ht,
                        amount_ttc: this.form.amount_ttc,
                        amount_received: this.form.amount_received,
                        user_id: this.user,
                        client_id: this.form.client_id,  
                        payment: this.form.payment,
                        sell_lines: this.form.sell_lines,
                        compagnie_id: localStorage.getItem('auth.company_id')
                    }).then(response =>{ 
                        // console.log( response ) 
                        this.error = response.data.message
                        console.log(this.error)
                        if(response.data.status == 'success'){
                            this.$toast("Modification éffectuée  !!! ", {
                                icon: 'fa fa-check-circle',
                            })
                            this.$router.push({path:'/ventes/list_vente'})
                        }
                        else{
                            this.load = false
                            this.error = response.data.message
                            this.errors = response.data.data
                            this.errors_tax = response.data.data.tax
                            this.errors_amount = response.data.data.amount
                            
                        }
                    }).catch( err => console.log( err ) )
                
            }) 
                 
        },



        refresh(){
            this.$axios.get('/clients',{params: {
                is_paginated: 0,
                compagnie_id: localStorage.getItem('auth.company_id')
          }
          }).then(response => {
            // console.log(response);
            this.clients = response.data.data})
        },

        recupProduct(){
            this.$axios.get('/products',{params: {
            compagnie_id: localStorage.getItem('auth.company_id'),
            is_paginated: 0
          }
          }).then(response => {
            // console.log(response.data.data.data);
            this.produits = response.data.data}) 
        },

       
        taxChange(){
            var pourcentage = this.form.tax / 100;
            // this.form.tax = pourcentage
            var taxe = this.form.amount_ht * pourcentage
            this.form.amount_ttc = this.form.amount_ht + taxe;
            this.form.amount = this.form.amount_ht + taxe
        },

        reduceAmount(){
            this.form.tax = 0
            var red = this.form.discount;
            var percent = red.indexOf("%"); 
            let sum = 0;
            let lineDestroy = 0
            for (let j = 0; j < this.form.sell_lines.length; j++) {
                if(this.form.sell_lines[j]._destroy){
                    lineDestroy += this.form.sell_lines[j].amount_after_discount
                }
                sum += this.form.sell_lines[j].amount_after_discount;
            }
                let tot = sum - lineDestroy
                if(percent != -1){
                    var newRed = red.substring(0, red.length - 1);
                    let calcul1 = tot * Number(newRed);
                    let calcul2 = calcul1 / 100
                    this.form.discount = calcul2
                    this.form.amount = tot - calcul2;
                    this.form.amount_ht = tot -calcul2
                } 
                else{
                    this.form.discount = red
                    this.form.amount = tot - red
                    this.form.amount_ht = tot -red
                }   
        },

        quantityChange(index){
            let line = this.form.sell_lines[index]
            line.amount = Number(line.price) * Number(line.quantity);
            line.amount_after_discount = Number(line.price) * Number(line.quantity);
            let sum = 0;
            let lineDestroy = 0
            for (let j = 0; j < this.form.sell_lines.length; j++) {
                if(this.form.sell_lines[j]._destroy){
                    lineDestroy += this.form.sell_lines[j].amount_after_discount
                }
                sum += this.form.sell_lines[j].amount_after_discount;
            }
            this.form.amount_ht = sum - lineDestroy;
            this.form.discount = 0
            this.form.tax = 0
            this.taxChange()
                
        },

        reduceChange(index){
            let line = this.form.sell_lines[index]
            let calculQ = Number(line.price) * Number(line.quantity)
            line.amount = calculQ
            var str = line.discount;
            var percent = str.indexOf("%"); 

                if(percent != -1){
                    var newStr = str.substring(0, str.length - 1);
                    let calculR = calculQ * Number(newStr);
                    let Rprix = calculR / 100
                    line.amount_after_discount = calculQ - Rprix;
                    let sum = 0;
                    let lineDestroy = 0
                    for (let j = 0; j < this.form.sell_lines.length; j++) {
                        if(this.form.sell_lines[j]._destroy){
                            lineDestroy += this.form.sell_lines[j].amount_after_discount
                        }
                        sum += this.form.sell_lines[j].amount_after_discount;
                    }
                    this.form.amount_ht = sum - lineDestroy;
                    this.form.amount_ttc = sum - lineDestroy;
                    this.form.amount =  this.form.amount_ttc;
                    this.form.discount = 0
                    this.form.tax = 0
                    this.taxChange()
                } 
                else{
                    line.amount_after_discount = calculQ - str;
                    let sum = 0;
                    let lineDestroy = 0
                    for (let j = 0; j < this.form.sell_lines.length; j++) {
                        if(this.form.sell_lines[j]._destroy){
                            lineDestroy += this.form.sell_lines[j].amount_after_discount
                        }
                        sum += this.form.sell_lines[j].amount_after_discount;
                    }
                    this.form.amount_ht = sum - lineDestroy;
                    this.form.amount_ttc = sum - lineDestroy;
                    this.form.amount =  this.form.amount_ttc;
                    this.form.discount = 0
                    this.form.tax = 0
                    this.taxChange()
                }   
        },


        productChange(IdProduit, IndexSellLines){
            
            for(let k = 0; k <= this.produits.length; k++){
                if(this.produits[k].id == IdProduit){
                    let ProdId = this.produits[k].id
                    let ProdPrice = this.produits[k].price_sell
                    // this.form.sell_lines.push({product_id: ProdId, price: ProdPrice, quantity: 1, discount: 0, amount: ProdPrice, amount_after_discount: ProdPrice, compagnie_id: localStorage.getItem('auth.company_id'), date: this.form.date_sell});  
                    // this.form.sell_lines.splice(this.form.sell_lines.length - 2, 1); 
                    this.form.sell_lines[IndexSellLines].product_id = ProdId
                    this.form.sell_lines[IndexSellLines].price = ProdPrice
                    this.form.sell_lines[IndexSellLines].quantity = 1
                    this.form.sell_lines[IndexSellLines].discount = 0
                    this.form.sell_lines[IndexSellLines].amount = ProdPrice
                    this.form.sell_lines[IndexSellLines].amount_after_discount = ProdPrice
                    let sum = 0;
                    let lineDestroy = 0
                    for (let j = 0; j < this.form.sell_lines.length; j++) {
                        if(this.form.sell_lines[j]._destroy){
                            lineDestroy += this.form.sell_lines[j].amount_after_discount
                        }
                        sum += this.form.sell_lines[j].amount_after_discount;
                    }
                    this.form.amount_ht = sum - lineDestroy;
                    this.form.discount = 0
                    this.form.tax = 0                  
                    this.taxChange()
                    break;
                }
            }  
        },
   
    },

}
</script>

<style scoped>

.ajout-client {
    margin: 30px 0;
    border: 1px solid #04012f;
    padding: 30px 20px;
    width: 300px;
}


.facture-date{
    margin: 30px 0;
    border: 1px solid #04012f;
    padding: 30px 20px;
    font-size: 18px;
}

.table-col{
    width: 15%;
}
.table-cole{
    width: 10%;
}

.codeSearch-results{
    border: 1px solid ;
    /* width: 14%; */
    position: absolute;
    z-index: 99;
    background-color: #fefefe;
}

.codeSearch-results a{
    color: #605050;
    text-decoration: none;
}

.codeSearch-results ul{
    list-style: none;
    overflow: auto;
    padding: 0;
    height: 200px;
    text-align: left;
}

.codeSearch-results li{
    padding: 2px 10px;
}

.codeSearch-results li:hover{
    background-color: rgb(103, 180, 247);
}
.select2-cli{
    border: 1px solid ;
    width: 14%;
    position: absolute;
    z-index: 99;
    background-color: #fefefe;
}

.select2-cli a{
    color: #605050;
    text-decoration: none;
}

.select2-cli ul{
    list-style: none;
    overflow: auto;
    padding: 0;
    height: 200px;
    text-align: left;
}

.select2-cli li{
    padding: 2px 10px;
}

.select2-cli li:hover{
    background-color: rgb(103, 180, 247);
}

.close-img {
    width: 25px;
    cursor: pointer;
}

.select2-prod{
    border: 1px solid ;
    width: 10%;
    position: absolute;
    z-index: 99;
    background-color: #fefefe;
}

.select2-prod a{
    color: #605050;
    text-decoration: none;
}

.select2-prod ul{
    list-style: none;
    overflow: auto;
    padding: 0;
    height: 200px;
    text-align: left;
}

.select2-prod li{
    padding: 2px 10px;
}

.select2-prod li:hover{
    background-color: rgb(103, 180, 247);
}

.received {
    border: none; outline: none;
    border-bottom: 2px solid #605050;
}

.app-main__outer{
  overflow: none;
  margin: 0 2%;
}

.commande{
    margin: 5%;
}


.cadre-haut{
    display: flex;
}

.ajout-client{
    margin: 30px 10px;
    border: 1px solid darkblue;
    padding: 30px 20px;
    /* margin-right: 50%; */
}

.btn-ajout:hover{
    background-color: #fefefe;
    color: rgb(0, 0, 0);
}


.facture-date .creation{
    text-decoration: underline;
    font-weight: bold;
    padding-right: 1%;
}
.facture-date input{
    border: none; 
    outline: none;
}

.code_recherche input{
    height: 45px;
    margin: 20px 0;
}

.code_recherche .btn{
    height: 40px;
}


.modal .input-form {
    display: flex;
    flex-direction: column-reverse;
    margin: 1.2em 0;
    height: 50px;
}
     

.modal input {
    padding: 8px;
    border: none; outline: none;
    border-bottom: 2px solid #605050;
}
       
.modal input::placeholder {
    font-size: 15px;
    opacity: 0.5;
}

.modal .submit-form {
    margin-top: 10%;
    text-align: right;       
}

.modal input[type=submit] {
    background-color: white;
    color: black;
    padding: 10px 15px;
    margin: 8px 0;
    border: 1px solid #53af57;
    cursor: pointer;
    width: 100%;
    font-size: 15px;
}

.modal input[type=submit]:hover{
    background-color: #53af57;
    color: white;
    border: 1px solid #53af57;
    font-size: 16px;
}

.submit {
    margin-top: 10%;
    text-align: right;   
    margin-right: 10px;    
}

input[type=submit] {
    background-color: white;
    color: black;
    padding: 10px 15px;
    margin: 8px 0;
    border: 1px solid #3c05f1;
    cursor: pointer;
    width: 60%;
    font-size: 15px;
}

input[type=submit]:hover{
    background-color: #b8a5f6;
    color: white;
    border: 1px solid #b8a5f6;
    font-size: 16px;
}

.table{
    text-align: center;
}      


thead tr{
    background-color: transparent;
}


tbody tr:last-of-type{
    border-bottom: 2px solid rgb(140, 140, 250);
}



button {
  margin: 25px;
  
}

.custom-btn {
  /* width: 130px;
  height: 40px; */
  color: #fff;
  border-radius: 5px;
  padding: 20px 35px;
  font-weight: bold;
  font-size: 20px;
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

/* 5 */
.btn-5 {
  /* width: 130px;
  height: 40px; */
  line-height: 42px;
  padding: 20px ;
  border: none;
  background: rgb(36, 243, 17);
background: linear-gradient(0deg, rgb(112, 245, 51) 0%, rgb(109, 246, 55) 100%);
}
.btn-5:hover {
  color: #09f009;
  background: transparent;
   box-shadow:none;
}
.btn-5:before,
.btn-5:after{
  content:'';
  position:absolute;
  top:0;
  right:0;
  height:2px;
  width:0;
  background: rgb(103, 251, 40);
  box-shadow:
   -1px -1px 5px 0px #fff,
   7px 7px 20px 0px #0003,
   4px 4px 5px 0px #0002;
  transition:400ms ease all;
}
.btn-5:after{
  right:inherit;
  top:inherit;
  left:0;
  bottom:0;
}
.btn-5:hover:before,
.btn-5:hover:after{
  width:100%;
  transition:800ms ease all;
}

@media screen and (max-width: 900px) {
    .form-group{
        margin: 10px 0;
    }

    .commande{
        margin: 15% 0;
    }
    .ajout-article{
        margin: 0;
    }
}
</style>

