<template >
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Ventes</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer pt-5 px-2">
      <h4>Impression Format Ticket de caisse</h4>
      <hr />

      <div class="col-md-6 mx-auto boom my-3">
        <button
          class="btn btn-outline-success col-md-12"
          @click.prevent="print()"
        >
          Lancer l'impression
        </button>
      </div>
    </div>

    <div class="other_page" v-if="date_sell">
      <div>
        <div class="d-flex align-items-start flex-column">
          <div class="entreprise-photo mb-2" v-if="compagn.logo">
            <img
              :src="$config.webURL + compagn.logo"
              alt="profil"
              class="profil"
              width="70"
              height="50"
            />
          </div>
          <strong> Société {{ compagn.name }}</strong>
          <strong> Email: {{ compagn.email }}</strong>
          <strong> Tél: {{ compagn.phone }}</strong>
        </div>
        <div class="d-flex align-items-end flex-column client-info">
          <strong> Date : {{ date_sell }}</strong>
          <strong> M/Mme {{ client.name }}</strong>
          <strong>Téléphone : {{ client.phone }}</strong>
        </div>
      </div>

      <br />
      <hr />
      <div class="d-flex">
        <div class="py-2 px-2 colonne_article text-center">
          <strong>Article</strong>
        </div>
        <div class="py-2 px-2 colonne text-center"><strong>Qte </strong></div>
        <div class="py-2 px-2 colonne text-center">
          <strong>P.U. </strong>
        </div>
        <div class="py-2 px-2 colonne text-center">
          <strong>Total HT</strong>
        </div>
      </div>
      <div class="d-flex" v-for="(facture, j) in factures" :key="j">
        <div class="px-1 colonne_article text-center">
          {{ facture.product.name }}
        </div>
        <div class="px-1 colonne text-center">{{ facture.quantity }}</div>
        <div class="px-1 colonne text-center">{{ facture.price }}</div>
        <div class="px-1 colonne text-center">{{ facture.amount }} F CFA</div>
      </div>
      <hr />
      <br />
      <div class="d-flex align-items-start flex-column recap_total">
        <strong> Total : {{ montant }} F CFA</strong>
        <span>Taxe : {{ tax }} F CFA</span>
        <span>Reste à payer : {{ rest }} F CFA</span>
      </div>

      <div class="text-center" v-if="qr_info != null">
        <img
          :src="
            'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' +
            qr_info.qrcode
          "
          alt="QRcode"
        />
        <div class="">
          <p><strong>Mecef_counteurs :</strong>{{ qr_info.mecef_counteurs }}</p>
          <p><strong>Mecef_nim: </strong>{{ qr_info.mecef_nim }}</p>
          <p><strong>Mecef_date :</strong> {{ qr_info.mecef_date }}</p>
          <p><strong>CodeMECeFDGI : </strong>{{ qr_info.codeMECeFDGI }}</p>
        </div>
      </div>
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
          <img
            src="../../../../static/images/logo.png"
            class="logo-img"
            alt=""
          />
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
import moment from "moment";
import Sidebar from "../../../sidebar.vue";
import Userinfo from "../../../user_info.vue";
export default {
  auth: true,
  layout: "voir",
  components: {
    Sidebar,
    Userinfo,
  },
  data() {
    return {
      date_sell: "",
      montant: "",
      client: [],
      rest: "",
      tax: "",
      id: "",
      compagn: [],
      factures: [],
      qrcode: null,
      qr_info: null,
      key: "",
    };
  },

  methods: {
    //envoie des infos avant impression
    async print() {
      await this.$axios
        .get("/sells/" + this.$route.params.ticket, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          (this.id = response.data.data[0].id),
            (this.factures = response.data.data[0].sell_lines),
            (this.date_sell = moment(response.data.data[0].date_sell).format(
              "D MMM YYYY, h:mm:ss a"
            )),
            (this.client = response.data.data[0].client),
            (this.montant = response.data.data[0].amount),
            (this.rest = response.data.data[0].rest);
          this.tax = response.data.data[0].tax;
          this.compagn = response.data.data[0].client.compagny;
          this.qr_info = response.data.data[0].facture;
        });
      this.generatePdf();
    },

    //impression
    generatePdf() {
      var fac = document.getElementById("other_page");
      window.print(fac);
    },
  },

  mounted() {
    this.print();
    this.users = this.$auth.$state.user.roles;
    this.compagny = localStorage.getItem("auth.company_id");
    this.role = localStorage.getItem("auth.roles");
  },
};
</script>
    
  <style scoped>
.name_side {
  display: none;
}

.other_page {
  padding: 2%;
}

.colonne {
  width: 20%;
}

.colonne_article {
  width: 40%;
}

@media print {
  .recap_total {
    font-size: 30px;
  }
  .other_page {
    padding: 0;
  }
  .client-info {
    margin-top: -10%;
  }
  .navbar {
    display: none !important;
  }
  .app-main__outer,
  .boom {
    display: none !important;
  }
  .imprim {
    display: block;
    padding: 0;
  }
  footer {
    display: none !important;
  }
  @page {
    margin-left: 0.5in;
    margin-right: 0.5in;
    margin-top: 0;
    margin-bottom: 0;
  }
}

.table {
  margin-top: 2%;
  text-align: center;
  justify-content: center;
}

thead tr {
  background-color: transparent;
}

tbody tr:last-of-type {
  border-bottom: 2px solid rgb(140, 140, 250);
}
@media screen and (max-width: 900px) {
  table thead tr th {
    padding: 15px 20px;
    font-size: 13px;
    white-space: nowrap;
  }
  table tbody tr td {
    padding-left: 10px;
    padding-right: 10px;
    white-space: nowrap;
  }
}
</style>
    