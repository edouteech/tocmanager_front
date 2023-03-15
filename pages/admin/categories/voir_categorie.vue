<template>
    <div class="modal-overlay" @click="$emit('close-modal')">
      <div class="modaler" @click.stop>                     
                  <br><br><br>
              <h4 class="titre">Informations de la catégorie</h4><br><br><br>
                <table class="table table-hover">
                  <thead>
                    <tr class="table-success">
                          <th>A savoir</th>
                          <th>Catégorie</th>
                          
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Nom de la catégorie</td>
                      <td>{{nom}}</td>
                    </tr>
                    <tr>
                      <td>Catégorie apparentée</td>
                      <td>{{parent}}</td>
                    </tr>
                    <tr>
                      <td>Compagnie associée</td>
                      <td>{{compagny}}</td>
                    </tr>
                  </tbody>
                </table>
                  <!-- <div class="input-form">					
                     <span class="mode">Nom de la catégorie : </span> <span class="resp">{{nom}}</span>
                       
                        
                  </div>     <br>
                  <div class="input-form">        
                     <span class="mode">Catégorie apparentée : </span><span class="resp"> {{parent}}</span>
                  </div><br>
               -->
      </div>
      <div class="close" @click="$emit('close-modal')">
        <img class="close-img" src="/images/fermer.png" alt="" />
      </div>
    </div>
  </template>
  
  <script>
    export default {
      auth:true,
      props: ['nom', 'parent', 'compagny'],
      name: 'voirCategorie',
  
  }
  
  </script>
  
  
  <style scoped>
  .titre{
    border: 1px solid black;
    background-color: black;
    color: #ffff;
    padding: 10px;
    text-align: center;
  }
  
  tbody tr:nth-child(even){
      background-color: rgb(215, 218, 220);
  }
  
  tbody tr:last-of-type{
      border-bottom: 2px solid rgb(92, 237, 8);
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
    background-color: #ebebfcda;
  }
  
  .modaler {
    background-color: white;
    height: 600px;
    width: 600px;
    margin-top: 5%;
    border-radius: 20px;
    padding: 1%;
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