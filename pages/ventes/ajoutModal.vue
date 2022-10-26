<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler" @click.stop>  
      <div class="alert alert-danger justify-content-center" role="alert" v-if="status == 'error'">
        {{error}} <br>
        <div class="error" v-if="errors['name'] != null">{{errors['name']}}</div>
        <div class="error" v-if="errors['email'] != null">{{errors['email']}}</div>
        <div class="error" v-if="errors['phone'] != null">{{errors['phone']}}</div>
        <div class="error" v-if="errors['nature'] != null">{{errors['nature']}}</div>
      </div>                    
            <form action="" method="POST"> 
                        <h4>Ajout rapide de client </h4>

                <div class="input-form">					
                    <input type="text" class="form-control" placeholder="Entrer le nom du client " v-model="form.name" autocomplete="off" id="name_cli" required>
                </div>     
                <div class="input-form">        
                    <input type="tel" class="form-control" placeholder="Entrer le numero de téléphone du client " v-model="form.phone" id="phone_cli" required>
                </div>
            
                <div class="input-form">    
                    <input type="email" class="form-control" placeholder="Entrer l'email du client " v-model="form.email" autocomplete="off" id="email_cli" required>
                </div>
                <div class="input-form"> 
                   <select v-model="form.nature" class="form-control"  required>
                        <option disabled value="">Choisissez la nature du client</option>
                        <option value="0" >Particulier</option>
                        <option value="1">Entreprise</option>
                    </select>
                </div>
                <div class="submit-form" @click="$emit('close-modal')">
                    <input type="submit" id='submit' @click.prevent="submit()" value="Enregistrer le client" name="submit">				          
                </div>
                <!-- <div v-else class="submit-form">
                    <input type="submit" id='submit' @click.prevent="submit()" value="Enregistrer le client" name="submit">				          
                </div> -->
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
            nature: 0, 
            compagnie_id: ''
        },
        errors: [],
        error: null,
        status: '',
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
                this.status = response.data.status
                console.log(this.error)
                this.errors = response.data.data
                  if(this.status == 'success'){
                    alert('Nouveau client ajouté avec succès');
                      this.form.name = '',
                      this.form.phone = '',
                      this.form.email = '',
                      this.form.nature = '',
                      this.status = response.data.status
                  }
                  else{
                    alert("Echec lors de l'ajout du client ! Veuillez réessayer.");
                    this.status = response.data.status
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
  overflow: auto;
}

.modaler {
  text-align: center;
  background-color: white;
  height: auto;
  width: 600px;
  margin-top: 10%;
  padding: 30px 0;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 0;
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