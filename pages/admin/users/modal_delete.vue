<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modaler" @click.stop>                     
            <p>Etes vous sur de vouloir supprimer définitivement cet utilisateur ??? </p>
            <div class="d-flex">
                  <button class="btn btn-danger mx-auto"  @click="supClient(infos)">
                      Oui
                  </button>
                  <button class="btn btn-dark mx-auto" @click="$emit('close-modal')">
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
      name: 'deleteModal',
      props: ['infos'],
      data () {
          return {
              client: "",
          }
      }, 
      methods: {
          supClient(infos){
            //   console.log(infos);
              this.$axios.delete('/users/' +infos)            
              .then(response => {
                // console.log(response.data);
                    this.client = response.data.data;
                if(response.data.status == "success"){
                    this.$toast("Suppression définitive de l'utilisateur", {
                        icon: 'fa fa-check-circle',
                    })
                     this.$router.push({path:'/admin/corbeille',})
                }
              })                               
          },
  
          refresh(){
            this.$axios.get('/get/compagnies')
            .then(response => {console.log(response);})
          }
      },
  
  }    
          
              
              
          
  </script>
  
  <style scoped>
  
  .reponse{
      display: flex;
      
  }
  
  .yes{
      padding: 10px;
      margin: 5%;
      text-align: center;
      border: 1px solid;
      cursor: pointer;
      margin-left: 30%;
      border-radius: 10px;
  }
  .no{
      padding: 10px;
      margin: 5%;
      text-align: center;
      border: 1px solid;
      cursor: pointer;
      border-radius: 10px;
  }
  
  .yes:hover{
      background-color: rgb(201, 220, 251);
  }
  
  .no:hover{
      background-color: rgb(201, 220, 251);
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
    background-color: rgba(239, 239, 239, 0.803);;
  }
  
  .modaler {
    text-align: center;
    background-color: rgb(57, 216, 252);;
    height: 250px;
    width: 500px;
    margin-top: 12%;
    border-radius: 15px;
    padding: 30px 0;
    box-shadow: 50px;
  }
  .close {
    margin: 12% 0 0 16px;
    cursor: pointer;
  }
  
  .close-img {
    width: 25px;
  }
  
  .check {
    width: 150px;
  }
  
  h6 {
    font-weight: 500;
    font-size: 28px;
    margin: 20px 0;
  }
  
  p {
    font-size: 18px;
    font-weight: bold;
    margin: 20px 5px;
  }

  </style>