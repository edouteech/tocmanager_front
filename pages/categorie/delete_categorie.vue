<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Catégories deproduits </h3>
    </nav>

    <div class="contenu">
      <h4>Catégories supprimées</h4>
       <table class="table table-hover">
          <thead>
            <tr class="table-success">
                <th>
                    Noms
                </th>
                <th >
                    Actions
                </th>
            </tr>
            </thead>
        <tbody>
            <tr  v-for="(categorie, i) in categories" :key="i">
                <td>{{categorie.name}}</td>
                <td><div class="action">
                    <div class="sup" @click="supCategorie(client.id)">Supprimer définitivement</div>
                    <div class="restore" @click="restaurerCategorie(categorie.id)">Restaurer cette categorie</div></div>
                </td>
            </tr>
            
        </tbody>
    </table>
</div><br>
        <nav aria-label="Page navigation example " v-if="res_data != null">
          <ul class="pagination">
            <li :class="(res_data.prev_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a></li>
            <li class="page-item" v-for="(link, index) in res_data.links" :key="index"><a :class="(link.active == true)? 'page-link active':'page-link'" href="#" @click="refresh(link.label)">{{link.label}}</a></li>
            
            <li :class="(res_data.next_page_url == null)? 'page-item disabled':'page-item'"><a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a></li>
          </ul>
        </nav>
            <!-- <pre> {{res_data}}</pre> --><br><br> 
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
            links: [],
            res_data: null,
            showModal: false,
            categorie: "",
            identifiant : "0",
            categories: [],
        }
    },   

    mounted () {
         this.$axios.get('/get/categorie')        
        .then(response => {console.log(response.data.data);
            this.categories = response.data.data 
            this.res_data= response.data.data})        
    },

    methods: {
        restaurerCategorie(id){
            console.log(id);
            this.$axios.get('/restore/categorie/' +id)         
            .then(response => {console.log(response);
                this.categorie = response.data.data
                this.$router.push({path:'/categorie/list_categorie',})
                })         
        },

        supCategorie(id){
            console.log(id); 
            this.showModal = true;
            this.identifiant= id;         
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