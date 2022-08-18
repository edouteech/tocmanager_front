<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Catégories de produits </h3>
    </nav>

    <div class="contenu">
         <h4>Modifier les informations de cette catégorie</h4>
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

            <button type="submit" class="btn btn-success" v-on:click.prevent="submit()">Modifier</button>
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
            categorie: "",
            categories: [],
            form: {
                id: '',
                name: '',   
                parent_id: '',
                compagnie_id:'',          
            },
            error_message: "",
            error_champ: [],
        }
    },

    mounted() {
        this.refresh()
        this.$axios.get('/categories/'+ this.$route.params.id)
          .then(response => {console.log(response.data.data[0] )
            let categorie = response.data.data[0];
            // this.categories = response.data.data
            this.form.name = categorie.name,
            this.form.parent_id = categorie.parent_id        
          }        
        )          
    },

    methods: {
        submit(){          
            this.$axios.put('/categories/' +this.$route.params.id,{
                id: this.$route.params.id,            
                name: this.form.name, 
                parent_id: this.form.parent_id,
                compagnie_id: this.$auth.$storage.getUniversal('company_id')      
            }).then(response =>{this.$router.push({ path:'/categorie/list_categorie',})})

        },
        refresh(){
            this.$axios.get('/categories',{params: {
                compagnie_id: this.$auth.$storage.getUniversal('company_id')
                }})        
            .then(response =>{console.log(response.data.data.data);
                this.categories = response.data.data.data
                })     
        },
    }

    
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

input {
    border: none; outline: none;
    border-bottom: 2px solid #605050;
}
       
</style>
