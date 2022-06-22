<template>
<div class="general">
        <div class="haut">
            <div class="user">
             <img src="../images/user.png" alt="logo" srcset="">
             <span class="user_name">{{$auth.user.name}}</span> 
             <button type="button" class="bg-red-700 text-white rounded p-3 ml-8" @click="logout">Déconnexion</button>    
            </div>
        </div>

    <div class="espace">

    <h3>Enregistrer une nouvelle catégorie de produit</h3>
       
      <form action="" method="POST">
            <h1>Ajout de catégorie</h1>

            <div class="input-form">					
                <input type="text" placeholder="Entrer le nom de la catégorie " v-model="form.name" autocomplete="off" required>
                <span class="error">{{error_champ.name}}</span>
            </div>    
            <div class="submit-form">
                <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer" name="submit">				          
            </div>
 
            
        </form>
        
</div>
  <SideBar/> 
</div>
</template>

<script>
import axios from "axios";

import SideBar from '../nav.vue'
export default {
  components: {
    SideBar,
    
  },
  data () {
      return{
          form: {
              name: '',
             
          },
          error_message: "",
          error_champ: [],
      }
  },
    methods: {
        async submit(){
            await  this.$axios.post('/create/categorie',{
              name: this.form.name
            }).then(response =>{
                    this.$router.push({
                      path:'/categorie/list_categorie',
                    })
  
                }).catch( error => console.log( error ) )
                    // console.log('user login')
                 console.log(this.form.name)                
        },

        async logout(){
                this.$auth.logout();
                this.$router.push('/login');
        },

  // async submit() {
  //     try {
  //        axios.post('http://localhost:8000/api/create/client', this.form)
  //       let response = await this.$auth.loginWith('local', { data: this.form })
  //       this.$auth.setUserToken(response.data.data.original.access_token)
  //       .then(response =>{
  //                   this.$router.push(
  //                    '/list_client',
  //                   )
  
  //                 })
                    
  //       // console.log(response.data.data.original.access_token);
  //       console.log(this.$auth);
  //     } catch (err) {
  //       console.log(err)
  //     }
  //   },
      //   submit(){    
      // var that = this;       
      //       axios.post('http://localhost:8000/api/create/client', this.form)
      //       .then(function(response){ 
      //           console.log(response.data)
      //           if (response.data.status == "error") {
      //               that.error_message = response.data.message
      //               that.error_champ  = response.data.data

      //           } 
      //       })
        
      //   }
    },
  
}
</script>

<style scooped>
form {
    width: 80%;
    padding-left: 100px;
    padding-right: 300px;
    padding-top: 50px;
}
.input-form {
    display: flex;
    flex-direction: column-reverse;
    margin: 1.2em 0;
    height: 50px;
}

.error{               
    color: red;
    margin-bottom: -10%;
    font-size: 12px;
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

</style>