<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Produits </h3>
    </nav>

  
    <div class="app-main__outer p-5">
    <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
      {{error}} 
    </div>
      <h4>Enregistrer un nouveau produit </h4><hr>
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
            <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors.category_id">
                {{errors.category_id}}
            </div>

            <div class="form-group col-md-6">
                <label class="title">Entrer le nom du produit</label>
                <input type="text" class="form-control" v-model="form.name" autocomplete="off" required placeholder="Paracetamol">
            </div>
            <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors.name">
                {{errors.name}}
            </div>

            <div class="form-group col-md-6">
                <div class="form-group ">
                <label class="title">Choisissez le groupe de taxation du produit</label>
                <select class="form-control" v-model="form.tax_group">
                    <option value="">Choisissez...</option>
                    <option v-for="(groupe, j) in groupes" :key="j" :value="groupe">{{groupe}}</option>
                </select>
                </div>
            </div>
            <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors.tax_group">
                {{errors.tax_group}}
            </div>

            <div class="form-group col-md-6">
                <label class="title">Entrer la quantité</label>
                <input  type="number" class="form-control" placeholder="1200" v-model="form.quantity">
            </div>
            <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors.quantity">
                {{errors.quantity}}
            </div>

            <div class="form-group col-md-6">
                <label class="title">Entrer le prix de vente </label>
                <input type="number" class="form-control" placeholder="1500" v-model="form.price_sell" autocomplete="off" required>
            </div>
            <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors.price_sell">
                {{errors.price_sell}}
            </div>

            <div class="form-group col-md-6">
                <label class="title">Entrer le prix d'achat </label>
                <input type="number" class="form-control" placeholder="1000" v-model="form.price_buy" autocomplete="off" required>
            </div>
            <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors.price_buy">
                {{errors.price_buy}}
            </div>
            
            <div class="form-group col-md-6">
                <label class="title">Entrer le stock minimal </label>
                <input type="number" class="form-control" placeholder="1000" v-model="form.stock_min" autocomplete="off" required>
            </div> 
            <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors.stock_min">
                {{errors.stock_min}}
            </div>

            <div class="form-group col-md-6">
                <label class="title">Entrer le stock maximal </label>
                <input type="number" class="form-control" placeholder="1100" v-model="form.stock_max" autocomplete="off" required>
            </div> 
            <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors.stock_max">
                {{errors.stock_max}}
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
                compagnie_id:'',
                tax_group: ''
            },
            errors: [],
            error: null,
            groupes: '',
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
              price_buy: this.form.price_buy,
              stock_min: this.form.stock_min,
              tax_group: this.form.tax_group,
              stock_max: this.form.stock_max,
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }).then(response =>{
                // console.log( response ) 
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
            {
                // console.log(response); 
                this.categories = response.data.data.data })
        },

        group(){
            this.$axios.get('/invoice/taxGroups',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          }
          }).then(response =>
            {
                // console.log(response); 
                this.groupes = response.data.data })
        }

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