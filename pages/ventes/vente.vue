<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Ventes </h3>
      <Userinfo />
    </nav>

    
  
    <div class="app-main__outer p-5">
        <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
            {{error}} 
        </div>
            <h4>Enregistrer une vente </h4><hr>
            <form action="" method="POST">
                <div class="cadre-haut">             
                    <div class="ajout-client">                                   
                        <select class="form-control"  v-model="form.client_id">
                            <option disabled value="">Choisir le client</option>
                            <option v-for="(client, index) in clients" :key="index" :label="client.name" :value="client.id">
                                {{client.name}}
                            </option>                           
                        </select>  
                        <!-- <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="Choisir le client...">
                        <datalist id="datalistOptions" v-model="form.client_id">
                                <option v-for="(client, index) in clients" :key="index"  :value="client.id" @click.prevent="voir()">
                                </option>     
                        </datalist> {{form.client_id}}777 -->
                        <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
                            {{errors.client_id}} 
                        </div>        -->
                        <button class="btn btn-info btn_ajout"  @click.prevent="showModal = true">
                            <i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter un client
                        </button>                
                    </div>
                    <div class="facture-date position-absolute end-0">
                    <span class="creation"> Date de création :</span> <input class="form-control"  type="datetime-local"  v-model="form.date_sell"/>                  
                    </div>
                </div> <hr>
                
                <div class="add_buttons d-flex"> 
                    <div class="col-md-5"><button class="btn-ajout" @click.prevent="showProduit = true"><i class="fa fa-plus-circle" aria-hidden="true"></i><br> Nouveau produit</button></div> 
                    <button class="ajout-article col-md-6" @click.prevent="addLine()"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter un article</button>             
                </div>

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
                            <tr v-for="(line, index) in form.sell_lines" :key="index">
                                <td>
                                    <select class="form-control" v-model="line.product_id" id="" @change="productChange"> 
                                        <option disabled value="">Choisissez...</option>
                                        <!-- <template > -->
                                        
                                            <option v-for="(product, i) in produits" :key="i" :value="product.id" :data-i="i" :data-index="index">{{product.name}}</option>
                                        <!-- </template> -->
                                    </select>
                                </td>
                                <td><input class="form-control" type="number" v-model="line.quantity" autocomplete="off" @change="quantityChange(index)" required></td> 
                                <td><input class="form-control" type="num" v-model="line.price" autocomplete="off" disabled ></td>
                                <td><input class="form-control" type="num" v-model="line.amount" autocomplete="off" disabled></td>
                                <td @change="taxChange()"><div @change="reduceAmount()"><input class="form-control" type="text" v-model="line.discount"  autocomplete="off" required @change="reduceChange(index)"></div></td>
                                <!-- <td><input class="form-control" type="number" v-model="form.tax" min="0" max="0" autocomplete="off"  required></td>                   -->
                                <td><input class="form-control" type="num" v-model="line.amount_after_discount" autocomplete="off" disabled></td>
                                <td @click="deleteLine(index)"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></td>
                            </tr>
                        </tbody>
                    </table>   
                    <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.amount">
                        Veuillez ajouter une ligne de vente
                    </div>   -->
                </div><br>
                <br>
                <div class="d-flex">
                    <div class="form-group1 col-md-4"> 
                        <strong>Montant Total Hors-Taxe</strong> <input class="form-control received" type="number" v-model="form.amount_ht"  autocomplete="off"  disabled>
                    </div>
                    <div class="form-group col-md-3 mx-4">
                        <strong>Taxe [0 -100]%</strong> <div @change="reduceAmount()"><input class="form-control received" type="number" v-model="form.tax"  autocomplete="off" placeholder="Exemple : 18" @change="taxChange()"></div>
                    </div>
                    <div class="form-group col-md-4">
                        <strong>Montant Total TTC </strong><input class="form-control received" type="number" v-model="form.amount_ttc"  autocomplete="off"  disabled>
                    </div>
                </div><br>
                <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.tax">
                        Veuillez ajouter la taxe
                </div>  
                    <br><br>
 
                <hr><br>
                <div class="d-flex">
                    <div class="form-group1 col-md-3"> 
                        <strong>Réduction (Prix ou %)</strong> <div><input class="form-control received" type="text" v-model="form.discount"  autocomplete="off"  required @change="reduceAmount()"></div>
                    </div>
                    <div class="form-group1 col-md-4 mx-4"> Somme reçue: <input class="form-control received" type="number" v-model="form.amount_received"  autocomplete="off"  required></div>
                    <div class="form-group col-md-4">
                        <div class="form-group ">
                            Méthode de paiement
                        <select class="form-control" v-model="form.payment">
                            <option value="">Choississez</option>
                            <option v-for="(methode, j) in methodes" :key="j" :value="methode">{{methode}}</option>
                        </select>
                        </div>
                    </div>
                </div>
                <div class="alert alert-danger justify-content-center" role="alert" v-if="amount_error != null">
                    {{amount_error}} 
                </div> 
                <br><br><br><br>
                <button class="custom-btn btn-5" v-on:click.prevent="submit()" :disabled="load">Enregistrer la facture <span  v-if="this.form.amount != ''"> pour  <span class="text-dark mx-3"  >{{this.form.amount}} F CFA</span></span></button>
        
            </form>
        
    </div>
    
    <ajoutModal v-show="showModal" @close-modal="showModal = false" @conf="setMessage" />
    <SavedModal v-show="showSaved" @close-modal="showSaved = false" :identifiant= 'cli_id'/>
    <produitModal v-show="showProduit" @close-modal="showProduit = false" @prod="setProduit"/>

</div>
 
</template>

<script>
import moment from "moment";
import SavedModal from './SavedModal.vue'
import ajoutModal from './ajoutModal.vue'
import produitModal from './produitModal.vue'
import Sidebar from '../sidebar.vue'
import Userinfo from '../user_info.vue'
export default {
    layout : 'empty',
    auth:true,
    components: {
        Sidebar, 
        ajoutModal, 
        SavedModal,
        produitModal,
        Userinfo
    },

    data () {
        return{
            load: false,
            amount_error: null,
            message: '',
            cli_id: '',
            showModal: false,
            showSaved: false,
            showProduit: false,
            clients: [],
            client: "",
            produits: [],
            form:{
                user_id: '',
                date_sell: moment().format("YYYY-MM-DDThh:mm"),
                client_id: '',
                amount: '',
                tax: '',
                discount: '0',
                amount_received: '0',
                sell_lines: [],
                payment: "ESPECES",
                amount_ttc: '',
                amount_ht: ''
            },
            errors: [],
            error: null,
            user: '',
            token: null,
            compagny: '',
            methodes: ''
        }
    },

    mounted () {
      this.compagny = localStorage.getItem('auth.company_id');   
      this.user = localStorage.getItem('auth.user_id')
      this.compagnie()
      this.refresh()
      this.recupProduct()
      this.payment()
    //   console.log(this.$auth)
    },
    
    methods: {

        // voir(){
        //     console.log(this.form.client_id);
        // },
        payment(){
            this.$axios.get('/invoice/payments',{params: {
            compagnie_id: localStorage.getItem('auth.company_id')
          }
          }).then(response =>
            {
                // console.log(response); 
                this.methodes = response.data.data })
        },

        addLine(){
            this.form.sell_lines.push({product_id: "", price: 0, quantity: 1, discount: 0, amount: 0, amount_after_discount: 0, compagnie_id: localStorage.getItem('auth.company_id'), date: this.form.date_sell});           
        },

        deleteLine(index){
        //   console.log(index);
          this.form.sell_lines.splice(index, 1)
        },

        setMessage(payload) {
            this.refresh()
            this.message = payload.message
            this.cli_id = payload.cli_id
        },
        
        setProduit(payload) {
            this.recupProduct()
        },

        async submit(){
            this.load = true
            await  this.$axios.post('/sells',{
              date_sell: this.form.date_sell,
              tax: this.form.tax,
              discount: this.form.discount,
              amount: this.form.amount,
              amount_ht: this.form.amount_ht,
              amount_ttc: this.form.amount_ttc,
              amount_received: this.form.amount_received,
              user_id: this.user,
              client_id: this.form.client_id,  
              sell_lines: this.form.sell_lines,
              payment: this.form.payment,
              compagnie_id: localStorage.getItem('auth.company_id') 
            }).then(response =>{ 
                console.log( response ) 
                this.error = response.data.message
                this.errors = response.data.data
                // console.log(this.error)
                    if(response.data.status == "success"){
                        this.cli_id = response.data.data.id
                        this.showSaved = true
                        this.$toast("Enregistrement d'une facture !!! ", {
                            icon: 'fa fa-check-circle',
                        })
                    }
                    else{
                        this.load = false
                        this.errors = response.data.data
                        // this.$router.push({path:'/clients/add_client'});
                    }
                
            }).catch( err => console.log( err ) )
                        //  console.log(this.form.name)                                        
        },
        
        refresh(){
            this.$axios.get('/clients',{params: {
            compagnie_id: localStorage.getItem('auth.company_id'),
            is_paginated: 0
          }
          }).then(response => {
            // console.log(response.data.data);
            this.clients = response.data.data
            })
        },

        recupProduct(){
            this.$axios.get('/products',{params: {
            compagnie_id: localStorage.getItem('auth.company_id'),
            is_paginated: 0
          }
          }).then(response => {
            // console.log(response.data.data);
            this.produits = response.data.data}) 
        },

        taxChange(){
            var pourcentage = this.form.tax / 100;
            // this.form.tax = pourcentage
            var taxe = this.form.amount_ht * pourcentage
            this.form.amount_ttc = this.form.amount_ht + taxe;

        },

        reduceAmount(){
            var red = this.form.discount;
            var percent = red.indexOf("%"); 

                if(percent != -1){
                    var newRed = red.substring(0, red.length - 1);
                    let calcul1 = this.form.amount_ttc * Number(newRed);
                    let calcul2 = calcul1 / 100
                    this.form.discount = calcul2
                    this.form.amount = this.form.amount_ttc - calcul2;
                } 
                else{
                    this.form.discount = red
                    this.form.amount = this.form.amount_ttc - red
                }   
        },

        quantityChange(index){
            let line = this.form.sell_lines[index]
            line.amount = Number(line.price) * Number(line.quantity);
            line.amount_after_discount = Number(line.price) * Number(line.quantity);
            let sum = 0;
            for (let j = 0; j < this.form.sell_lines.length; j++) {
                sum += this.form.sell_lines[j].amount_after_discount;
            }
            this.form.amount_ht = sum;
                    this.form.amount_ttc = sum;
                    this.form.amount =  this.form.amount_ttc;
                
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
                    for (let j = 0; j < this.form.sell_lines.length; j++) {
                        sum += this.form.sell_lines[j].amount_after_discount;
                    }
                    this.form.amount_ht = sum;
                    this.form.amount_ttc = sum;
                    this.form.amount =  this.form.amount_ttc;
                } 
                else{
                    line.amount_after_discount = calculQ - str;
                    let sum = 0;
                    for (let j = 0; j < this.form.sell_lines.length; j++) {
                        sum += this.form.sell_lines[j].amount_after_discount;
                    }
                    this.form.amount_ht = sum;
                    this.form.amount_ttc = sum;
                    this.form.amount =  this.form.amount_ttc;
                }   
        },


        productChange(e){
            if(e.target.options.selectedIndex > -1) {
                let i = e.target.options[e.target.options.selectedIndex].dataset.i;
                let index = e.target.options[e.target.options.selectedIndex].dataset.index;
                let product = this.produits[i];
                let line = this.form.sell_lines[index]
                line.price = product.price_sell;
                line.amount = Number(line.price) * Number(line.quantity);
                line.amount_after_discount = Number(line.price) * Number(line.quantity);
                    
                
                let sum = 0;
                for (let j = 0; j < this.form.sell_lines.length; j++) {
                    sum += this.form.sell_lines[j].amount_after_discount;
                }
                this.form.amount_ht = sum;
                this.form.amount_ttc = sum;
                this.form.amount = this.form.amount_ttc;
                // console.log(sum); 
            }    
        },

        compagnie(){
            this.$axios.get('/compagnies/'+ this.compagny,{params: {
            compagnie_id: localStorage.getItem('auth.company_id')
          }
          })
            .then(response => {
                // console.log(response.data.data )
            let compagnie = response.data.data[0];
            // this.clients = response.data.data
            this.token = compagnie.mecef_token
            // console.log(this.token)
          }      
        )
        }
   
    },

}
</script>

<style scoped>
.received {
    border: none; outline: none;
    border-bottom: 2px solid #605050;
}

.app-main__outer{
  overflow: auto;
  margin: 0 5%;
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

.btn-ajout{
    margin-top: 9%;
    border: 1px solid #53af57;
    padding: 10px;
    /* width: 100px; */
    font-size: 10px;
    border-radius: 15px;
    text-align: center;
    background-color: #53af57;
    color: #fff;
    cursor: pointer;
}

.btn-ajout i{
    font-size: 14px;
}


.facture-date{
    margin-top: 5%;
    font-size: 18px;
    margin-right: 10%;
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

.ajout-article .bx{
    font-size: 18px;
    margin-right: 10px;
}
.ajout-article{
    margin: 4%;
    text-align: center;
    background-color: rgb(238, 134, 64);
    border-radius: 10px;
    padding: 12px;
    cursor: pointer;
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
	margin-top: 5%;
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
  background: rgb(121, 161, 255);
background: linear-gradient(0deg, rgb(121, 161, 255) 0%, rgb(121, 161, 255) 100%);
}
.btn-5:hover {
  color: #0909f0;
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
  background: rgb(121, 161, 255);
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
    .add_buttons{
        margin: 50% 0;
    }
    .cadre-haut{
        display: inline;
        margin: 0;
    }

    .ajout-client{
        margin-right: 0;
        margin: 10px 5px;
        border: 1px solid darkblue;
        padding: 5px ;
    }

    .facture-date{
        position: fixed;
    }

    .table{
        overflow: auto;
    }

    .commande{
        margin: 15% 0;
    }
    .ajout-article{
        margin: 0;
    }
}
</style>

