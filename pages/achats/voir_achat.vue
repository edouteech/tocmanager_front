<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler" @click.stop><br>
      <h4>Informations sur cet achat</h4><br><br>
      <div class="vente"> 
          <div class="info_vente">  
                <div class="info">					
                    <span class="mode">Date de l'achat : </span> <span class="resp">{{date}}</span>
                </div>     <br>
                <div class="info">        
                    <span class="mode">Fournisseur concerné : </span><span class="resp"> {{fournisseur}}</span>
                </div><br>
            
                <div class="info">    
                    <span class="mode">Montant : </span><span class="resp">{{montant}}</span>
                </div><br>
                <!-- <div class="input-form"> 
                    <span class="mode">Nature du client : </span> <span class="resp">{{nature}}</span>
                </div> -->
          </div>     
      
          <div class="ajout_encais" >                     
              <h6>Ajouter des décaissements pour ce fournisseur</h6><br><br>
              <form action="" method="POST">
                    <div class="ensemble">
                      <div class="input-form">					
                        <input type="date" placeholder="Entrer la date " v-model="form.date" autocomplete="off" required>
                        <span class="error">{{error_champ.name}}</span>
                      </div>
                      <div class="input-form1">        
                        <input type="number" placeholder="Entrer le montant à décaisser " v-model="form.montant" required>
                        <span class="error">{{error_champ.phone}}</span>
                      </div>
                  </div>     
                 
                  <div class="submit-form">
                      <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer" name="submit">				          
                  </div>

              </form>  
          </div>
      </div><br><hr><br>
      <div class="list_encais">
        <h6>Derniers décaissements pour ce client</h6>
        <table class="table table-hover">
          <thead>
            <tr class="table-success">
                <th>
                    Dates de décaissement
                </th>
                 <th >
                    Montants décaissés
                </th>
    		</tr>
		   </thead>
		   <tbody>
			<tr>
                <td>Today</td>
                <td>200</td>
			</tr>
		   </tbody>
		</table>
      </div>
    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="/images/fermer.png" alt="" />
    </div>
  </div>
</template>

<script>
  export default {
    auth:true,
    props: ['date', 'fournisseur', 'montant', 'facture'],
    name: 'voirAchat',
    data () {
        return{
            form: {
                date: '',
                montant: '',
                phone: '',
                nature:'',
                compagnie_id: ''
            },
            error_message: "",
            error_champ: [],
        }
    },
    
    mounted(){
      console.log(this.fournisseur)
    },
    methods: {
        async submit(){
          console.log(this.fournisseur)
            await  this.$axios.post('/decaissements',{
              montant: this.form.montant,
              facture: this.facture,
              date: this.form.date,
              supplier_id: this.fournisseur,
              user_id: this.$auth.user.id,
              compagnie_id: localStorage.getItem('auth.company_id')
            }).then(response =>{ 
                console.log( response ) 
                this.$router.push({path:'/achat/list_achat',})})
            .catch( error => console.log( error ) )
                //  console.log(this.form.name)                
        },

    },

}

</script>


<style scoped>
.vente{
  display: flex;

}

.info_vente{
  border-right: 2px solid black;
      flex-basis: 50%; 
}
.ajout_encais{
  margin-left:5% ; 
}
.modal-overlay {
  z-index: 999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #ebebfcda;
}

.modaler {
  background-color: white;
  width: 90%;
  margin-top: 1%;
  padding: 0 5%;
  border-radius: 20px;
  overflow: scroll;
}
.close {
  margin: 2% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.info .mode{
    font-size: 16px;
    font-weight: bold;
}

.info .resp{
    font-size: 18px;
    margin-left: 3%;
    color: rgb(11, 7, 40);
}

form {
    width: 80%;
    text-align: center;
}

.ensemble{
  display: flex;
}
.input-form {
    display: flex;
    flex-direction: column-reverse;
}

.input-form1{
    display: flex;
    flex-direction: column-reverse;
    margin-left: 15%;

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
    margin-top: 20%;
    text-align: right;       
}

input[type=submit] {
    background-color: white;
    color: black;
    padding: 5px;
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
    border-radius: 15px;
}

</style>