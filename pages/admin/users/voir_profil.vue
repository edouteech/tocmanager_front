<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modaler" @click.stop>                     
                  <br><br>
              <h4 class="titre">Informations de l'utilisateur</h4><br><br><br>
                <table class="table table-hover">
                  <thead>
                    <tr class="table-success">
                          <th>A savoir</th>
                          <th>Utilisateur</th>
                          
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Nom de l'utilisateur</td>
                      <td>{{nom}}</td>
                    </tr>
                    <tr>
                      <td>Numéro de téléphone</td>
                      <td>{{phone}}</td>
                    </tr>
                    <tr>
                      <td>Email de l'utilsaateur</td>
                      <td>{{email}}</td>
                    </tr>
                    <tr>
                      <td>Pays de l'utilisateur</td>
                      <td>{{pays}}</td>
                    </tr>
                    
                  </tbody>
                </table>
                  <!-- <div class="input-form">					
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
                  </div> -->
  
      </div>
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="/images/fermer.png" alt="" />
      </div>
    </div>
  </template>
  
  <script>
    export default {
      auth:true,
      props: ['nom', 'phone', 'email', 'pays'],
      name: 'voirProfil',
      data () {
      return{
          client: '',
      }
      },
  }
  
  </script>
  
  
  <style scoped>
  
  .modal-overlay {
  z-index: 99;
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
    padding: 1%;
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
      background-color: rgb(249, 247, 236);
  }
  
  tbody tr:last-of-type{
      border-bottom: 2px solid rgb(92, 237, 8);
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