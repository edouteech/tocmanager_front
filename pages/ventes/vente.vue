<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Ventes </h3>
    </nav>

    <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
      {{error}} <br>
      <!-- <div class="error" v-if="errors['amount'] != null">{{errors['amount']}}</div> -->
      <!-- <div class="error" v-if="errors['client_id'] != null">{{errors['client_id']}}</div>
      <div class="error" v-if="errors['date_sell'] != null">{{errors['date_sell']}}</div> -->
    </div>
  
    <div class="app-main__outer p-5">
        <h4>Enregistrer une vente </h4><hr>
        <form action="" method="POST">
            <div class="cadre-haut">             
                <div class="ajout-client">                                   
                    <select class="form-control" v-model="form.client_id">
                        <option disabled value="">Choisir le client</option>
                        <!-- <option :value= cli_id>{{message}}</option> -->
                        <option v-for="(client, index) in clients" :key="index" :label="client.name" :value="client.id">
                            {{client.name}}
                        </option>                           
                    </select>          
                    <div class="save-btn" @click="showModal = true">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter un client
                    </div>                   
                </div>
                <div class="facture-date">
                   <span class="creation"> Date de création :</span> <input class="form-control"  type="datetime-local"  v-model="form.date_sell"/>                  
                </div>
            </div> <hr>
            
            <div class="ajout-article" @click="addLine()"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter un article</div>
            
              <div class="btn-ajout" @click="showProduit = true"><i class="fa fa-plus-circle" aria-hidden="true"></i><br> Nouveau produit</div>
             
            <div class="commande">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Désignation</th>
                            <th scope="col">Quantité voulue</th>
                            <th scope="col">Prix unitaire</th>
                            <!-- <th scope="col">Taux de réduction (%)</th>
                            <th scope="col">Taxe appliquée (%)</th> -->
                            <th scope="col">Total</th>                     
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr v-for="(line, index) in form.sell_lines" :key="index">
                            <td>
                                <select class="form-control" v-model="line.product_id" id="" @change="productChange"> 
                                    <option disabled value="">Choisissez...</option>
                                    <!-- <option :value= prod_id>{{nom_prod}}</option> -->
                                    <option v-for="(product, i) in produits" :key="i" :value="product.id" :data-i="i" :data-index="index">{{product.name}}</option>
                                </select>
                            </td>
                            <td><input class="form-control" type="number" v-model="line.quantity" autocomplete="off" @change="quantityChange(index)" required></td> 
                            <td><input class="form-control" type="num" v-model="line.price" autocomplete="off" required></td>
                            <!-- <td><input class="form-control" type="number" v-model="form.discount" min="0" max="0" autocomplete="off" required></td>
                            <td><input class="form-control" type="number" v-model="form.tax" min="0" max="0" autocomplete="off"  required></td>                   -->
                            <td><input class="form-control" type="num" v-model="line.amount" autocomplete="off" required></td>
                            <td @click="deleteLine(index)"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></td>
                        </tr>
                    </tbody>
                </table>     
            </div><br>
            <div class="form-group1 col-md-6"> Somme reçue: <input class="form-control received" type="number" v-model="form.amount_received"  autocomplete="off"  required></div>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="amount_error != null">
                {{amount_error}} 
            </div> <br><br><br><br>
            <button class="custom-btn btn-5" v-on:click.prevent="submit()">Enregistrer la facture <span  v-if="this.form.amount != ''"> pour  <span class="text-dark mx-3"  >{{this.form.amount}} F CFA</span></span></button>
            
            
            <!-- <div class="submit">
                <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer la facture pour " name="submit">		          
            </div>   -->
    
        </form>
    </div>
    
    <ajoutModal v-show="showModal" @close-modal="showModal = false" @conf="setMessage" />
    <SavedModal v-show="showSaved" @close-modal="showSaved = false" />
    <produitModal v-show="showProduit" @close-modal="showProduit = false" @prod="setProduit"/>

</div>
 
</template>

<script>
import moment from "moment";
import SavedModal from './SavedModal.vue'
import ajoutModal from './ajoutModal.vue'
import produitModal from './produitModal.vue'
import Sidebar from '../sidebar.vue'
export default {
    layout : 'empty',
    auth:true,
    components: {
        Sidebar, 
        ajoutModal, 
        SavedModal,
        produitModal,
    },

    data () {
        return{
            amount_error: null,
            message: '',
            cli_id: '0',
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
                    tax: '0',
                    discount: '0',
                    amount_received: '0',
                    sell_lines: []          
                },
            errors: [],
            error: null,
        }
    },
    // watch: {
    //     cli_id: {
    //         handler(, ) {
    //         },
    //     deep: true
    //     }
    // },

    mounted () {
      this.refresh()
      this.recupProduct()
    },
    
    methods: {
        addLine(){
            this.form.sell_lines.push({product_id: "", price: 0, quantity: 1, amount: 0, compagnie_id: this.$auth.$storage.getUniversal('company_id')});           
        },

        deleteLine(index){
          console.log(index);
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
        // setProd(payload) {
        // this.nom_prod = payload.nom_prod
        // this.prod_id = payload.prod_id
        // },

        async submit(){
            await  this.$axios.post('/sells',{
              date_sell: this.form.date_sell,
              tax: this.form.tax,
              discount: this.form.discount,
              amount: this.form.amount,
              amount_received: this.form.amount_received,
              user_id: this.$auth.user.id,
              client_id: this.form.client_id,  
              sell_lines: this.form.sell_lines,
              compagnie_id: this.$auth.$storage.getUniversal('company_id')  
            }).then(response =>{ 
                console.log( response ) 
                this.error = response.data.message
                this.errors = response.data.data
                console.log(this.error)
                    if(response.data.status == "success"){
                        this.$router.push({path:'/ventes/SavedModal',})
                    }
                    else{
                        this.errors = response.data.data
                        // this.$router.push({path:'/clients/add_client'});
                    }
                
            }).catch( err => console.log( err ) )
                        //  console.log(this.form.name)                                        
        },
        
        refresh(){
            this.$axios.get('/clients',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id'),
            is_paginated: 0
          }
          }).then(response => {console.log(response.data.data);
            this.clients = response.data.data
            })
        },

        recupProduct(){
            this.$axios.get('/products',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id'),
            is_paginated: 0
          }
          }).then(response => {console.log(response.data.data);
            this.produits = response.data.data}) 
        },

        quantityChange(index){
            let line = this.form.sell_lines[index]
            line.amount = Number(line.price) * Number(line.quantity);
            let sum = 0;
            for (let j = 0; j < this.form.sell_lines.length; j++) {
                sum += this.form.sell_lines[j].amount;
            }
            this.form.amount = sum;
                
        },

        productChange(e){
            if(e.target.options.selectedIndex > -1) {
                let i = e.target.options[e.target.options.selectedIndex].dataset.i;
                let index = e.target.options[e.target.options.selectedIndex].dataset.index;
                let product = this.produits[i];
                let line = this.form.sell_lines[index]
                line.price = product.price_sell;
                line.amount = Number(line.price) * Number(line.quantity);
                    
                
                let sum = 0;
                for (let j = 0; j < this.form.sell_lines.length; j++) {
                    sum += this.form.sell_lines[j].amount;
                }
                this.form.amount = sum;
                console.log(sum); 
            }    
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
    margin: 2% 1%;
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

