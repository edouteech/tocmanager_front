<template>
<div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Utilisateurs </h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <h4 class="mx-4">Mon profil</h4><hr><br>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
                {{error}} 
            </div>
            <div class="alert alert-success justify-content-center" role="alert" v-if="errors != null">
                {{errors}} 
            </div>
        <div class="row">
            <div class="col-lg-5 col-md-12 img">
              <div class="contact-info">
                <img src="./../static/images/profil.png" alt="profil" class="profil" />
              </div>
            </div>
  
            <div class="col-lg-6 col-md-12 mt-2">
                <div class="form-outline mb-4">
                    <span class="fa fa-desktop px-2"></span><label class="form-label">Fonction</label>
                    <select class="form-control form-control-lg" v-model="form.role" disabled>
                        <option  value="">Choisissez...</option>
                        <option value="2">Administrateur</option>
                        <option value="3">Comptable</option>
                        <option value="4">Caissier</option>
                    </select>
                </div>

                <div class="form-outline mb-4">
                    <span class="fa fa-address-book px-2"></span><label class="form-label">Nom Complet</label>
                    <div class="input-field"><input type="text" class="form-control form-control-lg" v-model="form.name" required
                        placeholder="Entrer votre nom" /></div>      
                </div>
                <!-- Email input -->
                <div class="form-outline mb-4">
                    <span class="fa fa-envelope px-2"></span> <label class="form-label">Adresse Email</label>
                    <div class="input-field"><input type="email" class="form-control form-control-lg" v-model="form.email" required
                        placeholder="Entrer une addresse email valide" /></div>      
                </div>

                <div class="form-outline mb-4">
                    <span class="fa fa-mobile px-2"></span> <label class="form-label">Téléphone</label>
                    <vue-tel-input class="form-control form-control-sm" v-model="form.phone"></vue-tel-input>      
                </div>

                <!-- <div class="form-outline mb-4">
                  <span class="fa fa-globe px-2"></span><label class="title">Pays</label>
                  <div class="input-field">   
                    <select class="form-control" v-model="form.country" required>
                        <option  value="">Choisissez...</option>
                        <option v-for="(countrie, i) in countries" :key="i" :value="countrie.name">{{countrie.name}}</option>
                    </select>  
                  </div> 
                </div> -->

                <div class="form-outline mb-4">
                  <span class="fa fa-university px-2"></span><label class="form-label">Ville</label>
                  <div class="input-field"><input type="text" class="form-control form-control-lg" v-model="form.city" required
                    placeholder="Entrer le nom de votre pays" /></div>      
                </div>
                <div class="form-outline mb-4">
                  <span class="fa fa-address-card px-2"></span><label class="form-label">Addresse</label>
                  <div class="input-field"><input type="text" class="form-control form-control-lg" v-model="form.address" required
                    placeholder="Entrer le nom de votre pays" /></div>      
                </div>

                <!-- <div class="form-outline mb-4">
                    <span class="fa fa-briefcase px-2"></span><label class="form-label">Nom de l'entreprise</label>
                    <div class="input-field"><input type="text" class="form-control form-control-lg" v-model="form.compagnie.name" required
                    placeholder="Entrer le nom de votre entreprise" /></div>      
                </div> -->
                <div class="d-flex">
                    <button type="submit" class="btn btn-success mx-5" v-on:click.prevent="submit()">Modifier</button>
                    <button type="submit" class="btn btn-info ml-5" v-on:click.prevent="change()">Changer de compagnie</button>
                </div>
            </div>
        </div>
    </div>
    <br> 
    
<changeCompagnie :compagnies= 'liste'  v-show="showModal" @close-modal="showModal = false"/>
</div>

</template>

<script>
import changeCompagnie from './change_compagnie.vue'
import Sidebar from './sidebar.vue'
import Userinfo from './user_info.vue'
export default {
  auth: true,
  layout: "empty",
  components: {
    Sidebar,
    Userinfo,
    changeCompagnie  
  },
   data () {
      return {
        showModal: false,
        liste: '',
        error: null,
        errors: null,
        form:{
            name: '',
            email: '',
            phone: '',
            country: '',
            role: '',
            city:'',
            address:'',
        },
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
          this.$axios.get('users/'+ this.$auth.$state.user[0].id,{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')}   
          }).then(response => {
            console.log(response.data.data[0]);
             this.form.name = response.data.data[0].name
             this.form.email = response.data.data[0].email
             this.form.phone = response.data.data[0].phone
             this.form.country = response.data.data[0].country 
             this.form.city = response.data.data[0].city
             this.form.address = response.data.data[0].address  
             this.form.role = response.data.data[0].role_id    
            //  this.identifiant6 = response.data.data[0].droits_add
            //  this.identifiant7 = response.data.data[0].droits_edition
            //  this.identifiant8 = response.data.data[0].droits_delete   
    
            }) 
        },

        submit(){              
            this.$axios.put('/users/' +this.$auth.$state.user[0].id,{
            id: this.$auth.$state.user[0].id,
            name: this.form.name,
            email: this.form.email,
            phone: this.form.phone,
            // country: this.form.country,
            city: this.form.city,
            address: this.form.address,
            compagnie_id: this.$auth.$storage.getUniversal('company_id')

            })
            .then(response =>{console.log(response)
                this.$router.push({
                  path:'/mon_profil'})
                  if(response.data.status == "success"){
                    this.errors="Modifications éffectuées avec succès !!!"
                  }
                  else{
                      this.error = "Echec!!! Veuillez réessayer..."
                      
                  }

            })      
        },

        change(){
            this.showModal = true;
            this.$axios.get('/user/compagnies')
            .then(response => {
                console.log(response)        
             this.liste = response.data
        //      this.identifiant3 = response.data.data[0].email
        //      this.identifiant4 = response.data.data[0].country 
        //      this.identifiant5 = response.data.data[0].role_name      
        //      this.identifiant6 = response.data.data[0].droits_add
        //      this.identifiant7 = response.data.data[0].droits_edition
        //      this.identifiant8 = response.data.data[0].droits_delete   
          })
        }

  }
}
</script>

<style scoped>
.fa{
  /* margin: 0 5px; */
  font-size: 15px;
  cursor: pointer;
}
.table{
	margin-top: 5%;
  text-align: center;
  justify-content: center;

}         


thead tr{
    background-color: transparent;
}

tbody tr:last-of-type{
    border-bottom: 2px solid rgb(140, 140, 250);
}
.action{
   display: flex;
}

.custom-btn {
  width: 180px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
}
.btn-3 {
  background: rgb(0,172,238);
background: linear-gradient(0deg, rgba(0,172,238,1) 0%, rgba(2,126,251,1) 100%);
  width: 180px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;
  
}
.btn-3 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-3:before,
.btn-3:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
   background: rgba(2,126,251,1);
  transition: all 0.3s ease;
}
.btn-3:before {
  height: 0%;
  width: 2px;
}
.btn-3:after {
  width: 0%;
  height: 2px;
}
.btn-3:hover{
   background: transparent;
  box-shadow: none;
}
.btn-3:hover:before {
  height: 100%;
}
.btn-3:hover:after {
  width: 100%;
}
.btn-3 span:hover{
   color: rgba(2,126,251,1);
}
.btn-3 span:before,
.btn-3 span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
   background: rgba(2,126,251,1);
  transition: all 0.3s ease;
}
.btn-3 span:before {
  width: 2px;
  height: 0%;
}
.btn-3 span:after {
  width: 0%;
  height: 2px;
}
.btn-3 span:hover:before {
  height: 100%;
}
.btn-3 span:hover:after {
  width: 100%;
}

@media screen and (max-width: 800px) {
.img{
    display: none;
}
}
</style>
