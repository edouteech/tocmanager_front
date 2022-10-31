<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Clients </h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer p-5">
        <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
            {{error}}
        </div>
        <h4>Modifier les informations de ce client</h4><hr>
        <form action="">
            <div class="form-group col-md-6 ">
                <label class="title">Entrer le nom du client</label>
                <input type="text" class="form-control" v-model="form.name" autocomplete="off" required placeholder="Jean Doe">
            </div>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.name">
                {{errors.name}}
            </div>

            <div class="form-group col-md-6 ">
                <label class="title">Entrer le numero de téléphone du client</label>
                <input type="tel" class="form-control" v-model="form.phone" required  placeholder="+525485335622">
            </div>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.phone">
                {{errors.phone}}
            </div>

            <div class="form-group col-md-6">
                <label class="title">Entrer l'email du client</label>
                <input type="email" class="form-control" v-model="form.email" autocomplete="off" required  placeholder="azerty@azert.com" >
            </div>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.email">
                {{errors.email}}
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
            <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.nature">
                {{errors.nature}}
            </div>

            <button type="submit" class="btn btn-primary" v-on:click.prevent="submit()">Enregistrer le client</button>
        </form>
    </div>
      
</div>

</template>

<script>
import Sidebar from '../sidebar.vue'
import Userinfo from '../user_info.vue'
export default {
    layout: "empty",
    auth:true,
    components: {
        Sidebar,  
        Userinfo
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
            error:null,
            errors: []
        }
        },
    mounted() {
        this.$axios.get('/clients/'+ this.$route.params.id,{
            params: {
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }
          })
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

.app-main__outer{
  overflow: auto;
}

input {
    border: none; outline: none;
    border-bottom: 2px solid #605050;
}
       
</style>