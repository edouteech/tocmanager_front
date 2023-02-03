<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name_side">Achats </h3>
      <User_info />
    </nav>

    <div class="app-main__outer py-5">
      <h4>Factures supprimées</h4><hr>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr class="table-success">
               
                    <th>
                        Dates factures
                    </th>
                    <th >
                        Fournisseurs
                    </th>
                    <th>
                        Montants
                    </th>
                    <th>
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr  v-for="(achat, i) in achats" :key="i">
                    <td>{{achat.date_buy}}</td>
                    <td v-if="achat.supplier">{{achat.supplier.name}}</td>
                    <td v-else>--Fournisseur supprimé--</td>
                    <td>{{achat.amount}}</td>
                    <td><div class="action">
                        <div class="sup" @click="supAchat(achat.id)">Supprimer définitivement</div>
                        <div class="restore" @click="restaurerAchat(achat.id)">Restaurer cette facture</div></div>
                    </td>
                </tr>
                
            </tbody>
        </table>
      </div>
    <p class="text-center"><strong>{{total}} factures au total </strong></p><hr class="text-primary">
        <br><br>  
        <form action="">
            <div class="nombre d-flex my-4 col-md-2">
                <label class="title mx-3 my-2"><strong> Affichage:</strong></label> 
                <select class="form-control " v-model="form.nombre" required @click.prevent="refresh()">
                    <option disabled value>10</option>
                    <option value="25" >25</option>
                    <option value="50">50</option>
                    <option value="10">100</option>
                </select>
            </div>
        </form>
        <nav aria-label="Page navigation example "  class="d-flex nav" v-if="res_data != null">
            <ul class="pagination">
                <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
                <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
                
                <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
            </ul>
        </nav>
</div><br>
       
    <deleteModal :infos= 'identifiant' v-show="showModal" @close-modal="showModal = false"/>

    
</div>
</template>


<script>
import Sidebar from '../sidebar.vue';
import deleteModal from './modal_delete.vue'
import User_info from '../user_info.vue';
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
            achat: "",
            identifiant : "0",
            achats: [],
            total: '',
            form: {
                nombre: '',
            }
        }
    },   

    mounted () {
         this.$axios.get('/get/buys',{ params: {
            compagnie_id: localStorage.getItem('auth.company_id'),
            per_page : this.form.nombre }   
          })
        .then(response => {
            // console.log(response);
            this.achats = response.data.data.data
            this.res_data= response.data.data 
            this.total = response.data.data.total
            let firstE = response.data.data.links.shift()
            let lastE = response.data.data.links.splice(-1,1);})        
    },

    methods: {
        restaurerAchat(id){
            console.log(id);
            this.$axios.get('/restore/buy/' +id,{
            params: {
              compagnie_id: localStorage.getItem('auth.company_id')
            }})         
            .then(response => {console.log(response);
                this.achat = response.data.data
                this.$router.push({path:'/achats/list_achat',})
                })         
        },

         supAchat(id){
           console.log(id); 
            this.showModal = true;
            this.identifiant= id;         
        },
    },
  
}
</script>

<style scoped>
  .nav{
    overflow: auto;
  }
  
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

.table th{
	padding: 20px;
}

tbody tr:last-of-type{
    border-bottom: 2px solid rgb(241, 20, 20);
}   
.sup{
    border: 1px solid black;
    border-radius: 15px;
    height: 35px;
    padding: 5px;
    margin: 0 10px;
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
    height: 35px;
    padding: 5px;
    margin: 0 10px;
}

.restore:hover{
    color: #fff;
    background-color: green;
}

</style>