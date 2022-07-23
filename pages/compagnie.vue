<template>
  <div class="contain ">
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css' rel='stylesheet'>
      <br><br>
    <h3 class="text px-4">Informez nous sur votre entreprise</h3>
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img src="/images/enter11.png"
            class="img-fluid" alt="Sample image">
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form>
            <div class="divider d-flex align-items-center my-4">
              <p class="text-center fw-bold mx-3 mb-0">Finaliser l'inscription</p>
            </div>
            <div class="form-outline mb-4">
              <span class="fa fa-briefcase px-2"></span><label class="form-label">Nom de l'entreprise</label>
              <div class="input-field"><input type="text" class="form-control form-control-lg" v-model="form.name" required
                placeholder="Entrer le nom de votre entreprise" /></div>      
            </div>
            <!-- Email input -->
            <div class="form-outline mb-4">
              <span class="fa fa-envelope px-2"></span> <label class="form-label">Adresse Email</label>
              <div class="input-field"><input type="email" class="form-control form-control-lg" v-model="form.email" required
                placeholder="Entrer l'email de l'entreprise" /></div>      
            </div>
            <div class="form-outline mb-4">
              <span class="fa fa-phone-square px-2"></span> <label class="form-label">Téléphone</label>
              <div class="input-field"><input type="number" class="form-control form-control-lg" v-model="form.phone" required
                placeholder="Entrer votre numéro de téléphone" /></div>      
            </div>
            <div class="text-center text-lg-start mt-6 pt-2">
              <button type="button"  @click.prevent="submit()" class="btn btn-primary btn-lg"
                style="padding-left: 1rem; padding-right: 1rem;">Finaliser</button><br><br>
            </div><br><br><br>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
        auth:false,
        data: function(){
            return{
            form:{
                name: '',
                email: '',
                phone: '',
                user_id: ''
            }
            }
        },    
        mounted(){
            console.log(this.$route.params.id)
            // this.$axios.get('/index/profil').then(response => {console.log(response);})
        }  ,

        methods:{
            async submit(){
                await  this.$axios.post('/create/compagnie',{
                    name: this.form.name,
                    email: this.form.email,
                    phone: this.form.phone,
                    user_id: this.$route.params.id
                }).then(response => {console.log(response);
                   this.$router.push({path:'/login',});

                    }).catch( error => console.log( error ) )
                        console.log(this.form.name)                
            },
        }
    }
</script>

<style scoped>
.img-fluid{
    width: 300px;
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