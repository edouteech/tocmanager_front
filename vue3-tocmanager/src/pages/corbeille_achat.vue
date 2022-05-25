<template>
<div class="contenu">
    <h3>Liste des achats supprimés</h3>
    <table class="tableau">
        <thead>
            <tr>
                <th>Dates des achats</th>
                <th>Taxes appliquées</th>
                <th>Déductions</th>
                <th>Montants</th>
                <th>Restes</th>
                <th>Identifiants de l'utilisateur</th>
                <th>Identifiants du vendeur</th>
                <th>Lignes d'achat</th>
                <th>Actions</th>
            </tr>
        </thead>
        
        <tbody>
        <tr  v-for="(achat, i) in achats" :key="i">
          <td>{{achat.date_buy}}</td>
          <td>{{achat.tax}}</td>
          <td>{{achat.discount}}</td>       
          <td>{{achat.rest}}</td>
          <td>{{achat.user_id}}</td>
          <td>{{achat.supplier_id}}</td>
          <td>{{achat.buy_lines}}</td>
          <td>
            <button  @click="supAchat(achat.id)">Supprimer définitivement</button>
            <button @click="restaurerAchat(achat.id)">Restaurer ce client</button>
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
  name: 'CorbeilleAchat',
  components: {
    SideBar,
    
  },
    data () {
    return {
    achat: "",
    achats: [],
    }
    },   
 methods: {
    supAchat(id){
      console.log(id);
       axios
      .delete('http://localhost:8000/destroy/achat/' +id)
      .then(response => 
        {console.log(response);
        this.achat = response.data.data
        }
        )
    },
    restaurerAchat(id){
      console.log(id);
       axios
      .get('http://localhost:8000/restore/achat/' +id)
      .then(response => 
        {console.log(response);
        this.achat = response.data.data
        }
        )
    }
  },
  mounted () {
    axios
      .get('http://localhost:8000/api/get/achat')
    //   .then(response => (this.clients = response.data.data))
      .then(response => 
        {console.log(response);
        this.achats = response.data.data
        }
        )
  }
}

  

</script>

<style lang="scss">

</style>