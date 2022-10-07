<template >
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <h3 class="name">Mot de Passe </h3>
        </nav>
    
        <div class="app-main__outer p-5">
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
                {{error}} 
            </div>
            <h4>Modification de mot de passe</h4><br><br>
            <p>Pour avoir accès à votre espace de travail, veuillez 
                entrer un nouveau mot de passe</p>

            <form>
                <!-- Password input -->
                <div class="form-outline mb-3">
                    <span class="fas fa-lock px-2"></span><label class="form-label">Mot de passe</label>
                    <div class="input-field">
                    <input type="password" id="password" class="form-control form-control-lg" v-model="form.password"
                        placeholder="Entrer un mot de passe"/><span><i class="fa fa-eye px-2" id="eye" @click.prevent="changer()"></i></span></div>   
                </div>

                <div class="form-outline mb-3">
                    <span class="fas fa-lock px-2"></span><label class="form-label">Confirmer le Mot de passe</label>
                    <div class="input-field">
                    <input type="password" id="password1" class="form-control form-control-lg" v-model="form.password_confirmation"
                        placeholder="Entrer un mot de passe"/><span><i class="fa fa-eye px-2" id="eyes" @click.prevent="change()"></i></span></div>   
                </div>
                
                <div class="text-center text-lg-start mt-6 pt-2">
                    <button type="button"  @click.prevent="submit()" class="btn btn-primary btn-lg"
                        style="padding-left: 1rem; padding-right: 1rem;">Accéder à l'espace de travail</button><br><br>
            
                </div>

            </form>
        </div>
    </div>
</template>

<script>
export default {
    layout: "empty",


   data () {
      return {
        error: null,
        form: {   
            password: '',
            password_confirmation: '',
        }
      }
    },

    
    mounted () {
        console.log(this.$auth.$state.user.email);
    },

    methods: {
        changer(){
        var pwd = document.getElementById("password");
            var fa =  document.getElementById("eye")
            if(pwd.getAttribute("type")=="password"){
                pwd.setAttribute("type","text");
                fa.class="fa fa-eye px-2";
            } else {
                pwd.setAttribute("type","password");
            
            }
        },

        change(){
        var pwd = document.getElementById("password1");
            var fa =  document.getElementById("eye")
            if(pwd.getAttribute("type")=="password"){
                pwd.setAttribute("type","text");
                fa.class="fa fa-eye px-2";
            } else {
                pwd.setAttribute("type","password");
            
            }
        },

        async submit(){
            await  this.$axios.post('/modify-password',{
                password: "00000000",
                newPassword: this.form.password,
                newPassword_confirmation: this.form.password_confirmation,
                email: this.$auth.$state.user.email
            })   
            .then(response =>{ 
                console.log( response ) 
                this.error = response.data.message
                if(response.data.status == "success"){
                    if(this.$auth.$state.roles[0].pivot.role_id != 2){
                    this.$router.push( '/ventes/vente',)
                    }
                    else{
                      this.$router.push( 'dashboard',)
                    }
                }
                else{
                    this.error = response.data.data
                    // this.$router.push({path:'/categorie/add_client'});
                }
            }).catch( err => console.log( err ) )
            
            
        }
    }   
}
</script>


<style scoped>
.app-main__outer{
overflow: auto;
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
