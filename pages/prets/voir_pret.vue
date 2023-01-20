<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler" @click.stop>                     
                <br><br>
            <h4 class="text-center">Informations sur ce prêt</h4><br>
            <table class="table table-hover">
                <thead>
                  <tr class="table-success">
                        <th>A savoir</th>
                        <th>Prêt</th>
                        
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Employé concerné</td>
                    <td>{{employee.first_name}} {{employee.last_name}}</td>
                  </tr>
                  <tr>
                    <td>Date d'enregistrement du prêt</td>
                    <td>{{date_loan}}</td>
                  </tr>
                  <tr>
                    <td>Montant du prêt</td>
                    <td>{{amount}}</td>
                  </tr>
                  <tr>
                    <td>Tranche de paiement</td>
                    <td>{{tranche}}</td>
                  </tr>
                  <tr>
                    <td>Reste à payer</td>
                    <td>{{rest}}</td>
                  </tr>
                  <tr>
                    <td>Date limite de paiement</td>
                    <td>{{date_limit}}</td>
                  </tr>
                  
                </tbody>
              </table>


    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="/images/fermer.png" alt="" />
    </div>
  </div>
</template>

<script>
  export default {
    auth:true,
    props: ['employee', 'amount', 'tranche', 'date_loan', 'date_limit', 'rest'],
    name: 'voirPret',
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
  background-color: #ebebfcda;
  z-index: 99;
}

.modaler {
  background-color: white;
  height: 600px;
  width: 600px;
  margin-top: 5%;
  padding: 5%;
  border-radius: 20px;
}
.close {
  margin: 5% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.titre{
  border: 1px solid black;
  background-color: black;
  color: #ffff;
  padding: 10px;
  text-align: center;
}

tbody tr:nth-child(even){
	background-color: rgb(228, 239, 245);
}

tbody tr:last-of-type{
	border-bottom: 2px solid rgb(92, 237, 8);
}



.input-form .mode{
    font-size: 20px;
    font-weight: bold;
}

.input-form .resp{
    font-size: 22px;
    margin-left: 3%;
    color: rgb(11, 7, 40);
}

</style>