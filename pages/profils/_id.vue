<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Utilisateurs </h3>
    </nav>

    <div class="contenu">
        <h4>Modifier les informations de cet utilisateur</h4>
        <form action="">
            <div class="form-group col-md-6">
                <label class="title">Entrer le nom de l'utilisateur</label>
                <input type="text" class="form-control" v-model="form.name" autocomplete="off" required placeholder="Jean Doe">
            </div>
            <div class="form-group col-md-6">
                <label class="title">Entrer le numero de téléphone de l'utilisateur</label>
                <input type="tel" class="form-control" v-model="form.phone" required  placeholder="+525485335622">
            </div>
            <div class="form-group col-md-6">
                <label class="title">Entrer l'email de l'utilisateur</label>
                <input type="email" class="form-control" v-model="form.email" autocomplete="off" required  placeholder="azerty@azert.com" >
            </div>
            <div class="form-group col-md-6">
                <label class="title">Entrer le pays de l'utilsateur</label>
                <input type="text" class="form-control" v-model="form.country" autocomplete="off" required  placeholder="Benin" >
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
                compagnie_id: '',
            },
            error_message: "",
            error_champ: [],
        }
        },
    mounted() {
        this.$axios.get('/users/'+ this.$route.params.id)
         .then(response => {console.log(response.data.data[0],console.log(response.data.data[0].password ) )
            let user = response.data.data[0];
            // this.clients = response.data.data
            this.form.name = user.name,
            this.form.phone = user.phone,
            this.form.email = user.email,
            this.form.password = user.password
            this.form.country = user.country
            
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
.contenu{
  margin: 5%;
}

input {
    border: none; outline: none;
    border-bottom: 2px solid #605050;
}
       
</style>