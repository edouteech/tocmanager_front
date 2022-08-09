<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler" @click.stop>                     
        <form action="" method="POST">
            <h1>Ajout rapide de produit</h1>
            <div class="input-form"> 
                <select v-model="form.category_id" id="categorie">
                    <option disabled value="">Choisissez la categorie du produit à ajouter</option>
                    <option v-for="(categorie, i) in categories" :key="i" :value="categorie.id">{{categorie.name}}</option>
                </select>
                <!-- <input type="text" placeholder="Entrer la categorie " v-model="form.category_id" autocomplete="off" required> -->
                <span class="error">{{error_champ.nature}}</span>
            </div>  
            <div class="input-form">					
                <input type="text" placeholder="Entrer le nom du produit " v-model="form.name" autocomplete="off" id="name_prod" required>
                <span class="error">{{error_champ.name}}</span>
            </div>    
            <div class="input-form">        
                <input type="number" placeholder="Entrer la quantité " v-model="form.quantity" id="quantite" required>
                <span class="error">{{error_champ.phone}}</span>
            </div>
          
            <div class="input-form">    
                <input type="number" placeholder="Entrer le prix de vente " v-model="form.price_sell" id="vente" autocomplete="off" required>
                <span class="error">{{error_champ.email}}</span>
            </div>
            <div class="input-form"> 
                <input type="number" placeholder="Entrer le prix d'achat " v-model="form.price_buy" autocomplete="off" id="achat" required>
                <span class="error">{{error_champ.nature}}</span>
            </div>
            <div class="input-form"> 
                <input type="number" placeholder="Entrer le stock minimal " v-model="form.stock_min" autocomplete="off" id="min" required>
                <span class="error">{{error_champ.nature}}</span>
            </div>
            <div class="input-form"> 
                <input type="number" placeholder="Entrer le stock maximal " v-model="form.stock_max" autocomplete="off" id="max" required>
                <span class="error">{{error_champ.nature}}</span>
            </div>
            <div class="submit-form" @click="$emit('close-modal')">
                <input type="submit" id='submit' @click.prevent="submit()" value="Enregistrer le produit" name="submit">				          
            </div>

        </form>
    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="/images/fermer.png" alt="" />
    </div>
  </div>
</template>

<script>
  export default {
    auth:true,
    name: 'produitModal',
    data () {
    return{
        categories: [],
        categorie: '',
        form: {
            category_id: '',
            name: '',
            quantity: '',
            price_sell:'',
            price_buy:'',
            stock_min:'',
            stock_max:'',
            compagnie_id:''
        },
        error_message: "",
        error_champ: [],
    }
    },

    mounted () {
      this.refresh()
    },

    methods: {
         async submit(){
            await  this.$axios.post('/products',{
              category_id: this.form.category_id,
              name: this.form.name,
              quantity: this.form.quantity,
              price_sell: this.form.price_sell,
              price_buy: this.form.price_buy,
              stock_min: this.form.stock_min,
              stock_max: this.form.stock_max,
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            })
           .then(response =>{console.log(response.data.data) })
            document.getElementById("categorie").value='';
            document.getElementById("name_prod").value='';
            document.getElementById("quantite").value='';
            document.getElementById("vente").value='';
            document.getElementById("achat").value='';
            document.getElementById("min").value='';
            document.getElementById("max").value='';
              
        },

        refresh(){
          this.$axios.get('/categories',
          {
            params: {
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }
          }).then(response =>
            {console.log(response); this.categories = response.data.data.data })
        },

    }
}
</script>

<style scoped>
form {
    padding: 50px;
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
    font-size: 16px;
    opacity: 0.8;
}

.submit-form {
    margin-top: 10%;
    text-align: center;       
}

input[type=submit] {
    background-color: white;
    color: black;
    padding: 10px 15px;
    margin: 8px 0;
    border: 1px solid #0971fa;
    cursor: pointer;
    width: 60%;
    font-size: 15px;
}

input[type=submit]:hover{
    background-color: #0971fa;
    color: white;
    border: 1px solid #0971fa;
    font-size: 16px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #949292da;
}

.modaler {
  text-align: center;
  background-color: white;
  height: 800px;
  width: 600px;
  margin-top: 1%;
  padding: 15px 0;
  border-radius: 20px;
}
.close {
  margin: 1% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}

@media screen and (max-width: 400px) {
.modaler {
 overflow: auto;  
}

}

</style>