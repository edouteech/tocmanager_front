<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modaler text-center py-5" @click.stop>
              <strong>Voulez vous supprimer ce produit ???</strong><br><br>
              <div class="d-flex" @click="$emit('close-modal')">
                <button class="btn btn-danger mx-auto" @click.prevent ="sup()">
                        Oui
                </button>
                <button class="btn btn-dark mx-auto" >
                        Non
                </button>
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
      props: ['identifiant'],
      name: 'deleteModal',

      methods: {
        sup(){
            this.$axios.delete('/products/' +this.identifiant,{params: {
            compagnie_id: this.$auth.$storage.getUniversal('company_id')
          }
          }).then(response =>
        //   console.log(response.data.data);
            this.$emit('conf', { message: this.identifiant})
            )   
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