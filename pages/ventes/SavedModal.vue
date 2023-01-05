<template>
  <div class="modal-overlay"  @click="$emit('close-modal')">
    <div class="modaler" @click.stop>
      <div class="alert alert-danger justify-content-center" role="alert" v-if="error != null">
            {{error}}
        </div>
      <img class="check" src="/images/eff.jpg" alt="" />
      <h6>Enregistré! </h6>
      <p>La facture a été sauvegardé</p><br>
      <form action="">
        <div class="form-group notify">
              <strong>Confirmer l'email auquel il faut envoyer la facture </strong>{{ email_client }}
              <div class="col-md-11 mx-auto row">
                  <div class="col-md-8">
                    <input type="email" class="form-control mx-auto mt-1" v-model="form.email" autocomplete="off" required  placeholder="azerty@azert.com" >
                  </div>
                  <div class="col-md-4">
                    <button class="btn btn-success mt-1" @click.prevent="submit()">Envoyer facture</button>
                  </div>
              </div>        
          </div><br>
      </form>
        <div class="mt-3">
          <NuxtLink :to="'/ventes/voir/'+this.identifiant"><button class="btn btn-light">Voir la vente</button></NuxtLink>
          <NuxtLink to="/ventes/list_vente" class="btn btn-warning mx-3">Nouvelle facture</NuxtLink>
          <NuxtLink to="/dashboard"><button class="btn btn-primary">Tableau de bord</button></NuxtLink>
        </div>
        <div class="mt-5 d-flex col-md-8 mx-auto">
          <button class="btn btn-dark mx-3" @click.prevent="generatePdf()"><i class="fa fa-print text-primary mx-1" aria-hidden="true"></i>Imprimer facture</button>
          <button class="btn btn-dark" @click.prevent="generateOtherpdf()"><i class="fa fa-print text-primary mx-1" aria-hidden="true"></i>Imprimer ticket</button>
        </div>
      </div>
      <div class="imprim" id="impression">
        <div class="d-flex align-items-end flex-column">
            <p><strong> M/Mme {{info_client.name}}</strong> </p>
            <p><strong> Client {{entreprise.name}}</strong> </p>
            <p><strong> {{info_client.phone}}</strong> </p>
        </div><br>
        <div class="p-2 mb-2 bg-secondary text-white text-center"><h4>Informations sur la facture</h4></div><br>
        <div class="">
          <p><strong>Numéro de la facture : {{fact_id}}</strong> </p>
          <p><strong> Date de la facture : {{date_fact}}</strong> </p>
          <p><strong> N° Client : {{info_client.id}}</strong> </p>
        </div>
  
          <table class="table table-hover facture">
            <thead>
              <tr class="table-secondary">
                <th class="py-4">Nom du produit</th>
                <th class="py-4">Quantité </th>
                <th class="py-4">Prix unitaire </th>
                <th class="py-4">Total HT</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(recFact, j) in recFacts" :key="j">
                <td>{{recFact.product.name}}</td>
                <td>{{recFact.quantity}}</td>
                <td>{{recFact.price}}</td>
                <td>{{recFact.amount}} F CFA</td>
              </tr>
            </tbody>
          </table>  <br><br> 
          
              <div class="d-flex align-items-end flex-column mb-4" v-if="facture_qr != null">
                <img :src="'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data='+facture_qr.qrcode" alt="QRcode" />
                <div class="d-flex align-items-start flex-column mb-4">
                  <div> <strong>Mecef_counteurs :</strong>{{facture_qr.mecef_counteurs}}</div>
                  <div> <strong>Mecef_nim: </strong>{{facture_qr.mecef_nim}}</div>
                  <div><strong>Mecef_date :</strong> {{facture_qr.mecef_date}}</div>
                  <div><strong>CodeMECeFDGI : </strong>{{facture_qr.codeMECeFDGI}}</div>
                </div>
              </div>
          <table  class="total d-flex align-items-end flex-column">
            <tbody>
              <tr>
                <td class="p-2">Taxe</td>
                <td class="py-2 px-5">{{tax_fact}} F CFA</td>
              </tr>
              <tr>
                <td class="p-2"><strong>TOTAL</strong></td>
                <td class="py-2 px-5"><strong>{{total}} F CFA</strong></td>
              </tr>
              <tr>
                <td class="p-2">Montant restant à encaisser</td>
                <td class="py-2 px-5"><strong class="text-warning">{{rest_fact}} F CFA</strong></td>
              </tr>
            </tbody>
          </table>  <br><br> 
      </div> 
      <Impression :date_sell= 'identifiant1' :client= 'identifiant2' :factures= 'identifiant3' :montant= 'identifiant4' :rest= 'identifiant5' :tax= 'identifiant6' :qr_info= 'identifiant7' v-show="showModal" @close-modal="showModal = false"/>

  </div>
</template>


<script>
import moment from "moment";
import Impression from './impression.vue';  
  export default {
    name: 'ajoutModal',
    components:{
      Impression
    },
    props: ['identifiant', 'recupFacture','email_client'],
    data () {
      return{
          form: {
              email: this.email_client,
          },
          error: null,
          error_champ: [],
          fact_id: "",
          recFacts: "",
          date_fact: "",
          info_client: "",
          total: "",
          rest_fact: "",
          tax_fact: "",
          entreprise: "",
          facture_qr: "",
          showModal: false,
          identifiant1: '',
          identifiant2: '',
          identifiant3: '',
          identifiant4: '',
          identifiant5: '',
          identifiant6: '',
          identifiant7: '',
      }
    },

    methods:{
      submit() {
        this.$axios.post('/sells/'+this.identifiant+'/notify', {
          email:this.form.email,
          compagnie_id: localStorage.getItem('auth.company_id')
        })
          .then(response => {
            console.log(response);
            if(response.data.status = "success"){
              this.$router.push({path:'/ventes/list_vente'});
            }
            else{
              this.error= response.data.message
            }
          })
      },

      // print(){
      //   console.log(this.recupFacture.client)
      //   this.id = this.recupFacture.id,
      //   this.factures = this.recupFacture.sell_lines,
      //   this.date_sell = moment(this.recupFacture.date_sell).format("D MMM YYYY, h:mm:ss a"),
      //   this.client = this.recupFacture.client,
      //   this.montant = this.recupFacture.amount,
      //   this.rest = this.recupFacture.rest
      //   this.tax = this.recupFacture.tax
      //   this.compagn = this.recupFacture.client.compagny
      //   this.qr_info = this.recupFacture.facture
      //   this.generatePdf()
      // },

      async generatePdf() {
          await this.chargement()
          var fact = document.getElementById('impression')
          window.print(fact) ;
      },

      chargement(){
          this.fact_id = this.recupFacture.id,
          this.recFacts = this.recupFacture.sell_lines,
          this.date_fact = moment(this.recupFacture.date_sell).format("D MMM YYYY, h:mm:ss a"),
          this.info_client = this.recupFacture.client,
          this.total = this.recupFacture.amount,
          this.rest_fact = this.recupFacture.rest
          this.tax_fact = this.recupFacture.tax
          this.entreprise = this.recupFacture.compagny
          this.facture_qr = this.recupFacture.facture
          // this.form.email = this.recupFacture.client.email
      },

      async generateOtherpdf(){
          this.showModal = true;
          // this.id = response.data.data[0].id,
          this.identifiant3 = this.recupFacture.sell_lines,
          this.identifiant1 = moment(this.recupFacture.date_sell).format("D MMM YYYY, h:mm:ss a"),
          this.identifiant2 = this.recupFacture.client,
          this.identifiant4 = this.recupFacture.amount,
          this.identifiant5 = this.recupFacture.rest
          this.identifiant6 = this.recupFacture.tax
          this.compagn = this.recupFacture.client.compagny
          this.identifiant7 = this.recupFacture.facture
          }
    }
    
   
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  z-index: 999;
}

.modaler {
  text-align: center;
  background-color: white;
  height: max-content;
  width: 600px;
  margin-top: 3%;
  padding: 50px 0;
  border-radius: 20px;
  /* overflow: auto; */
}

.close {
  margin: 2% 0 0 16px;
  cursor: pointer;
}

.close-img {
  width: 25px;
  z-index: 9999;
}

.check {
  width: 150px;
}

h6 {
  font-weight: 500;
  font-size: 28px;
  margin: 20px 0;
}

p {
  font-size: 16px;
  margin: 20px 0;
}

.notify{
  margin: 0 -10px;
}

  
.imprim{
    display:none
}

@media print {
    .navbar, .modaler{
      display: none !important;
    }
    .app-main__outer{
      display: none !important;
    }
    .imprim {
          display: block;
          background-color: white;
          height: auto;
          width: 800px;
          padding: 5% ;
          border-radius: 3px;
          overflow: auto;
      }
    
    /* footer{
      display: none !important;
    }
    @page {
          margin-left: 0.5in;
          margin-right: 0.5in;
          margin-top: 0;
          margin-bottom: 0;
    } */
  
    
  }
</style>