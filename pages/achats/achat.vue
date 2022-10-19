<template>
<div>
    <!-- <link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css" rel="stylesheet" /> -->
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Achats </h3>
      <Userinfo />
    </nav>

    <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
      {{error}} <br>
      <!-- <div class="error" v-if="errors['amount'] != null">{{errors['amount']}}</div>
      <div class="error" v-if="errors['supplier_id'] != null">{{errors['supplier_id']}}</div>
      <div class="error" v-if="errors['date_buy'] != null">{{errors['date_buy']}}</div> -->
    </div>

    <div class="app-main__outer p-5">
        <div v-if="token != ''">
            <h4>Enregistrer un achat</h4><hr>
            <form action="" method="POST">
                <div class="cadre-haut">             
                    <div class="ajout-client">                   
                        <select class="form-control" v-model="form.supplier_id">
                            <option disabled value="">Choisir le fournisseur</option>
                            <!-- <option :value= four_id>{{message}}</option> -->
                            <option v-for="(fournisseur, index) in fournisseurs" :key="index" :label="fournisseur.name" :value="fournisseur.id">
                                {{fournisseur.name}}
                            </option>                           
                        </select>          
                        <div class="save-btn">
                            <div @click="showModal = true"><i class="fa fa-plus-circle" aria-hidden="true"></i>Ajouter un fournisseur</div>
                        </div>                   
                    </div>
                    <div class="facture-date ">
                    <span class="creation"> Date de création :</span> <input  type="datetime-local" class="form-control"  v-model="form.date_buy"/>                  
                    </div>
                </div> <hr>
                
                <div class="ajout-article" @click="addLine()"><i class="fa fa-plus-circle" aria-hidden="true"></i>Ajouter un article</div>
                
                <div class="btn-ajout" @click="showProduit = true"><i class="fa fa-plus-circle" aria-hidden="true"></i><br> Nouveau produit</div>
                <div class="commande">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Désignation</th>
                                <th>Quantité voulue</th>
                                <th>Prix unitaire</th>
                                <!-- <th>Taux de réduction (%)</th>
                                <th>Taxe appliquée (%)</th> -->
                                <th> Total</th>                     
                            </tr>
                        </thead>
                        
                        <tbody>
                            <tr v-for="(line, index) in form.buy_lines" :key="index">
                                <td>
                                    <select class="form-control " v-model="line.product_id" id="" @change="productChange">
                                        <option disabled value="">Choisissez...</option> 
                                        <option v-for="(product, i) in produits" :key="i" :value="product.id" :data-i="i" :data-index="index">{{product.name}}</option>
                                    </select>
                                </td>
                                <td><input class="form-control" type="number" v-model="line.quantity" autocomplete="off" @change="quantityChange(index)" required></td> 
                                <td><input class="form-control" type="num" v-model="line.price" autocomplete="off" required></td>
                                <!-- <td><input class="form-control" type="number" v-model="form.discount" min="0" max="0" autocomplete="off" required></td>
                                <td><input class="form-control" type="number" v-model="form.tax" autocomplete="off"  required></td>                     -->
                                <td><input class="form-control" type="number" v-model="line.amount" autocomplete="off" required></td>
                                <td @click="deleteLine(index)"><i class="fa fa-trash-o text-danger " aria-hidden="true"></i></td>
                            </tr>
                        </tbody>
                    </table>     
                </div><br>
                <div class="form-group1 col-md-6"> Somme envoyée: <input class="form-control received" type="number" v-model="form.amount_sent"  autocomplete="off"  required></div>  
                <div class="alert alert-danger justify-content-center" role="alert" v-if="amount_error != null">
                    {{amount_error}} 
                </div> 
                <br><br><br><br><br>
                <button class="custom-btn btn-5" v-on:click.prevent="submit()">Enregistrer la facture <span  v-if="this.form.amount != ''"> pour  <span class="text-dark mx-3"  >{{this.form.amount}} F CFA</span></span></button>
                <!-- <div class="submit">
                    <input type="submit" id='submit'  value="Enregistrer la facture " name="submit">{{this.form.amount}}		          
                </div>   -->
        
            </form>
        </div>

        <div v-else class="text-center">
                <h4 class=" text-danger">TOKEN INEXISTANT !!!</h4><br>
            <p>Veuillez remplir les informations relatives à votre entreprise notamment <strong>le token MeCEF.</strong>
            Dans le cas où vous n'etes pas <strong>l'administrateur principal de l'entreprise</strong>, veuillez contacter ce dernier pour
            la mise à jour des informations. </p>

        </div>
    </div>
    <ajoutModal v-show="showModal" @close-modal="showModal = false" @conf="setMessage"/>
    <SavedModal v-show="showSaved" @close-modal="showSaved = false" />
    <produitModal v-show="showProduit" @close-modal="showProduit = false"  @prod="setProduit"/>

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
    // head() {
    //   return {
    //     script: [
    //       {
    //         src: "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js"
    //       },
    //     ],

    //   }
    // },
    layout: "empty",
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
            amount_error: null,
            message: '',
            four_id: '',
            showModal: false,
            showSaved: false,
            showProduit: false,
            fournisseurs: [],
            fournisseur: "",
            produits: [],
            form:{
                    user_id: '',
                    date_buy: moment().format("YYYY-MM-DDThh:mm"),
                    supplier_id: '',
                    amount: '',
                    tax: '0',
                    discount: '0',
                    amount_sent: '0',
                    buy_lines: []          
                },
            errors: [],
            error: null,
            user: '',
            token: '',
            compagny: ''
        }
    },

    mounted () {
      this.compagny = localStorage.getItem('auth.company_id');   
      this.user == localStorage.getItem('auth.user_id')
      this.compagnie()
      this.refresh()
      this.recupProduct()
    },
    
    methods: {
        addLine(){
            this.form.buy_lines.push({product_id: "", price: 0, quantity: 1, amount: 0, compagnie_id: this.$auth.$storage.getUniversal('company_id')});
        },

        // deleteLine(){
        //     this.form.buy_lines.push({product_id: "", price: 0, quantity: 1, amount: 0, compagnie_id: this.$auth.$storage.getUniversal('company_id')});
        // },
        deleteLine(index){
          console.log(index);
          this.form.buy_lines.splice(index, 1)
        },

        setMessage(payload) {
            this.refresh()
            this.message = payload.message
            this.four_id = payload.four_id
        },

        setProduit(payload) {
            this.recupProduct()
        },

       

        async submit(){
                await  this.$axios.post('/buys',{
                    date_buy: this.form.date_buy,
                    tax: this.form.tax,
                    discount: this.form.discount,
                    amount: this.form.amount,
                    amount_sent: this.form.amount_sent,
                    user_id: this.user,
                    supplier_id: this.form.supplier_id,  
                    buy_lines: this.form.buy_lines,
                    compagnie_id: this.$auth.$storage.getUniversal('company_id')
                    }).then(response =>{ 
                        console.log( response ) 
                        this.error = response.data.message
                        this.errors = response.data.data
                        // console.log(this.error)
                        if(response.data.status == "success"){
                            this.$router.push({path:'/achats/SavedModal',})
                        }
                    
                        else{ 
                            this.errors = response.data.data
                        }
                }).catch( err => console.log( err ) )
                    //  console.log(this.form.name)                                        
        },


        refresh(){
            this.$axios.get('/suppliers',
            {
                params: {
                    compagnie_id: this.$auth.$storage.getUniversal('company_id'),
                    is_paginated: 0
                }
          }).then(response => {
            // console.log(response.data.data);
            this.fournisseurs = response.data.data})
        },

        recupProduct(){
            this.$axios.get('/products',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id'),
            is_paginated: 0
          }
          }).then(response => {
            // console.log(response.data.data);
            this.produits = response.data.data}) 
        },

        quantityChange(index){
            let line = this.form.buy_lines[index]
            line.amount = Number(line.price) * Number(line.quantity);
            let sum = 0;
            for (let j = 0; j < this.form.buy_lines.length; j++) {
                sum += this.form.buy_lines[j].amount;
            }
            this.form.amount = sum;
                
        },

        productChange(e){
            if(e.target.options.selectedIndex > -1) {
                let i = e.target.options[e.target.options.selectedIndex].dataset.i;
                let index = e.target.options[e.target.options.selectedIndex].dataset.index;
                let product = this.produits[i];
                let line = this.form.buy_lines[index]
                line.price = product.price_buy;
                line.amount = Number(line.price) * Number(line.quantity);
                    
                
                let sum = 0;
                for (let j = 0; j < this.form.buy_lines.length; j++) {
                    sum += this.form.buy_lines[j].amount;
                }
                this.form.amount = sum;
                // console.log(sum); 
            }

                
        },

        compagnie(){
            this.$axios.get('/compagnies/'+ this.compagny,{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          }
          })
            .then(response => {
                // console.log(response.data.data )
            let compagnie = response.data.data[0];
            // this.clients = response.data.data
            this.token = compagnie.mecef_token
          }      
        )
        }
   
   
    },

}
</script>

<style scoped>
/* .list_produit{
    overflow: scroll;
} */
.received {
    border: none; outline: none;
    border-bottom: 2px solid #605050;
}

.app-main__outer{
  overflow: auto;
  margin: 0 5%;
}

.commande{
    margin: 5% ;
}

.titrer{
  border: 1px solid #202020;
  padding: 3%;
  margin-bottom: 3%;
  margin-left: 1%;
  background-color: #202020;
  color: #fff;
  font-size: 24px;
  letter-spacing: 2px;
}

.cadre-haut{
    display: flex;
}

.ajout-client{
    margin: 30px 10px;
    border: 1px solid darkblue;
    padding: 50px ;
    margin-right: 50%;
  
}

.btn-ajout{
    border: 2px solid #53af57;
    padding: 5px;
    width: 100px;
    font-size: 10px;
    border-radius: 20%;
    text-align: center;
    cursor: pointer;
    margin: 0 50px;
}

.btn-ajout:hover{
    background-color: #53af57;
    color: #fff;
}
.btn-ajout i{
    font-size: 18px;
}

.save-btn {
    background-color: rgb(121, 161, 255);    
    font-size: 10px;
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
}

.facture-date{
    margin-top: 5%;
    font-size: 18px;
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
    width: 90%;
    background-color: rgb(8, 231, 97);
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
    .cadre-haut{
        display: inline;
    }

    .ajout-client{
        margin-right: 0;
        margin: 10px 5px;
        border: 1px solid darkblue;
        padding: 50px ;
    }

    .table{
        overflow: auto;
    }
}
</style>

