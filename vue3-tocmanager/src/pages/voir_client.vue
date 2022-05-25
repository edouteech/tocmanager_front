<template>
  <div class="contenu">   
    <h3>Informations sur le client {{$route.params.id}}</h3>
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
        <tr  v-for="(client, a) in clients" :key="a">
          <td>{{client.name}}</td>
          <td>{{client.phone}}</td>
          <td>{{client.email}}</td>
          <td>{{client.nature}}</td>
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
        name: 'VoirClient',
        components: 
        {
            SideBar,
        },
        data () {
            return {
            client: "",
            clients: [],
            }
        },   
        mounted() {
        console.log(this.$route.params.id);
        axios
         .get('http://localhost:8000/api/index/client/'+ this.$route.params.id,)
         .then(response => 
        {console.log(response);
        this.clients = response.data.data
        }
        )
            
        },
            
    }

</script>

<style>

</style>