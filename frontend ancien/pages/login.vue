<template>
<div class="container">
    <div class="flex items-center justify-center">
        <div class="w-full">
          <img src="./images/icon2.png" alt="landing image">
        </div>
        <div class="w-full max-w-md mt-10">
            <form class="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4" ref="loginform" >
                <!-- @csrf -->
                <img src="./images/logo.png" alt="logo image">
              <div class="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4">

              </div>  
                
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-normal mb-2"
                    for="username">
                    Email
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="email"
                    type="email"
                    v-model="form.email"                required
                    autofocus
                    placeholder="Email"/> 
                </div>
                <div class="mb-6">
                  <label
                    class="block text-gray-700 text-sm font-normal mb-2"
                    for="password">                
                    Password
                  </label>
                  <input
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    type="password"
                    placeholder="Password"
                    name="password"
                    v-model="form.password"
                    required
                    autocomplete="current-password"/>
                </div>
                <div class="flex items-center justify-between">
                  <button class="px-4 py-2 rounded text-white inline-block shadow-lg bg-blue-500 hover:bg-blue-600 focus:bg-blue-700" type="submit" @click.prevent="login()">Sign In</button>
                  <a class="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800" href="#">               
                  Forgot Password?
                  </a>
                </div>
            </form>
              <p class="text-center text-gray-500 text-xs"></p> 
        </div>
    </div>
</div>
</template>


 <script>

export default {
  middleware:'auth',
  data() {
    return {
      form: {
        email: '' ,
        password: ''
      }
    }
  },
    mounted(){
        console.log(this.$auth);
    },
  methods: {
    async login() {
      try {
        console.log(this.$auth);
        console.log('--------------------------uhukh-------------------------------');
        let response = await this.$auth.loginWith('local', { data: this.form })
        this.$auth.setUserToken(response.data.data.original.access_token)
        .then(response =>{
                    this.$router.push(
                     '/dashboard',
                    )
  
                  })
                    
        // console.log(response.data.data.original.access_token);
        console.log(this.$auth);
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<!-- 
<script>
import axios from "axios";
    export default{
      auth:'guest',
      data(){
        return{
          form:{
            email: '',
            password: '',
          }
        }
      },

        methods:{
          login(){

            var that = this;       
               axios.post('http://localhost:8000/api/authentifier', this.form)
                .then(function(response){ 
                console.log(this.$auth)
                
                if (response.data.status == "error") {
                    that.error_message = response.data.message
                    that.error_champ  = response.data.data
                           } 
                    
            })
        
        }

        
            }
        }
    
</script>  -->

<style>
body{
  background-color: rgb(150, 151, 156);
}
.container{
  border: 1px solid transparent;
  background-color: #fff;
  width: 70%;
  margin-left: 15%;
  margin-top: 5%;
  border-radius: 10px;
}
form img{
  padding-left: 25%;
  width: 250px;

}
.flex{
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 3% ;
}

.w-full{
    flex-basis: 50%; 
    min-width: 350px;

}
</style>