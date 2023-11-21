<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Utilisateurs</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <div
        class="alert alert-danger justify-content-center"
        role="alert"
        v-if="error"
      >
        {{ error }}
      </div>
      <h4>Enregistrer un nouvel utilsateur</h4>
      <form action="">
        <div class="form-group">
          <label class="title">Entrer le nom de l'utilisateur</label>
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
          class="alert alert-danger justify-content-center"
          role="alert"
          v-if="errors.name"
        >
          {{ errors.name[0] }}
        </div>

        <div class="form-group">
          <label class="title"
            >Entrer le numero de téléphone de l'utilisateur</label
          >
          <vue-tel-input
            class="form-control form-control-sm"
            v-model="form.phone"
          ></vue-tel-input>
        </div>
        <div
          class="alert alert-danger justify-content-center"
          role="alert"
          v-if="errors.phone"
        >
          {{ errors.phone[0] }}
        </div>

        <div class="form-group">
          <label class="title">Entrer l'email de l'utilsateur</label>
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
          class="alert alert-danger justify-content-center"
          role="alert"
          v-if="errors.email"
        >
          {{ errors.email[0] }}
        </div>

        <div class="form-group">
          <label class="title">Fonction de l'utilisateur</label>
          <select class="form-control" v-model="form.role" required>
            <option value="">Choisissez...</option>
            <option value="admin">Administrateur</option>
            <option value="comptable">Comptable</option>
            <option value="cashier">Caissier</option>
          </select>
        </div>
        <div
          class="alert alert-danger justify-content-center"
          role="alert"
          v-if="errors.role"
        >
          {{ errors.role[0] }}
        </div>
        <div class="form-group d-flex">
          <div class="form-check mx-3">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="form.ajout"
              true-value="1"
              false-value="0"
              id="defaultCheck1"
            />
            <label class="form-check-label" for="defaultCheck1">
              Droit d'ajouter
            </label>
          </div>
          <div class="form-check mx-3">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="form.modifier"
              true-value="1"
              false-value="0"
              id="defaultCheck1"
            />
            <label class="form-check-label" for="defaultCheck1">
              Droit de modifier
            </label>
          </div>
          <div class="form-check mx-3">
            <input
              class="form-check-input"
              type="checkbox"
              v-model="form.supprimer"
              true-value="1"
              false-value="0"
              id="defaultCheck1"
            />
            <label class="form-check-label" for="defaultCheck1">
              Droit de supprimer
            </label>
          </div>
        </div>
        <br /><br />

        <button
          type="submit"
          class="btn btn-primary"
          v-on:click.prevent="submit()"
        >
          Enregistrer cet utilisateur
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
export default {
  layout: "empty",
  auth: true,
  components: {
    Sidebar,
    Userinfo,
  },
  data() {
    return {
      form: {
        name: "",
        email: "",
        phone: "",
        // country: '',
        compagnie_id: "",
        role: "",
        ajout: 0,
        modifier: 0,
        supprimer: 0,
      },
      errors: [],
      error: null,
      countries: "",
    };
  },

  methods: {
    //ajouter un nouvel utilisateur
    async submit() {
      await this.$axios
        .post("/users", {
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          role: this.form.role,
          droits_add: this.form.ajout,
          droits_edit: this.form.modifier,
          droits_delete: this.form.supprimer,
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$toast("Nouvel utilisateur ajouté avec succès !!!", {
              icon: "fa fa-check-circle",
            });
            this.$router.push({ path: "/profils/profil" });
          } else {
            this.error = response.data.message;
            this.errors = response.data.data;
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
form {
  margin-left: 10%;
  margin-top: 5%;
  width: 50%;
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