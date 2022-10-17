<template>
    <div>
        <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
          <Sidebar /><h3 class="name">Utilisateurs </h3>
          <Userinfo />
        </nav>
    
        <div class="app-main__outer py-5 px-2">
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
                {{error}} 
            </div>
          <h4 class="mx-4">Modifier mot de passe</h4><hr><br>
            <div class="row">
                <div class="col-lg-5 col-md-12 img">
                  <div class="contact-info">
                    <img src="./../static/images/rmdpa.png" alt="profil" class="profil mr-2" />
                  </div>
                </div>
      
                <div class="col-lg-6 col-md-12 mt-5">
                    <div class="form-outline mb-3">
                        <span class="fas fa-lock px-2"></span><label class="form-label">Ancien Mot de passe</label>
                        <div class="input-field">
                        <input type="password" id="password" class="form-control form-control-lg" v-model="form.old_password"
                            placeholder="Entrer un mot de passe"/><span><i class="fa fa-eye px-2" id="eye" @click.prevent="changer()"></i></span></div>   
                    </div>
                    <div class="form-outline mb-3">
                        <span class="fas fa-lock px-2"></span><label class="form-label">Nouveau Mot de passe</label>
                        <div class="input-field">
                        <input type="password" id="password" class="form-control form-control-lg" v-model="form.password"
                            placeholder="Entrer un mot de passe"/><span><i class="fa fa-eye px-2" id="eye" @click.prevent="changer()"></i></span></div>   
                    </div>

                    <div class="form-outline mb-3">
                        <span class="fas fa-lock px-2"></span><label class="form-label">Confirmer le Nouveau Mot de passe</label>
                        <div class="input-field">
                        <input type="password" id="password1" class="form-control form-control-lg" v-model="form.password_confirmation"
                            placeholder="Entrer un mot de passe"/><span><i class="fa fa-eye px-2" id="eyes" @click.prevent="change()"></i></span></div>   
                    </div>
                
                        <button type="submit" class="btn btn-success mx-5" v-on:click.prevent="submit()">Modifier</button>
                </div>
            </div>
        </div>
        <br> 
    </div>
    
    </template>
    
    <script>
    import Sidebar from './sidebar.vue'
    import Userinfo from './user_info.vue'
    export default {
      auth: true,
      layout: "empty",
      components: {
        Sidebar,
        Userinfo
      },
       data () {
        return {
        error: null,
        email:'',
        role:'',
        form: {   
            old_password:'',
            password: '',
            password_confirmation: '',
        }
      }
    },

    
    mounted () {
        this.email = localStorage.getItem('auth.email');
        this.role = localStorage.getItem('auth.roles');
        // console.log(this.email);
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
                password: this.form.old_password,
                newPassword: this.form.password,
                newPassword_confirmation: this.form.password_confirmation,
                email: this.email
            })   
            .then(response =>{ 
                console.log( response ) 
                this.error = response.data.message
                localStorage.removeItem('auth.email');
                if(response.data.status == "success"){
                  
                      this.$router.push( 'dashboard',)
                   
                }
                else{
                    this.error = response.data.data
                }
            }).catch( err => console.log( err ) )
            
            
        }
    }   
}
    </script>
    
    <style scoped>
    /* .app-main__outer{
      overflow: auto;
    } */
    img{
        width: 80%;
    }
    
    .fa{
      /* margin: 0 5px; */
      font-size: 15px;
      cursor: pointer;
    }

    .input-field {
    border-radius: 5px;
    padding: 5px;
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #4343ff
}
    
    @media screen and (max-width: 800px) {
    .img{
        display: none;
    }
    }
    </style>
    