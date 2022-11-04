<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
        <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css' rel='stylesheet'>
      <div class="modaler text-center py-5" @click.stop>
             <p class="text-danger text-center"><strong>Votre email n'est pas encore vérifié !!!</strong></p>
             <br><br>
             <p>Pour vérifier votre addresse email, cliquez <span @click.prevent="verify()">ici<i class="fa fa-hand-o-right" aria-hidden="true"></i></span> </p>
      </div>
      <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="/images/fermer.png" alt="" />
      </div>
    </div>
  </template>
  
  <script>
    export default {
      auth:true,
      props: ['identifiant'],
      name: 'modalEmail',

      methods: {
        verify(){
            this.$axios.post('/email/verification-notification')
            .then(response =>{
                 console.log(response)
                this.$emit('conf', { message: this.identifiant})
            })
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
    background-color: #dbdbdbda;
  }
  
  .modaler {
    background-color: rgb(197, 239, 251);
    overflow: auto;
    width: 600px;
    margin-top: 15%;
    /* border-radius: 20px; */
    height: 200px;
    padding: 1%;
    box-shadow: 50px;
  }
  .close {
    margin: 14% 0 0 16px;
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