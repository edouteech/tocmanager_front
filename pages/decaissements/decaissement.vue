<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Décaissements</h3>
      <User_info />
    </nav>

    <div
      class="alert alert-danger justify-content-center"
      role="alert"
      v-if="error"
    >
      {{ error }}
    </div>

    <div class="app-main__outer py-5 px-2">
      <h4>Enregistrer un décaissement</h4>
      <hr />
      <form action="">
        <div class="form-group col-md-6">
          <label class="title">Entrer le montant</label>
          <input
            type="number"
            class="form-control"
            v-model="form.montant"
            autocomplete="off"
            required
            placeholder="10000"
          />
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors_montant"
        >
          {{ errors_montant }}
        </div>
        <div class="form-group col-md-6">
          <label class="title">Entrer la date du décaissement </label>
          <input
            type="date"
            class="form-control"
            v-model="form.date"
            autocomplete="off"
            required
          />
        </div>
        <div class="form-group col-md-6">
          <div class="form-group">
            <label class="title">Sélectionner le fournisseur</label>
            <select class="form-control" v-model="form.supplier_id" required>
              <option disabled value="">Choisissez...</option>
              <option
                v-for="(fournisseur, i) in fournisseurs"
                :key="i"
                :value="fournisseur.id"
              >
                {{ fournisseur.name }}
              </option>
            </select>
          </div>
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors_supplier_id"
        >
          {{ errors_supplier_id }}
        </div>
        <div class="form-group col-md-6">
          <label class="title">Méthode de paiement</label>
          <select class="form-control" v-model="form.payment">
            <option value="">Choississez</option>
            <option v-for="(methode, j) in methodes" :key="j" :value="methode">
              {{ methode }}
            </option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" @click.prevent="submit()">
          Enregistrer
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Sidebar from "../sidebar.vue";
import User_info from "../user_info.vue";
export default {
  auth: true,
  layout: "empty",
  components: {
    Sidebar,
    User_info,
  },
  data() {
    return {
      fournisseurs: [],
      fournisseur: "",
      form: {
        montant: "",
        facture: "",
        date: moment().format("YYYY-MM-DD"),
        supplier_id: "",
        compagnie_id: "",
        payment: "ESPECES",
      },
      errors: [],
      error: null,
      user: "",
      methodes: "",
      errors_montant: "",
      errors_supplier_id: "",
    };
  },

  mounted() {
    this.payment();
    this.user = localStorage.getItem("auth.user_id");

    //liste des fournisseurs
    this.$axios
      .get("/suppliers", {
        params: {
          compagnie_id: localStorage.getItem("auth.company_id"),
        },
      })
      .then((response) => {
        this.fournisseurs = response.data.data.data;
      });
  },

  methods: {
    //ajouter un décaissement
    async submit() {
      await this.$axios
        .post("/decaissements", {
          montant: this.form.montant,
          date: this.form.date,
          supplier_id: this.form.supplier_id,
          user_id: this.user,
          compagnie_id: localStorage.getItem("auth.company_id"),
          payment: this.form.payment,
        })
        .then((response) => {
          this.error = response.data.message;
          if (response.data.status == "success") {
            this.$router.push({ path: "/decaissements/list_decaissement" });
            this.$toast("Décaissement enregistré avec succès !!!", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.errors = response.data.data;
            this.errors_montant = response.data.data.montant;
            this.errors_supplier_id = response.data.data.supplier_id;
          }
        })
        .catch((err) => console.log(err));
    },

    //liste des moyens de paiement
    payment() {
      this.$axios
        .get("/invoice/payments", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          this.methodes = response.data.data;
        });
    },
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

.app-main__outer {
  overflow: auto;
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