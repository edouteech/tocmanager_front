<template>
  <div class="modal-overlay" @click="$emit('close-modal')">
    <div class="modaler">
      <p class="text-center">
        Voulez vous imprimer en format ticket de caisse ???
      </p>
      <div class="d-flex">
        <div class="print" @click="generatePdf()">Oui</div>
        <div class="print mx-5" @click="$emit('close-modal')">Non</div>
      </div>
      <div class="other_page">
        <p>
          <strong> Date de la facture : {{ date_sell }}</strong>
        </p>
        <p>
          <strong> M/Mme {{ client.name }}</strong>
        </p>
        <p>
          <strong>Téléphone : {{ client.phone }}</strong>
        </p>
        <br />
        <hr />
        <div class="d-flex">
          <div class="py-4 px-2 w-25">Nom du produit</div>
          <div class="py-4 px-2 w-25">Quantité</div>
          <div class="py-4 px-2 w-25">Prix unitaire</div>
          <div class="py-4 px-2 w-25">Total HT</div>
        </div>
        <div class="d-flex" v-for="(facture, j) in factures" :key="j">
          <div class="px-2 w-25">{{ facture.product.name }}</div>
          <div class="px-2 w-25">{{ facture.quantity }}</div>
          <div class="px-2 w-25">{{ facture.price }}</div>
          <div class="px-2 w-25">{{ facture.amount }} F CFA</div>
        </div>
        <br /><br />
        <hr />
        <br />
        <div>
          <p>
            <strong> Total : {{ montant }} F CFA</strong>
          </p>
          <p>
            <strong> Taxe : {{ tax }} F CFA</strong>
          </p>
          <p>
            <strong> Montant restant à encaisser : {{ rest }} F CFA</strong>
          </p>
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
    <div class="close" @click="$emit('close-modal')">
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
  ],
  data() {
    return {};
  },
  methods: {
    //impression de ticket de caisse
    generatePdf() {
      window.print();
    },
  },
};
</script>
  
  <style scoped>
@media print {
  .d-flex,
  .close {
    display: none !important;
  }

  .other_page {
    display: block;
  }
  /* nav{
        display: none !important;
    }
    footer{
        display: none !important;
    } */
}

.print {
  border: 1px solid black;
  padding: 3%;
}

.print:hover {
  background-color: aliceblue;
}

.other_page {
  display: none;
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
  margin-top: 15%;
  padding: 30px;
  /* border-radius: 20px; */

  overflow: auto;
}
.close {
  margin: 15% 0 0 0;
  cursor: pointer;
}

.close-img {
  width: 25px;
}

.print i {
  font-size: 25px;
}

.print {
  border: 1px solid black;
  width: 150px;
  border-radius: 5px;
  padding: 15px;
  cursor: pointer;
}

.print:hover {
  background-color: rgb(236, 244, 251);
}

/* p {
    font-size: 16px;
    margin: 20px 0;
  } */
</style>