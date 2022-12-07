<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler" @click.stop>   
            <h4 class="titre">Informations du produit</h4><br><br>
              <table class="table table-hover">
                <thead>
                  <tr class="table-success">
                        <th>A savoir</th>
                        <th>Produit</th>
                        
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Catégorie concernée</td>
                    <td>{{id}}</td>
                  </tr>
                  <tr>
                    <td>Nom du produit</td>
                    <td>{{nom}}</td>
                  </tr>
                  <tr>
                    <td>Quantité stockée</td>
                    <td>{{quantite}}</td>
                  </tr>
                  <tr>
                    <td>Prix de vente</td>
                    <td>{{vente}}</td>
                  </tr>
                  <tr>
                    <td>Prix d'achat</td>
                    <td>{{achat}}</td>
                  </tr>
                  <tr>
                    <td>Stock minimal</td>
                    <td>{{min}}</td>
                  </tr>
                  <tr>
                    <td>Stock maximal</td>
                    <td>{{max}}</td>
                  </tr>
                  <tr>
                    <td>Groupe de taxation</td>
                    <td>{{group}}</td>
                  </tr>
                  
                </tbody>
              </table><br>
              <button class="btn btn-outline-dark mx-4" type="submit" @click.prevent="pdf()">Télécharger l'état du stock</button>
            
                <!-- <div class="input-form">					
                   <span class="mode">Catégorie concernée : </span> <span class="resp">{{id}}</span>
                </div>     <br>

                <div class="input-form">					
                   <span class="mode">Nom du produit : </span> <span class="resp">{{nom}}</span>
                </div>     <br>

                <div class="input-form">        
                   <span class="mode">Quantité stockée : </span><span class="resp"> {{quantite}}</span>
                </div><br>
            
                <div class="input-form">    
                    <span class="mode">Prix de vente : </span><span class="resp">{{vente}}</span>
                </div><br>
                <div class="input-form"> 
                   <span class="mode">Prix d'achat : </span> <span class="resp">{{achat}}</span>
                </div><br>
                <div class="input-form">					
                   <span class="mode">Stock minimal : </span> <span class="resp">{{min}}</span>
                </div>     <br>
                <div class="input-form">					
                   <span class="mode">Stock maximal : </span> <span class="resp">{{max}}</span>
                </div>     -->

    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="/images/fermer.png" alt="" />
    </div>
  </div>
</template>

<script>
  export default {
    auth:true,
    props: ['prod_id','id','nom', 'quantite', 'vente', 'achat', 'min', 'max', 'group'],
    name: 'voirProduit',

    methods:{
      pdf(){
          // console.log(this.prod_id)
          this.$axios.get('/products/'+this.prod_id+'/download',{params: {
                compagnie_id: localStorage.getItem('auth.company_id')
              }
            }).then(response => {
            console.log(response);})
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
  background-color: #ebebfcda;
  z-index: 99;
}


.titre{
  border: 1px solid black;
  background-color: black;
  color: #ffff;
  padding: 10px;
  text-align: center;
}

tbody tr:nth-child(even){
	background-color: rgb(246, 241, 246);
}

tbody tr:last-of-type{
	border-bottom: 2px solid rgb(92, 237, 8);
}


.modaler {
  background-color: white;
  height: 700px;
  width: 600px;
  margin-top: 2%;
  padding: 1%;
  border-radius: 20px;
  font-size: 18px;
}
.close {
  margin: 2% 0 0 16px;
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
    font-size: 16px;
    font-weight: bold;
}

.input-form .resp{
    font-size: 18px;
    margin-left: 3%;
    color: rgb(11, 7, 40);
}

</style>