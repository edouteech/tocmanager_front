<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Catégories</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <h4>Modifier les informations de cette catégorie</h4><hr>
      <div
        class="alert alert-danger justify-content-center"
        role="alert"
        v-if="error"
      >
        {{ error }}
      </div>
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
        <div class="form-group col-md-6">
          <div class="form-group">
            <label class="title">Catégorie parente</label>
            <select class="form-control" v-model="form.parent_id" required>
              <option disabled value="">Choisissez...</option>
              <option
                v-for="(categorie, i) in categories"
                :key="i"
                :value="categorie.id"
              >
                {{ categorie.name }}
              </option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          class="btn btn-outline-success col-md-6 p-3"
          v-on:click.prevent="submit()"
        >
          Modifier
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
      categorie: "",
      categories: [],
      form: {
        id: "",
        name: "",
        parent_id: "",
        compagnie_id: "",
      },
      error: null,
      error_message: "",
      error_champ: [],
    };
  },

  mounted() {
    this.refresh();

    //recuperer la categorie concernee
    this.$axios
      .get("/categories/" + this.$route.params.id, {
        params: {
          compagnie_id: localStorage.getItem("auth.company_id"),
        },
      })
      .then((response) => {
        let categorie = response.data.data[0];
        (this.form.name = categorie.name),
          (this.form.parent_id = categorie.parent_id);
      });
  },

  methods: {
    //modification de la categorie
    submit() {
      this.$axios
        .put("/categories/" + this.$route.params.id, {
          id: this.$route.params.id,
          name: this.form.name,
          parent_id: this.form.parent_id,
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$router.push({ path: "/categorie/list_categorie" });
            this.$toast("Catégorie modifiée !!!", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.error = response.data.message;
            this.errors = response.data.data;
            // this.$router.push({path:'/categorie/add_client'});
          }
        });
    },

    //liste des categories
    refresh() {
      this.$axios
        .get("/categories", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          this.categories = response.data.data.data;
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
