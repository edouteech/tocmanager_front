<template>
<div class="contenu">
    <h3>Liste des clients supprimés</h3>
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
        <tr  v-for="(client, i) in clients" :key="i">
          <td>{{client.name}}</td>
          <td>{{client.phone}}</td>
          <td>{{client.email}}</td>
          <td>
            <button  @click="supClient(client.id)">Supprimer définitivement</button>
            <button @click="restaurerClient(client.id)">Restaurer ce client</button>
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
  name: 'CorbeilleClient',
  components: {
    SideBar,
    
  },
    data () {
    return {
    client: "",
    clients: [],
    }
    },   
 methods: {
    supClient(id){
      console.log(id);
       axios
      .delete('http://localhost:8000/destroy/client/' +id)
      .then(response => 
        {console.log(response);
        this.client = response.data.data
        }
        )
    },
    restaurerClient(id){
      console.log(id);
       axios
      .get('http://localhost:8000/restore/client' +id)
      .then(response => 
        {console.log(response);
        this.client = response.data.data
        }
        )
    }
  },
  mounted () {
    axios
      .get('http://localhost:8000/api/get/client')
    //   .then(response => (this.clients = response.data.data))
      .then(response => 
        {console.log(response);
        this.clients = response.data.data
        }
        )
  }
}

  

</script>

<style lang="scss">

</style>