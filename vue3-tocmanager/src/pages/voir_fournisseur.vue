<template>
  <div class="contenu">   
    <h3>Informations sur le fournisseur {{$route.params.id}}</h3>
    <table class="tableau">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Numéro de téléphone</th>
                <th>Email</th>
                <th>Nature</th>
            </tr>
        </thead>
        
        <tbody>
        <tr  v-for="(fournisseur, a) in fournisseurs" :key="a">
          <td>{{fournisseur.name}}</td>
          <td>{{fournisseur.phone}}</td>
          <td>{{fournisseur.email}}</td>
          <td>{{fournisseur.nature}}</td>
        </tr>
        </tbody>
    </table> 
    <SideBar/>
</div>
</template>

<script>
import axios from "axios";
import SideBar from './sidebar.vue'
    export default 
    {
      computed: {
         
        },
        name: 'VoirFournisseur',
        components: 
        {
            SideBar,
        },
        data () {
            return {
            fournisseur: "",
            fournisseurs: [],
            }
        },   
        mounted() {
        console.log(this.$route.params.id);
        axios
         .get('http://localhost:8000/api/index/fournisseur/'+ this.$route.params.id,)
         .then(response => 
        {console.log(response);
        this.fournisseurs = response.data.data
        }
        )
            
        },
            
    }

</script>

<style>

</style>