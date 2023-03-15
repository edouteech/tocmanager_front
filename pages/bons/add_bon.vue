<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Bons de commande</h3>
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
      <h4>Enregistrer un bon de commande</h4>
      <hr />

      <form action="" method="POST">
        <div class="row">
          <div class="col-md-6">
            <div class="ajout-client">
              <v-select
                placeholder="Choississez le fournisseur"
                v-model="selectedFournisseur"
                label="name"
                :options="fournisseurs"
                :reduce="(fournisseur) => fournisseur.id"
              />
            </div>
          </div>
          <div class="col-md-6 facture-date my-auto">
            <span class="creation"> Date d'édition :</span>
            <input
              class="form-control"
              type="datetime-local"
              v-model="form.date_order"
            />
          </div>
        </div>
        <hr />

        <div class="add_buttons row col-md-12 boom">
          <!-- <div class="col-md-2"><button class="btn-ajout" @click.prevent="showProduit = true"><i class="fa fa-plus-circle" aria-hidden="true"></i><br> Nouveau produit</button></div>  -->
          <div class="col-md-6">
            <button
              class="btn btn-outline-success col-md-12 mx-auto"
              @click.prevent="addLine()"
            >
              <i class="fa fa-plus-circle" aria-hidden="true"></i><br />
              Ajouter un article
            </button>
          </div>
          <div class="col-md-6 mt-2">
            <div class="d-flex code_recherche">
              <input
                class="form-control"
                type="search"
                placeholder="code..."
                v-model="codeProd"
                aria-label="Search"
                @input="searchCode()"
                @click.prevent="searchCode()"
              />
              <button
                class="btn btn-outline-success"
                type="submit"
                @click.prevent="codeAdd()"
              >
                <i class="fa fa-plus" aria-hidden="true"></i>
              </button>
            </div>
            <div
              class="alert alert-danger justify-content-center"
              role="alert"
              v-if="codeError"
            >
              {{ codeError }}
            </div>
          </div>
        </div>

        <div class="commande table-responsive">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th scope="col">Désignation</th>
                <th scope="col">Quantité voulue</th>
                <th scope="col">Prix unitaire</th>
                <th scope="col">Total</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(line, index) in form.order_lines" :key="index">
                <td class="table-coll">
                  <v-select
                    placeholder="Choississez..."
                    v-model="line.product_id"
                    label="name"
                    :options="produits"
                    :selectable="(produit) => produit.quantity > 0"
                    :reduce="(produit) => produit.id"
                    append-to-body
                    @input="productChange(line.product_id, index)"
                  >
                    <template
                      #option="{ name, code, quantity }"
                      style="background-color: blue"
                    >
                      <div :style="quantity <= 0 ? 'color: red;' : ''">
                        {{ name }} [{{ quantity }}] ({{ code }})
                      </div>
                    </template>
                  </v-select>
                </td>
                <td class="table-cole">
                  <div class="d-flex">
                    <div class="col-md-10">
                      <input
                        class="form-control"
                        type="number"
                        v-model="line.quantity"
                        autocomplete="off"
                        @change="quantityChange(index, line.product_id)"
                        required
                      />
                    </div>
                    <div class="col-md-1 p-1">
                      <span
                        class="quantity_erreur aligns-items-center justify-content-center"
                        v-if="quantityError"
                        ><i
                          class="fa fa-ban text-danger"
                          :id="'real_quantity_' + index"
                          aria-hidden="true"
                          title="Cette quantité est supérieure à la quantité en stock !"
                        ></i
                      ></span>
                    </div>
                  </div>
                </td>
                <td class="table-col">
                  <input
                    class="form-control"
                    type="num"
                    v-model="line.price"
                    autocomplete="off"
                    disabled
                  />
                </td>
                <td class="table-col">
                  <input
                    class="form-control"
                    type="num"
                    v-model="line.amount"
                    autocomplete="off"
                    disabled
                  />
                </td>
                <td @click="deleteLine(index)">
                  <i
                    class="fa fa-trash-o text-danger cursor-pointer"
                    aria-hidden="true"
                  ></i>
                </td>
              </tr>
            </tbody>
          </table>
          <div
            class="alert alert-danger justify-content-center"
            role="alert"
            v-if="quantityError"
          >
            {{ quantityError }}
          </div>
          <div
            class="alert alert-danger justify-content-center"
            role="alert"
            v-if="errors_amount"
          >
            Veuillez ajouter une ligne de vente
          </div>
        </div>
        <br />
        <br />

        <div class="col-md-7 mx-auto table-responsive">
          <table class="table">
            <thead>
              <tr class="table-dark">
                <th>A savoir</th>
                <th>Récapitulatif</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Réduction (Prix ou %)</strong></td>
                <td>
                  <div>
                    <input
                      class="form-control received"
                      type="text"
                      v-model="form.discount"
                      autocomplete="off"
                      required
                      @change="reduceAmount()"
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td><strong>Montant Total </strong></td>
                <td>
                  <input
                    class="form-control received"
                    type="number"
                    v-model="form.amount"
                    autocomplete="off"
                    disabled
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <br />
        </div>

        <div
          class="alert alert-danger justify-content-center"
          role="alert"
          v-if="amount_error != null"
        >
          {{ amount_error }}
        </div>
        <br /><br /><br /><br />

        <div class="col-md-6 mx-auto">
          <button
            class="custom-btn btn-5 col-md-12"
            v-on:click.prevent="submit()"
            :disabled="load"
          >
            Enregistrer le bon de commande
          </button>
        </div>
      </form>
    </div>

    <!-- Footer -->
    <footer class="text-center text-lg-start bg-dark text-white">
      <link
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        rel="stylesheet"
      />
      <!-- Section: Social media -->
      <section
        class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom"
      >
        <!-- Left -->
        <div class="me-5 d-none d-lg-block">
          <img src="../../static/images/logo.png" class="logo-img" alt="" />
        </div>
        <!-- Left -->

        <!-- Right -->
        <div>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-facebook-f"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-google"></i>
          </a>
          <a href="" class="me-4 text-reset">
            <i class="fab fa-github"></i>
          </a>
        </div>
        <!-- Right -->
      </section>
      <!-- Section: Social media -->

      <!-- Copyright -->
      <div
        class="text-center p-2"
        style="background-color: rgba(0, 0, 0, 0.05)"
      >
        Copyright © 2022 - Tous droits réservés TocManager
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </div>
</template>
    
    <script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import moment from "moment";
// import ajoutModal from './ajoutModal.vue'
// import produitModal from './produitModal.vue'
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
export default {
  layout: "voir",
  auth: true,
  components: {
    Sidebar,
    // ajoutModal,
    // produitModal,
    Userinfo,
    vSelect,
  },

  data() {
    return {
      load: false,
      amount_error: null,
      quantityError: null,
      message: "",
      four_id: "",
      showModal: false,
      showSaved: false,
      showProduit: false,
      fournisseurs: [],
      fournisseur: "",
      produits: [],
      form: {
        user_id: "",
        date_order: moment().format("YYYY-MM-DDThh:mm"),
        supplier_id: "",
        amount: "",
        tax: 0,
        discount: 0,
        order_lines: [],
      },
      errors: [],
      errors_amount: null,
      error: null,
      user: "",
      token: "",
      compagny: "",
      methodes: "",
      element_searchCli: "",
      element_searchProd: "",
      designations: "",
      acteurs: "",
      afficheCli: 0,
      afficheProd: 0,
      codeProd: "",
      codeError: null,
      codes: "",
      selectedFournisseur: "",
    };
  },

  mounted() {
    this.compagny = localStorage.getItem("auth.company_id");
    this.user = localStorage.getItem("auth.user_id");
    this.compagnie();
    this.refresh();
    this.recupProduct();
  },

  methods: {

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


    //ajouter ligne d'achat
    addLine() {
      this.form.order_lines.push({
        product_id: "",
        price: 0,
        quantity: 1,
        amount: 0,
        compagnie_id: localStorage.getItem("auth.company_id"),
        date: this.form.date_buy,
      });
    },


    //ajouter un produit via le code
    async codeAdd() {
      await this.$axios
        .get("/products/search", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            code: this.codeProd,
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.codeError = null;
            this.codes = response.data.data;
            let codeProdId = this.codes.id;
            let codeProdPrice = this.codes.price_buy;
            (this.codeProd = ""),
              this.form.order_lines.push({
                product_id: codeProdId,
                price: codeProdPrice,
                quantity: 1,
                discount: 0,
                amount: codeProdPrice * 1,
                compagnie_id: localStorage.getItem("auth.company_id"),
                date: this.form.date_buy,
              });
            let sum = 0;
            for (let j = 0; j < this.form.order_lines.length; j++) {
              sum += this.form.order_lines[j].amount;
            }

            this.form.amount = sum;
          } else {
            this.codeError = response.data.message;
          }
        });
    },


    //reduction du montant de la facture
    reduceAmount() {
      this.form.tax = 0;
      var red = this.form.discount;
      var percent = red.indexOf("%");
      let sum = 0;
      for (let j = 0; j < this.form.order_lines.length; j++) {
        sum += this.form.order_lines[j].amount;
      }

      if (percent != -1) {
        var newRed = red.substring(0, red.length - 1);
        let calcul1 = sum * Number(newRed);
        let calcul2 = calcul1 / 100;
        this.form.discount = calcul2;
        this.form.amount = sum - calcul2;
      } else {
        this.form.discount = red;
        this.form.amount = sum - red;
      }
    },


    //supprimer une ligne de vente
    deleteLine(index) {
      this.form.order_lines.splice(index, 1);
      let sum = 0;
      for (let j = 0; j < this.form.order_lines.length; j++) {
        sum += this.form.order_lines[j].amount;
      }
      this.form.amount = sum;
    },


    //rappeler la fonction refresh apres le modal
    setMessage(payload) {
      this.refresh();
      this.message = payload.message;
      this.four_id = payload.four_id;
    },


    //rappeler la fonction recupProduct apres le modal
    setProduit(payload) {
      this.recupProduct();
    },


    //ajouter un bon de commande
    async submit() {
      await this.$axios
        .post("/orders", {
          date_order: this.form.date_order,
          tax: this.form.tax,
          discount: this.form.discount,
          amount: this.form.amount,
          user_id: this.user,
          supplier_id: this.selectedFournisseur,
          order_lines: this.form.order_lines,
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          this.error = response.data.message;
          if (response.data.status == "success") {
            this.$router.push({ path: "/bons/list_bon" });
            this.$toast("Enregistrement d'un bon de commande !!! ", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.errors = response.data.data;
            this.errors_amount = response.data.data.amount;
          }
        })
        .catch((err) => console.log(err));
    },


    //recupere la liste des fournisseurs
    refresh() {
      this.$axios
        .get("/suppliers", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            is_paginated: 0,
          },
        })
        .then((response) => {
          this.fournisseurs = response.data.data;
          for (let k = 0; k <= this.fournisseurs.length; k++) {
            if (this.fournisseurs[k].default_supplier == true) {
              this.selectedFournisseur = this.fournisseurs[k].id;
              break;
            }
          }
        });
    },


    //recupere la liste des produits
    recupProduct() {
      this.$axios
        .get("/products", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            is_paginated: 0,
          },
        })
        .then((response) => {
          this.produits = response.data.data;
        });
    },


    //changer le montant en fonction de la quantité dans les lignes d'achat
    quantityChange(index) {
      this.form.discount = 0;
      let line = this.form.order_lines[index];
      line.amount = Number(line.price) * Number(line.quantity);
      let sum = 0;
      for (let j = 0; j < this.form.order_lines.length; j++) {
        sum += this.form.order_lines[j].amount;
      }
      this.form.amount = sum;
    },


    //reduction dans les lignes d'achat
    reduceChange(index) {
      let line = this.form.order_lines[index];
      let calculQ = Number(line.price) * Number(line.quantity);
      var str = line.discount;
      var percent = str.indexOf("%");

      if (percent != -1) {
        var newStr = str.substring(0, str.length - 1);
        let calculR = calculQ * Number(newStr);
        let Rprix = calculR / 100;
        line.amount = calculQ - Rprix;
        let sum = 0;
        for (let j = 0; j < this.form.order_lines.length; j++) {
          sum += this.form.order_lines[j].amount;
        }
        this.form.amount = sum;
      } else {
        line.amount = calculQ - str;
        let sum = 0;
        for (let j = 0; j < this.form.order_lines.length; j++) {
          sum += this.form.order_lines[j].amount;
        }
        this.form.amount = sum;
      }
    },


    //changer de produit dans les lignes d'achat
    productChange(IdProduit, IndexBuyLines) {
      for (let k = 0; k <= this.produits.length; k++) {
        if (this.produits[k].id == IdProduit) {
          let ProdId = this.produits[k].id;
          let ProdPrice = this.produits[k].price_buy;
          this.form.order_lines[IndexBuyLines].product_id = ProdId;
          this.form.order_lines[IndexBuyLines].price = ProdPrice;
          this.form.order_lines[IndexBuyLines].discount = 0;
          this.form.order_lines[IndexBuyLines].quantity = 1;
          this.form.order_lines[IndexBuyLines].amount = ProdPrice;
          let sum = 0;
          for (let j = 0; j < this.form.order_lines.length; j++) {
            sum += this.form.order_lines[j].amount;
          }
          this.form.amount = sum;
          break;
        }
      }
    },

    //compagnie concernee
    compagnie() {
      this.$axios
        .get("/compagnies/" + this.compagny, {
          params: {
            compagnie_id: this.$auth.$storage.getUniversal("company_id"),
          },
        })
        .then((response) => {
          let compagnie = response.data.data[0];
          this.token = compagnie.mecef_token;
        });
    },
  },
};
</script>
    
    <style scoped>
.ajout-client {
  margin: 30px 0;
  border: 1px solid #53af57;
  padding: 30px 20px;
  width: 300px;
}

.facture-date {
  margin: 30px 0;
  border: 1px solid #53af57;
  padding: 30px 20px;
  font-size: 18px;
}

.quantity_erreur {
  cursor: pointer;
}

@media print {
  .boom,
  .cadre-haut {
    display: none !important;
  }
  nav {
    display: none !important;
  }
  footer {
    display: none !important;
  }
}

.table-col {
  width: 18%;
}
.table-cole {
  width: 12%;
}
.select2-cli {
  border: 1px solid;
  width: 14%;
  position: absolute;
  z-index: 99;
  background-color: #fefefe;
}

.select2-cli a {
  color: #605050;
  text-decoration: none;
}

.close-img {
  width: 25px;
  cursor: pointer;
}

.select2-cli ul {
  list-style: none;
  overflow: auto;
  padding: 0;
  height: 200px;
  text-align: left;
}

.select2-cli li {
  padding: 2px 10px;
}

.select2-cli li:hover {
  background-color: rgb(103, 180, 247);
}

.select2-prod {
  border: 1px solid;
  width: 10%;
  position: absolute;
  z-index: 99;
  background-color: #fefefe;
}

.select2-prod a {
  color: #605050;
  text-decoration: none;
}

.select2-prod ul {
  list-style: none;
  overflow: auto;
  padding: 0;
  height: 200px;
  text-align: left;
}

.select2-prod li {
  padding: 2px 10px;
}

.select2-prod li:hover {
  background-color: rgb(103, 180, 247);
}

/* .list_produit{
    overflow: scroll;
} */
.received {
  border: none;
  outline: none;
  border-bottom: 2px solid #605050;
}

.app-main__outer {
  overflow: none;
  margin: 0 5%;
}

.commande {
  margin: 5%;
}

.code_recherche input {
  height: 45px;
  margin: 20px 0;
}

.code_recherche .btn {
  height: 40px;
}

.btn-ajout:hover {
  background-color: #fefefe;
  color: rgb(0, 0, 0);
}

.facture-date .creation {
  text-decoration: underline;
  font-weight: bold;
  padding-right: 1%;
}
.facture-date input {
  border: none;
  outline: none;
}

.modal .input-form {
  display: flex;
  flex-direction: column-reverse;
  margin: 1.2em 0;
  height: 50px;
}

.modal input {
  padding: 8px;
  border: none;
  outline: none;
  border-bottom: 2px solid #605050;
}

.modal input::placeholder {
  font-size: 15px;
  opacity: 0.5;
}

.modal .submit-form {
  margin-top: 10%;
  text-align: right;
}

.modal input[type="submit"] {
  background-color: white;
  color: black;
  padding: 10px 15px;
  margin: 8px 0;
  border: 1px solid #53af57;
  cursor: pointer;
  width: 100%;
  font-size: 15px;
}

.modal input[type="submit"]:hover {
  background-color: #53af57;
  color: white;
  border: 1px solid #53af57;
  font-size: 16px;
}

.submit {
  margin-top: 10%;
  text-align: right;
  margin-right: 10px;
}

input[type="submit"] {
  background-color: white;
  color: black;
  padding: 10px 15px;
  margin: 8px 0;
  border: 1px solid #3c05f1;
  cursor: pointer;
  width: 60%;
  font-size: 15px;
}

input[type="submit"]:hover {
  background-color: #b8a5f6;
  color: white;
  border: 1px solid #b8a5f6;
  font-size: 16px;
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

button {
  margin: 25px;
}

.custom-btn {
  /* width: 130px;
  height: 40px; */
  color: #fff;
  border-radius: 5px;
  padding: 20px 35px;
  font-weight: bold;
  font-size: 20px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}

/* 5 */
.btn-5 {
  /* width: 130px;
  height: 40px; */
  line-height: 42px;
  padding: 20px;
  border: none;
  background: rgb(121, 161, 255);
  background: linear-gradient(
    0deg,
    rgb(121, 161, 255) 0%,
    rgb(121, 161, 255) 100%
  );
}
.btn-5:hover {
  color: #0909f0;
  background: transparent;
  box-shadow: none;
}
.btn-5:before,
.btn-5:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: rgb(121, 161, 255);
  box-shadow: -1px -1px 5px 0px #fff, 7px 7px 20px 0px #0003,
    4px 4px 5px 0px #0002;
  transition: 400ms ease all;
}
.btn-5:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}
.btn-5:hover:before,
.btn-5:hover:after {
  width: 100%;
  transition: 800ms ease all;
}

@media screen and (max-width: 900px) {
  .form-group {
    margin: 10px 0;
  }

  .commande {
    margin: 15% 0;
  }
  .ajout-article {
    margin: 0;
  }
}
</style>

