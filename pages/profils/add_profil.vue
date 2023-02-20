<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Utilisateurs </h3>
      <Userinfo />
    </nav>


    <div class="app-main__outer py-5 px-2">
    <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
      {{error}}
    </div>
        <h4>Enregistrer un nouvel utilsateur</h4>
        <form action="">
            <div class="form-group ">
                <label class="title">Entrer le nom de l'utilisateur</label>
                <input type="text" class="form-control" v-model="form.name" autocomplete="off" required placeholder="Jean Doe">
            </div>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.name">
                {{errors.name}}
            </div>
            
            <div class="form-group ">
                <label class="title">Entrer le numero de téléphone de l'utilisateur</label>
                <vue-tel-input class="form-control form-control-sm" v-model="form.phone"></vue-tel-input> 
            </div>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.phone">
                {{errors.phone}}
            </div>

            <div class="form-group">
                <label class="title">Entrer l'email de l'utilsateur</label>
                <input type="email" class="form-control" v-model="form.email" autocomplete="off" required  placeholder="azerty@azert.com" >
            </div>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.email">
                {{errors.email}}
            </div>

            <div class="form-group ">
                <label class="title">Fonction de l'utilisateur</label>
                <select class="form-control" v-model="form.role" required>
                    <option  value="">Choisissez...</option>
                    <option value="admin">Administrateur</option>
                    <option value="comptable">Comptable</option>
                    <option value="cashier">Caissier</option>
                </select>
            </div>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.role">
                {{errors.role}}
            </div>
            <div class="form-group d-flex">
                <div class="form-check mx-3">
                    <input class="form-check-input" type="checkbox" v-model="form.ajout" true-value="1" false-value="0" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                        Droit d'ajouter
                    </label>
                </div>
                <div class="form-check mx-3">
                    <input class="form-check-input " type="checkbox" v-model="form.modifier" true-value="1" false-value="0" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                        Droit de modifier
                    </label>
                </div>
                <div class="form-check mx-3">
                    <input class="form-check-input" type="checkbox" v-model="form.supprimer" true-value="1" false-value="0" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                        Droit de supprimer
                    </label>
                </div>
                
            </div><br>
            <!-- <div class="form-group">
              <label class="title">Pays</label>
                <select class="form-control" v-model="form.country" required>
                    <option  value="">Choisissez...</option>
                    <option v-for="(countrie, i) in countries" :key="i" :value="countrie.name">{{countrie.name}}</option>
                </select>   
            </div> -->
            <div class="alert alert-danger justify-content-center" role="alert" v-if="errors.country">
                {{errors.country}}
            </div><br><br>

            <button type="submit" class="btn btn-primary" v-on:click.prevent="submit()">Enregistrer cet utilisateur</button>
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
                // country: '',
                compagnie_id: '',
                role: '',
                ajout: 0,
                modifier: 0,
                supprimer: 0
            },
            errors: [],
            error: null,
            countries: ''
        }
    },

    mounted(){
        this.$axios.get("/countries")
        .then(response =>{ console.log(response);
        this.countries = response.data.data
    })
    },

    methods: {
        async submit(){
            await  this.$axios.post('/users',{
              name: this.form.name,
              email: this.form.email,
              phone: this.form.phone,
              role: this.form.role,
            //   country: this.form.country,
              droits_add: this.form.ajout,
              droits_edit: this.form.modifier,
              droits_delete: this.form.supprimer,
              compagnie_id: localStorage.getItem('auth.company_id')
            }).then(response =>{ 
                // console.log( this.form.ajout ) 
                // console.log( this.form.modifier ) 
                // console.log( this.form.supprimer ) 
                this.error = response.data.message
                // console.log(this.error)

                if(response.data.status == "success"){
                    this.$router.push({path:'/profils/profil'});
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