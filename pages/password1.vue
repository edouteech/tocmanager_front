<template>
<div class="contain ">
  <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css' rel='stylesheet'>
  
  <h2 class="text px-4">Mot de passe oublié</h2><hr>
  <div class="container-fluid h-custom">
      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">

        <form>
          <!-- Email input -->
          <div class="form-outline mb-4">
            <span class="fa fa-envelope px-2"></span> <label class="form-label">Entrez votre adresse email</label>
            <div class="input-field"><input type="email" class="form-control form-control-lg" v-model="form.email" required
              placeholder="Entrer votre addresse email " /></div>

            <NuxtLink to="/register"  class="link-primary px-2">               
                Inscription
            </NuxtLink>
          </div><br><br><br>
        </form>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  auth:false,
  name: 'password',
  data() {
    return {
      error: null,
      form: {
        email: '' ,
        password: ''
      }
    }
  },
  methods: {

      async login() {
        try {
          let response = await this.$auth.loginWith('local', { data: this.form })
          console.log(response);
          this.error = response.data.message
          console.log(this.error)
          this.$auth.$storage.setUniversal('company_id', response.data.data.original.compagnie[0].compagnie_id)
          this.$auth.setUserToken(response.data.data.original.access_token)
          .then(response =>{this.$router.push( '/dashboard',)
          })
          console.log(this.$auth);
        } catch (err) {
          console.log(err);
          // this.refresh();
        }
    }   
  }

}
</script>

<style scoped>
.contain{
    margin: 5% 10%;
}
</style>