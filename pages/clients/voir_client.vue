<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler my-auto" @click.stop>
      <div class="close d-flex justify-content-end" @click="$emit('close-modal')">
        <i class="fa fa-times-circle" aria-hidden="true"></i>
      </div>
      <br /><br />
      <h4 class="titre">Informations du client</h4>
      <br />
      <table class="table table-hover">
        <thead>
          <tr class="table-success">
            <th>A savoir</th>
            <th>Client</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Nom du client</td>
            <td>{{ nom }}</td>
          </tr>
          <tr>
            <td>Numéro de téléphone</td>
            <td>{{ phone }}</td>
          </tr>
          <tr>
            <td>Email du client</td>
            <td>{{ email }}</td>
          </tr>
          <tr>
            <td>Balance du client</td>
            <td>{{ balance }}</td>
          </tr>
          <tr>
            <td>Nature du client</td>
            <td>{{ nature }}</td>
          </tr>
          <tr>
            <td>Type de client</td>
            <td>{{ type }}</td>
          </tr>
          <tr v-if="type == 'douteux'">
            <td>Seuil maximal à ne pas excéder</td>
            <td>{{ seuil }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  auth: true,
  props: ["nom", "phone", "email", "balance", "nature", "type", "seuil"],
  name: "voirClient",
  data() {
    return {
      client: "",
    };
  },
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
  z-index: 999;
}

.modaler {
  background-color: white;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  width: 600px;
  margin-top: 5%;
  /* border-radius: 20px; */
  padding: 1%;
}

.close {
  cursor: pointer;
}

.close i {
  font-size: 22px;
  color: rgb(166, 166, 166);
}

.close i:hover {
  color: rgb(0, 0, 0);
}

.titre {
  border: 1px solid black;
  background-color: black;
  color: #ffff;
  padding: 10px;
  text-align: center;
}

tbody tr:nth-child(even) {
  background-color: rgb(228, 239, 245);
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