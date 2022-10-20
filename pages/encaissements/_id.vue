<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Encaissements </h3>
      <User_info />
    </nav>

    <div class="app-main__outer p-5">
        <h4>Modifier les informations de cet encaissement</h4>
                     <form action="">
            <div class="form-group col-md-6">
                <label class="title">Entrer le montant</label>
                <input type="number" class="form-control" v-model="form.montant" autocomplete="off" required placeholder="10000">
            </div>
            <!-- <div class="input-form">       
                <input type="number" placeholder="Entrer le montant " v-model="form.facture" autocomplete="off" required> -->
                <!-- <select v-model="form.facture" required>
                    <option disabled value="">Choisissez la facture à encaisser</option>
                    <option v-for="(vente, i) in ventes" :key="i" :value="facture">{{categorie.name}}</option>
                </select> -->
            <!-- </div> -->
            <div class="form-group col-md-6">
                <label class="title">Entrer la date de l'encaissement </label>
                <input type="date" class="form-control" v-model="form.date" autocomplete="off" required placeholder="18-05-1989">
            </div>
            <div class="form-group col-md-6">
                <div class="form-group ">
                <label class="title">Sélectionner le client</label>
                <select class="form-control" v-model="form.client_id" required>
                    <option disabled value="">Choississez...</option>
                    <option v-for="(client, i) in clients" :key="i" :value="client.id">{{client.name}}</option>
                </select>
                </div>
            </div>
           <button type="submit" class="btn btn-success" v-on:click.prevent="submit()">Modifier</button>
        </form>
</div>
</div>
</template>

<script>
import moment from "moment";
import Sidebar from '../sidebar.vue'
import User_info from "../user_info.vue";
export default {
    layout: "empty",
    auth:true,
    components: {
    Sidebar,
    User_info
},
    data () {
        return{
            encaissement: "",
            encaissements: [],
            client: "",
            clients: [],
            form: {
                id: '',
                montant: '',
                date: '',
                client_id: '',
                facture:'',
                // compagnie_id: '',
            },
            error_message: "",
            error_champ: [],
        }
        },
    mounted() {
        this.refresh()
        this.$axios.get('/encaissements/'+ this.$route.params.id,{
            params: {
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }
          })
         .then(response => {console.log(response.data.data[0] )
            let encaissement = response.data.data[0];
            // this.clients = response.data.data
            this.form.montant = encaissement.montant,
            this.form.date = moment(encaissement.date).format("YYYY-MM-D"),
            this.form.facture = encaissement.facture,
            this.form.client_id = encaissement.client_id
            
          }      
        )            
    },

    methods: {
        submit(){          
            this.$axios.put('/encaissements/'+ this.$route.params.id, {
            id: this.$route.params.id,
            montant: this.form.montant,
            date: this.form.date,
            facture: this.form.facture,
            client_id: this.form.client_id,
           compagnie_id: this.$auth.$storage.getUniversal('company_id')

            })
            .then(response =>{console.log(response)
                this.$router.push({
                  path:'/encaissements/list_encaissement',})
            })          
        },

        refresh(){
            this.$axios.get('/clients',{params: {
                compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }
            })
            .then(response => {console.log(response.data.data.data);
            this.clients = response.data.data.data })
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

.app-main__outer{
  overflow: auto;
}

input {
    border: none; outline: none;
    border-bottom: 2px solid #605050;
}
</style>
