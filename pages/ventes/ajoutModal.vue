<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler" @click.stop>                     
            <form action="" method="POST"> 
                        <h4>Ajout rapide de client </h4>

                <div class="input-form">					
                    <input type="text" placeholder="Entrer le nom du client " v-model="form.name" autocomplete="off" id="name_cli" required>
                    <span class="error">{{error_champ.name}}</span>
                </div>     
                <div class="input-form">        
                    <input type="tel" placeholder="Entrer le numero de téléphone du client " v-model="form.phone" id="phone_cli" required>
                    <span class="error">{{error_champ.phone}}</span>
                </div>
            
                <div class="input-form">    
                    <input type="email" placeholder="Entrer l'email du client " v-model="form.email" autocomplete="off" id="email_cli" required>
                    <span class="error">{{error_champ.email}}</span>
                </div>
                <div class="input-form"> 
                   <select v-model="form.nature" id="nature_cli" required>
                        <option disabled value="">Choisissez la nature du client</option>
                        <option value="0">Particulier</option>
                        <option value="1">Entreprise</option>
                    </select>
                    <!-- <input type="number" placeholder="Entrer la nature du client " v-model="form.nature" autocomplete="off" required> -->
                    <span class="error">{{error_champ.nature}}</span>
                </div>
                <div class="submit-form" @click="$emit('close-modal')">
                    <input type="submit" id='submit' @click.prevent="submit()" value="Enregistrer le client" name="submit">				          
                </div>
            </form>
    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="/images/fermer.png" alt="" />
    </div>

  </div>
</template>

<script>
  export default {
    auth:true,
    name: 'ajoutModal',
    data () {
    return{
        form: {
            name: '',
            email: '',
            phone: '',
            nature:'', 
            compagnie_id: ''
        },
        error_message: "",
        error_champ: [],
    }
    },

    methods: {
        async submit(){
            await  this.$axios.post('/clients',{
              name: this.form.name,
              email: this.form.email,
              phone: this.form.phone,
              nature: this.form.nature,
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            })
            .then(response =>{console.log(response.data.data) 
             this.$emit('conf', { message: this.form.name, cli_id: response.data.data.id })
             console.log( response ) 
                this.error = response.data.message
                console.log(this.error)

                this.errors = response.data.data
                if(response.data.status == "success"){
                    document.getElementById("name_cli").value='';
                    document.getElementById("phone_cli").value='';
                    document.getElementById("email_cli").value='';
                    document.getElementById("nature_cli").value='';
                }
                else{
                    this.errors = response.data.data
                    // this.$router.push({path:'/categorie/add_client'});
                }
             }).catch( err => console.log( err ) )
            
            },

    }
}
</script>

<style scoped>
form {
    padding: 50px;
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
    font-size: 16px;
    opacity: 0.8;
}

.submit-form {
    margin-top: 10%;
    text-align: center;       
}

input[type=submit] {
    background-color: white;
    color: black;
    padding: 10px 15px;
    margin: 8px 0;
    border: 1px solid #0971fa;
    cursor: pointer;
    width: 60%;
    font-size: 15px;
}

input[type=submit]:hover{
    background-color: #0971fa;
    color: white;
    border: 1px solid #0971fa;
    font-size: 16px;
}
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #949292da;
}

.modaler {
  text-align: center;
  background-color: white;
  height: 600px;
  width: 600px;
  margin-top: 5%;
  padding: 30px 0;
  border-radius: 20px;
}
.close {
  margin: 5% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

button {
  background-color: #ac003e;
  width: 150px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin-top: 50px;
}
</style>