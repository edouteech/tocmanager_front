<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler text-center py-5">
      <h4 class="titre">Informations relative à l'abonnement</h4>
      <br />
      <div class="table-responsive" v-if="abonnement">
        <!-- {{abonnement}} -->
        <table class="table" v-if="infoPlan">
          <thead>
            <tr class="table-success">
              <th>A savoir</th>
              <th>Mon abonnement</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Date de fin d'abonnement</td>
              <td v-if="infoPlan.ends_at">{{ infoPlan.ends_at }}</td>
              <td v-else>----</td>
            </tr>
            <tr>
              <td>Plan d'abonnement</td>
              <td>{{ infoPlan.name }}</td>
            </tr>
            <tr>
              <td>Description du plan</td>
              <td>{{ infoPlan.description }}</td>
            </tr>
            <tr>
              <td>Montant du plan</td>
              <td>{{ infoPlan.price }} {{ infoPlan.currency }}</td>
            </tr>
            <tr>
              <td>Période de grace</td>
              <td v-if="infoPlan.grace_interval == 'day'">
                {{ infoPlan.grace_period }} jours
              </td>
            </tr>
          </tbody>
        </table>
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
  props: ["infoPlan"],
  name: "voirAbonnement",
  data() {
    return {
      error: null,
      planRecue: "",
      abonnement: "",
    };
  },

  mounted() {
    //infos de l'abonnement de la compagnie
    this.$axios
      .get(
        "/index/abonnement/compagnie/" + localStorage.getItem("auth.company_id")
      )
      .then((response) => {
        this.abonnement = response.data.data;
      });
  },

  methods: {},
};
</script>
  
  
  <style scoped>
table {
  color: white;
}

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
  color: white;
  background-color: rgb(0, 0, 0);
  overflow: auto;
  width: 600px;
  margin-top: 10%;
  border-radius: 10px;
  height: max-content;
  padding: 1%;
  box-shadow: 50px;
}
.close {
  margin: 9% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
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