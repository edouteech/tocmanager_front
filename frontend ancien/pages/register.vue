<template>
    <div class="flex items-center justify-center">
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
                required
                autofocus
                placeholder="Email"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-normal mb-2"
                for="password"
              >
                Password
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="password"
                placeholder="Password"
                v-model="form.password"
                name="password"
                required
                autocomplete="current-password"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-normal mb-2"
                for="phone"
              >
                Phone
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="phone"
                type="tel"
                v-model="form.phone"
                required
                autofocus
                placeholder="Phone"
              />
            </div>
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-normal mb-2"
                for="country"
              >
                Country
              </label>
              <input
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="country"
                type="text"
                v-model="form.country"
                required
                autofocus
                placeholder="Country"
              />
            </div>
            <div class="flex items-center justify-between">
              <button class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" type="submit" @click.prevent="register()">Sign In</button>
              <a
                class="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </form>
          <p class="text-center text-gray-500 text-xs">
           
          </p>
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
          form:{
            name: '',
            email: '',
            password: '',
            phone: '',
            country: ''

          }
        }
      },
        // mounted(){
        //     this.$axios.$get('/sanctum/csrf-cookie');
        // },
        methods:{
           async register(){
            await  this.$axios.post('/create/profil',{
              name: this.form.name,
              email: this.form.email,
              password: this.form.password,
              phone: this.form.phone,
              country: this.form.country
            }).then(response =>{
                    this.$router.push({
                      path:'/login',
                    })
  
                  })
                   .catch( error => console.log( error ) )
                    // console.log('user login')
                 console.log(this.form.name)
            }
        }
    }
</script>