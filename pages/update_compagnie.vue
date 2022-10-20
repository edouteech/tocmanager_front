<template >
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name">Ma Compagnie </h3>
          <Userinfo />
        </nav>
        
        <div class="app-main__outer p-5">
          <h4>Informations relatives à ma compagnie</h4><hr>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
                {{error}} 
            </div>
            <div class="alert alert-success justify-content-center" role="alert" v-if="errors != null">
                {{errors}} 
            </div>
            <div class="row">
                <div class="col-lg-5 col-md-12 img mt-5">
                  <div class="contact-info mt-5">
                    <img src="./../static/images/enter11.png" alt="profil" class="profil mt-5" />
                  </div>
                </div>
      
                <div class="col-lg-6 col-md-12 mt-2 ml-5">
                    <form action="" method="POST" class="px-5">
                        <span class="text-center"><strong>Modifier les informations de la compagnie</strong></span>	<br><br>
                        <div class="form-outline mb-4">
                            <span class="fa fa-briefcase px-2"></span><label class="form-label">Nom de la compagnie</label>
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
                            <div class="input-field"><input type="tel" class="form-control form-control-lg" v-model="form.phone" required
                                placeholder="Entrer votre numéro de téléphone" /></div>      
                        </div>
                        <div class="form-outline mb-4">
                            <span class="fa fa-address-card px-2"></span><label class="form-label">Addresse</label>
                            <div class="input-field"><input type="text" class="form-control form-control-lg" v-model="form.address" required
                                placeholder="Entrer l'addresse" /></div>      
                        </div>
                        <div class="form-outline mb-4">
                        <span class="fa fa-sort-numeric-desc px-2"></span><label class="form-label">Numéro d'Identification Fiscale  Unique</label>
                        <div class="input-field"><input type="text" class="form-control form-control-lg" v-model="form.ifu" required
                            placeholder="Entrer le numéro IFU" /></div>      
                        </div>
                        <div class="form-outline mb-4">
                        <span class="fa fa-exchange px-2"></span><label class="form-label">Régistre de commerce</label>
                        <div class="input-field"><input type="text" class="form-control form-control-lg" v-model="form.registre" required
                            placeholder="Entrer le régistre" /></div>      
                        </div>
                        <div class="form-outline mb-4">
                        <span class="fa fa-key px-2"></span><label class="form-label">Token de génération de facture</label>
                        <div class="input-field"><textarea type="textarea" class="form-control form-control-lg" v-model="form.token" cols="30" rows="4" required
                            placeholder="Entrer le token"></textarea></div>      
                        </div>
                        <div class="submit-form">
                            <button type="submit" class="btn btn-success" v-on:click.prevent="submit()" >Modifier	</button>  		          
                        </div>
                    </form> 
                </div>
            </div>
      </div>
</div>

</template>

<script>
import Sidebar from './sidebar.vue'
import Userinfo from './user_info.vue'
export default {
    layout: "empty",
    components: {
    Sidebar,
    Userinfo
    },
    data () {
        return{
            identifiant: "",
            compagnie: "",
            compagnies: [],
            form: {
                id: '',
                name: '',
                email: '',
                phone: '',
                ifu: '',
                registre: '',
                address: '',
                token: ''

            },
            error_message: "",
            error: null,
            errors: null,
            compagny: ''
        }
        },
    mounted() {
    this.compagny = localStorage.getItem('auth.company_id');    
    this.refresh() 
    },

    methods: {

        submit(){          
            this.$axios.put('/compagnies/'+this.compagny, {
            id: this.compagny,
            name: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            register_number: this.form.ifu,
            rccm : this.form.registre,
            address:this.form.address,
            mecef_token: this.form.token,
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
            })
            .then(response =>{
                console.log(response)
                this.$router.push({
                  path:'/update_compagnie',})
                  if(response.data.status == "success"){
                    this.errors="Modifications éffectuées avec succès !!!"
                  }
                  else{
                      this.error = "Echec!!! Veuillez réessayer..."
                      
                  }
            })          
        },
        refresh(){
            this.$axios.get('/compagnies/'+ this.compagny,{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          }
          })
            .then(response => {
                // console.log(response.data.data )
            let compagnie = response.data.data[0];
            // this.clients = response.data.data
            this.form.name = compagnie.name,
            this.form.phone = compagnie.phone,
            this.form.email = compagnie.email,
            this.form.ifu = compagnie.register_number,
            this.form.address = compagnie.address,
            this.form.registre = compagnie.rccm,
            this.form.token = compagnie.mecef_token
          }      
        )
        }
    }
   
}
</script>

<style scoped>

@media screen and (max-width: 800px) {
    .img{
        display: none;
    }
    }
</style>
