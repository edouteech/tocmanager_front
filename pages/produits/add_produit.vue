<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Produits</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2 ">
      <h4>Enregistrer un nouveau produit</h4>
      <hr />
      <form action="" class="col-md-11 mx-auto row sections">
        <div class="col-md-6 p-2">
          <div class="form-group ">
            <div class="form-group">
              <label class="title">Choisissez la categorie du produit à ajouter</label>
              <select class="form-control" v-model="form.category_id">
                <option disabled value="">Choisissez...</option>
                <option v-for="(categorie, i) in categories" :key="i" :value="categorie.id">
                  {{ categorie.name }}
                </option>
              </select>
            </div>
          </div>
          <div class="alert alert-danger justify-content-center " role="alert" v-if="errors && errors.category_id">
            {{ errors.category_id }}
          </div>

          <div class="form-group ">
            <label class="title">Entrer le nom du produit</label>
            <input type="text" class="form-control" v-model="form.name" autocomplete="off" required
              placeholder="Nom du produit" />
          </div>
          <div class="alert alert-danger justify-content-center " role="alert" v-if="errors && errors.name">
            {{ errors.name }}
          </div>

          <div class="form-group ">
            <div class="form-group">
              <label class="title">Choisissez le groupe de taxation du produit</label>
              <select class="form-control" v-model="form.tax_group">
                <option value="">Choisissez...</option>
                <option v-for="(groupe, j) in groupes" :key="j" :value="groupe">
                  {{ groupe }}
                </option>
              </select>
            </div>
          </div>
          <div class="alert alert-danger justify-content-center " role="alert" v-if="errors && errors.tax_group">
            {{ errors.tax_group }}
          </div>

          <div class="form-group ">
            <label class="title">Entrer le code du produit</label>
            <input type="text" class="form-control" placeholder="CODE" v-model="form.code" />
          </div>
          <div class="alert alert-danger justify-content-center " role="alert" v-if="errors && errors.code">
            {{ errors.code }}
          </div>

          <div class="form-group ">
            <label class="title">Entrer la quantité</label>
            <input type="number" class="form-control" placeholder="1200" v-model="form.quantity" />
          </div>
          <div class="alert alert-danger justify-content-center " role="alert" v-if="errors && errors.quantity">
            {{ errors.quantity }}
          </div>
        </div>

        <div class="col-md-6 p-2">
          <div class="form-group ">
            <label class="title">Entrer le prix de vente </label>
            <input type="number" class="form-control" placeholder="1500" v-model="form.price_sell" autocomplete="off"
              required />
          </div>
          <div class="alert alert-danger justify-content-center " role="alert" v-if="errors && errors.price_sell">
            {{ errors.price_sell }}
          </div>

          <div class="form-group ">
            <label class="title">Entrer le prix d'achat </label>
            <input type="number" class="form-control" placeholder="1000" v-model="form.price_buy" autocomplete="off"
              required />
          </div>
          <div class="alert alert-danger justify-content-center " role="alert" v-if="errors && errors.price_buy">
            {{ errors.price_buy }}
          </div>

          <div class="form-group ">
            <label class="title">Entrer le stock minimal </label>
            <input type="number" class="form-control" placeholder="1000" v-model="form.stock_min" autocomplete="off"
              required />
          </div>
          <div class="alert alert-danger justify-content-center " role="alert" v-if="errors && errors.stock_min">
            {{ errors.stock_min }}
          </div>

          <div class="form-group ">
            <label class="title">Entrer le stock maximal </label>
            <input type="number" class="form-control" placeholder="1100" v-model="form.stock_max" autocomplete="off"
              required />
          </div>
          <div class="alert alert-danger justify-content-center " role="alert" v-if="errors && errors.stock_max">
            {{ errors.stock_max }}
          </div>
        </div>

        <button type="submit" class="btn btn-outline-primary p-3 " v-on:click.prevent="submit()">
          <b>ENREGISTRER</b>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Userinfo from "../user_info.vue";
import Sidebar from "../sidebar.vue";
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
        category_id: "",
        name: "",
        code: "",
        quantity: "",
        price_sell: "",
        price_buy: "",
        stock_min: "",
        stock_max: "",
        compagnie_id: "",
        tax_group: "",
      },
      errors: [],
      error: null,
      groupes: "",
    };
  },

  mounted() {
    this.refresh();
    this.group();
  },

  methods: {
    //ajouter un nouveau produit
    async submit() {
      await this.$axios
        .post("/products", {
          category_id: this.form.category_id,
          name: this.form.name,
          code: this.form.code,
          quantity: this.form.quantity,
          price_sell: this.form.price_sell,
          price_buy: this.form.price_buy,
          stock_min: this.form.stock_min,
          tax_group: this.form.tax_group,
          stock_max: this.form.stock_max,
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$router.push({ path: "/produits/list_produit" });
            this.$toast("Nouveau produit enregistré !!!", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.error = response.data.message;
            this.errors = response.data.data;
            this.$toast.error(this.error, {
              icon: "fa fa-times-circle",
            });
          }
        })
        .catch((error) => console.log(error));
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
.sections {
  border: 1px solid rgb(255, 255, 255);
  position: relative;
  z-index: 1;
  padding: 20px 30px;
  margin: 50px 0;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
}

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