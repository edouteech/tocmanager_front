<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Utilisateurs </h3>
    </nav>

    <div class="app-main__outer p-5">
        <h4>Modifier les informations de cet utilisateur</h4>
        <form action="">
            <div class="form-group col-md-6">
                <label class="title">Entrer le nom de l'utilisateur</label>
                <input type="text" class="form-control" v-model="form.name" autocomplete="off" disabled placeholder="Jean Doe">
            </div>
            <div class="form-group col-md-6">
                <label class="title">Entrer le numero de téléphone de l'utilisateur</label>
                <input type="tel" class="form-control" v-model="form.phone" disabled  placeholder="+525485335622">
            </div>
            <div class="form-group col-md-6">
                <label class="title">Entrer l'email de l'utilisateur</label>
                <input type="email" class="form-control" v-model="form.email" autocomplete="off" disabled  placeholder="azerty@azert.com" >
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
                    <input class="form-check-input" type="checkbox" v-model="form.supprmier" true-value="1" false-value="0" id="defaultCheck1">
                    <label class="form-check-label" for="defaultCheck1">
                        Droit de supprimer
                    </label>
                </div>
                
            </div><br>
            <div class="form-group col-md-6">
                <label class="title">Entrer le pays de l'utilsateur</label>
                <input type="text" class="form-control" v-model="form.country" autocomplete="off" disabled  placeholder="Benin" >
            </div>

            <button type="submit" class="btn btn-success" v-on:click.prevent="submit()">Modifier</button>
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
            user: "",
            users: [],
            form: {
                id: '',
                name: '',
                email: '',
                phone: '',
                password: '',
                nature:'',
                role:'',
                ajout: '',
                modifier: '',
                supprmier: '',
                compagnie_id: '',
            },
            error_message: "",
            error_champ: [],
        }
        },
    mounted() {
        this.$axios.get('/users/'+ this.$route.params.id,{
            params: {
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }
          }) .then(response => {console.log(response.data.data[0],console.log(response.data.data[0].password ) )
            let user = response.data.data[0];
            // this.clients = response.data.data
            this.form.name = user.name,
            this.form.phone = user.phone,
            this.form.email = user.email,
            this.form.password = user.password
            this.form.country = user.country
            this.form.role = user.role_name
            this.form.ajout = user.droits_add
            this.form.modifier = user.droits_edition
            this.form.supprimer = user.droits_delete
            
          }      
        )
            
    },
        

    methods: {

        submit(){          
            this.$axios.put('/users/' +this.$route.params.id,{
            id: this.$route.params.id,
            name: this.form.name,
            email: this.form.email,
            phone: this.form.phone,
            password: this.form.password,
            country: this.form.country,
            role: this.form.role,
            droits_add: this.form.ajout,
            droits_edit: this.form.modifier,
            droits_delete: this.form.delete,
            compagnie_id: this.$auth.$storage.getUniversal('company_id')

            })
            .then(response =>{console.log(response)
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