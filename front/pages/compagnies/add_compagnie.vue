<template>
<div class="contain">
    <div class="zone">
          <div class="titre">
           <Sidebar /> <p class="name">Compagnies</p>
          </div>
        <p>Enregistrer une compagnie</p>
       
        <form action="" method="POST">
            <h1>Ajout de compagnie</h1>

            <div class="input-form">					
                <input type="text" placeholder="Entrer le nom de la compagnie " v-model="form.name" autocomplete="off" required>
                <span class="error">{{error_champ.name}}</span>
            </div>     
            <div class="input-form">        
                <input type="tel" placeholder="Entrer le numero de téléphone de la compagnie " v-model="form.phone" required>
                <span class="error">{{error_champ.phone}}</span>
            </div>
          
            <div class="input-form">    
                <input type="email" placeholder="Entrer l'email de la compagnie " v-model="form.email" autocomplete="off" required>
                <span class="error">{{error_champ.email}}</span>
            </div>
            <div class="submit-form">
                <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer la compagnie" name="submit">				          
            </div>

        </form>
        
    </div>

</div>
</template>

<script>
import Sidebar from '../sidebar.vue'
export default {
    layout: "empty",
    components: {
        Sidebar,
        
    },
    data () {
        return{
            form: {
                name: '',
                email: '',
                phone: ''
            },
            error_message: "",
            error_champ: [],
        }
    },
    methods: {
        async submit(){
            await  this.$axios.post('/create/compagnie',{
              name: this.form.name,
              email: this.form.email,
              phone: this.form.phone,
            }).then(response =>{ this.$router.push({path:'/compagnies/list_compagnie',})
                }).catch( error => console.log( error ) )
                 console.log(this.form.name)                
        },

    },
  
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