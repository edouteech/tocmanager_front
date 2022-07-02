<template>
<div class="contain">
     <SideBar/>

 
  <div class="zone">  
        <div class="titre">
            Produits
        </div>          
          <form action="" method="POST">
              <p>Modifier les infos du produit</p>	
               <div class="input-form">					
                <input type="text" placeholder="Entrer la categorie " v-model="form.category_id" autocomplete="off" required>
                <span class="error">{{error_champ.name}}</span>
            </div>   
            <div class="input-form">					
                <input type="text" placeholder="Entrer le nom du produit " v-model="form.name" autocomplete="off" required>
                <span class="error">{{error_champ.name}}</span>
            </div>    
            <div class="input-form">        
                <input type="text" placeholder="Entrer la quantité " v-model="form.quantity" required>
                <span class="error">{{error_champ.phone}}</span>
            </div>
          
            <div class="input-form">    
                <input type="email" placeholder="Entrer le prix de vente " v-model="form.price_sell" autocomplete="off" required>
                <span class="error">{{error_champ.email}}</span>
            </div>
            <div class="input-form"> 
                <input type="text" placeholder="Entrer le prix d'achat " v-model="form.price_buy" autocomplete="off" required>
                <span class="error">{{error_champ.nature}}</span>
            </div>
            <div class="input-form"> 
                <input type="text" placeholder="Entrer le stock minimal " v-model="form.stock_min" autocomplete="off" required>
                <span class="error">{{error_champ.nature}}</span>
            </div>
            <div class="input-form"> 
                <input type="text" placeholder="Entrer le stock maximal " v-model="form.stock_max" autocomplete="off" required>
                <span class="error">{{error_champ.nature}}</span>
            </div>
            <div class="submit-form">
                <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer le produit" name="submit">				          
            </div>

          </form> 
      </div>

</div>

</template>

<script>
import SideBar from '../nav.vue'
export default {
    auth: true,
    components: {
        SideBar,  
    },
    data () {
        return{
            produit: "",
            produits: [],
            form: {
                category_id: '',
                name: '',
                quantity: '',
                price_sell:'',
                price_buy:'',
                stock_min:'',
                stock_max:'',
                compagnie_id: ''
            },
            error_message: "",
            error_champ: [],
        }
        },
        mounted() {
            this.$axios
            .get('/index/product/'+ this.$route.params.id)
            .then(response => 
            {console.log(response.data.data[0] )
            let produit = response.data.data[0];
            // this.produits = response.data.data        
            this.form.category_id = produit.category_id,
            this.form.name = produit.name,
            this.form.quantity = produit.quantity,
            this.form.price_sell = produit.price_sell,
            this.form.price_buy = produit.price_buy,
            this.form.stock_min = produit.stock_min,
            this.form.stock_max = produit.stock_max
            }
            )
                
        },

        methods: {
            submit(){          
                this.$axios.put('/update/product', {
                    id: this.$route.params.id,
                    category_id: this.form.category_id,
                    name: this.form.name,
                    quantity: this.form.quantity,
                    price_sell: this.form.price_sell,
                    price_buy: this.form.price_buy,
                    stock_min: this.form.stock_min,
                    stock_max: this.form.stock_max,
                    compagnie_id: this.$auth.$storage.getUniversal('company_id')
                }).then(response =>{this.$router.push({path:'/produits/list_produit',})   })                     
            }
        }
   
}
</script>

<style scoped>
.zone p{
    font-size: 18px;
}

form {
    width: 80%;
    padding-left: 100px;
    padding-right: 300px;
    padding-top: 50px;
}
.input-form {
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
        

input {
    padding: 8px;
    border: none; outline: none;
    border-bottom: 2px solid #605050;
}
       
input::placeholder {
    font-size: 15px;
    opacity: 0.5;
}

.submit-form {
    margin-top: 10%;
    text-align: right;       
}

input[type=submit] {
    background-color: white;
    color: black;
    padding: 10px 15px;
    margin: 8px 0;
    border: 1px solid #53af57;
    cursor: pointer;
    width: 100%;
    font-size: 15px;
}

input[type=submit]:hover{
    background-color: #53af57;
    color: white;
    border: 1px solid #53af57;
    font-size: 16px;
}

</style>
