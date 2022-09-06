<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Catégories de produits </h3>
    </nav>

    <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
      {{error}} <br>
      <div class="error" v-if="errors['name'] != null">{{errors['name']}}</div>
      <div class="error" v-if="errors['parent_id'] != null">{{errors['parent_id']}}</div>
    </div>

    <div class="contenu">
         <h4>Informations de la catégorie</h4><hr><br><br><br>
         <table class="table table-hover">
            <thead>
                <tr class="table-success">
                    <th>Nom de la Catégorie</th>
                    <th>Catégorie parente associée</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{name}}</td>
                    <td v-if="categorie.parent != null">{{parent}}</td>
                    <td v-else>---</td>
                </tr>
            </tbody>
        </table><br><br> 

  </div>
 

</div>



</template>

<script>
import moment from "moment";
import Sidebar from '../../sidebar.vue'
export default {
    layout: "empty",
    auth: true,
    components: {
        Sidebar,
        
    },
    data () {
        return{
            categories: [],
            categorie: '',
            name: '',
            parent: '',
            created_at: '',
            compagnie_id: '',  
            errors: [],
            error: null,
        }
    },
     mounted() {
        // this.refresh()
        this.$axios.get('/categories/'+ this.$route.params.id,{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }
            }).then(response => {console.log(response.data.data[0] ) ,console.log(response.data.data[0].created_at )
            this.name = response.data.data[0].name,
            this.parent = response.data.data[0].parent.name,
            this.created_at = moment(response.data.data[0].created_at).format("YYYY-MM-D")

          }        
        )          
    },
          

}                       

</script>

<style scoped>
form{
    margin-left: 10%;
    margin-top: 5%;
}

.form-group{
    margin-top: 2%;
}

.title{
    margin: 1% 0;
}

.btn{
    margin-top: 5%;
}
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

input::placeholder {
    font-size: 15px;
    opacity: 0.5;
}
</style>