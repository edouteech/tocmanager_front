<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name">Journal Comptable</h3>
      <Userinfo />
    </nav>

    <div class="container">
      <h4 class="text-center mb-0 mt-4">Bilan des journaux comptables</h4>
      <div class="table-responsive search_result">
        <table
          class="table table-hover caption-top"
          v-if="journal_vente.length != 0"
        >
          <caption
            class="text-center font-weight-bold"
            style="background-color: #3630a3; color: white; padding: 5px"
          >
            Journal des ventes
          </caption>
          <thead>
            <tr class="table-primary">
              <th>Date écriture</th>
              <th>Nom</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(journal_vente_item, i) in journal_vente" :key="i">
              <td>{{ journal_vente_item.date }}</td>
              <td>{{ journal_vente_item.name_ecriture }}</td>
              <td>{{ journal_vente_item.amount }}</td>
            </tr>
          </tbody>
        </table>

        <table class="table table-hover caption-top" v-if="journal_achat.length != 0">
          <caption
            class="text-center font-weight-bold"
            style="background-color: #3630a3; color: white; padding: 5px"
          >
            Journal des achats
          </caption>
          <thead>
            <tr class="table-primary">
              <th>Date écriture</th>
              <th>Nom</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(journal_achat_item, i) in journal_achat" :key="i">
              <td>{{ journal_achat_item.date }}</td>
              <td>{{ journal_achat_item.name_ecriture }}</td>
              <td>{{ journal_achat_item.amount }}</td>
            </tr>
          </tbody>
        </table>

        <table class="table table-hover caption-top" v-if="journal_caisse.length != 0">
          <caption
            class="text-center font-weight-bold"
            style="background-color: #3630a3; color: white; padding: 5px"
          >
            Journal de caisse
          </caption>
          <thead>
            <tr class="table-primary">
              <th>Date écriture</th>
              <th>Nom</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(journal_caisse_item, i) in journal_caisse" :key="i">
              <td>{{ journal_caisse_item.date }}</td>
              <td>{{ journal_caisse_item.name_ecriture }}</td>
              <td>{{ journal_caisse_item.amount }}</td>
            </tr>
          </tbody>
        </table>

        <table class="table table-hover caption-top" v-if="journal_banque.length != 0">
          <caption
            class="text-center font-weight-bold"
            style="background-color: #3630a3; color: white; padding: 5px"
          >
            Journal de banque
          </caption>
          <thead>
            <tr class="table-primary">
              <th>Date écriture</th>
              <th>Nom</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(journal_banque_item, i) in journal_banque" :key="i">
              <td>{{ journal_banque_item.date }}</td>
              <td>{{ journal_banque_item.name_ecriture }}</td>
              <td>{{ journal_banque_item.amount }}</td>
            </tr>
          </tbody>
        </table>

        <table class="table table-hover caption-top" v-if="journal_op_diverse.length != 0">
          <caption
            class="text-center font-weight-bold"
            style="background-color: #3630a3; color: white; padding: 5px"
          >
            Journal des opérations diverses
          </caption>
          <thead>
            <tr class="table-primary">
              <th>Date écriture</th>
              <th>Nom</th>
              <th>Montant</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(journal_opd, i) in journal_op_diverse" :key="i">
              <td>{{ journal_opd.date }}</td>
              <td>{{ journal_opd.name_ecriture }}</td>
              <td>{{ journal_opd.amount }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
export default {
  auth: true,
  layout: "empty",
  components: {
    Sidebar,
    Userinfo,
  },

  data() {
    return {
      role: "",
      id_cli: "",
      nom_cli: "",
      key: "",
      journal_vente: [],
      journal_achat: [],
      journal_caisse: [],
      journal_banque: [],
      journal_op_diverse: [],
    };
  },
  async mounted() {
    this.users = this.$auth.$state.user.roles;
    this.compagny = localStorage.getItem("auth.company_id");
    this.role = localStorage.getItem("auth.roles");
    this.refresh();
  },

  methods: {
    setMessage() {
      this.refresh();
    },
    refresh() {
      this.$axios
        .get("/compagnies/" + this.compagny + "/journal", {
          params: {
            compagnie_id: this.compagny,
          },
        })
        .then((response) => {
          console.log(response.data.data);
          this.journal_vente = response.data.data.journal_vente;
          this.journal_achat = response.data.data.journal_achat;
          this.journal_banque = response.data.data.journal_banque;
          this.journal_caisse = response.data.data.journal_caisse;
          this.journal_op_diverse = response.data.data.journal_op_diverse;
        });
    },
  },
};
</script>

<style scoped>
.btn-group {
  display: flex;
}

.page {
  display: flex;
}

.nombre {
  margin: 0;
}

.title {
  margin: 0.5% 2% 0 10%;
  font-weight: bold;
}

/* .app-main__outer{
      overflow: auto;
    } */

.fa {
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}

.table {
  margin-top: 5%;
  text-align: center;
}

thead tr {
  background-color: transparent;
}

tbody tr:last-of-type {
  border-bottom: 2px solid rgb(140, 140, 250);
}

.action {
  display: flex;
}

.custom-btn {
  /* width: 220px;
      height: 40px; */
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}

.btn-3 {
  background: rgb(0, 172, 238);
  background: linear-gradient(
    0deg,
    rgba(0, 172, 238, 1) 0%,
    rgba(2, 126, 251, 1) 100%
  );
  width: 220px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;
}

.btn-3 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.btn-3:before,
.btn-3:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
  background: rgba(2, 126, 251, 1);
  transition: all 0.3s ease;
}

.btn-3:before {
  height: 0%;
  width: 2px;
}

.btn-3:after {
  width: 0%;
  height: 2px;
}

.btn-3:hover {
  background: transparent;
  box-shadow: none;
}

.btn-3:hover:before {
  height: 100%;
}

.btn-3:hover:after {
  width: 100%;
}

.btn-3 span:hover {
  color: rgba(2, 126, 251, 1);
}

.btn-3 span:before,
.btn-3 span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  background: rgba(2, 126, 251, 1);
  transition: all 0.3s ease;
}

.btn-3 span:before {
  width: 2px;
  height: 0%;
}

.btn-3 span:after {
  width: 0%;
  height: 2px;
}

.btn-3 span:hover:before {
  height: 100%;
}

.btn-3 span:hover:after {
  width: 100%;
}

.mobile-btn {
  display: none;
}

@media screen and (max-width: 900px) {
  /* .btn_recherche{
        display:none;
      } */

  .mobile-btn {
    display: block;
  }

  .web-btn {
    display: none;
  }

  .btn-group {
    display: inline;
  }

  .btn-group .btn {
    margin: 10px 0;
  }
}
</style>
