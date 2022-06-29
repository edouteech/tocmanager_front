<template>
<div class="container">
    <div class="flex items-center justify-center">
        <div class="full">
          <img src="./images/sign.jpg" alt="landing image">
        </div>
        <div class="w-full max-w-md mt-10">
          <form class="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4">
            <!-- @csrf -->
            <div
              class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">
             Inscription
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
                  placeholder="Name"
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
                placeholder="Entrer votre email"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-normal mb-2"
                for="password"
              >
                Mot de passe
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Entrer un mot de passe"
                v-model="form.password"
                name="password"
                required
                autocomplete="off"
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
                placeholder="Entrer votre numéro de téléphone"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-normal mb-2"
                for="country"
              >
                Pays
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="country"
                type="text"
                v-model="form.country"
                required
                autofocus
                placeholder="Entrer votre pays d'origine"
              />
            </div>
            <div class="flex items-center justify-between">
              <button class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 mt-5" type="submit" @click.prevent="register()">Inscription</button>             
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
            password: '',
            phone: '',
            country: '',

          }
        }
      },

      // mounted () {
      // this.refresh()
      // },
            
        methods:{
            // refresh(){
            //   var that = this;    
            //   this.$axios
            //       .post('/create/profil',{ 
            //         data: this.form })
            //       .then(response => 
            //     {console.log(response)
            //       if (response.data.status == "error") {
            //                 that.errors = response.data.data
            //             } 
            //     });
                
            // },
           async register(){
            await  this.$axios.post('/create/profil',{
              name: this.form.name,
              email: this.form.email,
              password: this.form.password,
              phone: this.form.phone,
              country: this.form.country
            }).then(response =>{console.log(response);
                    // this.$router.push({
                    //   name: 'compagnie', params: { name: this.form.id  },
                    // })
  
                  })
                   .catch( err => console.log( err ) )
                    // console.log('user login')
                 console.log(this.form.id);
            }
        }
    }
</script>

<style>
.full{
    flex-basis: 50%; 
    min-width: 400px;
    margin-left: 5%;

}
</style>