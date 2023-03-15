<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Décaissements</h3>
      <User_info />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <h4>Modifier les informations de ce décaissement</h4>
      <div
        class="alert alert-danger justify-content-center"
        role="alert"
        v-if="error"
      >
        {{ error }}
      </div>
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
            <label class="title">Nature du client</label>
            <select class="form-control" v-model="form.supplier_id" required>
              <option disabled value="">Sélectionner le fournisseur</option>
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
        <button
          type="submit"
          class="btn btn-success"
          v-on:click.prevent="submit()"
        >
          Modifier
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
  layout: "empty",
  auth: true,
  components: {
    Sidebar,
    User_info,
  },
  data() {
    return {
      decaissement: "",
      decaissements: [],
      fournisseur: "",
      fournisseurs: [],
      form: {
        id: "",
        montant: "",
        date: "",
        supplier_id: "",
        facture: "",
        compagnie_id: "",
        payment: "",
      },
      error: null,
      errors: [],
      buy_id: "",
      methodes: "",
      errors_montant: "",
      errors_supplier_id: "",
    };
  },
  mounted() {
    this.payment();
    this.refresh();

    //recupérer le decaissement
    this.$axios
      .get("/decaissements/" + this.$route.params.id, {
        params: {
          compagnie_id: localStorage.getItem("auth.company_id"),
        },
      })
      .then((response) => {
        let decaissement = response.data.data[0];
        (this.form.montant = decaissement.montant),
          (this.form.date = moment(decaissement.date).format("YYYY-MM-DD")),
          (this.form.facture = decaissement.facture),
          (this.form.supplier_id = decaissement.supplier_id),
          (this.buy_id = decaissement.buy_id),
          (this.form.payment = decaissement.payment);
      });
  },

  methods: {
    //modifier le décaissement
    submit() {
      this.$axios
        .put("/decaissements/" + this.$route.params.id, {
          id: this.$route.params.id,
          montant: this.form.montant,
          date: this.form.date,
          facture: this.form.facture,
          supplier_id: this.form.supplier_id,
          payment: this.form.payment,
          user_id: this.$auth.user.id,
          buy_id: this.buy_id,
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$router.push({ path: "/decaissements/list_decaissement" });
            this.$toast("Modification éffectuée avec succès !!!", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.error = response.data.message;
            this.errors = response.data.data;
            this.errors_montant = response.data.data.montant;
            this.errors_supplier_id = response.data.data_supplier_id;
          }
        });
    },

    //liste des fournisseurs
    refresh() {
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

    //liste des moyens depaiement
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
  overflow: none;
}

input {
  border: none;
  outline: none;
  border-bottom: 2px solid #605050;
}
</style>
