<template>
<div class="contain">
     <SideBar/>

      <div class="zone">
        <div class="titre">
           Modifier factures Achats
        </div>
        <form action="" method="POST">
            <h2>Modification</h2><hr>
            <div class="cadre-haut">             
                <div class="ajout-client">    
                    <i class='bx bxs-user-plus'></i>                                 
                    <select  v-model="form.fournisseur_id">
                        <option disabled value="">Choisir le fournisseur</option>
                        <option v-for="(fournisseur, index) in fournisseurs" :key="index" :label="fournisseur.name" :value="fournisseur.id">
                            {{fournisseur.name}}
                        </option>                           
                    </select>          
                    <div class="save-btn">
                        <div @click="showModal = true">Ajouter un fournisseur</div>
                    </div>                   
                </div>
                <div class="facture-date">
                   <span class="creation"> Date de création :</span> <input  type="datetime-local"  v-model="form.date_buy"/>                  
                </div>
            </div> <hr>
            
            <div class="ajout-article" @click="addLine()"><i class='bx bxs-alarm-add'></i>Ajouter un article</div>
            
              <div class="btn-ajout" @click="showProduit = true"><i class='bx bxs-plus-circle'></i><br> Nouveau produit</div>
            <div class="commande">
                <table class="tableau">
                    <thead>
                        <tr>
                            <th>Désignation</th>
                            <th>Quantité voulue</th>
                            <th>Prix unitaire</th>
                            <th>Taux de réduction (%)</th>
                            <th>Taxe appliquée (%)</th>
                            <th>Net à payer</th>
                            <th>Total</th>                     
                        </tr>
                    </thead>
                    
                    <tbody>
                        <tr v-for="(line, index) in form.buy_lines" :key="index">
                            <td>
                                <select v-model="line.product_id" id="" @change="productChange"> 
                                    <option v-for="(product, i) in produits" :key="i" :value="product.id" :data-i="i" :data-index="index">{{product.name}}</option>
                                </select>
                            </td>
                            <td><input type="number" v-model="line.quantity" autocomplete="off" @change="quantityChange(index)" required></td> 
                            <td><input type="num" v-model="line.price" autocomplete="off" required></td>
                            <td><input type="number" v-model="form.discount" min="0" max="0" autocomplete="off" required></td>
                            <td><input type="number" v-model="form.tax" min="0" max="0" autocomplete="off"  required></td> 
                            <td><input type="number" v-model="form.rest"  autocomplete="off"  required></td>                    
                            <td><input type="num" v-model="line.amount" autocomplete="off" required></td>
                        </tr>
                    </tbody>
                </table>     
            </div>
            <div class="submit">
                <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer la facture" name="submit">		          
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
import SideBar from '../nav.vue'
export default {
    auth:true,
    components: {
        SideBar, 
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
                rest: '0',
                buy_lines: []          
                },
            error_message: "",
            error_champ: [],
        }
    },

    mounted () {
      this.refresh()
      this.recupProduct()
      this.$axios.get('/index/achat/'+ this.$route.params.id)
          .then(response => {console.log(response.data.data[0] )
            let achat = response.data.data[0];
            // this.categories = response.data.data
            this.form.date_buy = achat.date_buy,
            this.form.fournisseur_id = achat.fournisseur_id,
            this.form.buy_lines = achat.sell_lines,   
            this.form.tax = achat.tax,
            this.form.discount = achat.discount,
            this.form.amount = achat.amount
          }        
        )          
    },
    methods: {
        addLine(){
            this.form.buy_lines.push({product_id: "", price: 0, quantity: 1, amount: 0});
            
        },
        
        async submit(){
            await  this.$axios.post('/create/achat',{
              date_buy: this.form.date_buy,
              tax: this.form.tax,
              discount: this.form.discount,
              amount: this.form.amount,
              rest: this.form.rest,
              user_id: this.$auth.user.id,
              fournisseur_id: this.form.fournisseur_id,  
              buy_lines: this.form.buy_lines  
            }).then(response =>{ console.log(response)
                    this.$router.push({path:'/achats/SavedModal',})
              }).catch( error => console.log( error ) )                            
        },

        refresh(){
            this.$axios.post('/index/fournisseur',{
                compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }).then(response => {console.log(response);
            this.fournisseurs = response.data.data.data})
        },

        recupProduct(){
            this.$axios.post('/index/product',{
                compagnie_id: this.$auth.$storage.getUniversal('company_id')
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
.tableau{
	border-collapse: collapse;
	width: auto;
	box-shadow: 0 5px 50px transparent;
	border: 2px solid transparent;
	text-align: center;
	font-size: 13px;
}      
thead tr{
    background-color: transparent;
}
th, td{
    padding: 15px 20px;
    border: 1px solid #ddd
}
tbody, tr, td, th{
    border: 1px solid #ddd
}

tbody tr:last-of-type{
    border-bottom: 2px solid rgb(140, 140, 250);
}




</style>

