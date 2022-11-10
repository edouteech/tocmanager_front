<template>
<div >
    <div class="zone">
          <div class="titre">
           <Sidebar /> <p class="name"> Utilisateurs</p>
          </div>
         <!-- début du new table -->
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <div class="p-4">
                        <label for="table-search" class="sr-only">Search</label>
                        <div class="relative mt-1">
                        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd"
                                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                    clip-rule="evenodd"></path>
                            </svg>
                        </div>
                        <input type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Recherche...">
                </div>
                    </div>
                    <div class="table-responsive">
                    <table class="table w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="p-4">
                                    <!-- <div class="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="checkbox-all-search" class="sr-only">checkbox</label>
                                    </div> -->
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Noms
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Numéros de téléphone
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Emails
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Pays
                                </th>
                                <th scope="col" class="px-6 py-3 ">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr  v-for="(user, i) in users" :key="i"
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td class="w-4 p-4">
                                    <div class="flex items-center">
                                        <input id="checkbox-table-search-1" type="checkbox" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
                                        <label for="checkbox-table-search-1" class="sr-only">checkbox</label>
                                    </div>
                                </td>

                                <td>{{user.name}}</td>
                                <td>{{user.phone}}</td>
                                <td>{{user.email}}</td>
                                 <td>{{user.country}}</td>
                                <td><div class="action">
                                    <div class="sup" @click="supProfil(user.id)">Supprimer définitivement</div>
                                    <div class="restore" @click="restaurerUser(user.id)">Restaurer cet utilisateur</div></div>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
    <deleteModal :infos= 'identifiant' v-show="showModal" @close-modal="showModal = false"/>

    
</div>
</template>


<script>
import deleteModal from './modal_delete.vue'
import Sidebar from '../sidebar.vue'
export default {
    layout: "empty",
    components: {
        Sidebar,   
        deleteModal, 
    },

    data () {
        return {
            showModal: false,
            user: "",
            identifiant : "0",
            users: [],
        }
    },   

    mounted () {
         this.$axios.get('/get/profil',{
            params: {
              compagnie_id: localStorage.getItem('auth.company_id')
            }
          })
        .then(response => {console.log(response.data.data);
            this.users = response.data.data })        
    },

    methods: {
        restaurerUser(id){
            console.log(id);
            this.$axios.get('/restore/profil/' +id,{
            params: {
              compagnie_id: localStorage.getItem('auth.company_id')
            }
          }).then(response => {console.log(response);
                this.user = response.data.data
                this.$router.push({path:'/profils/profil',})
                })         
        },         
            

        supClient(id){
            console.log(id); 
            this.showModal = true;
            this.identifiant= id;                
        },
    },
  
}
</script>

<style scoped>
.action{
    display: flex;
    margin-left: 20%;
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