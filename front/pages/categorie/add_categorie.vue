<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Catégories de produits </h3>
    </nav>

    <div class="contenu">
         <h4>Enregistrer une nouvelle catégorie de produit</h4>
       <form action="">
            <div class="form-group col-md-6">
                <label class="title">Entrer le nom de la catégorie </label>
                <input type="text" class="form-control" v-model="form.name" autocomplete="off" required placeholder="Pillules">
            </div>
            <div class="form-group col-md-6">
                <div class="form-group ">
                <label class="title">Catégorie parente</label>
                <select class="form-control" v-model="form.parent_id" required>
                    <option disabled value="">Choisissez...</option>
                    <option v-for="(categorie, i) in categories" :key="i" :value="categorie.id">{{categorie.name}}</option>
                </select>
                </div>
            </div>

            <button type="submit" class="btn btn-primary" v-on:click.prevent="submit()">Enregistrer la catégorie</button>
        </form>
  </div>
 

</div>



</template>

<script>
import Sidebar from '../sidebar.vue'
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
            form: {
                name: '',
                parent_id: '',
                compagnie_id: ''               
            },
            error_message: "",
            error_champ: [],
        }
    },
    mounted(){
        this.$axios.get('/index/categorie',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          }
          }).then(response =>{console.log(response.data.data.data);
            this.categories = response.data.data.data
            })     
    },
    
    methods: {
        async submit(){
            await  this.$axios.post('/create/categorie',{
                name: this.form.name,
                parent_id: this.form.parent_id,
                compagnie_id: this.$auth.$storage.getUniversal('company_id')
            })   
            .then(response =>{ this.$router.push({ path:'/categorie/list_categorie', })})
            .catch( error => console.log( error ) )      
                 console.log(this.form.name)                
        },

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