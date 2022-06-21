<template>
<div class="general">
      <div class="haut">
          <div class="user">
            <img src="../images/user.png" alt="logo" srcset="">
            <span class="user_name">{{$auth.user.name}}</span> 
            <button type="button" class="bg-red-700 text-white rounded p-3 ml-8" @click="logout">Déconnexion</button>    
          </div>
      </div>

      <div class="espace">            
          <form action="" method="POST">
              <h1>Modifier les infos du produit</h1>	
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
  <SideBar/> 
</div>

</template>

<script>
import SideBar from '../nav.vue'
export default {
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
              stock_max:''
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
        async logout(){
            this.$auth.logout();
            this.$router.push('/login');
        },
          
        submit(){          
            this.$axios.put('/update/product', {
            id: this.$route.params.id,
            category_id: this.form.category_id,
            name: this.form.name,
            quantity: this.form.quantity,
            price_sell: this.form.price_sell,
            price_buy: this.form.price_buy,
            stock_min: this.form.stock_min,
            stock_max: this.form.stock_max
            })
            .then(response =>{
                this.$router.push({
                  path:'/produits/list_produit',})
            })          
        }
    }
   
}
</script>

<style>

</style>
