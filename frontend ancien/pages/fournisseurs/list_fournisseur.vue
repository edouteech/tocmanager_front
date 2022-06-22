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
        <h3>Liste des fournisseurs</h3>
        <button type="button" class="bg-green-700 text-white rounded p-3"><NuxtLink to="/fournisseurs/add_fournisseur">Ajouter fournisseur</NuxtLink></button> 
        
        <table class="tableau">
            <thead>
                <tr>
                    <th>Noms</th>
                    <th>Numéros de téléphone</th>
                    <th>Emails</th>
                    <th>Nature</th>
                    <th>Actions</th>
                </tr>
            </thead>
          
            <tbody>
              <tr  v-for="(fournisseur, i) in fournisseurs" :key="i">
                <td>{{fournisseur.name}}</td>
                <td>{{fournisseur.phone}}</td>
                <td>{{fournisseur.email}}</td>
                <td>{{fournisseur.nature}}</td>
                <td>
                  <NuxtLink :to="'/edit_fournisseur/'+fournisseur.id"><i class='bx bxs-edit' alt="modifier"></i></NuxtLink>
                  <button @click="deleteFournisseur(fournisseur.id)"><i class='bx bx-stop-circle'></i></button>
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
  components: {
    SideBar,  
  },

  data () {
    return {
      fournisseurs: [],
      fournisseur: "",
    }
  },

  methods: {
      async logout(){
              this.$auth.logout();
              this.$router.push('/login');
      },

       deleteFournisseur(id){
          console.log(id);
          this.$axios
          .delete('/delete/fournisseur/' +id)
          .then(response => 
            {console.log(response.data.data);
            this.refresh()})                 
        },
        
        refresh(){
          this.$axios
        .get('/index/fournisseur')
        .then(response => 
            {console.log(response);
            this.fournisseurs = response.data.data.data
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
