<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Clients </h3>
    </nav>

    <div class="contenu">
      <h4>Clients supprimés</h4>
       <table class="table table-hover">
          <thead>
            <tr class="table-success">
                <th >
                    Noms
                </th>
                <th >
                    Numéros de téléphone
                </th>
                <th >
                    Emails
                </th>
                <th>
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr  v-for="(client, i) in clients" :key="i"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                    </div>
                </td>

                <td>{{client.name}}</td>
                <td>{{client.phone}}</td>
                <td>{{client.email}}</td>
                <td><div class="action">
                    <div class="sup" @click="supClient(client.id)">Supprimer définitivement</div>
                    <div class="restore" @click="restaurerClient(client.id)">Restaurer ce client</div></div>
                </td>
            </tr>
            
        </tbody>
    </table>
</div>
    <deleteModal :infos= 'identifiant' v-show="showModal" @close-modal="showModal = false"/>

    
</div>
</template>


<script>
import deleteModal from './modal_delete.vue'
import Sidebar from '../sidebar.vue'
export default {
    components: {
        Sidebar,   
        deleteModal, 
    },

    data () {
        return {
            showModal: false,
            client: "",
            identifiant : "0",
            clients: [],
        }
    },   

    mounted () {
         this.$axios.get('/get/client')        
        .then(response => {console.log(response);
            this.clients = response.data.data })        
    },

    methods: {
        restaurerClient(id){
            console.log(id);
            this.$axios.get('/restore/client/' +id)         
            .then(response => {console.log(response);
                this.client = response.data.data
                this.$router.push({path:'/clients/list_client',})
                })         
        },

        supClient(id){
            console.log(id); 
            this.showModal = true;
            this.identifiant= id;
            // this.$axios.delete('/destroy/client/' +id)      
            // .then(response => {console.log(response);
            //         this.client = response.data.data
                    
            //     })                
        },
    },
  
}
</script>

<style scoped>
.contenu{
  margin: 5%;

}
.action{
    display: flex;
}
.sup{
    border: 1px solid black;
    border-radius: 15px;
    padding: 5px;
    margin: 15px;
    cursor: pointer;
    
}

.sup:hover{
    color: #fff;
    background-color: red;
}

.restore{
    cursor: pointer;
    border: 1px solid black;
    border-radius: 15px;
    margin: 15px;
    padding: 5px;
}

.restore:hover{
    color: #fff;
    background-color: green;
}

.w-full{
    text-align: center;
}

</style>