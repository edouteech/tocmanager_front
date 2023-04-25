<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler my-auto" @click.stop>
    <div class="close d-flex justify-content-end" @click="$emit('close-modal')">
      <i class="fa fa-times-circle" aria-hidden="true"></i>
    </div>
      <h4 class="titre">Informations de l'encaissement</h4>
      <br />
      <table class="table table-hover">
        <thead>
          <tr class="table-success">
            <th>A savoir</th>
            <th>Décaissement</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Date de l'encaissement</td>
            <td>{{ date }}</td>
          </tr>
          <tr>
            <td>Montant</td>
            <td>{{ montant }}</td>
          </tr>
          <tr>
            <td>Client concerné</td>
            <td>{{ client_id }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  auth: true,
  props: ["montant", "date", "client_id"],
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
}

.modaler {
  background-color: white;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
  width: 600px;
  border-radius: 20px;
  font-size: 18px;
  padding: 50px 20px ;
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


.titre {
  border: 1px solid black;
  background-color: black;
  color: #ffff;
  padding: 10px;
  text-align: center;
  margin-top: 30px;
}

tbody tr:nth-child(even) {
  background-color: rgb(228, 240, 245);
}

tbody tr:last-of-type {
  border-bottom: 2px solid rgb(92, 237, 8);
}

.input-form .mode {
  font-size: 18px;
  font-weight: bold;
}

.input-form .resp {
  font-size: 16px;
  margin-left: 3%;
  color: rgb(11, 7, 40);
}
</style>