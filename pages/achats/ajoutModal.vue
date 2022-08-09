<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler" @click.stop>                     
            <form action="" method="POST"> 
                        <h4>Ajout de fournisseur</h4>

                <div class="input-form">					
                    <input type="text" placeholder="Entrer le nom du fournisseur " v-model="form.name" autocomplete="off" id="name_four" required>
                </div>     
                <div class="input-form">        
                    <input type="tel" placeholder="Entrer le numero de téléphone du fournisseur " v-model="form.phone" id="phone_four" required>
                </div>
            
                <div class="input-form">    
                    <input type="email" placeholder="Entrer l'email du fournisseur " v-model="form.email" autocomplete="off" id="email_four" required>
                </div>
                <div class="input-form"> 
                   <select v-model="form.nature" id="nature_four" required>
                        <option disabled value="">Choisissez la nature du fournisseur</option>
                        <option value="0">Particulier</option>
                        <option value="1">Entreprise</option>
                    </select>
                    <!-- <input type="number" placeholder="Entrer la nature du fournisseur " v-model="form.nature" autocomplete="off" required> -->
                    
                </div>
                <div class="submit-form" @click="$emit('close-modal')">
                    <input type="submit" id='submit' @click.prevent="submit()" value="Enregistrer le fournisseur" name="submit">				          
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
        errors: [],
        error: null,
    }
    },
    
    methods: {
        async submit(){
            await  this.$axios.post('/suppliers',{
              name: this.form.name,
              email: this.form.email,
              phone: this.form.phone,
              nature: this.form.nature,
              compagnie_id: this.$auth.$storage.getUniversal('company_id')
            })
            .then(response =>{
                this.$emit('conf', { message: this.form.name, four_id: response.data.data.id })
                console.log( response ) 
                this.error = response.data.message
                console.log(this.error)

                this.errors = response.data.data


            })
            .catch( err => console.log( err ) )
                //  console.log(this.form.name)                
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