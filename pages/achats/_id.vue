<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Achats </h3>
      <Userinfo />
    </nav>

    <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
      {{error}} <br>
    </div>
    <div class="app-main__outer p-5">
        <h4>Modifier les informations de cet achat</h4><hr>
        <form action="" method="POST">
            <div class="cadre-haut">             
                <div class="ajout-client">                                   
                    
                    <div @click.prevent="searchCli()"><input class="form-control me-2" type="search" placeholder="recherche..." v-model="element_searchCli"  aria-label="Search" @input="searchCli()"></div>
                    <div class="select2-cli" v-if="afficheCli !=0">
                        <ul>
                            <li v-for="(acteur, index) in acteurs" :key="index" :label="acteur.name" :value="acteur.id"  @click.prevent="choiceCli(acteur)"><a href="">{{acteur.name}}</a></li>
                        </ul>
                    </div>         
                    <button class="btn btn-info btn_ajout"  @click.prevent="showModal = true">
                        <i class="fa fa-plus-circle" aria-hidden="true"></i>Ajouter un fournisseur
                    </button>                
                </div>
                <div class="facture-date position-absolute end-0">
                    <span class="creation"> Date de création :</span> <input class="form-control"  type="datetime-local"  v-model="form.date_buy"/>                  
                </div>
            </div> <hr>
            
            <div class="add_buttons d-flex"> 
                <div class="col-md-5"><button class="btn-ajout" @click.prevent="showProduit = true"><i class="fa fa-plus-circle" aria-hidden="true"></i><br> Nouveau produit</button></div> 
                <button class="ajout-article col-md-6" @click.prevent="addLine()"><i class="fa fa-plus-circle" aria-hidden="true"></i> Ajouter un article</button>             
            </div>

            
            <div class="commande">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>Désignation</th>
                            <th>Quantité voulue</th>
                            <th>Prix unitaire</th>
                            <th>Taux de réduction (%)</th>
                            <th>Taxe appliquée (%)</th>
                            <th>Total</th>                     
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr v-for="(line, index) in form.buy_lines" :key="index">
                            <td>
                                <select class="form-control" v-model="line.product_id" id="" @change="productChange"> 
                                    <option v-for="(product, i) in produits" :key="i" :value="product.id" :data-i="i" :data-index="index">{{product.name}}</option>
                                </select>
                            </td>
                            <td><input class="form-control" type="number" v-model="line.quantity" autocomplete="off" @change="quantityChange(index)" required></td> 
                            <td><input class="form-control" type="num" v-model="line.price" autocomplete="off" required></td>
                            <td><input class="form-control" type="number" v-model="form.discount" min="0" max="0" autocomplete="off" required></td>
                            <td><input class="form-control" type="number" v-model="form.tax" min="0" max="0" autocomplete="off"  required></td>                    
                            <td><input class="form-control" type="num" v-model="line.amount" autocomplete="off" required></td>
                            <td @click="deleteLine(index)"><i class="fa fa-trash-o text-danger" aria-hidden="true"></i></td>
                        </tr>
                    </tbody>
                </table>     
            </div><br>
            <div class="d-flex">
                    <div class="form-group1 col-md-4"> Somme envoyée: <input class="form-control received" type="number" v-model="form.amount_sent"  autocomplete="off"  required></div>  
                    <div class="form-group col-md-6 mx-5">
                        <div class="form-group ">
                            Méthode de paiement
                        <select class="form-control" v-model="form.payment">
                            <option value="">Choississez</option>
                            <option v-for="(methode, j) in methodes" :key="j" :value="methode" >{{methode}}</option>
                        </select>
                        </div>
                    </div>
                </div>
            <br><br><br><br><br>
            <button class="custom-btn btn-5" v-on:click.prevent="submit()">Enregistrer la facture <span  v-if="this.form.amount != ''"> pour  <span class="text-dark mx-3"  >{{this.form.amount}} F CFA</span></span></button>
            <!-- <div class="submit">
                <input type="submit" id='submit'  value="Enregistrer la facture " name="submit">{{this.form.amount}}		          
            </div>   -->
    
        </form>
    </div>
    <ajoutModal v-show="showModal" @close-modal="showModal = false"/>
    <SavedModal v-show="showSaved" @close-modal="showSaved = false" />
    <produitModal v-show="showProduit" @close-modal="showProduit = false"/>

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
            showModal: false,
            showSaved: false,
            showProduit: false,
            fournisseurs: [],
            fournisseur: "",
            produits: [],
            form:{
                user_id: '',
                date_buy: '',
                fournisseur_id: '',
                amount: '',
                tax: '0',
                discount: '0',
                amount_sent: '0',
                buy_lines: []          
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
            afficheProd: 0
        }
    },

    mounted () {
      this.user == localStorage.getItem('auth.user_id')
      this.refresh()
      this.recupProduct()
      this.payment()
      this.$axios.get('buys/'+ this.$route.params.id,{params: {
            compagnie_id: localStorage.getItem('auth.company_id')
          }
        })
          .then(response => {
            // console.log(response.data.data[0] )
            let achat = response.data.data[0];
            // this.categories = response.data.data
            this.form.date_buy = moment(achat.date_buy).format("YYYY-MM-DDThh:mm"),
            this.element_searchCli = achat.supplier.name,
            this.form.buy_lines = achat.buy_lines,   
            this.form.tax = achat.tax,
            this.form.discount = achat.discount,
            this.form.amount = achat.amount
            this.form.payment = achat.payment
            this.form.amount_sent = achat.amount_sent
          }        
        )          
    },
    methods: {
        choiceProd(designation,i){
            console.log(i);
            let line = this.form.buy_lines[i]
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
            this.form.supplier_id = acteur.id
            this.afficheCli= 0
        },

        searchCli(){
        this.afficheCli =1
        this.$axios.get('/suppliers',{params: {
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
            this.form.buy_lines.push({product_id: "", price: 0, quantity: 1, amount: 0, compagnie_id: localStorage.getItem('auth.company_id')});
        },
        addLine(){
            this.form.buy_lines.push({product_id: "", price: 0, quantity: 1, amount: 0});
            
        },

        deleteLine(index){
          this.form.buy_lines.splice(index, 1)
        },
        
        async submit(){
            await this.$axios.get('/buys/'+ this.$route.params.id,{params: {
                compagnie_id: localStorage.getItem('auth.company_id')}
            }).then(response => {
                // console.log(response.data.data[0] )
                let achat = response.data.data[0];
                if(this.element_searchCli == achat.supplier.name){
            
                    this.$axios.put('/buys/' +this.$route.params.id,{
                        id: this.$route.params.id,
                        date_buy: this.form.date_buy,
                        tax: this.form.tax,
                        discount: this.form.discount,
                        amount: this.form.amount,
                        payment: this.form.payment,
                        amount_sent: this.form.amount_sent,
                        user_id: this.user,
                        supplier_id: achat.supplier_id,  
                        buy_lines: this.form.buy_lines,  
                        compagnie_id: localStorage.getItem('auth.company_id')
                        }).then(response =>{ 
                            console.log( response ) 
                            this.error = response.data.message
                            console.log(this.error)
                            if(response.data.status == 'success'){
                                this.$router.push({path:'/ventes/list_vente'})
                            }
                            else{
                                this.error = response.data.message
                            }
                        }).catch( err => console.log( err ) )

                }else{
                    this.$axios.put('/buys/' +this.$route.params.id,{
                        id: this.$route.params.id,
                        date_buy: this.form.date_buy,
                        tax: this.form.tax,
                        discount: this.form.discount,
                        amount: this.form.amount,
                        payment: this.form.payment,
                        amount_sent: this.form.amount_sent,
                        user_id: this.user,
                        supplier_id: this.form.supplier_id, 
                        buy_lines: this.form.buy_lines,  
                        compagnie_id: localStorage.getItem('auth.company_id')
                        }).then(response =>{ 
                            console.log( response ) 
                            this.error = response.data.message
                            console.log(this.error)
                            if(response.data.status == 'success'){
                                this.$router.push({path:'/ventes/list_vente'})
                            }
                            else{
                                this.error = response.data.message
                            }
                        }).catch( err => console.log( err ) )
                            
                        }
                    }) 
                      
        },
         

        refresh(){
            this.$axios.get('/suppliers',{params: {
                is_paginated: 0,
                compagnie_id: localStorage.getItem('auth.company_id')
            }
            }).then(response => {
                // console.log(response);
            this.fournisseurs = response.data.data})
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

        quantityChange(index){
            let line = this.form.buy_lines[index]
            line.amount = Number(line.price) * Number(line.quantity);
            let sum = 0;
            for (let j = 0; j < this.form.buy_lines.length; j++) {
                sum += this.form.buy_lines[j].amount;
            }
            this.form.amount = sum;
                
        },

        reduceChange(index){
            let line = this.form.sell_lines[index]
            let calculQ = Number(line.price) * Number(line.quantity)
            var str = line.discount;
            var percent = str.indexOf("%"); 

                if(percent !== -1){
                    var newStr = str.substring(0, str.length - 1);
                    let calculR = calculQ * Number(newStr);
                    let Rprix = calculR / 100
                    line.amount = calculQ - Rprix;
                    let sum = 0;
                    for (let j = 0; j < this.form.sell_lines.length; j++) {
                        sum += this.form.sell_lines[j].amount;
                    }
                    this.form.amount = sum;
                } 
                else{
                    line.amount = calculQ - str;
                    let sum = 0;
                    for (let j = 0; j < this.form.sell_lines.length; j++) {
                        sum += this.form.sell_lines[j].amount;
                    }
                    this.form.amount = sum;
                }   
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

                
        }
   
    },

}
</script>

<style scoped>

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
.app-main__outer{
  overflow: auto; 
  margin: 0 5%;
}

.commande{
    margin: 5% 10%;
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

.error{               
    color: red;
    margin-bottom: -10%;
    font-size: 12px;
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
    width: 40%;
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
        margin: 30% 0;
    }
    .cadre-haut{
        display: inline;
        margin: 0;
    }

    .ajout-client{
        margin-right: 0;
        margin: 10px 5px;
        border: 1px solid darkblue;
        padding: 50px ;
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

