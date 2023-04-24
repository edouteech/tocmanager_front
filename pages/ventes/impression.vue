<template>
  <div class="modal-overlay">
    <div class="quiz">
      <p class="text-center">
        Voulez vous imprimer en <strong> format ticket de caisse</strong> ???
      </p>
      <br />
      <div class="d-flex text-center response">
        <div class="resp mx-5" @click.prevent="generatePdf()">Oui</div>
        <div class="resp mx-5" @click.prevent="$emit('close-modal')">Non</div>
      </div>
    </div>
    <div class="modaler" @click.stop>
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
            <p>
              <strong>Mecef_counteurs :</strong>{{ qr_info.mecef_counteurs }}
            </p>
            <p><strong>Mecef_nim: </strong>{{ qr_info.mecef_nim }}</p>
            <p><strong>Mecef_date :</strong> {{ qr_info.mecef_date }}</p>
            <p><strong>CodeMECeFDGI : </strong>{{ qr_info.codeMECeFDGI }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="close" @click.prevent="$emit('close-modal')">
      <img class="close-img" src="/images/fermer.png" alt="" />
    </div>
  </div>
</template>
  
  <script>
export default {
  auth: true,
  name: "Impression",
  props: [
    "date_sell",
    "client",
    "factures",
    "montant",
    "rest",
    "tax",
    "qr_info",
    "compagn",
  ],
  data() {
    return {};
  },
  methods: {
    //ticket de caisse
    generatePdf() {
      var fac = document.getElementById("other_page");
      window.print(fac);
    },
  },
};
</script>
  
<style scoped>
.colonne {
  width: 20%;
}

.colonne_article {
  width: 40%;
}

.recap_total {
  font-size: 30px;
}

.client-info {
  margin-top: -15%;
}
.quiz {
  background-color: white;
  height: 200px;
  width: 500px;
  margin-top: 15%;
  padding: 30px;
  border-radius: 3px;
}

.response {
  margin: 0 20%;
}
.resp {
  border: 1px solid black;
  padding: 2%;
  cursor: pointer;
  border-radius: 5px;
}

.resp:hover {
  background-color: aliceblue;
}

.modaler {
  display: none;
  font-size: 24px;
}
.modal-overlay {
  z-index: 999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #949292da;
}

.modaler {
  /* text-align: center; */
  background-color: white;
  height: auto;
  width: 800px;
  padding: 2% 1%;
  border-radius: 3px;
  overflow: auto;
}
.close {
  margin: 13% 0 0 0;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

/*   
.print i{
  font-size: 25px;
}

.print{
  border: 1px solid black;
  width: 150px;
  border-radius: 5px;
  padding: 15px;
  cursor: pointer;
}

.print:hover{
  background-color: rgb(236, 244, 251);
} */

@media print {
  .quiz,
  .close {
    display: none !important;
  }

  /* .modaler{
      height: auto;
      width: 800px;
    } */

  .modaler {
    display: block !important;
  }
  /* nav{
        display: none !important;
    }
    footer{
        display: none !important;
    } */
}

/* p {
    font-size: 16px;
    margin: 20px 0;
  } */
</style>