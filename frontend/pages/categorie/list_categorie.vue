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
      <h3>Liste des catégories de produits</h3>
      <button type="button" class="bg-green-700 text-white rounded p-3"><NuxtLink to="/categorie/add_categorie">Ajouter catégorie</NuxtLink></button> 
      
      <table class="tableau">
          <thead>
              <tr>
                  <th>Noms</th>              
                  <th>Actions</th>
              </tr>
          </thead>
        
          <tbody>
            <tr  v-for="(categorie, i) in categories" :key="i">
              <td>{{categorie.name}}</td>
              <td>
                <NuxtLink :to="'/edit_categorie/'+categorie.id"><i class='bx bxs-edit' alt="modifier"></i></NuxtLink>
                <button @click="deleteCategorie(categorie.id)"><i class='bx bx-stop-circle'></i></button>
              </td>
            </tr>
          </tbody>

      </table>
    
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
      return {
        categories: [],
        categorie: "",
      }
    },
    methods: {
      async logout(){
          this.$auth.logout();
          this.$router.push('/login');
      },

       deleteCategorie(id){
          console.log(id);
          this.$axios
          .delete('/delete/categorie/' +id)
          .then(response => 
            {console.log(response.data.data);
            this.refresh()})                 
        },
        
        refresh(){
          this.$axios
        .get('/index/categorie')
        .then(response => 
            {console.log(response);
            this.categories = response.data.data.data
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
.user{
    display: flex;    
}
.user img{
    width: 30px;
    border: 1px solid transparent;
    border-radius: 100%;
}
.user .user_name{
    font-size: 15px;
    padding: 7px;
}
.haut{
    border: 1px solid transparent;
    border-radius: 15px;
    position: fixed;
    width: 100%;
    padding: 5px 50px;
    padding-left: 85%;
    font-size: 10px;
    color: #fff;
    background-color: #202020;
}
.espace{
    padding-top: 5%;
    margin-left: 18%;
}
</style>
