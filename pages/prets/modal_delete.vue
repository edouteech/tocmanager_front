<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modaler" @click.stop>                     
            <p>Etes vous sur de vouloir supprimer définitivement ce prêt ??? </p>
            <div class="reponse">
                  <div class="yes"  @click="supPret(infos)">
                      Oui
                  </div>
                  <div class="no" @click="$emit('close-modal')">
                      Non
                  </div>
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
              pret: "",
          }
      }, 
      methods: {
          supPret(infos){
            //   console.log(infos);
              this.$axios.delete('/loans/' +infos,{
              params: {
                compagnie_id: localStorage.getItem('auth.company_id')
              }})           
              .then(response => {
                // console.log(response.data);
                    this.pret = response.data.data;
                     this.$router.push({path:'/corbeille',})})                               
          },
  
          refresh(){
            this.$axios.get('/get/loan')
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
    background-color: rgb(209, 0, 0);;
    height: 250px;
    width: 500px;
    margin-top: 12%;
    border-radius: 15px;
    padding: 30px 0;
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
  
  button {
    background-color: #ac003e;
    width: 150px;
    height: 40px;
    color: white;
    font-size: 14px;
    border-radius: 16px;
    margin-top: 50px;
  }
  </style>