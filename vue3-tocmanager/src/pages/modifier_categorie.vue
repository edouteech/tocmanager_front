<template>
  <div class="contenu">
    
  <form action="" method="POST">
    <h3>Catégorie à modifier </h3>
    <table class="tableau">
        <thead>
            <tr>
                <th>N°</th>
                <th>Nom</th>

            </tr>
        </thead>
        
        <tbody>
        <tr  v-for="(categorie, a) in categories" :key="a">
          <td>{{categorie.id}}</td>
          <td>{{categorie.name}}</td>

        </tr>
        </tbody>
    </table> 

        <h1>Modification</h1>
        <div class="input-form">						
            <input type="text" placeholder="id" v-model="form.id" autocomplete="off" required>
            <span class="error">{{error_champ.id}}</span>
        </div> 	
         <div class="input-form">			
            <input type="text" placeholder='Entrer le nom du client' v-model="form.name" autocomplete="off" required>
            <span class="error">{{error_champ.name}}</span>
        </div>     
        <div class="submit-form">
            <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer" name="submit">				          
        </div>

    </form>

    
    <SideBar/>
</div>

</template>

<script>
import axios from "axios";
import bootstrap from 'bootstrap'
bootstrap
import SideBar from './sidebar.vue'


export default {
    name: 'ModifierCategorie',
    components:{
        SideBar
    },
    data () {
      return{
          categorie: "",
          categories: [],
          form: {
              id: '',
              name: '',

          },
          error_message: "",
          error_champ: [],
      }
    },
    mounted() {
        console.log(this.$route.params.id);
        axios
         .get('http://localhost:8000/api/index/categorie/'+ this.$route.params.id,)
         .then(response => 
        {console.log(response);
        this.categories = response.data.data
        }
        )
            
    },
            
    methods: {
        submit(){    
      var that = this;       
     
            axios.put('http://localhost:8000/api/update/categorie', this.form)
            .then(function(response){
                 
                console.log(response.data)
                if (response.data.status == "error") {
                    that.error_message = response.data.message
                    that.error_champ  = response.data.data

                } 
            })
        
        }
    },
  
}


</script>

<style>

</style>