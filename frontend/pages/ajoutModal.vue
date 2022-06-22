<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>                     
            <form action="" method="POST"> 
                        <h4>Ajout de client</h4>

                <div class="input-form">					
                    <input type="text" placeholder="Entrer le nom du client " v-model="form.name" autocomplete="off" required>
                    <span class="error">{{error_champ.name}}</span>
                </div>     
                <div class="input-form">        
                    <input type="tel" placeholder="Entrer le numero de téléphone du client " v-model="form.phone" required>
                    <span class="error">{{error_champ.phone}}</span>
                </div>
            
                <div class="input-form">    
                    <input type="email" placeholder="Entrer l'email du client " v-model="form.email" autocomplete="off" required>
                    <span class="error">{{error_champ.email}}</span>
                </div>
                <div class="input-form"> 
                    <input type="number" placeholder="Entrer la nature du client " v-model="form.nature" autocomplete="off" required>
                    <span class="error">{{error_champ.nature}}</span>
                </div>
                <div class="submit-form">
                    <input type="submit" id='submit' @click.stop="submit()" value="Enregistrer le client" name="submit">				          
                </div>
            </form>
    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="./images/fermer.png" alt="" />
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
            nature:''
        },
        error_message: "",
        error_champ: [],
    }
    },
    
    methods: {
        async submit(){
            await  this.$axios.post('/create/client',{
              name: this.form.name,
              email: this.form.email,
              phone: this.form.phone,
              nature: this.form.nature
            })
            // .then(response =>{console.log(response) 
            //         this.$router.push({ 
            //           path:'/clients/list_client',
            //         })})
  
            .catch( error => console.log( error ) )
                    // console.log('user login')
                 console.log(this.form.name)                
        },

    }
}
</script>

<style scoped>

.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
}

.modal {
  text-align: center;
  background-color: white;
  height: 500px;
  width: 500px;
  margin-top: 10%;
  padding: 60px 0;
  border-radius: 20px;
}
.close {
  margin: 10% 0 0 16px;
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