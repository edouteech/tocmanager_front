<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler" @click.stop>                     
                <br><br>
            <h4>Informations du fournisseur</h4><br><br><br>
            <table class="table table-hover">
                <thead>
                  <tr class="table-success">
                        <th>A savoir</th>
                        <th>Fournisseur</th>
                        
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Nom du fournisseur</td>
                    <td>{{nom}}</td>
                  </tr>
                  <tr>
                    <td>Numéro de téléphone</td>
                    <td>{{phone}}</td>
                  </tr>
                  <tr>
                    <td>Email du fournisseur</td>
                    <td>{{email}}</td>
                  </tr>
                  <tr>
                    <td>Balance du fournisseur</td>
                    <td>{{balance}}</td>
                  </tr>
                  <tr>
                    <td>Nature du fournisseur</td>
                    <td>{{nature}}</td>
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
    props: ['nom', 'phone', 'email', 'balance', 'nature'],
    name: 'voirFournisseur',
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