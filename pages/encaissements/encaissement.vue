<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Encaissements </h3>
    </nav>

    <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
      {{error}} <br>
      <div class="error" v-if="errors['montant'] != null">{{errors['montant']}}</div>
      <div class="error" v-if="errors['date'] != null">{{errors['date']}}</div>
      <div class="error" v-if="errors['client_id'] != null">{{errors['client_id']}}</div>
    </div>

    <div class="contenu">
        <h4>Enregistrer un encaissement</h4>
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
            clients: [],
            client: "",
            form: {
                montant: '',
                facture: '',
                date: '',
                client_id:'',
                compagnie_id: ''
            },
            errors: [],
            error: null,
        }
    },

    mounted(){
        this.$axios.get('/clients',{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          }
          })
        .then(response => {console.log(response.data.data.data);
        this.clients = response.data.data.data })
    },

    methods: {
        async submit(){
            await  this.$axios.post('/encaissements',{
              montant: this.form.montant,
              facture: 0,
              date: this.form.date,
              client_id: this.form.client_id,
              user_id: this.$auth.user.id,
            //   compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }).then(response =>{ 
                console.log( response ) 
                this.error = response.data.message
                console.log(this.error)

                if(response.data.status == "success"){
                    this.$router.push({path:'/encaissements/list_encaissement', })
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