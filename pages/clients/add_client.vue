<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Clients </h3>
      <Userinfo />
    </nav>


    <div class="app-main__outer p-5">
        <h4>Enregistrer un nouveau client</h4>
        <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
            {{error}}
        </div>
        <form action="">
            <div class="form-group ">
                <label class="title">Entrer le nom du client</label>
                <input type="text" class="form-control" v-model="form.name" autocomplete="off" required placeholder="Jean Doe">
            </div>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.name">
                {{errors.name}}
            </div>

            <div class="form-group ">
                <label class="title">Entrer le numero de téléphone du client</label>
                <vue-tel-input class="form-control form-control-sm" v-model="form.phone"></vue-tel-input> 
            </div>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.phone">
                {{errors.phone}}
            </div>

            <div class="form-group">
                <label class="title">Entrer l'email du client</label>
                <input type="email" class="form-control" v-model="form.email" autocomplete="off" required  placeholder="azerty@azert.com" >
            </div>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.email">
                {{errors.email}}
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
            form: {
                name: '',
                email: '',
                phone: '',
                nature: 0,
                compagnie_id: ''
            },
            errors: [],
            error: null,
        }
    },

    methods: {
        async submit(){
            await  this.$axios.post('/clients',{
              name: this.form.name,
              email: this.form.email,
              phone: this.form.phone,
              nature: this.form.nature,
              compagnie_id: localStorage.getItem('auth.company_id')
            }).then(response =>{ 
                // console.log( response ) 
                this.error = response.data.message
                console.log(this.error)

                if(response.data.status == "success"){
                    this.$router.push({path:'/clients/list_client'});
                }
                else{
                    this.errors = response.data.data
                    // this.$router.push({path:'/clients/add_client'});
                }
            })
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