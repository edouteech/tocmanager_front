<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler" @click.stop>                     
                <br><br><br>
            <h4>Informations de la catégorie</h4><br><br><br>

                <div class="input-form">					
                   <span class="mode">Nom de la catégorie : </span> <span class="resp">{{nom}}</span>
                     <!-- {{info.name}}  -->
                      
                </div>     <br>
                <div class="input-form">        
                   <span class="mode">Catégorie apparentée : </span><span class="resp"> {{parent}}</span>
                </div><br>
            
    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="/images/fermer.png" alt="" />
    </div>
  </div>
</template>

<script>
  export default {
    auth:true,
    props: ['nom', 'parent'],
    name: 'voirCategorie',

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