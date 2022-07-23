<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Achats </h3>
    </nav>

    <div class="contenu">
      <h4>Factures supprimées</h4>
        <table class="table table-hover">
          <thead>
            <tr class="table-success">
               
                    <th>
                        Dates factures
                    </th>
                    <th >
                        Clients
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
                    <td>{{achat.date_sell}}</td>
                    <td>{{achat.client_id}}</td>
                    <td>{{achat.amount}}</td>
                    <td><div class="action">
                        <div class="sup" @click="showModal = true">Supprimer définitivement</div>
                        <div class="restore" @click="restaurerAchat(achat.id)">Restaurer cette facture</div></div>
                    </td>
                </tr>
                
            </tbody>
        </table>
</div>
    <deleteModal :infos= 'identifiant' v-show="showModal" @close-modal="showModal = false"/>

    
</div>
</template>


<script>
import Sidebar from '../sidebar.vue';
import deleteModal from './modal_delete.vue'
export default {
    layout: "empty",
    components: {
        Sidebar,   
        deleteModal, 
    },

    data () {
        return {
            showModal: false,
            achat: "",
            identifiant : "0",
            achats: [],
        }
    },   

    mounted () {
         this.$axios.get('/get/achat')        
        .then(response => {console.log(response);
            this.achats = response.data.data })        
    },

    methods: {
        restaurerAchat(id){
            console.log(id);
            this.$axios.get('/restore/achat/' +id)         
            .then(response => {console.log(response);
                this.achat = response.data.data
                this.$router.push({path:'/achats/list_achat',})
                })         
        },

         supAchat(id){
            console.log(id);
            this.$axios.delete('/destroy/achat/' +id)      
            .then(response => {console.log(response);
                    this.achat = response.data.data
                    
                })                
        },
    },
  
}
</script>

<style scoped>
.contenu{
  margin: 5%;

}
.fa{
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}
.table{
	margin-top: 5%;

}      


thead tr{
    background-color: transparent;
}


tbody tr:last-of-type{
    border-bottom: 2px solid rgb(140, 140, 250);
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