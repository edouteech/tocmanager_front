<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Décaissements</h3>
    </nav>

    <div
      class="alert alert-danger justify-content-center"
      role="alert"
      v-if="error"
    >
      {{ error }}
    </div>

    <div class="app-main__outer py-5 px-2">
      <h4>Informations sur le décaissement</h4>
      <hr />
      <br /><br /><br />
      <table class="table table-hover">
        <thead>
          <tr class="table-success">
            <th>Date de décaissements</th>
            <th>Montant décaissé</th>
            <th>Fournisseur concerné</th>
            <th>Balance compte client</th>
            <th>Nature du client</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ name }}</td>
            <td>{{ email }}</td>
            <td>{{ contact }}</td>
            <td>{{ balance }}</td>
            <td>{{ nature }}</td>
          </tr>
        </tbody>
      </table>
      <br /><br />
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Sidebar from "../../sidebar.vue";
export default {
  layout: "empty",
  auth: true,
  components: {
    Sidebar,
  },
  data() {
    return {
      name: "",
      email: "",
      contact: "",
      balance: "",
      nature: [],
      error: null,
    };
  },
  mounted() {
    // récupérer les infos du client
    this.$axios
      .get("/clients/" + this.$route.params.id, {
        params: {
          compagnie_id: localStorage.getItem("auth.company_id"),
        },
      })
      .then((response) => {
        (this.name = response.data.data[0].name),
          (this.email = response.data.data[0].email),
          (this.contact = response.data.data[0].phone),
          (this.balance = response.data.data[0].balance),
          (this.nature = response.data.data[0].nature);
      });
  },
};
</script>

<style scoped>
form {
  margin-left: 10%;
  margin-top: 5%;
}

.form-group {
  margin-top: 2%;
}

.title {
  margin: 1% 0;
}

.btn {
  margin-top: 5%;
}
.contenu {
  margin: 5%;
}
.fa {
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}
.table {
  margin-top: 5%;
}

input::placeholder {
  font-size: 15px;
  opacity: 0.5;
}
</style>