<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Produits </h3>
    </nav>

    <div class="contenu">
      <h4>Modifier les informations de ce produit</h4>
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


            <button type="submit" class="btn btn-success" v-on:click.prevent="submit()">Modifier</button>
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
        this.refresh()
        this.$axios.get('/products/'+ this.$route.params.id,{
            params: {
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }
          }).then(response => 
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
        refresh(){
                this.$axios.get('/categories',{params: {
                compagnie_id: this.$auth.$storage.getUniversal('company_id')
                }
                }).then(response =>{console.log(response.data.data.data);
                    this.categories = response.data.data.data
                    })     
        },
        submit(){          
            this.$axios.put('products/' +this.$route.params.id,{
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

input {
    border: none; outline: none;
    border-bottom: 2px solid #605050;
}
       
</style>