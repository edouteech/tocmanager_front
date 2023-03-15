<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modaler text-center py-5">
             <p class="text-danger text-center"><strong>Votre email n'est pas encore vérifié !!!</strong></p>
             <br><br>
             <div>Pour vérifier votre addresse email, <p class="lien text-success" @click.prevent="verify()"><span  @click="$emit('close-modal')">cliquez ici</span></p> </div>
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
      data(){
        return{
            error: null,
            errors: null,
        }
      },

      methods: {
        verify(){
            this.$axios.post('/email/verification-notification')
            .then(response =>{
                this.$emit('conf')
            })
        },
      }
  
  }
  
  </script>
  
  
  <style scoped>
  .lien{
    text-decoration: underline;
    cursor: pointer;
  }
  
  .modal-overlay {
  z-index: 99;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #6d6d6dda;
  }
  
  .modaler {
    background-color: rgb(255, 255, 255);
    overflow: auto;
    width: 500px;
    margin-top: 15%;
    /* border-radius: 20px; */
    height: 300px;
    padding: 1%;
    box-shadow: 50px;
    border-radius: 15px;
    font-size: 22px;
  }
  .close {
    margin: 14% 0 0 16px;
    cursor: pointer;
  }
  
  .close-img {
    width: 25px;
  }
  
  </style>