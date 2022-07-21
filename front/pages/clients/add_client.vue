<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Clients </h3>
    </nav>

    <div class="contenu ">
        <h4>Enregistrer un nouveau client</h4>
        <form action="">
            <div class="form-group ">
                <label class="title">Entrer le nom du client</label>
                <input type="text" class="form-control" v-model="form.name" autocomplete="off" required placeholder="Jean Doe">
            </div>
            <div class="form-group ">
                <label class="title">Entrer le numero de téléphone du client</label>
                <input type="tel" class="form-control" v-model="form.phone" required  placeholder="+525485335622">
            </div>
            <div class="form-group">
                <label class="title">Entrer l'email du client</label>
                <input type="email" class="form-control" v-model="form.email" autocomplete="off" required  placeholder="azerty@azert.com" >
            </div>
            <div class="form-group">
                <div class="form-group ">
                <label class="title">Nature du client</label>
                <select class="form-control" v-model="form.nature">
                        <option disabled value="">Choisissez...</option>
                        <option value="0">Particulier</option>
                        <option value="1">Entreprise</option>
                </select>
                </div>
            </div>

            <button type="submit" class="btn btn-primary" v-on:click.prevent="submit()">Enregistrer le client</button>
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
            form: {
                name: '',
                email: '',
                phone: '',
                nature:'',
                compagnie_id: ''
            },
            error_message: "",
            error_champ: [],
        }
    },

    methods: {
        async submit(){
            await  this.$axios.post('/create/client',{
              name: this.form.name,
              email: this.form.email,
              phone: this.form.phone,
              nature: this.form.nature,
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }).then(response =>{ 
                console.log( response ) 
                this.$router.push({path:'/clients/list_client',})})
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
    width: 50%;
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