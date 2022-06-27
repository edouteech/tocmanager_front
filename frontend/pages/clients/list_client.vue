<template>
<div class="contain">
     <SideBar/>

    <div class="zone">
      <div class="titre">
            Clients
        </div>
      <p>Liste des clients</p>
      <NuxtLink class="custom-btn btn-10" to="/clients/add_client">Ajouter client</NuxtLink>
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
            <tr  v-for="(client, i) in clients" :key="i">
              <td>{{client.name}}</td>
              <td>{{client.phone}}</td>
              <td>{{client.email}}</td>
              <td>{{client.nature}}</td>
              <td>
                <NuxtLink :to="'/edit_client/'+client.id"><i class='bx bxs-edit' alt="modifier"></i></NuxtLink>
                <button @click="deleteClient(client.id)"><i class='bx bxs-x-circle text-red-600' ></i></button>
              </td>
            </tr>
          </tbody>
        </table>  
    </div>
      
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
        clients: [],
        client: "",
      }
    },

    mounted () {
      this.refresh()
    },

    methods: {

        deleteClient(id){ console.log(id);
          this.$axios.delete('/delete/client/' +id)
          .then(response =>  {console.log(response.data.data);
          this.refresh()})
         },
        
        refresh(){
          this.$axios.get('/index/client').then(response => {console.log(response);
          this.clients = response.data.data.data })
        }
    },       
     
}
</script>

<style scoped>
.zone p{
    font-size: 18px;
}

.bx{
  margin: 0 10px;
  font-size: 25px;
}
.ajout{
  border: 1px solid;
  border-radius: 15px;
  background-color: rgb(233, 250, 215);
  padding: 10px;
  margin-left: 80%;
}

.ajout:hover{
  background-color: green;
  color: #fff;
  
}
.tableau{
	border-collapse: collapse;


	box-shadow: 0 5px 50px transparent;
	border: 2px solid transparent;
	text-align: center;
	margin-top: 1%;
	font-size: 18px;
}      
thead tr{
    background-color: transparent;
}
th, td{
    padding: 15px 40px;
    border: 1px solid #ddd
}
tbody, tr, td, th{
    border: 1px solid #ddd
}

tbody tr:nth-child(even){
    background-color: rgb(233, 233, 255);
}

tbody tr:last-of-type{
    border-bottom: 2px solid rgb(140, 140, 250);
}
</style>
