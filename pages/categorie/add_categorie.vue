<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Catégories</h3>
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
      <h4>Enregistrer une nouvelle catégorie de produit</h4>
      <hr />
      <form action="">
        <div class="form-group col-md-6">
          <label class="title">Entrer le nom de la catégorie </label>
          <input
            type="text"
            class="form-control"
            v-model="form.name"
            autocomplete="off"
            required
            placeholder="Pillules"
          />
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors"
        >
          {{ errors.name }}
        </div>

        <div class="form-group col-md-6">
          <label class="title">Catégorie parente</label>
          <select class="form-control" v-model="form.parent_id" required>
            <option value="">Choisissez...</option>
            <option
              v-for="(categorie, i) in categories"
              :key="i"
              :value="categorie.id"
            >
              {{ categorie.name }}
            </option>
          </select>
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors"
        >
          {{ errors.parent_id }}
        </div>

        <button type="submit" class="btn btn-outline-primary col-md-6 p-3" @click.prevent="submit()">
          Enregistrer la catégorie
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
      categories: [],
      categorie: "",
      form: {
        name: "",
        parent_id: "",
        compagnie_id: "",
      },
      errors: "",
      error: null,
    };
  },
  mounted() {
    this.$axios
      .get("/categories/without-parent", {
        params: {
          compagnie_id: localStorage.getItem("auth.company_id"),
        },
      })
      .then((response) => {
        this.categories = response.data.data;
      });
  },

  methods: {
    //ajout d'une categorie
    async submit() {
      await this.$axios
        .post("/categories", {
          name: this.form.name,
          parent_id: this.form.parent_id,
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$router.push({ path: "/categorie/list_categorie" });
            this.$toast("Nouvelle catégorie ajoutée !!!", {
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