<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Encaissements</h3>
      <User_info />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <div class="row">
        <div class="col-md-4">
          <h4>Modifier les informations</h4>
        </div>
        <div class="col-md-8 d-flex justify-content-end">
          <NuxtLink to="/encaissements/list_encaissement">
            <button class="btn btn-dark py-2 px-3">
             <b>LISTE</b>
            </button>
          </NuxtLink>
        </div>
      </div><hr>
      <!-- <div
        class="alert alert-danger justify-content-center"
        role="alert"
        v-if="error"
      >
        {{ error }}
      </div> -->
      <form action="" class="col-md-6 mx-auto">
        <div class="form-group ">
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
          class="alert alert-danger justify-content-center "
          role="alert"
          v-if="errors_montant"
        >
          {{ errors_montant }}
        </div>
        <div class="form-group ">
          <label class="title">Entrer la date de l'encaissement </label>
          <input
            type="date"
            class="form-control"
            v-model="form.date"
            autocomplete="off"
            required
            placeholder="18-05-1989"
          />
        </div>
        <div class="form-group ">
          <div class="form-group">
            <label class="title">Sélectionner le client</label>
            <select class="form-control" v-model="form.client_id" required>
              <option disabled value="">Choississez...</option>
              <option
                v-for="(client, i) in clients"
                :key="i"
                :value="client.id"
              >
                {{ client.name }}
              </option>
            </select>
          </div>
        </div>
        <div
          class="alert alert-danger justify-content-center "
          role="alert"
          v-if="errors_client_id"
        >
          {{ errors_client_id }}
        </div>
        <div class="form-group ">
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
          class="btn btn-outline-success col-md-12 p-3"
          v-on:click.prevent="submit()"
        >
          MODIFIER
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
      encaissement: "",
      encaissements: [],
      client: "",
      clients: [],
      form: {
        id: "",
        montant: "",
        date: "",
        client_id: "",
        facture: "",
        payment: "",
        compagnie_id: "",
      },
      error: null,
      error_champ: [],
      sell_id: "",
      methodes: "",
      errors_montant: "",
      errors_client_id: "",
    };
  },
  mounted() {
    this.payment();
    this.refresh();

    //infos de l'encaissement concerné
    this.$axios
      .get("/encaissements/" + this.$route.params.id, {
        params: {
          compagnie_id: localStorage.getItem("auth.company_id"),
        },
      })
      .then((response) => {
        let encaissement = response.data.data[0];
        (this.form.montant = encaissement.montant),
          (this.form.date = moment(encaissement.date).format("yyyy-MM-DD")),
          (this.form.facture = encaissement.facture),
          (this.form.client_id = encaissement.client_id),
          (this.form.payment = encaissement.payment_method),
          (this.sell_id = encaissement.sell_id);
      });
  },

  methods: {
    //modifier l'encaissement
    submit() {
      this.$axios
        .put("/encaissements/" + this.$route.params.id, {
          id: this.$route.params.id,
          montant: this.form.montant,
          date: this.form.date,
          facture: this.form.facture,
          client_id: this.form.client_id,
          sell_id: this.sell_id,
          payment: this.form.payment,
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$router.push({ path: "/encaissements/list_encaissement" });
            this.$toast("Modiffication éffectuée avec succès !!!", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.error = response.data.message;
            this.errors_montant = response.data.data.montant;
            this.errors_client = response.data.data.client_id;
            this.$toast.error(this.error, {
              icon: "fa fa-times-circle",
            });
          }
        });
    },

    //liste des clients
    refresh() {
      this.$axios
        .get("/clients", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          this.clients = response.data.data.data;
        });
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
  font-size: 18px;
  font-weight: 600;
}

.btn {
  margin-top: 5%;
}

/* input {
  border: none;
  outline: none;
  border-bottom: 2px solid #605050;
} */
</style>
