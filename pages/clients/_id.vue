<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Clients </h3>
    </nav>

    <div class="contenu">
        <h4>Enregistrer un nouveau client</h4>
        <form action="">
            <div class="form-group col-md-6">
                <label class="title">Entrer le nom du client</label>
                <input type="text" class="form-control" v-model="form.name" autocomplete="off" required placeholder="Jean Doe">
            </div>
            <div class="form-group col-md-6">
                <label class="title">Entrer le numero de téléphone du client</label>
                <input type="tel" class="form-control" v-model="form.phone" required  placeholder="+525485335622">
            </div>
            <div class="form-group col-md-6">
                <label class="title">Entrer l'email du client</label>
                <input type="email" class="form-control" v-model="form.email" autocomplete="off" required  placeholder="azerty@azert.com" >
            </div>
            <div class="form-group col-md-6">
                <div class="form-group ">
                <label class="title">Nature du client</label>
                <select class="form-control" v-model="form.nature">
                        <option disabled value="">Choisissez...</option>
                        <option value="0">Particulier</option>
                        <option value="1">Entreprise</option>
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
    auth:true,
    components: {
        Sidebar,  
    },
    data () {
        return{
            client: "",
            clients: [],
            form: {
                id: '',
                name: '',
                email: '',
                phone: '',
                nature:'',
                compagnie_id: '',
            },
            error_message: "",
            error_champ: [],
        }
        },
    mounted() {
        this.$axios.get('/clients/'+ this.$route.params.id)
         .then(response => {console.log(response.data.data[0] )
            let client = response.data.data[0];
            // this.clients = response.data.data
            this.form.name = client.name,
            this.form.phone = client.phone,
            this.form.email = client.email,
            this.form.nature = client.nature
            
          }      
        )
            
    },

    methods: {

        submit(){          
            this.$axios.put('/clients/' +this.$route.params.id,{
            id: this.$route.params.id,
            name: this.form.name,
            email: this.form.email,
            phone: this.form.phone,
            nature: this.form.nature,
           compagnie_id: this.$auth.$storage.getUniversal('company_id')

            })
            .then(response =>{
                this.$router.push({
                  path:'/clients/list_client',})
            })          
        }
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