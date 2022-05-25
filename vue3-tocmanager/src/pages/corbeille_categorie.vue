<template>
<div class="contenu">
    <h3>Liste des categories supprimés</h3>
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
            <button  @click="supCategorie(categorie.id)">Supprimer définitivement</button>
            <button @click="restaurerCategorie(categorie.id)">Restaurer cette categorie</button>
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
  name: 'CorbeilleCategorie',
  components: {
    SideBar,
    
  },
    data () {
    return {
    categorie: "",
    categories: [],
    }
    },   
 methods: {
    supCategorie(id){
      console.log(id);
       axios
      .delete('http://localhost:8000/destroy/categorie/' +id)
      .then(response => 
        {console.log(response);
        this.categorie = response.data.data
        }
        )
    },
    restaurerCategorie(id){
      console.log(id);
       axios
      .get('http://localhost:8000/restore/categorie' +id)
      .then(response => 
        {console.log(response);
        this.categorie = response.data.data
        }
        )
    }
  },
  mounted () {
    axios
      .get('http://localhost:8000/api/get/categorie')
    //   .then(response => (this.clients = response.data.data))
      .then(response => 
        {console.log(response);
        this.categories = response.data.data
        }
        )
  }
}

  

</script>

<style lang="scss">

</style>