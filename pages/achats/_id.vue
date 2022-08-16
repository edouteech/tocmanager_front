<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Achats </h3>
    </nav>

    <div class="contenu">
        <h4>Modifier les informations de cet achat</h4><hr>
        <form action="" method="POST">
            <div class="cadre-haut">             
                <div class="ajout-client">                   
                    <select class="form-control" v-model="form.supplier_id">
                        <option disabled value="">Choisir le fournisseur</option>
                        <option v-for="(fournisseur, index) in fournisseurs" :key="index" :label="fournisseur.name" :value="fournisseur.id">
                            {{fournisseur.name}}
                        </option>                           
                    </select>  
                    <div class="save-btn">
                        <div @click="showModal = true"><i class="fa fa-plus-circle" aria-hidden="true"></i>Ajouter un fournisseur</div>
                    </div>                  
                </div>
                <div class="facture-date">
                   <span class="creation"> Date de création :</span> <input  type="datetime-local" class="form-control"  v-model="form.date_buy"/>                  
                </div>
            </div> <hr>
            
            <div class="ajout-article" @click="addLine()"><i class="fa fa-plus-circle" aria-hidden="true"></i>Ajouter un article</div>
            
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
                        </tr>
                    </tbody>
                </table>     
            </div><br>
            <div class="form-group1 col-md-6"> Somme reçue: <input class="form-control received" type="num" v-model="form.amount_sent"  autocomplete="off"  required></div>
            <div class="submit">
                <input type="submit" id='submit' @click.prevent="submit()" value="Enregistrer la facture" name="submit">		          
            </div>  
    
        </form>
    </div>
    <ajoutModal v-show="showModal" @close-modal="showModal = false"/>
    <SavedModal v-show="showSaved" @close-modal="showSaved = false" />
    <produitModal v-show="showProduit" @close-modal="showProduit = false"/>

</div>
 
</template>

<script>
import SavedModal from './SavedModal.vue'
import ajoutModal from './ajoutModal.vue'
import produitModal from './produitModal.vue'
import Sidebar from '../sidebar.vue'
export default {
    layout: "empty",
    auth:true,
    components: {
        Sidebar, 
        ajoutModal, 
        SavedModal,
        produitModal,
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
                amount_sent: '',
                buy_lines: []          
                },
            error_message: "",
            error_champ: [],
        }
    },

    mounted () {
      this.refresh()
      this.recupProduct()
      this.$axios.get('buys/'+ this.$route.params.id)
          .then(response => {console.log(response.data.data[0] )
            let achat = response.data.data[0];
            // this.categories = response.data.data
            this.form.date_buy = achat.date_buy,
            this.form.supplier_id = achat.supplier_id,
            this.form.buy_lines = achat.buy_lines,   
            this.form.tax = achat.tax,
            this.form.discount = achat.discount,
            this.form.amount = achat.amount
            this.form.amount_sent = achat.amount_sent
          }        
        )          
    },
    methods: {
        addLine(){
            this.form.buy_lines.push({product_id: "", price: 0, quantity: 1, amount: 0});
            
        },
        
        submit(){
           this.$axios.put('/buys/' +this.$route.params.id,{
              id: this.$route.params.id,
              date_buy: this.form.date_buy,
              tax: this.form.tax,
              discount: this.form.discount,
              amount: this.form.amount,
              amount_received: this.form.amount_received,
              user_id: this.$auth.user.id,
              fournisseur_id: this.form.fournisseur_id,  
              buy_lines: this.form.buy_lines  
            }).then(response =>{ 
                console.log( response ) 
                this.error = response.data.message
                console.log(this.error)
                if(this.form.amount_sent != 0){
                    this.$axios.put('/decaissements',{
                        montant: this.form.amount_sent,
                        date: this.form.date_buy,
                        supplier_id: this.form.supplier_id,
                        user_id: this.$auth.user.id,
                        compagnie_id: this.$auth.$storage.getUniversal('company_id')
                        }) .then(response => {console.log(response);
                        
                        this.$router.push({path:'/encaissements/list_encaissement', })
                    })
                    
                }
                else{
                    
                    this.$router.push({path:'/encaissements/list_encaissement', })
                    // this.$router.push({path:'/categorie/add_client'});
                }
             }).catch( err => console.log( err ) )
                      
        },
         

        refresh(){
            this.$axios.get('/suppliers',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }
            }).then(response => {console.log(response);
            this.fournisseurs = response.data.data.data})
        },

        recupProduct(){
            this.$axios.get('/products',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }
            }).then(response => {console.log(response.data.data.data);
            this.produits = response.data.data.data}) 
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
                line.price = product.price_sell;
                line.amount = Number(line.price) * Number(line.quantity);
                    
                
                let sum = 0;
                for (let j = 0; j < this.form.buy_lines.length; j++) {
                    sum += this.form.buy_lines[j].amount;
                }
                this.form.amount = sum;
                console.log(sum); 
            }

                
        }
   
    },

}
</script>

<style scoped>
.contenu{
  margin: 5%;
  overflow: auto;
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


</style>

