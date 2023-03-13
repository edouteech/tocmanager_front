<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Bons de commande</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <h4 class="boom">Informations relatives à ce bon de commande</h4>
      <hr class="boom" />
      <div class="row my-5">
        <div class="col-md-6 boom">
          <NuxtLink
            class="btn btn-outline-success col-md-12"
            v-on:click.prevent="submit()"
            :disabled="load"
            :to="'/achats/bon/' + bon_id"
            >Enregistrer le bon comme un achat</NuxtLink
          >
        </div>
        <div class="col-md-6 boom">
          <button
            class="btn btn-outline-dark col-md-12"
            v-on:click.prevent="submit()"
            :disabled="load"
          >
            Imprimer le bon de commande
          </button>
        </div>
      </div>

      <form action="" method="POST">
        <div class="row">
          <div class="col-md-6">
            <b>Nom du fournisseur : </b> {{ fournisseur }}
          </div>
          <div class="col-md-6">
            <b>Date d'édition : </b> {{ form.date_order }}
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
                <td class="table-coll">{{ line.product.name }}</td>
                <td class="table-cole">{{ line.quantity }}</td>
                <td class="table-col">{{ line.price }}</td>
                <td class="table-col">{{ line.amount }}</td>
              </tr>
            </tbody>
          </table>
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
                <td>{{ form.discount }}</td>
              </tr>
              <tr>
                <td><strong>Montant Total </strong></td>
                <td>{{ form.amount }}</td>
              </tr>
            </tbody>
          </table>
          <br />
        </div>

        <br /><br /><br /><br />
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
          <img src="../../../static/images/logo.png" class="logo-img" alt="" />
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
import Sidebar from "../../sidebar.vue";
import Userinfo from "../../user_info.vue";
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
      showModal: false,
      showSaved: false,
      showProduit: false,
      clients: [],
      fournisseur: "",
      produits: [],
      codes: "",
      form: {
        user_id: "",
        date_order: "",
        supplier_id: "",
        amount: "",
        tax: "",
        discount: "",
        order_lines: [],
      },
      errors: [],
      bon_id: "",
    };
  },

  async mounted() {
    await this.recupBon();
    this.compagny = localStorage.getItem("auth.company_id");
    this.user = localStorage.getItem("auth.user_id");
    this.compagnie();
  },

  methods: {
    //recupère le bon en question
    recupBon() {
      this.$axios
        .get("/orders/" + this.$route.params.id, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          let order = response.data.data;
          this.bon_id = order.id;
          (this.form.date_order = moment(order.date_order).format(
            "YYYY-MM-DDThh:mm"
          )),
            (this.fournisseur = order.supplier.name),
            (this.form.order_lines = order.order_lines),
            (this.form.tax = order.tax),
            (this.form.discount = order.discount),
            (this.form.amount = order.amount);
        });
    },


    //impression 
    submit() {
      window.print();
    },

    //recuperer la compagnie
    compagnie() {
      this.$axios
        .get("/compagnies/" + this.compagny, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
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
  width: 20%;
}
.table-cole {
  width: 15%;
}

.codeSearch-results {
  border: 1px solid;
  /* width: 14%; */
  position: absolute;
  z-index: 99;
  background-color: #fefefe;
}

.codeSearch-results a {
  color: #605050;
  text-decoration: none;
}

.codeSearch-results ul {
  list-style: none;
  overflow: auto;
  padding: 0;
  height: 200px;
  text-align: left;
}

.codeSearch-results li {
  padding: 2px 10px;
}

.codeSearch-results li:hover {
  background-color: rgb(103, 180, 247);
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

.close-img {
  width: 25px;
  cursor: pointer;
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

.received {
  border: none;
  outline: none;
  border-bottom: 2px solid #605050;
}

.app-main__outer {
  overflow: none;
  margin: 0 2%;
}

.commande {
  margin: 5%;
}

.cadre-haut {
  display: flex;
}

.ajout-client {
  margin: 30px 10px;
  border: 1px solid darkblue;
  padding: 30px 20px;
  /* margin-right: 50%; */
}

.btn-ajout {
  margin-top: 9%;
  border: 1px solid #53af57;
  padding: 10px;
  width: 100px;
  font-size: 10px;
  border-radius: 15px;
  text-align: center;
  background-color: #53af57;
  color: #fff;
  cursor: pointer;
}

.btn-ajout i {
  font-size: 14px;
}

.facture-date {
  margin-top: 5%;
  font-size: 18px;
  margin-right: 10%;
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

.ajout-article .bx {
  font-size: 18px;
  margin-right: 10px;
}
.ajout-article {
  /* margin-top: ; */
  text-align: center;
  background-color: rgb(238, 134, 64);
  border-radius: 10px;
  padding: 12px;
  cursor: pointer;
  width: 350px;
}

.code_recherche input {
  height: 45px;
  margin: 20px 0;
}

.code_recherche .btn {
  height: 40px;
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
  margin-top: 2%;
  text-align: center;
}

thead tr {
  background-color: transparent;
}

tbody tr:last-of-type {
  border-bottom: 2px solid rgb(140, 140, 250);
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
  .select2-cli {
    width: 57%;
  }

  .select2-prod {
    width: 30%;
  }

  .add_buttons {
    margin: 50% 0;
  }
  .cadre-haut {
    display: inline;
    margin: 0;
  }

  .ajout-client {
    margin-right: 0;
    margin: 10px 5px;
    border: 1px solid darkblue;
    padding: 5px;
  }

  .facture-date {
    position: fixed;
  }

  .table {
    overflow: auto;
  }

  .commande {
    margin: 15% 0;
  }
  .ajout-article {
    margin: 0;
  }
}
</style>
    
    