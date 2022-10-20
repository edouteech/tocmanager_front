<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Encaissements </h3>
      <User_info />
    </nav>

    <div class="app-main__outer p-5">
      <h4>Encaissements supprimés</h4>
       <table class="table table-hover">
          <thead>
            <tr class="table-success">
                <th>
                    Dates d'enregistrement
                </th>
                <th >
                    Montants
                </th>
                <th>
                    Clients concernés
                </th>
                <th>
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr  v-for="(encaissement, i) in encaissements" :key="i">
                <td>{{encaissement.date}}</td>
                <td>{{encaissement.montant}}</td>
                <td>{{encaissement.client.name}}</td>
                <td><div class="action">
                    <div class="sup" @click="supEncaissement(encaissement.id)">Supprimer définitivement</div>
                    <div class="restore" @click="restaurerEncaissement(encaissement.id)">Restaurer cet encaissement</div></div>
                </td>
            </tr>
            
        </tbody>
    </table>
    <p class="text-center"><strong>{{total}} encaissements au total </strong></p><hr class="text-primary">
        <br><br> 
    <nav aria-label="Page navigation example " class="d-flex" v-if="res_data != null">
        <ul class="pagination">
            <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
            <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
            
            <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
        </ul>
        <form action="">
            <div class="nombre d-flex">
                <label class="title mx-5 my-2"><strong> Affichage:</strong></label> 
                <select class="form-control" v-model="form.nombre" required @click.prevent="refresh()">
                    <option disabled value>10</option>
                    <option value="25" >25</option>
                    <option value="50">50</option>
                    <option value="10">100</option>
                </select>
            </div>
          </form>
    </nav>
</div><br>
    <deleteModal :infos= 'identifiant' v-show="showModal" @close-modal="showModal = false"/>

    
</div>
</template>


<script>
import deleteModal from './modal_delete.vue'
import Sidebar from '../sidebar.vue'
import User_info from '../user_info.vue'
export default {
    layout: "empty",
    components: {
    Sidebar,
    deleteModal,
    User_info
},

    data () {
        return {
            links: [],
            res_data: null,
            showModal: false,
            encaissement: "",
            identifiant : "0",
            encaissements: [],
            total: '',
            form: {
                nombre: '',
            }
        }
    },   

    mounted () {
        this.$axios.get('/get/encaissements',{ params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id'),
            per_page : this.form.nombre }   
          })        
        .then(response => {console.log(response);
            this.encaissements = response.data.data.data
            this.res_data= response.data.data
            this.total = response.data.data.total
            let firstE = response.data.data.links.shift()
            let lastE = response.data.data.links.splice(-1,1);})        
    },

    methods: {
        restaurerEncaissement(id){
            console.log(id);
            this.$axios.get('/restore/encaissement/' +id)         
            .then(response => {console.log(response);
                this.encaissement = response.data.data
                this.$router.push({path:'/encaissements/list_encaissement',})
                })         
        },

        supEncaissement(id){
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
.app-main__outer{
  overflow: auto;
}

.action{
    display: flex;
    margin: 0 15%;
}
.table{
	margin-top: 5%;
  text-align: center;
}   
tbody tr:last-of-type{
    border-bottom: 2px solid rgb(241, 20, 20);
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