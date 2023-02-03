<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name_side">Paie </h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <h4>Bulletins de paie supprimés</h4><hr>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error">
                {{error}}
            </div>
      <div class="table-responsive">
       <table class="table table-hover">
          <thead>
            <tr class="table-success">
                <th >
                    Dates de début
                </th>
                <th >
                    Date de fin
                </th>
                <th >
                    Employés
                </th>
                <th>
                    Actions
                </th>
            </tr>
        </thead>
        <tbody>
            <tr  v-for="(paie, i) in paies" :key="i"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td>{{paie.date_start}}</td>
                <td>{{paie.date_end}}</td>
                <td v-if="paie.employee">{{paie.employee.last_name}} {{paie.employee.first_name}}</td>
                <td v-else>-----</td>
                <td><div class="action">
                    <div class="sup" @click="supPaie(paie.id)">Supprimer définitivement</div>
                    <div class="restore" @click="restaurerPaie(paie.id)">Restaurer</div></div>
                </td>
            </tr>
            
        </tbody>
    </table>
    <p class="text-center"><strong>{{total}} bulletins de paie au total </strong></p><hr class="text-primary">
    </div>    <br><br>  
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

            <!-- <pre> {{res_data}}</pre> -->
    <deleteModal :infos= 'identifiant' v-show="showModal" @close-modal="showModal = false"/>

    
</div>
</template>


<script>
import deleteModal from './modal_delete.vue'
import Sidebar from '../sidebar.vue'
import Userinfo from '../user_info.vue'
export default {
    layout: "empty",
    components: {
    Sidebar,
    deleteModal,
    Userinfo
},

    data () {
        return {
            links: [],
            res_data: null,
            showModal: false,
            paie: "",
            identifiant : "0",
            paies: [],
            total: '',
            form: {
                nombre: '',
            },
            error: null,
        }
    },   

    mounted () {
         this.$axios.get('/get/payslips',{ params: {
            compagnie_id: localStorage.getItem('auth.company_id'),
            per_page : this.form.nombre} 
        })       
        .then(response => {
            // console.log(response);
            this.paies = response.data.data.data
            this.res_data= response.data.data
            this.total = response.data.data.total;
            let firstE = response.data.data.links.shift()
            let lastE = response.data.data.links.splice(-1,1);})        
    },

    methods: {
        restaurerPaie(id){
            // console.log(id);
            this.$axios.get('/restore/payslip/' +id,{
            params: {
              compagnie_id: localStorage.getItem('auth.company_id')
            }})               
            .then(response => {
                // console.log(response);
                this.paie = response.data.data
                if(response.data.status == "success"){
                    this.$router.push({path:'/paies/list_paie',})
                    this.$toast('Employé restauré avec succès !!!', {
                        icon: 'fa fa-check-circle',
                    })
                }
                else{
                    this.error = response.data.message
                    // this.$router.push({path:'/clients/add_client'});
                }
                })         
        },

        supPaie(id){
            // console.log(id); 
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