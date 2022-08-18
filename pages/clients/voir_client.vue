<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler" @click.stop>                     
                <br><br>
            <h4>Informations du client</h4><br><br><br>

                <div class="input-form">					
                   <span class="mode">Nom du client : </span> <span class="resp">{{nom}}</span>
                </div>     <br>
                <div class="input-form">        
                   <span class="mode">Numéro de téléphone : </span><span class="resp"> {{phone}}</span>
                </div><br>
            
                <div class="input-form">    
                    <span class="mode">Email du client : </span><span class="resp">{{email}}</span>
                </div><br>

                <div class="input-form">    
                    <span class="mode">Balance du client : </span><span class="resp">{{balance}}</span>
                </div><br>

                <div class="input-form"> 
                   <span class="mode">Nature du client : </span> <span class="resp">{{nature}}</span>
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
    props: ['nom', 'phone', 'email', 'balance', 'nature'],
    name: 'voirClient',
    data () {
    return{
        client: '',
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



.input-form .mode{
    font-size: 16px;
    font-weight: bold;
}

.input-form .resp{
    font-size: 18px;
    margin-left: 3%;
    color: rgb(11, 7, 40);
}

</style>