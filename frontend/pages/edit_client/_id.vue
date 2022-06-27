<template>
<div class="contain">
     <SideBar/>

    <div class="zone">    
        <div class="titre">
            Clients
        </div>    
          <form action="" method="POST">
              <p>Modifier les infos du client</p>	
              <div class="input-form">			
                  <input type="text" placeholder='Entrer le nom du client' v-model="form.name" autocomplete="off" required>
                  <span class="error">{{error_champ.name}}</span>
              </div>     
              <div class="input-form">        
                  <input type="text" placeholder="Entrer le numero de téléphone du client " v-model="form.phone" required>
                  <span class="error">{{error_champ.phone}}</span>
              </div>
            
              <div class="input-form">    
                  <input type="email" placeholder="Entrer l'email du client " v-model="form.email" autocomplete="off" required>
                  <span class="error">{{error_champ.email}}</span>
              </div>
              <div class="input-form"> 
                  <input type="text" placeholder="Entrer la nature du client " v-model="form.nature" autocomplete="off" required>
                  <span class="error">{{error_champ.nature}}</span>
              </div>
              <div class="submit-form">
                  <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer le client" name="submit">				          
              </div>
          </form> 
      </div>
</div>

</template>

<script>
import SideBar from '../nav.vue'
export default {
    components: {
        SideBar,  
    },
    data () {
        return{
            client: "",
            clients: [],
            form: {
                id: '',
                name: '',
                email: '',
                phone: '',
                nature:''
            },
            error_message: "",
            error_champ: [],
        }
        },
    mounted() {
        this.$axios.get('/index/client/'+ this.$route.params.id)
         .then(response => {console.log(response.data.data[0] )
            let client = response.data.data[0];
            // this.clients = response.data.data
            this.form.name = client.name,
            this.form.phone = client.phone,
            this.form.email = client.email,
            this.form.nature = client.nature
          }      
        )
            
    },

    methods: {

        submit(){          
            this.$axios.put('/update/client', {
            id: this.$route.params.id,
            name: this.form.name,
            email: this.form.email,
            phone: this.form.phone,
            nature: this.form.nature
            })
            .then(response =>{
                this.$router.push({
                  path:'/clients/list_client',})
            })          
        }
    }
   
}
</script>

<style scoped>
.zone p{
    font-size: 18px;
}

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
