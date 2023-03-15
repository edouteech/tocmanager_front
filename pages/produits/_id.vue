<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Produits</h3>
      <User_info />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <h4>Modifier les informations de ce produit</h4>
      <div
        class="alert alert-danger justify-content-center"
        role="alert"
        v-if="error"
      >
        {{ error }}
      </div>
      <form action="">
        <div class="form-group col-md-6">
          <div class="form-group">
            <label class="title"
              >Choisissez la categorie du produit à ajouter</label
            >
            <select class="form-control" v-model="form.category_id">
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
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors && errors.category_id"
        >
          {{ errors.category_id }}
        </div>

        <div class="form-group col-md-6">
          <label class="title">Entrer le nom du produit</label>
          <input
            type="text"
            class="form-control"
            v-model="form.name"
            autocomplete="off"
            required
            placeholder="Paracetamol"
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
          <div class="form-group">
            <label class="title"
              >Choisissez le groupe de taxation du produit</label
            >
            <select class="form-control" v-model="form.tax_group">
              <option value="">Choisissez...</option>
              <option v-for="(groupe, j) in groupes" :key="j" :value="groupe">
                {{ groupe }}
              </option>
            </select>
          </div>
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors && errors.tax_group"
        >
          {{ errors.tax_group }}
        </div>

        <div class="form-group col-md-6">
          <label class="title">Entrer le code du produit</label>
          <input
            type="text"
            class="form-control"
            placeholder="CODE"
            v-model="form.code"
          />
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors && errors.code"
        >
          {{ errors.code }}
        </div>

        <div class="form-group col-md-6">
          <label class="title">Entrer la quantité</label>
          <input
            type="number"
            class="form-control"
            placeholder="1200"
            v-model="form.quantity"
          />
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors && errors.quantity"
        >
          {{ errors.quantity }}
        </div>

        <div class="form-group col-md-6">
          <label class="title">Entrer le prix de vente </label>
          <input
            type="number"
            class="form-control"
            placeholder="1500"
            v-model="form.price_sell"
            autocomplete="off"
            required
          />
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors && errors.price_sell"
        >
          {{ errors.price_sell }}
        </div>

        <div class="form-group col-md-6">
          <label class="title">Entrer le prix d'achat </label>
          <input
            type="number"
            class="form-control"
            placeholder="1000"
            v-model="form.price_buy"
            autocomplete="off"
            required
          />
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors && errors.price_buy"
        >
          {{ errors.price_buy }}
        </div>

        <div class="form-group col-md-6">
          <label class="title">Entrer le stock minimal </label>
          <input
            type="number"
            class="form-control"
            placeholder="1000"
            v-model="form.stock_min"
            autocomplete="off"
            required
          />
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors && errors.stock_min"
        >
          {{ errors.stock_min }}
        </div>

        <div class="form-group col-md-6">
          <label class="title">Entrer le stock maximal </label>
          <input
            type="number"
            class="form-control"
            placeholder="1100"
            v-model="form.stock_max"
            autocomplete="off"
            required
          />
        </div>
        <div
          class="alert alert-danger justify-content-center col-md-6"
          role="alert"
          v-if="errors && errors.stock_max"
        >
          {{ errors.stock_max }}
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
      categories: [],
      categorie: "",
      produit: "",
      produits: [],
      form: {
        category_id: "",
        name: "",
        quantity: "",
        code: "",
        price_sell: "",
        price_buy: "",
        stock_min: "",
        stock_max: "",
        compagnie_id: "",
        tax_group: "",
      },
      error_message: "",
      error_champ: [],
      groupes: "",
      errors: "",
      error: null,
    };
  },

  mounted() {
    this.group();
    this.refresh();

    //récupérer les infos du produit concerné
    this.$axios
      .get("/products/" + this.$route.params.id, {
        params: {
          compagnie_id: localStorage.getItem("auth.company_id"),
        },
      })
      .then((response) => {
        let produit = response.data.data[0];
        (this.form.category_id = produit.category_id),
          (this.form.name = produit.name),
          (this.form.quantity = produit.quantity),
          (this.form.price_sell = produit.price_sell),
          (this.form.price_buy = produit.price_buy),
          (this.form.stock_min = produit.stock_min),
          (this.form.stock_max = produit.stock_max),
          (this.form.tax_group = produit.tax_group),
          (this.form.code = produit.code);
      });
  },

  methods: {
    //liste des catégories
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

    //modifier la catégorie
    submit() {
      this.$axios
        .put("products/" + this.$route.params.id, {
          id: this.$route.params.id,
          category_id: this.form.category_id,
          name: this.form.name,
          code: this.form.code,
          quantity: this.form.quantity,
          price_sell: this.form.price_sell,
          price_buy: this.form.price_buy,
          stock_min: this.form.stock_min,
          stock_max: this.form.stock_max,
          tax_group: this.form.tax_group,
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$router.push({ path: "/produits/list_produit" });
            this.$toast("Modifications éffectuées avec succès !!!", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.error = response.data.message;
            this.errors = response.data.data;
          }
        });
    },

    //liste des groupes de taxation
    group() {
      this.$axios
        .get("/invoice/taxGroups", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          this.groupes = response.data.data;
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