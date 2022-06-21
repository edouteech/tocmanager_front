<template>
<div class="general">
    <div class="haut">
        <div class="user">
          <img src="../images/user.png" alt="logo" srcset="">
          <!-- Dashboard: {{$auth.$storage._state["_token.local"]}} -->
          <span class="user_name">{{$auth.user.name}}</span> 
          <button type="button" class="bg-red-700 text-white rounded p-3 ml-8" @click="logout">Déconnexion</button>    
        </div>
    </div>
  
    <div class="espace">
        <h3>Liste des produits dans le magazin</h3>
        <button type="button" class="bg-green-700 text-white rounded p-3"><NuxtLink to="/produits/add_produit">Ajouter nouveau produit</NuxtLink></button> 
        
        <table class="tableau">
            <thead>
                <tr>
                    <th>Id de la catégorie</th>
                    <th>Nom</th>
                    <th>Quantité</th>
                    <th>Prix de vente</th>
                    <th>Prix d'achat</th>
                    <th>Stock minimal</th>
                    <th>Stock maximal</th>
                    <th>Actions</th>
                </tr>
            </thead>
          
            <tbody>
              <tr  v-for="(produit, i) in produits" :key="i">
                <td>{{produit.category_id}}</td>
                <td>{{produit.name}}</td>
                <td>{{produit.quantity}}</td>
                <td>{{produit.price_sell}}</td>
                <td>{{produit.price_buy}}</td>
                <td>{{produit.stock_min}}</td>
                <td>{{produit.stock_max}}</td>
                <td>
                  <NuxtLink :to="'/edit_produit/'+produit.id"><i class='bx bxs-edit' alt="modifier"></i></NuxtLink>
                  <button @click="deleteProduit(produit.id)"><i class='bx bx-stop-circle'></i></button>
                </td>
              </tr>
            </tbody>

        </table>
    
    </div>
    <SideBar/> 
</div>

</template>

<script>
import axios from "axios";
import SideBar from '../nav.vue'
export default {
  // auth: true,
  components: {
    SideBar,  
  },

  data () {
    return {
      produits: [],
      produit: "",
    }
  },

  methods: {
        async logout(){
                this.$auth.logout();
                this.$router.push('/login');
        },

        deleteProduit(id){
          console.log(id);
          this.$axios
          .delete('/delete/product/' +id)
          .then(response => 
            {console.log(response.data.data);
            this.refresh()
                // this.client = response.data.data
                  // this.$router.push({
                  //   path:'/list_client',
                  // })
            })         
        },

        refresh(){
          this.$axios
        .get('/index/product')
        .then(response => 
            {console.log(response);
            this.produits = response.data.data.data
            }
            )
        }

    },
    mounted () {
      this.refresh()
    }
}
</script>

<style>

</style>
