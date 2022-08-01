<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Décaissements </h3>
    </nav>

    <div class="contenu">
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
                <input type="datetime-local" class="form-control" v-model="form.date" autocomplete="off" required placeholder="18-05-1989">
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
        <button type="submit" class="btn btn-primary" v-on:click.prevent="submit()">Enregistrer</button>
        </form>
          
        
    </div>

</div>
</template>

<script>
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
                date: '',
                supplier_id:'',
                compagnie_id: ''
            },
            error_message: "",
            error_champ: [],
        }
    },

    mounted(){
        this.$axios.get('/index/fournisseur',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          }
          })
        .then(response => {console.log(response.data.data.data);
        this.fournisseurs = response.data.data.data })
    },

    methods: {
        async submit(){
            await  this.$axios.post('/create/decaissement',{
              montant: this.form.montant,
              facture: 1,
              date: this.form.date,
              supplier_id: this.form.supplier_id,
              user_id: this.$auth.user.id,
            //   compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }).then(response =>{ 
                console.log( response ) 
                this.$router.push({path:'/decaissements/list_decaissement',})})
            .catch( error => console.log( error ) )
                //  console.log(this.form.name)                
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