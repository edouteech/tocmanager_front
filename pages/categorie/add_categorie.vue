<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Catégories de produits </h3>
      <Userinfo />
    </nav>

    <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
      {{error}} <br>
      <div class="error" v-if="errors['name'] != null">{{errors['name']}}</div>
      <div class="error" v-if="errors['parent_id'] != null">{{errors['parent_id']}}</div>
    </div>

    <div class="app-main__outer p-5">
         <h4>Enregistrer une nouvelle catégorie de produit</h4>
       <form action="">
            <div class="form-group ">
                <label class="title">Entrer le nom de la catégorie </label>
                <input type="text" class="form-control" v-model="form.name" autocomplete="off" required placeholder="Pillules">
            </div>
            <div class="form-group ">
                <label class="title">Catégorie parente</label>
                <select class="form-control" v-model="form.parent_id" required>
                    <option  value="">Choisissez...</option>
                    <option v-for="(categorie, i) in categories" :key="i" :value="categorie.id">{{categorie.name}}</option>
                </select>
            </div>

            <button type="submit" class="btn btn-primary" @click.prevent="submit()">Enregistrer la catégorie</button>
        </form>
  </div>
 

</div>



</template>

<script>
import Sidebar from '../sidebar.vue'
import Userinfo from '../user_info.vue'
export default {
    layout: "empty",
    auth: true,
    components: {
        Sidebar,
        Userinfo,
        
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
            errors: [],
            error: null,
        }
    },
    mounted(){
        this.$axios.get('/categories',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          }
          }).then(response =>{
            // console.log(response.data.data.data);
            this.categories = response.data.data.data
            })     
    },
    
    methods: {
        async submit(){
            await  this.$axios.post('/categories',{
                name: this.form.name,
                parent_id: this.form.parent_id,
                compagnie_id: this.$auth.$storage.getUniversal('company_id')
            })   
            .then(response =>{ 
                // console.log( response ) 
                this.error = response.data.message
                // console.log(this.error)

                if(response.data.status == "success"){
                    this.$router.push({path:'/categorie/list_categorie', })
                }
                else{
                    this.errors = response.data.data
                    // this.$router.push({path:'/categorie/add_client'});
                }
             }).catch( err => console.log( err ) )
            
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

.app-main__outer{
  overflow: auto;
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