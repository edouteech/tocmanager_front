<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler" @click.stop>  
      <div class="alert alert-danger justify-content-center" role="alert" v-if="status == 'error'">
        {{error}} <br>
        <div class="error" v-if="errors['category_id'] != null">{{errors['category_id']}}</div>
        <div class="error" v-if="errors['name'] != null">{{errors['name']}}</div>
        <div class="error" v-if="errors['quantity'] != null">{{errors['quantity']}}</div>
        <div class="error" v-if="errors['price_sell'] != null">{{errors['price_sell']}}</div>
        <div class="error" v-if="errors['price_buy'] != null">{{errors['price_buy']}}</div>
        <div class="error" v-if="errors['stock_min'] != null">{{errors['stock_min']}}</div>
        <div class="error" v-if="errors['stock_max'] != null">{{errors['stock_max']}}</div>
      </div>                   
        <form action="" method="POST">
            <h1>Ajout rapide de produit</h1>
            <div class="input-form"> 
                <select class="form-control" v-model="form.category_id" id="categorie">
                    <option disabled value="">Choisissez la categorie du produit à ajouter</option>
                    <option v-for="(categorie, i) in categories" :key="i" :value="categorie.id">{{categorie.name}}</option>
                </select>
            </div>  
            <div class="input-form">					
                <input type="text" placeholder="Entrer le nom du produit " v-model="form.name" autocomplete="off" id="name_prod" required>
            </div>    
            <div class="input-form">
                <select class="form-control" v-model="form.tax_group">
                    <option value="">Choisissez le groupe de taxation du produit</option>
                    <option v-for="(groupe, j) in groupes" :key="j" :value="groupe">{{groupe}}</option>
                </select>
            </div>  
            <div class="input-form">        
                <input type="number" placeholder="Entrer la quantité " v-model="form.quantity" id="quantite" required>
            </div>
          
            <div class="input-form">    
                <input type="number" placeholder="Entrer le prix de vente " v-model="form.price_sell" id="vente" autocomplete="off" required>
            </div>
            <div class="input-form"> 
                <input type="number" placeholder="Entrer le prix d'achat " v-model="form.price_buy" autocomplete="off" id="achat" required>
            </div>
            <div class="input-form"> 
                <input type="number" placeholder="Entrer le stock minimal " v-model="form.stock_min" autocomplete="off" id="min" required>
            </div>
            <div class="input-form"> 
                <input type="number" placeholder="Entrer le stock maximal " v-model="form.stock_max" autocomplete="off" id="max" required>
            </div>
            <div class="submit-form" @click="$emit('close-modal')">
                <input type="submit" id='submit' @click.prevent="submit()" value="Enregistrer" name="submit">				          
            </div>
            <!-- <div v-else class="submit-form">
                <input type="submit" id='submit' @click.prevent="submit()" value="Enregistrer" name="submit">				          
            </div> -->

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
            tax_group: '',
            quantity: '',
            price_sell:'',
            price_buy:'',
            stock_min:'',
            stock_max:'',
            compagnie_id:''
        },
        errors: [],
        error: null,
        status: '',
        groupes: ''
    }
    },

    mounted () {
      this.refresh()
      this.group()
    },

    methods: {
         async submit(){
            await  this.$axios.post('/products',{
              category_id: this.form.category_id,
              name: this.form.name,
              quantity: this.form.quantity,
              price_sell: this.form.price_sell,
              tax_group: this.form.tax_group,
              price_buy: this.form.price_buy,
              stock_min: this.form.stock_min,
              stock_max: this.form.stock_max,
              compagnie_id: localStorage.getItem('auth.company_id')
            })
           .then(response =>{
            // console.log(response)
            this.$emit('prod', { nom_prod: this.form.name, prod_id: response.data.data.id, prod_sell: response.data.data.price_sell })
            this.error = response.data.message
                // console.log(this.error)
                this.status = response.data.status
                this.errors = response.data.data
                if(this.status == 'success'){
                  // alert('Nouveau produit ajouté avec succès');
                    this.form.category_id = '',
                    this.form.name = '',
                    this.form.quantity = '',
                    this.form.price_sell = '',
                    this.form.price_buy = '',
                    this.form.stock_min = '',
                    this.form.stock_max = '',
                    this.form.tax_group = ''
                }
                else{
                  // alert("Echec lors de l'ajout du produit ! Veuillez réessayer.");
                  this.status = response.data.status
                    this.errors = response.data.data
                    // this.$router.push({path:'/categorie/add_client'});
                }
            }).catch( err => console.log( err ) )
            
            },

        refresh(){
          this.$axios.get('/categories',
          {
            params: {
              compagnie_id: localStorage.getItem('auth.company_id')
            }
          }).then(response =>
            {
              // console.log(response); 
              this.categories = response.data.data.data })
        },

        group(){
                this.$axios.get('/invoice/taxGroups',{params: {
                compagnie_id: localStorage.getItem('auth.company_id')
              }
              }).then(response =>
                {
                    // console.log(response); 
                    this.groupes = response.data.data })
            }

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
  overflow: auto;
}

.modaler {
  text-align: center;
  background-color: white;
  height: max-content;
  width: 600px;
  margin-top: 1%;
  padding: 15px 0;
  border-radius: 20px;
}
.close {
  margin: 1% 0 0 -5px;
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