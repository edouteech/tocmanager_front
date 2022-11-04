<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Utilisateurs </h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer p-5">
        <h4>Modifier les droits d'accès de cet utilisateur</h4>
        <form action="">
            <div class="form-group col-md-6">
                <label class="title">Entrer le nom de l'utilisateur</label>
                <input type="text" class="form-control" v-model="form.name" autocomplete="off" disabled placeholder="Jean Doe">
            </div>
            
            <div class="form-group col-md-6">
                <label class="title">Fonction de l'utilisateur</label>
                <select class="form-control" v-model="form.role" required>
                    <option  value="">Choisissez...</option>
                    <option value="admin">Administrateur</option>
                    <option value="comptable">Comptable</option>
                    <option value="cashier">Caissier</option>
                </select>
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
            

            <button type="submit" class="btn btn-success" v-on:click.prevent="submit()">Modifier</button>
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
            user: "",
            users: [],
            form: {
                name:'',
                role:'',
                ajout: '',
                modifier: '',
                supprimer: '',
                compagnie_id: '',
            },
            error_message: "",
            error_champ: [], 
            countries: ''
        }
    },

    mounted(){
        this.recup()
        this.$axios.get("/countries")
        .then(response =>{ console.log(response);
        this.countries = response.data.data
        })
    },
        

    methods: {
        recup(){
            this.$axios.get('/users/'+ this.$route.params.id,{
            params: {
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }
            }) .then(response => {
            // console.log(response.data.data[0] )
            let user = response.data.data[0];
            this.form.name = user.name,
            this.form.role = user.role_name
            this.form.ajout = user.droits_add
            this.form.modifier = user.droits_edition
            this.form.supprimer = user.droits_delete
            
          }      
        )
        },

        submit(){   
            console.log(this.form.supprimer)       
            this.$axios.put('/users/right/update/'+this.$route.params.id,{
            // id: this.$route.params.id,
            role: this.form.role,
            droits_add: this.form.ajout,
            droits_edit: this.form.modifier,
            droits_delete: this.form.supprimer,
            compagnie_id: this.$auth.$storage.getUniversal('company_id')

            })
            .then(response =>{
                console.log(response)
                this.$router.push({
                  path:'/profils/profil',})
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