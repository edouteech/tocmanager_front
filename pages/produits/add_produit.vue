<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Produits </h3>
    </nav>

    <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
      {{error}} <br>
      <div class="error" v-if="errors['category_id'] != null">{{errors['category_id']}}</div>
      <div class="error" v-if="errors['name'] != null">{{errors['name']}}</div>
      <div class="error" v-if="errors['quantity'] != null">{{errors['quantity']}}</div>
      <div class="error" v-if="errors['price_sell'] != null">{{errors['price_sell']}}</div>
      <div class="error" v-if="errors['price_buy'] != null">{{errors['price_buy']}}</div>
      <div class="error" v-if="errors['stock_min'] != null">{{errors['stock_min']}}</div>
      <div class="error" v-if="errors['stock_max'] != null">{{errors['stock_max']}}</div>
    </div>
  
    <div class="app-main__outer p-5">
      <h4>Enregistrer un nouveau produit </h4>
        <form action="">
            <div class="form-group col-md-6">
                <div class="form-group ">
                <label class="title">Choisissez la categorie du produit à ajouter</label>
                <select class="form-control" v-model="form.category_id">
                    <option  disabled value="">Choisissez...</option>
                    <option v-for="(categorie, i) in categories" :key="i" :value="categorie.id">{{categorie.name}}</option>
                </select>
                </div>
            </div>
            <div class="form-group col-md-6">
                <label class="title">Entrer le nom du produit</label>
                <input type="text" class="form-control" v-model="form.name" autocomplete="off" required placeholder="Paracetamol">
            </div>
            <div class="form-group col-md-6">
                <label class="title">Entrer la quantité</label>
                <input  type="number" class="form-control" placeholder="1200" v-model="form.quantity">
            </div>
            <div class="form-group col-md-6">
                <label class="title">Entrer le prix de vente </label>
                <input type="number" class="form-control" placeholder="1500" v-model="form.price_sell" autocomplete="off" required>
            </div>
            <div class="form-group col-md-6">
                <label class="title">Entrer le prix d'achat </label>
                <input type="number" class="form-control" placeholder="1000" v-model="form.price_buy" autocomplete="off" required>
            </div>
            <div class="form-group col-md-6">
                <label class="title">Entrer le stock minimal </label>
                <input type="number" class="form-control" placeholder="1000" v-model="form.stock_min" autocomplete="off" required>
            </div> 
            <div class="form-group col-md-6">
                <label class="title">Entrer le stock maximal </label>
                <input type="number" class="form-control" placeholder="1100" v-model="form.stock_max" autocomplete="off" required>
            </div> 


            <button type="submit" class="btn btn-primary" v-on:click.prevent="submit()">Enregistrer le produit</button>
        </form>

</div>

</div>
</template>

<script>
import Sidebar from '../sidebar.vue'
export default {
    layout: "empty",
    auth: true,
    components: {
        Sidebar,
        
    },

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
            errors: [],
            error: null,
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
            }).then(response =>{
                console.log( response ) 
                this.error = response.data.message
                console.log(this.error)

                if(response.data.status == "success"){
                    this.$router.push({path:'/produits/list_produit'});
                }
                else{
                    this.errors = response.data.data
                    // this.$router.push({path:'/clients/add_client'});
                }
            })
            .catch( error => console.log( error ) )
                //  console.log(this.form.name)                
        },

        refresh(){
          this.$axios.get('/categories',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          }
          }).then(response =>
            {console.log(response); this.categories = response.data.data.data })
        },

    },
  
}
</script>

<style scoped>
form{
    margin-left: 10%;
    margin-top: 5%;
}

.form-group{
    margin-top: 2%;
}

.title{
    margin: 1% 0;
}

.btn{
    margin-top: 5%;
}

.app-main__outer{
  overflow: auto;
}

.fa{
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}
.table{
	margin-top: 5%;
}  

input::placeholder {
    font-size: 15px;
    opacity: 0.5;
}


</style>