<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Fournisseurs</h3>
      <User_info />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <h4>Modifier les informations de ce fournisseur</h4><hr>
      <div
        class="alert alert-danger justify-content-center"
        role="alert"
        v-if="error"
      >
        {{ error }}
      </div>
      <form action="">
        <div class="form-group col-md-6">
          <label class="title">Entrer le nom du fournisseur</label>
          <input
            type="text"
            class="form-control"
            v-model="form.name"
            autocomplete="off"
            required
            placeholder="Jean Doe"
          />
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors && errors.name"
        >
          {{ errors.name }}
        </div>
        <div class="form-group col-md-6">
          <label class="title"
            >Entrer le numero de téléphone du fournisseur</label
          >
          <input
            type="tel"
            class="form-control"
            v-model="form.phone"
            required
            placeholder="+525485335622"
          />
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors && errors.phone"
        >
          {{ errors.phone }}
        </div>

        <div class="form-group col-md-6">
          <label class="title">Entrer l'email du fournisseur</label>
          <input
            type="email"
            class="form-control"
            v-model="form.email"
            autocomplete="off"
            required
            placeholder="azerty@azert.com"
          />
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors && errors.email"
        >
          {{ errors.email }}
        </div>

        <div class="form-group col-md-6">
          <div class="form-group">
            <label class="title">Nature du fournisseur</label>
            <select class="form-control" v-model="form.nature">
              <option disabled value="">Choisissez...</option>
              <option value="0">Particulier</option>
              <option value="1">Entreprise</option>
            </select>
          </div>
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors && errors.nature"
        >
          {{ errors.nature }}
        </div>

        <button
          type="submit"
          class="btn btn-outline-success col-md-6 p-3"
          v-on:click.prevent="submit()"
        >
          MODIFIER
        </button>
      </form>
    </div>
  </div>
</template>

<script>
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
      error: null,
      fournisseur: "",
      fournisseurs: [],
      form: {
        id: "",
        name: "",
        email: "",
        phone: "",
        nature: "",
        compagnie_id: "",
      },
      errors: null,
      error_message: "",
      error_champ: [],
    };
  },
  mounted() {
    //récupérer le fournisseur concerné
    this.$axios
      .get("/suppliers/" + this.$route.params.id, {
        params: {
          compagnie_id: localStorage.getItem("auth.company_id"),
        },
      })
      .then((response) => {
        let fournisseur = response.data.data[0];
        (this.form.name = fournisseur.name),
          (this.form.phone = fournisseur.phone),
          (this.form.email = fournisseur.email);
        if (fournisseur.nature == "Particulier") {
          this.form.nature = 0;
        } else {
          this.form.nature = 1;
        }
      });
  },

  methods: {
    //modifier le fournisseur
    submit() {
      this.$axios
        .put("/suppliers/" + this.$route.params.id, {
          id: this.$route.params.id,
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          nature: this.form.nature,
          nature: this.form.nature,
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$router.push({ path: "/fournisseurs/list_fournisseur" });
            this.$toast("Modifications éffectuées avec succès !!!", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.error = response.data.message;
            this.errors = response.data.data;
          }
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

input {
  border: none;
  outline: none;
  border-bottom: 2px solid #605050;
}
</style>