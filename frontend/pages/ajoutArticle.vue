<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>                     
            <form action="" method="POST"> 
                <h4>Ajouter un article</h4>
                <div class="input-form"> 
                    <input type="text" placeholder="Entrer l'identifiant du produit" v-model="form.product_id" autocomplete="off" required>
                    <span class="error">{{error_champ.nature}}</span>
                </div>
                <div class="input-form"> 
                    <input type="text" placeholder="Entrer la quantité" v-model="form.quantity" autocomplete="off" required>
                    <span class="error">{{error_champ.nature}}</span>
                </div>
                <div class="input-form"> 
                    <input type="text" placeholder="Entrer le prix unitaire" v-model="form.price" autocomplete="off" required>
                    <span class="error">{{error_champ.nature}}</span>
                </div>
                <div class="input-form"> 
                    <input type="text" placeholder="Entrer le montant total" v-model="form.amount" autocomplete="off" required>
                    <span class="error">{{error_champ.nature}}</span>
                </div>        

                <div class="submit-form" @click="$emit('close-modal')">
                    <input type="submit" id='submit' value="Ajouter" name="submit">				          
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
    name: 'ajoutArticle',
    data () {
    return{
        form: {
            product_id: '',
            quantity: '',
            price: '',
            amount:''
        },
        error_message: "",
        error_champ: [],
    }
    },
  
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
  background-color: #a7a7a7da;
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