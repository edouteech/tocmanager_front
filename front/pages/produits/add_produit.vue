<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Produits </h3>
    </nav>

    <div class="contenu">
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
            error_message: "",
            error_champ: [],
        }
    },

    mounted () {
      this.refresh()
    },

    methods: {
        async submit(){
            await  this.$axios.post('/create/product',{
              category_id: this.form.category_id,
              name: this.form.name,
              quantity: this.form.quantity,
              price_sell: this.form.price_sell,
              price_buy: this.form.price_buy,
              stock_min: this.form.stock_min,
              stock_max: this.form.stock_max,
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }).then(response =>{this.$router.push({path:'/produits/list_produit', })
                 }).catch( error => console.log( error ) )
              
        },

        refresh(){
          this.$axios.get('/index/categorie',{params: {
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
.contenu{
  margin: 5%;

}
.fa{
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}
.table{
	margin-top: 5%;

}      


</style>