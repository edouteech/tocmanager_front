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
                <div class="col-lg-5 col-md-12 img">
                  <div class="contact-info">
                    <img src="./../static/images/enter11.png" alt="profil" class="profil mt-2" />
                  </div>
                </div>
      
                <div class="col-lg-6 col-md-12 mt-5">
                    <form action="" method="POST">
                        <p>Modifier les informations de la compagnie</p>	
                        <div class="input-form">			
                            <input type="text" placeholder='Entrer le nom de la compagnie' v-model="form.name" autocomplete="off" required>
                            
                        </div>     
                        <div class="input-form">        
                            <input type="text" placeholder="Entrer le numero de téléphone de la compagnie " v-model="form.phone" required>
                            
                        </div>
                        
                        <div class="input-form">    
                            <input type="email" placeholder="Entrer l'email de la compagnie " v-model="form.email" autocomplete="off" required>
                            
                        </div>
                        <div class="submit-form">
                            <input type="submit" id='submit' v-on:click.prevent="submit()" value="Modifier" name="submit">				          
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
                phone: ''
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
            email: this.form.email,
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
            })
            .then(response =>{
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
                // console.log(response.data.data[0] )
            let compagnie = response.data.data[0];
            // this.clients = response.data.data
            this.form.name = compagnie.name,
            this.form.phone = compagnie.phone,
            this.form.email = compagnie.email
          }      
        )
        }
    }
   
}
</script>

<style scoped>
form {
    padding-top: 50px;
    padding-left: 50px;
}
.input-form {
    display: flex;
    flex-direction: column-reverse;
    margin: 1.2em 0;
    height: 50px;
}

input {
    padding: 8px;
    border: none; outline: none;
    border-bottom: 2px solid #605050;
}
       
input::placeholder {
    font-size: 15px;
    opacity: 0.5;
}

.submit-form {
    margin-top: 10%;
    text-align: right;       
}

input[type=submit] {
    background-color: white;
    color: black;
    padding: 10px 15px;
    margin: 8px 0;
    border: 1px solid #53af57;
    cursor: pointer;
    width: 100%;
    font-size: 15px;
}

input[type=submit]:hover{
    background-color: #53af57;
    color: white;
    border: 1px solid #53af57;
    font-size: 16px;
}

@media screen and (max-width: 800px) {
    .img{
        display: none;
    }
    }
</style>
