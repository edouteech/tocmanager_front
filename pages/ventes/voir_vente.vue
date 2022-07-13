<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modal" @click.stop>                     
                <br><br>
            <span class="information">Informations de la vente</span><br><br><br>

                <div class="input-form">					
                   <span class="mode">Date de la vente : </span> <span class="resp">{{date}}</span>
                     <!-- {{info.name}}  -->
                      
                </div>     <br>
                <div class="input-form">        
                   <span class="mode">Client concerné : </span><span class="resp"> {{client}}</span>
                </div><br>
            
                <div class="input-form">    
                    <span class="mode">Montant : </span><span class="resp">{{montant}}</span>
                </div><br>
                <!-- <div class="input-form"> 
                   <span class="mode">Nature du client : </span> <span class="resp">{{nature}}</span>
                </div> -->

    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="../images/fermer.png" alt="" />
    </div>
  </div>
</template>

<script>
  export default {
    auth:true,
    props: ['date', 'client', 'montant'],
    name: 'voirVente',

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

.modal {
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

.modal .information{
    text-align: center;
    padding-left: 20%;
    font-weight: bold;
    font-size: 24px;
    text-decoration: underline;
    color: darkblue;

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