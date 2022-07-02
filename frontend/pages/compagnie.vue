<template>
<div class="container">
    <div class="flex items-center ">
        <div class="full">
          <img src="./images/eff.jpg" alt="landing image"><br><br>
          Inscription presque...Veuillez renseignez les informatins sur votre entreprise pour finaliser...
        </div>
        <div class="w-full max-w-md">
          <form class="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
            <!-- @csrf -->
            <div
              class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
                Enregistrer votre compagnie
            </div>
            <div class="mb-4">
                <label
                  class="block text-gray-700 text-sm font-normal mb-2"
                  for="name"
                >
                  Name
                </label>
                <input
                  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  name="name"
                  type="text"
                  v-model="form.name"
                  required
                  autofocus
                  placeholder="Entrer le nom de l'entreprise"
                />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-normal mb-2"
                for="email"
              >
                Email
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="email"
                type="email"
                v-model="form.email"
                autocomplete="off"
                required
                autofocus
                placeholder="Entrer l'email de l'entreprise"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-normal mb-2"
                for="phone"
              >
                Numéro de téléphone
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="phone"
                type="tel"
                v-model="form.phone"
                required
                autofocus
                placeholder="Entrer le numéro de téléphone de l'entreprise"
              />
            </div>
            
            <div class="flex items-center justify-between">
              <button class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 mt-5" type="submit" @click.prevent="submit()">Finaliser l'inscription</button>             
            </div>
            <p><NuxtLink to="/login" class="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800 mt-8">               
                  Vous avez déjà un compte ?
              </NuxtLink></p>
          </form>
          {{error.name}}
        </div>
    </div>
</div>
</template>

<script>
 import index from './index.vue'
    export default{
        auth:false,
        components: {index},
        data: function(){
            return{
            errors: [],
            error: '',
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
.container{
    margin-top: 5%;

}
.full{
    flex-basis: 50%; 
    font-size: 13px;
    margin-left: 3%;
    color: rgb(49, 88, 247);
}

.full img{
    width: 200px;
    margin-left: 15%;
    
}
</style>