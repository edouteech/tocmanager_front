<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name_side">Produits </h3>
      <User_info />
    </nav>

    <div class="app-main__outer py-5 px-2">
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
                <div class="form-group ">
                <label class="title">Choisissez le groupe de taxation du produit</label>
                <select class="form-control" v-model="form.tax_group">
                    <option value="">Choisissez...</option>
                    <option v-for="(groupe, j) in groupes" :key="j" :value="groupe">{{groupe}}</option>
                </select>
                </div>
            </div>

            <div class="form-group col-md-6">
                <label class="title">Entrer le code du produit</label>
                <input  type="text" class="form-control"  placeholder="CODE" v-model="form.code">
            </div>
            <!-- <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors.code">
                {{errors.code}}
            </div> -->
            
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
import User_info from '../user_info.vue'
export default {
    layout: "empty",
    auth: true,
    components: {
    Sidebar,
    User_info
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
                code: "",
                price_sell:'',
                price_buy:'',
                stock_min:'',
                stock_max:'',
                compagnie_id: '',
                tax_group: ''
            },
            error_message: "",
            error_champ: [],
            groupes: ''
        }
    },

    mounted() {
        this.group()
        this.refresh()
        this.$axios.get('/products/'+ this.$route.params.id,{
            params: {
              compagnie_id: localStorage.getItem('auth.company_id')
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
        this.form.stock_max = produit.stock_max,
        this.form.tax_group = produit.tax_group,
        this.form.code = produit.code
        }
        )
        
        
            
    },

    methods: {
        refresh(){
                this.$axios.get('/categories',{params: {
                compagnie_id: localStorage.getItem('auth.company_id')
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
                code: this.form.code,
                quantity: this.form.quantity,
                price_sell: this.form.price_sell,
                price_buy: this.form.price_buy,
                stock_min: this.form.stock_min,
                stock_max: this.form.stock_max,
                tax_group: this.form.tax_group,
                compagnie_id: localStorage.getItem('auth.company_id')
            }).then(response =>{this.$router.push({path:'/produits/list_produit',})   })                     
        },

        group(){
            this.$axios.get('/invoice/taxGroups',{params: {
            compagnie_id: localStorage.getItem('auth.company_id')
          }
          }).then(response =>
            {console.log(response); this.groupes = response.data.data })
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

.app-main__outer{
  overflow: auto;
}

input {
    border: none; outline: none;
    border-bottom: 2px solid #605050;
}
       
</style>