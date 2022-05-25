<template>
<div class="contenu">
    <h3>Liste des utilisateurs supprimés</h3>
    <table class="tableau">
        <thead>
            <tr>
                <th>Noms</th>
                <th>Emails</th>
                <th>Numéros de téléphone</th>
                <th>Addresses</th>
                <th>Villes</th>
                <th>Pays</th>
                <th>Etats</th>
                <th>Actions</th>
            </tr>
        </thead>
        
        <tbody>
        <tr  v-for="(utilisateur, i) in utilisateurs" :key="i">
          <td>{{utilisateur.name}}</td>
          <td>{{utilisateur.email}}</td>
          <td>{{utilisateur.phone}}</td>       
          <td>{{utilisateur.address}}</td>
          <td>{{utilisateur.city}}</td>
          <td>{{utilisateur.country}}</td>
          <td>{{utilisateur.state}}</td>
          <td>
            <button  @click="supUtilisateur(utilisateur.id)">Supprimer définitivement</button>
            <button @click="restaurerUtilisateur(utilisateur.id)">Restaurer ce client</button>
          </td>
        </tr>
        </tbody>

    </table>

    <SideBar/>
</div>

</template>

<script>
import axios from "axios";
import bootstrap from "bootstrap"
bootstrap
import SideBar from './sidebar.vue'
export default {
  name: 'CorbeilleUtilisateur',
  components: {
    SideBar,
    
  },
    data () {
    return {
    utilisateur: "",
    utilisateurs: [],
    }
    },   
 methods: {
    supUtilisateur(id){
      console.log(id);
       axios
      .delete('http://localhost:8000/destroy/profil/' +id)
      .then(response => 
        {console.log(response);
        this.utilisateur = response.data.data
        }
        )
    },
    restaurerUtilisateur(id){
      console.log(id);
       axios
      .get('http://localhost:8000/restore/profil' +id)
      .then(response => 
        {console.log(response);
        this.utilisateur = response.data.data
        }
        )
    }
  },
  mounted () {
    axios
      .get('http://localhost:8000/api/get/profil')
    //   .then(response => (this.clients = response.data.data))
      .then(response => 
        {console.log(response);
        this.utilisateurs = response.data.data
        }
        )
  }
}

  

</script>

<style lang="scss">

</style>