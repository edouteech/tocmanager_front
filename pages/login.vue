<template>
  <div class="contain ">
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css' rel='stylesheet'>
      <br><br>
    <h2 class="text px-4">Connectez vous</h2>
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            class="img-fluid" alt="Sample image">
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form>
            <div class="divider d-flex align-items-center my-4">
              <p class="text-center fw-bold mx-3 mb-0">Connexion</p>
            </div>

            <!-- Email input -->
            <div class="form-outline mb-4">
              <span class="fa fa-envelope px-2"></span> <label class="form-label">Adresse Email</label>
              <div class="input-field"><input type="email" class="form-control form-control-lg" v-model="form.email" required
                placeholder="Entrer votre addresse email " /></div>
              
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <span class="fas fa-lock px-2"></span><label class="form-label">Mot de passe</label>
              <div class="input-field">
              <input type="password" id="form3Example4" class="form-control form-control-lg" v-model="form.password"
                placeholder="Entrer votre mot de passe"/><span class="far fa-eye-slash px-2" required></span></div>
              
            </div>

            <div class="d-flex justify-content-between align-items-center">
              <!-- Checkbox -->
              <div class="form-check mb-0">
                <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3" />
                <label class="form-check-label" for="form2Example3">
                  Se rappeler de moi
                </label>
              </div>
              <a href="#!" class="link-primary">Mot de passe oublié ?</a>
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
              <button type="button"  @click.prevent="login()" class="btn btn-primary btn-lg"
                style="padding-left: 1rem; padding-right: 1rem;">Se connecter</button>
              <p class="small fw-bold mt-2 pt-1 mb-0">Vous n'avez pas de compte ? <NuxtLink to="/register"  class="link-primary px-2">               
                 Inscription
              </NuxtLink></p>
            </div><br><br><br>
          </form>
        </div>
      </div>
    </div>
                <div class="error-message">
                    {{error}}
                </div>
  </div>
</template>

<script>
export default {
  middleware:'auth',
  name: 'login',
  data() {
    return {
      error: '',
      form: {
        email: '' ,
        password: ''
      }
    }
  },
  methods: {
    refresh(){
      var that = this;    
       this.$axios
          .post('/authentifier',{ data: this.form })
          .then(response => 
        {console.log(response.data.message)
           if (response.data.status == "error") {
                    that.error = response.data.message
                } 
        });
        
    },

   async login() {
            try {
              let response = await this.$auth.loginWith('local', { data: this.form })
              console.log(response);
              this.$auth.$storage.setUniversal('company_id', response.data.data.original.compagnie[0].compagnie_id)
              this.$auth.setUserToken(response.data.data.original.access_token)
              .then(response =>{this.$router.push( '/dashboard',)})
              console.log(this.$auth);
            } catch (err) {
              console.log(err);
              this.refresh();
            }
        }   
  }

}
</script>

<style scoped>
.error-message{
  border: 1px solid transparent;
  color: red;
  font-size: 15px;
  text-align: center;
  font-weight: bold;
  margin-top: 5%;

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