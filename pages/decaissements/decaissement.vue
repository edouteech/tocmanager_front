<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Décaissements </h3>
    </nav>

    <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
      {{error}} <br>
      <div class="error" v-if="errors['montant'] != null">{{errors['montant']}}</div>
      <div class="error" v-if="errors['date'] != null">{{errors['date']}}</div>
      <div class="error" v-if="errors['supplier_id'] != null">{{errors['supplier_id']}}</div>
    </div>

    <div class="app-main__outer p-5">
        <h4>Enregistrer un décaissement</h4>
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
                <label class="title">Sélectionner le fournisseur</label>
                <select class="form-control" v-model="form.supplier_id" required>
                    <option disabled value="">Choisissez...</option>
                    <option v-for="(fournisseur, i) in fournisseurs" :key="i" :value="fournisseur.id">{{fournisseur.name}}</option>
                </select>
                </div>
            </div>
        <button type="submit" class="btn btn-primary" @click.prevent="submit()">Enregistrer</button>
        </form>
          
        
    </div>

</div>
</template>

<script>
import moment from "moment";
import Sidebar from '../sidebar.vue'
export default {
    auth:true,
    layout: "empty",
    components: {
        Sidebar,
        
    },
    data () {
        return{
            fournisseurs: [],
            fournisseur: "",
            form: {
                montant: '',
                facture: '',
                date:  moment().format("YYYY-MM-DD"),
                supplier_id:'',
                compagnie_id: ''
            },
            errors: [],
            error: null,
        }
    },

    mounted(){
        this.$axios.get('/suppliers',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          }
          })
        .then(response => {console.log(response.data.data.data);
        this.fournisseurs = response.data.data.data })
    },

    methods: {
        async submit(){
            await  this.$axios.post('/decaissements',{
              montant: this.form.montant,
              date: this.form.date,
              supplier_id: this.form.supplier_id,
              user_id: this.$auth.user.id,
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }).then(response =>{ 
               console.log( response ) 
                this.error = response.data.message
                console.log(this.error)

                if(response.data.status == "success"){
                    this.$router.push({path:'/decaissements/list_decaissement', })
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