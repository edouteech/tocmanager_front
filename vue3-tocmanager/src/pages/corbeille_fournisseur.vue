<template>
<div class="contenu">
    <h3>Liste des fournisseurs supprimés</h3>
    <table class="tableau">
        <thead>
            <tr>
                <th>Noms</th>
                <th>Numéros de téléphone</th>
                <th>Emails</th>
                <th>Actions</th>
            </tr>
        </thead>
        
        <tbody>
        <tr  v-for="(fournisseur, i) in fournisseurs" :key="i">
          <td>{{fournisseur.name}}</td>
          <td>{{fournisseur.phone}}</td>
          <td>{{fournisseur.email}}</td>
          <td>
            <button  @click="supFournisseur(fournisseur.id)">Supprimer définitivement</button>
            <button @click="restaurerFournisseur(fournisseur.id)">Restaurer ce client</button>
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
  name: 'CorbeilleFournisseur',
  components: {
    SideBar,
    
  },
    data () {
    return {
    fournisseur: "",
    fournisseurs: [],
    }
    },   
 methods: {
    supFournisseur(id){
      console.log(id);
       axios
      .delete('http://localhost:8000/destroy/fournisseur/' +id)
      .then(response => 
        {console.log(response);
        this.fournisseur = response.data.data
        }
        )
    },
    restaurerFournisseur(id){
      console.log(id);
       axios
      .get('http://localhost:8000/restore/fournisseur' +id)
      .then(response => 
        {console.log(response);
        this.fournisseur = response.data.data
        }
        )
    }
  },
  mounted () {
    axios
      .get('http://localhost:8000/api/get/fournisseur')
    //   .then(response => (this.clients = response.data.data))
      .then(response => 
        {console.log(response);
        this.fournisseurs = response.data.data
        }
        )
  }
}

  

</script>

<style lang="scss">

</style>