<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler">
      <br /><br />
      <h4 class="titre">Informations de l'utilisateur</h4>
      <br />
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
            <td>{{ nom }}</td>
          </tr>
          <tr>
            <td>Numéro de téléphone</td>
            <td>{{ phone }}</td>
          </tr>
          <tr>
            <td>Email de l'utilsaateur</td>
            <td>{{ email }}</td>
          </tr>
          <tr>
            <td>Pays de l'utilisateur</td>
            <td>{{ pays }}</td>
          </tr>
          <tr>
            <td>Fonction de l'utilisateur</td>
            <td>{{ role }}</td>
          </tr>
        </tbody>
      </table>
      <br />
      <hr />
      <br />
      <div class="droits mx-5">
        <p v-if="ajout == 1" v-b-tooltip.hover title="OUI">
          <strong>Droit d'ajout </strong>
          <i class="fa fa-toggle-on text-success mx-3" aria-hidden="true"></i>
        </p>
        <p v-else v-b-tooltip.hover title="NON">
          <strong>Droit d'ajout </strong>
          <i class="fa fa-toggle-off text-danger mx-3" aria-hidden="true"></i>
        </p>
        <p v-if="modifier == 1" v-b-tooltip.hover title="OUI">
          <strong>Droit de modifier </strong
          ><i class="fa fa-toggle-on text-success mx-3" aria-hidden="true"></i>
        </p>
        <p v-else v-b-tooltip.hover title="NON">
          <strong>Droit de modifier </strong>
          <i class="fa fa-toggle-off text-danger mx-3" aria-hidden="true"></i>
        </p>
        <p v-if="supprimer == 1" v-b-tooltip.hover title="OUI">
          <strong>Droit de supprimer</strong>
          <i class="fa fa-toggle-on text-success mx-3" aria-hidden="true"></i>
        </p>
        <p v-else v-b-tooltip.hover title="NON">
          <strong>Droit de supprimer</strong
          ><i class="fa fa-toggle-off text-danger mx-3" aria-hidden="true"></i>
        </p>
      </div>
    </div>
    <div class="close" @click="$emit('close-modal')">
      <img class="close-img" src="/images/fermer.png" alt="" />
    </div>
  </div>
</template>

<script>
export default {
  auth: true,
  props: [
    "nom",
    "phone",
    "email",
    "pays",
    "role",
    "ajout",
    "modifier",
    "supprimer",
  ],
  name: "voirProfil",
  data() {
    return {
      client: "",
    };
  },
};
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
  overflow: auto;
  background-color: white;
  height: auto;
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

.titre {
  border: 1px solid black;
  background-color: black;
  color: #ffff;
  padding: 10px;
  text-align: center;
}

tbody tr:nth-child(even) {
  background-color: rgb(249, 247, 236);
}

tbody tr:last-of-type {
  border-bottom: 2px solid rgb(92, 237, 8);
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