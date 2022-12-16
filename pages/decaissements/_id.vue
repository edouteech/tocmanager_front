<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Décaissements </h3>
      <User_info />
    </nav>

    <div class="app-main__outer p-5">
        <h4>Modifier les informations de ce décaissement</h4>
        <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
             {{error}}
        </div>
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
                <label class="title">Entrer la date du décaissement </label>
                <input type="date" class="form-control" v-model="form.date" autocomplete="off" required >
            </div>
            <div class="form-group col-md-6">
                <div class="form-group ">
                <label class="title">Nature du client</label>
                <select class="form-control" v-model="form.supplier_id" required>
                    <option disabled value="">Sélectionner le fournisseur</option>
                    <option v-for="(fournisseur, i) in fournisseurs" :key="i" :value="fournisseur.id">{{fournisseur.name}}</option>
                </select>
                </div>
            </div>
            <div class="form-group col-md-6">
                <label class="title">Méthode de paiement</label>
                <select class="form-control" v-model="form.payment">
                    <option value="">Choississez</option>
                    <option v-for="(methode, j) in methodes" :key="j" :value="methode">{{methode}}</option>
                </select>
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
            decaissement: "",
            decaissements: [],
            fournisseur: "",
            fournisseurs: [],
            form: {
                id: '',
                montant: '',
                date: '',
                supplier_id: '',
                facture:'',
                compagnie_id: '',
                payment: "",
            },
            error: null,
            errors: [],
            buy_id: '',
            methodes:''
        }
        },
    mounted() {
        this.payment()
        this.refresh()
        this.$axios.get('/decaissements/'+ this.$route.params.id,{
            params: {
              compagnie_id: localStorage.getItem('auth.company_id')
            }
          })
         .then(response => {
            // console.log(response.data.data[0] )
            let decaissement = response.data.data[0];
            // this.clients = response.data.data
            this.form.montant = decaissement.montant,
            this.form.date =  moment(decaissement.date).format("YYYY-MM-DD"),
            this.form.facture = decaissement.facture,
            this.form.supplier_id = decaissement.supplier_id,
            this.buy_id = decaissement.buy_id,
            this.form.payment = decaissement.payment
            
          }      
        )            
    },

    methods: {
        submit(){          
            this.$axios.put('/decaissements/' +this.$route.params.id, {
            id: this.$route.params.id,
            montant: this.form.montant,
            date: this.form.date,
            facture: this.form.facture,
            supplier_id: this.form.supplier_id,
            payment: this.form.payment,
            user_id: this.$auth.user.id,
            buy_id: this.buy_id,
           compagnie_id: localStorage.getItem('auth.company_id')

            })
            .then(response =>{
                console.log(response.data);
                if(response.data.status ='success'){
                    this.$router.push({
                    path:'/decaissements/list_decaissement',})

                }
                else{
                    this.error = response.data.message
                }
            })          
        },

        refresh(){
            this.$axios.get('/suppliers',{
                params: {
                    compagnie_id: localStorage.getItem('auth.company_id')
                }
            }).then(response => {
                // console.log(response.data.data.data);
            this.fournisseurs = response.data.data.data })
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
