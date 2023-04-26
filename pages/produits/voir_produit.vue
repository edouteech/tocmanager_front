<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler my-auto" @click.stop>
    <div class="close d-flex justify-content-end" @click="$emit('close-modal')">
      <i class="fa fa-times-circle" aria-hidden="true"></i>
    </div><br /><br />
      <h4 class="titre">Informations du produit</h4>
      <br />
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
            <td>{{ id }}</td>
          </tr>
          <tr>
            <td>Nom du produit</td>
            <td>{{ nom }}</td>
          </tr>
          <tr>
            <td>Quantité stockée</td>
            <td>{{ quantite }}</td>
          </tr>
          <tr>
            <td>Prix de vente</td>
            <td>{{ vente }}</td>
          </tr>
          <tr>
            <td>Prix d'achat</td>
            <td>{{ achat }}</td>
          </tr>
          <tr>
            <td>Stock minimal</td>
            <td>{{ min }}</td>
          </tr>
          <tr>
            <td>Stock maximal</td>
            <td>{{ max }}</td>
          </tr>
          <tr>
            <td>Groupe de taxation</td>
            <td>{{ group }}</td>
          </tr>
          <tr>
            <td>Code du produit</td>
            <td>{{ code }}</td>
          </tr>
        </tbody>
      </table>
      <br />
    </div>
  </div>
</template>

<script>
export default {
  auth: true,
  props: [
    "prod_id",
    "id",
    "nom",
    "quantite",
    "vente",
    "achat",
    "min",
    "max",
    "group",
    "code",
  ],
  name: "voirProduit",
};
</script>


<style scoped>
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
  z-index: 99;
}

.titre {
  border: 1px solid black;
  background-color: black;
  color: #ffff;
  padding: 10px;
  text-align: center;
}

tbody tr:nth-child(even) {
  background-color: rgb(246, 241, 246);
}

tbody tr:last-of-type {
  border-bottom: 2px solid rgb(92, 237, 8);
}
.modaler {
  background-color: white;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  width: 600px;
  margin-top: 5%;
  padding: 20px;
  border-radius: 20px;
}

.close {
  cursor: pointer;
}
.close i{
  font-size : 22px;
  color: rgb(166, 166, 166);
}

.close i:hover{
  color: rgb(0, 0, 0);
}


.modal .information {
  text-align: center;
  padding-left: 20%;
  font-weight: bold;
  font-size: 24px;
  text-decoration: underline;
  color: darkblue;
}

.input-form .mode {
  font-size: 16px;
  font-weight: bold;
}

.input-form .resp {
  font-size: 18px;
  margin-left: 3%;
  color: rgb(11, 7, 40);
}
</style>