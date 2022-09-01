<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Utilisateurs </h3>
    </nav>

    <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
      {{error}} <br>
      <div class="error" v-if="errors['name'] != null">{{errors['name']}}</div>
      <div class="error" v-if="errors['email'] != null">{{errors['email']}}</div>
      <div class="error" v-if="errors['phone'] != null">{{errors['phone']}}</div>
      <div class="error" v-if="errors['password'] != null">{{errors['password']}}</div>
      <div class="error" v-if="errors['password_confirmation'] != null">{{errors['password_confirmation']}}</div>
      <div class="error" v-if="errors['country'] != null">{{errors['country']}}</div>
    </div>

    <div class="app-main__outer p-5">
        <h4>Enregistrer un nouvel utilsateur</h4>
        <form action="">
            <div class="form-group ">
                <label class="title">Entrer le nom de l'utilisateur</label>
                <input type="text" class="form-control" v-model="form.name" autocomplete="off" required placeholder="Jean Doe">
            </div>
            <div class="form-group ">
                <label class="title">Entrer le numero de téléphone de l'utilisateur</label>
                <input type="tel" class="form-control" v-model="form.phone" required  placeholder="+525485335622">
            </div>
            <div class="form-group">
                <label class="title">Entrer l'email de l'utilsateur</label>
                <input type="email" class="form-control" v-model="form.email" autocomplete="off" required  placeholder="azerty@azert.com" >
            </div>
            <div class="form-group">
              <label class="title">Mot de passe</label>
              <input type="password" id="password" class="form-control " v-model="form.password"
                placeholder="Entrer un mot de passe"/>
            </div>
            <div class="form-group">
              <label class="title">Confirmer le Mot de passe</label>
              <input type="password" id="password1" class="form-control" v-model="form.password_confirmation"
                placeholder="Entrer un mot de passe"/>
            </div>
            <div class="form-group">
                 <label class="title">Entrer le pays de l'utilsateur</label>
                <input type="text" class="form-control" v-model="form.country" autocomplete="off" required  placeholder="Benin" >
            </div>

            <button type="submit" class="btn btn-primary" v-on:click.prevent="submit()">Enregistrer cet utilisateur</button>
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
                password: '',
                password_confirmation: '',
                country: '',
                compagnie_id: ''
            },
            errors: [],
            error: null,
        }
    },

    methods: {
        async submit(){
            await  this.$axios.post('/users',{
              name: this.form.name,
              email: this.form.email,
              phone: this.form.phone,
              password: this.form.password,
              password_confirmation: this.form.password_confirmation,
              country: this.form.country,
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }).then(response =>{ 
                console.log( response ) 
                this.error = response.data.message
                console.log(this.error)

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