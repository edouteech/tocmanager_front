<template>
  <div class="contain ">
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css' rel='stylesheet'>
      <br><br>
    <h2 class="text px-4">Inscrivez vous</h2>
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img src="/images/sign.jpg"
            class="img-fluid" alt="Sample image">
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form>
            <div class="divider d-flex align-items-center my-4">
              <p class="text-center fw-bold mx-3 mb-0">Inscription</p>
            </div>
            <div class="form-outline mb-4">
              <span class="fa fa-address-book px-2"></span><label class="form-label">Nom</label>
              <div class="input-field"><input type="text" class="form-control form-control-lg" v-model="form.name" required
                placeholder="Entrer votre nom" /></div>      
            </div>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <span class="fa fa-envelope px-2"></span> <label class="form-label">Adresse Email</label>
              <div class="input-field"><input type="email" class="form-control form-control-lg" v-model="form.email" required
                placeholder="Entrer une addresse email valide" /></div>      
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <span class="fa fa-envelope px-2"></span><label class="form-label">Mot de passe</label>
              <div class="input-field">
              <input type="password" class="form-control form-control-lg" v-model="form.password"
                placeholder="Entrer un mot de passe"/><span class="far fa-eye-slash px-2" required></span></div>   
            </div>

            <div class="form-outline mb-4">
              <span class="fa fa-mobile px-2"></span> <label class="form-label">Téléphone</label>
              <div class="input-field"><input type="number" class="form-control form-control-lg" v-model="form.phone" required
                placeholder="Entrer votre numéro de téléphone" /></div>      
            </div>
            <div class="form-outline mb-4">
              <span class="fa fa-globe px-2"></span><label class="form-label">Pays</label>
              <div class="input-field"><input type="text" class="form-control form-control-lg" v-model="form.country" required
                placeholder="Entrer le nom de votre pays" /></div>      
            </div>

            <div class="text-center text-lg-start mt-6 pt-2">
              <button type="button"  @click.prevent="register()" class="btn btn-primary btn-lg"
                style="padding-left: 1rem; padding-right: 1rem;">S'inscrire</button><br><br>
              <p class="small fw-bold mt-2 pt-1 mb-0">Vous avez déjà un compte ? <NuxtLink to="/login"  class="link-primary px-2">               
                 Connexion
              </NuxtLink></p>
            </div><br><br><br>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
      auth:false,
      data: function(){
        return{
          user:'',
          errors: [],
          error: '',
          form:{
            name: '',
            email: '',
            password: '',
            phone: '',
            country: '',

          }
        }
      },


        methods:{
           async register(){
            await  this.$axios.post('/create/profil',{
              name: this.form.name,
              email: this.form.email,
              password: this.form.password,
              phone: this.form.phone,
              country: this.form.country
            }).then(response =>{console.log(response.data.data.original);
                this.user = response.data.data.original.user_id;
                // console.log(this.user) 
                    this.$router.push({
                      name: 'compagnie', params: { id: this.user  },
                    })
  
                  })
                   .catch( err => console.log( err ) )
                    // console.log('user login')
            }
        }
    }
</script>

<style scoped>
.img-fluid{
    width: 500px;
}
.input-field {
    border-radius: 5px;
    padding: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #4343ff
}

.divider:after,
.divider:before {
content: "";
flex: 1;
height: 1px;
background: #eee;
}
.h-custom {
height: calc(100% - 73px);
}
@media (max-width: 450px) {
.h-custom {
height: 100%;
}
}
</style>