<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop><br>
      <span class="information">Informations de la vente</span><br><br><br>
      <div class="vente"> 
          <div class="info_vente">  
                <div class="info">					
                    <span class="mode">Date de la vente : </span> <span class="resp">{{date}}</span>
                      <!-- {{info.name}}  -->
                      
                </div>     <br>
                <div class="info">        
                    <span class="mode">Client concerné : </span><span class="resp"> {{client}}</span>
                </div><br>
            
                <div class="info">    
                    <span class="mode">Montant : </span><span class="resp">{{montant}}</span>
                </div><br>
                <!-- <div class="input-form"> 
                    <span class="mode">Nature du client : </span> <span class="resp">{{nature}}</span>
                </div> -->
          </div>     
      
          <div class="ajout_encais" >                     
              <h3>Ajouter des encaissements pour ce client</h3><br><br>
              <form action="" method="POST">
                    <div class="ensemble">
                      <div class="input-form">					
                        <input type="date" placeholder="Entrer la date " v-model="form.date" autocomplete="off" required>
                        <span class="error">{{error_champ.name}}</span>
                      </div>
                      <div class="input-form1">        
                        <input type="number" placeholder="Entrer le montant à encaisser " v-model="form.montant" required>
                        <span class="error">{{error_champ.phone}}</span>
                      </div>
                  </div>     
                 
                  <div class="submit-form">
                      <input type="submit" id='submit' v-on:click.prevent="submit()" value="Enregistrer" name="submit">				          
                  </div>

              </form>  
          </div>
      </div><br><br><hr><br>
      <div class="list_encais">
        <h2>Liste des encaissements pour ce client</h2>
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
				<thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
					<tr>
						<th scope="col" class="px-6 py-3">
							Dates d'encaissement
						</th>
            <th scope="col" class="px-6 py-3">
							Montants encaissés
						</th>

					</tr>
				</thead>
				<tbody>
					<tr 
						class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
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
    props: ['date', 'client', 'montant', 'facture'],
    name: 'voirVente',
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
      console.log(this.client)
    },
    methods: {
        async submit(){
          console.log(this.client)
            await  this.$axios.post('/create/encaissement',{
              montant: this.form.montant,
              facture: this.facture,
              date: this.form.date,
              client_id: this.client,
              user_id: this.$auth.user.id,
            //   compagnie_id: this.$auth.$storage.getUniversal('company_id')
            }).then(response =>{ 
                console.log( response ) 
                this.$router.push({path:'/ventes/list_vente',})})
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
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #ebebfcda;
}

.modal {
  background-color: white;
  width: 90%;
  margin-top: 1%;
  padding: 0 5%;
  border-radius: 20px;
}
.close {
  margin: 2% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.modal .information{
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    text-decoration: underline;
    color: darkblue;

}

.info .mode{
    font-size: 20px;
    font-weight: bold;
}

.info .resp{
    font-size: 22px;
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