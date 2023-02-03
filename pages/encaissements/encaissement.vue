<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name_side">Encaissements </h3>
      <User_info />
    </nav>



    <div class="app-main__outer py-5 px-2">
        <div class="alert alert-danger justify-content-center" role="alert" v-if="error">
             {{error}}
        </div>
        <h4>Enregistrer un encaissement</h4><hr>
        <form action="">
            <div class="form-group col-md-6">
                <label class="title">Entrer le montant</label>
                <input type="number" class="form-control" v-model="form.montant" autocomplete="off" required placeholder="10000">
            </div>
            <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors_montant">
                {{errors_montant}}
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
                <input type="date" class="form-control" v-model="form.date" autocomplete="off" required >
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
            <div class="alert alert-danger justify-content-center col-md-6" role="alert" v-if="errors_client">
                {{errors_client}}
            </div>
            <div class="form-group col-md-6">
                <label class="title">Méthode de paiement</label>
                <select class="form-control" v-model="form.payment">
                    <option value="">Choississez</option>
                    <option v-for="(methode, j) in methodes" :key="j" :value="methode">{{methode}}</option>
                </select>
            </div>
           <button type="submit" class="btn btn-primary" @click.prevent="submit()">Enregistrer</button>
        </form>
        
    </div>

</div>
</template>

<script>
import moment from "moment";
import Sidebar from '../sidebar.vue'
import User_info from "../user_info.vue";
export default {
    auth:true,
    layout: "empty",
    components: {
    Sidebar,
    User_info
},
    data () {
        return{
            clients: [],
            client: "",
            form: {
                montant: '',
                facture: '',
                date:  moment().format("YYYY-MM-DD"),
                client_id:'',
                compagnie_id: '',
                payment: "ESPECES",
            },
            errors: [],
            error: null,
            user:'',
            methodes:'',
            errors_montant: null,
            errors_client: null
        }
    },

    mounted(){
        this.payment()
        this.user = localStorage.getItem('auth.user_id')
            this.$axios.get('/clients',{params: {
                compagnie_id: localStorage.getItem('auth.company_id')
            }
            })
            .then(response => {console.log(response.data.data.data);
            this.clients = response.data.data.data })
    },

    methods: {
        async submit(){
            await  this.$axios.post('/encaissements',{
              montant: this.form.montant,
              date: this.form.date,
              client_id: this.form.client_id,
              user_id: this.user,
              payment: this.form.payment,
              compagnie_id: localStorage.getItem('auth.company_id')
            }).then(response =>{ 
                // console.log( response ) 
                this.error = response.data.message
                console.log(this.error)

                if(response.data.status == "success"){
                    this.$router.push({path:'/encaissements/list_encaissement', })
                    this.$toast('Encaissement enregistré avec succès !!!', {
                        icon: 'fa fa-check-circle',
                    })
                }
                else{
                    this.errors = response.data.data
                    this.errors_montant = response.data.data.montant
                    this.errors_client = response.data.data.client_id
                    // this.$router.push({path:'/categorie/add_client'});
                }
             }).catch( err => console.log( err ) )
            
            },

            
        payment(){
            this.$axios.get('/invoice/payments',{params: {
            compagnie_id: localStorage.getItem('auth.company_id')
          }
          }).then(response =>
            {
                // console.log(response); 
                this.methodes = response.data.data })
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