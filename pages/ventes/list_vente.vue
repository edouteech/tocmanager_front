<template >
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Ventes</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <h4>Liste des ventes effectuées</h4>
      <hr />
      <div class="d-flex">
        <div class="col-md-10 row">
          <form class="d-flex col-md-7" role="search">
            <input class="form-control me-2" type="search" placeholder="recherche..." v-model="element_search"
              @input="search()" aria-label="Search" />
            <button class="btn btn-outline-success btn_recherche" type="submit" @click.prevent="search()">
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>
        </div>
        <NuxtLink to="/ventes/vente" v-for="(user, i) in users" :key="i" class="web-btn"><button class="custom-btn btn-3"
            v-if="
              compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1
            ">
            <span>Nouvelle vente</span>
          </button></NuxtLink>
      </div>

      <div class="mobile-btn mt-4">
        <NuxtLink to="/ventes/vente" v-for="(user, i) in users" :key="i"><button class="custom-btn btn-3" v-if="
          compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1
        ">
            <span>Nouvelle vente</span>
          </button></NuxtLink>
      </div>
      <div class="range">
        <input class="form-control" type="date" v-model="date_debut" required />
        <input class="form-control" type="date" v-model="date_fin" required />
        <button class="btn btn-outline-success" @click="refresh()">
          <i class="fa fa-check-circle" aria-hidden="true"></i>
        </button>
      </div>

      <div class="d-flex justify-content-end" v-for="(user, i) in users" :key="i">
        <div v-if="choixNumber == 0">
          <button class="btn btn-outline-success mx-2" @click.prevent="choisir()">
            A afficher
          </button>
        </div>
        <div v-else>
          <button class="btn btn-outline-success mx-2" @click.prevent="fin()">
            Enregistrer
          </button>
        </div>

        <div v-if="selection == 0">
          <button class="btn btn-outline-info" @click.prevent="selectionner()">
            Sélectionner
          </button>
        </div>
        <div v-else>
          <button class="btn btn-outline-dark mx-3" @click.prevent="deselectionner()">
            Annuler
          </button>
        </div>
        <button class="btn btn-outline-danger"
          v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1 && selection != 0"
          @click.prevent="multipleSup()">
          <i class="fa fa-trash-o cursor-pointer" aria-hidden="true"></i>
        </button>
      </div>
      <div class="col-md-3 mx-2">
        <select class="form-control" v-model="trie" @change="TriFactures(trie)">
          <option disabled value="">Trier par...</option>
          <option value="toutes">Toutes les factures</option>
          <option value="true">Factures normalisées</option>
          <option value="false">Factures non normalisées</option>
        </select>
      </div>

      <div class="row col-md-12 mt-2" v-if="choixNumber != 0">
        <div class="col-md-2"><input type="checkbox" checked />Dates</div>
        <div class="col-md-2"><input type="checkbox" v-model="choix_acteur" @change="choiceActeur()" />Clients</div>
        <div class="col-md-2"><input type="checkbox" v-model="choix_montant" @change="choiceMontant()" />Montants Factures
        </div>
        <div class="col-md-2"><input type="checkbox" v-model="choix_rest" @change="choiceRest()" />Restes à payer</div>
        <div class="col-md-2"><input type="checkbox" v-model="choix_paiement" @change="choicePaiement()" />Moyens de
          Paiement</div>
        <!-- <div class="col-md-2"><input type="checkbox" v-model="choix_nature" @change="choiceNature()"/>Nature</div> -->
        <!-- <div><input type="checkbox" v-model="choix_name"/></div>
            <div><input type="checkbox" v-model="choix_name"/></div> -->
      </div>
      <div v-if="this.element_search != ''" class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th v-if="selection != 0"></th>
              <th>Date facture</th>
              <th v-if="choix_acteur == 1">Client concerné</th>
              <!-- <th>Montant HT </th>
                  <th>Montant TTC </th> -->
              <th v-if="choix_montant == 1">Net à payer</th>
              <th v-if="choix_rest == 1">Montant du</th>
              <th v-if="choix_paiement == 1">Moyen de paiement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, i) in results" :key="i">
              <td v-if="selection != 0">
                <div class="form-check">
                  <input type="checkbox" v-model="checks" @change="checkbox(result.id)" :value="result.id" />
                </div>
              </td>
              <td>{{ result.date_sell }}</td>
              <td v-if="choix_acteur == 1">{{ result.client.name }}</td>
              <!-- <td>{{result.amount_ht}}</td>
                  <td>{{result.amount_ttc}}</td> -->
              <td v-if="choix_montant == 1">{{ result.amount }}</td>
              <td class="text-danger" v-if="choix_rest == 1">{{ result.rest }}</td>
              <td v-if="choix_paiement == 1">{{ result.payment }}</td>
              <td>
                <div class="action d-flex aligns-items-center justify-content-center" v-for="(user, i) in users" :key="i">
                  <NuxtLink :to="'/ventes/voir/' + result.id" v-if="compagny == user.pivot.compagnie_id"><i
                      class="fa fa-info-circle text-info" aria-hidden="true"></i></NuxtLink>
                  <div class="cursor-pointer" @click.prevent="print(result.id)"
                    v-if="compagny == user.pivot.compagnie_id">
                    <i class="fa fa-print text-primary" aria-hidden="true"></i>
                  </div>
                  <NuxtLink :to="'/ventes/' + result.id" v-if="
                    compagny == user.pivot.compagnie_id &&
                    user.pivot.droits_edition == 1
                  "><i class="fa fa-pencil-square-o text-dark" aria-hidden="true"></i></NuxtLink>
                  <div class="cursor-pointer" @click.prevent="deleteVente(result.id)" v-if="
                    compagny == user.pivot.compagnie_id &&
                    user.pivot.droits_delete == 1
                  ">
                    <i class="fa fa-trash-o text-danger" aria-hidden="true"></i>
                  </div>
                  <div class="cursor-pointer" @click.prevent="generateOtherpdf(result.id)"
                    v-if="compagny == user.pivot.compagnie_id">
                    <i class="fa fa-print text-warning" aria-hidden="true"></i>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-center">
          <strong>{{ total }} facture(s) au total </strong>
        </p>
        <hr class="text-primary" />
      </div>
      <!-- <div class="form-check"><input class="form-check-input" type="checkbox" v-model="check" true-value="1" false-value="0"></div> -->
      <div v-if="this.element_search == ''" class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th v-if="selection != 0"></th>
              <th>Date facture</th>
              <th>Client concerné</th>
              <!-- <th>Montant HT </th>
                  <th>Montant TTC </th> -->
              <th>Net à payer</th>
              <th>Montant du</th>
              <th>Moyen de paiement</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(vente, i) in ventes" :key="i">
              <td v-if="selection != 0">
                <div class="form-check">
                  <input type="checkbox" v-model="checks" @change="checkbox(vente.id)" :value="vente.id" />
                </div>
              </td>
              <td>{{ vente.date_sell }}</td>
              <td>{{ vente.client.name }}</td>
              <!-- <td>{{vente.amount_ht}}</td>
                  <td>{{vente.amount_ttc}}</td> -->
              <td>{{ vente.amount }}</td>
              <td class="text-danger">{{ vente.rest }}</td>
              <td>{{ vente.payment }}</td>
              <td>
                <div class="action d-flex aligns-items-center justify-content-center" v-for="(user, i) in users" :key="i">
                  <NuxtLink :to="'/ventes/voir/' + vente.id" v-if="compagny == user.pivot.compagnie_id"><i
                      class="fa fa-info-circle text-info" aria-hidden="true"></i></NuxtLink>
                  <div class="cursor-pointer web-imprim" @click.prevent="print(vente.id)"
                    v-if="compagny == user.pivot.compagnie_id">
                    <i class="fa fa-print text-primary" aria-hidden="true"></i>
                  </div>
                  <NuxtLink :to="'/ventes/' + vente.id" v-if="
                    compagny == user.pivot.compagnie_id &&
                    user.pivot.droits_edition == 1
                  "><i class="fa fa-pencil-square-o text-dark" aria-hidden="true"></i></NuxtLink>
                  <div class="cursor-pointer" @click.prevent="deleteVente(vente.id)" v-if="
                    compagny == user.pivot.compagnie_id &&
                    user.pivot.droits_delete == 1
                  ">
                    <i class="fa fa-trash-o text-danger" aria-hidden="true"></i>
                  </div>
                  <div class="cursor-pointer web-imprim" @click.prevent="generateOtherpdf(vente.id)"
                    v-if="compagny == user.pivot.compagnie_id">
                    <i class="fa fa-print text-warning" aria-hidden="true"></i>
                  </div>
                  <div class="cursor-pointer mobile-imprim" v-if="compagny == user.pivot.compagnie_id">
                    <ul id="menu-demo2">
                      <li>
                        <a href="#"><i class="fa fa-print text-primary" aria-hidden="true"></i></a>
                        <ul>
                          <li>
                            <NuxtLink :to="'/ventes/mobile/ticket/' + vente.id">Ticket</NuxtLink>
                          </li>
                          <li>
                            <NuxtLink :to="'/ventes/mobile/' + vente.id">A4</NuxtLink>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-center">
          <strong>{{ total }} facture(s) au total </strong>
        </p>
        <hr class="text-primary" />
      </div>
      <br /><br />
      <form class="d-flex justify-content-end" role="search">
        <button class="btn btn-outline-dark mx-2" type="submit" @click.prevent="exp()" v-if="role == 'admin'">
          <i class="fa fa-file-excel-o" aria-hidden="true"></i><span class="text-ajout">Exporter en excel</span>
        </button>
        <button class="btn btn-outline-dark mx-2" type="submit" @click.prevent="pdf()">
          <i class="fa fa-file-pdf-o" aria-hidden="true"></i><span class="text-ajout">Exporter en pdf</span>
        </button>
      </form>
      <br /><br />
      <form action="">
        <div class="nombre d-flex my-4 col-md-2">
          <label class="title mx-3 my-2"><strong> Affichage:</strong></label>
          <select class="form-control" v-model="form.nombre" required @click.prevent="refresh()">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </form>
      <nav aria-label="Page navigation example " class="d-flex nav" v-if="res_data != null">
        <ul class="pagination">
          <li :class="
            res_data.prev_page_url == null
              ? 'page-item disabled'
              : 'page-item'
          ">
            <a class="page-link" @click="refresh(res_data.current_page - 1)">Précédent</a>
          </li>
          <li class="page-item" v-for="(link, index) in res_data.links" :key="index">
            <a :class="link.active == true ? 'page-link active' : 'page-link'" href="#" @click="refresh(link.label)">{{
              link.label }}</a>
          </li>

          <li :class="
            res_data.next_page_url == null
              ? 'page-item disabled'
              : 'page-item'
          ">
            <a class="page-link" @click="refresh(res_data.current_page + 1)">Suivant</a>
          </li>
        </ul>
      </nav>
    </div>
    <br />

    <div class="imprim" id="impression">
      <div class="d-flex align-items-start flex-column">
        <div class="entreprise-photo mb-2" v-if="compagn.logo">
          <img :src="$config.webURL + compagn.logo" alt="profil" class="profil" width="70" height="50" />
        </div>
        <strong> Société {{ compagn.name }}</strong>
        <strong> Email: {{ compagn.email }}</strong>
        <strong> Tél: {{ compagn.phone }}</strong>
      </div>
      <div class="d-flex align-items-end flex-column client-info">
        <strong> M/Mme {{ client.name }}</strong>
        <strong> Email: {{ client.email }}</strong>
        <strong> Tél: {{ client.phone }}</strong>
      </div>
      <br />
      <div class="p-2 mb-2 bg-secondary text-white text-center">
        <h4>Informations sur la facture</h4>
      </div>
      <div class="d-flex align-items-start flex-column">
        <strong>Numéro de la facture : {{ id }}</strong>
        <strong> Date de la facture : {{ date_sell }}</strong>
        <strong> N° Client : {{ client.id }}</strong>
      </div>

      <table class="table table-hover facture">
        <thead>
          <tr class="table-secondary">
            <th class="py-4">Nom du produit</th>
            <th class="py-4">Quantité</th>
            <th class="py-4">Prix unitaire</th>
            <th class="py-4">Total HT</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(facture, j) in factures" :key="j">
            <td>{{ facture.product.name }}</td>
            <td>{{ facture.quantity }}</td>
            <td>{{ facture.price }}</td>
            <td>{{ facture.amount }} F CFA</td>
          </tr>
        </tbody>
      </table>
      <br /><br />

      <div class="d-flex align-items-end flex-column mb-4" v-if="qr_info != null">
        <img :src="
          'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' +
          qr_info.qrcode
        " alt="QRcode" />
        <div class="d-flex align-items-start flex-column mb-4">
          <div>
            <strong>Mecef_counteurs :</strong>{{ qr_info.mecef_counteurs }}
          </div>
          <div><strong>Mecef_nim: </strong>{{ qr_info.mecef_nim }}</div>
          <div><strong>Mecef_date :</strong> {{ qr_info.mecef_date }}</div>
          <div><strong>CodeMECeFDGI : </strong>{{ qr_info.codeMECeFDGI }}</div>
        </div>
      </div>
      <table class="total d-flex align-items-end flex-column">
        <tbody>
          <tr>
            <td class="px-2">Taxe</td>
            <td class="px-5">{{ tax }} F CFA</td>
          </tr>
          <tr>
            <td class="px-2"><strong>TOTAL</strong></td>
            <td class="px-5">
              <strong>{{ montant }} F CFA</strong>
            </td>
          </tr>
          <tr>
            <td class="px-2">Montant restant à encaisser</td>
            <td class="px-5">
              <strong class="text-warning">{{ rest }} F CFA</strong>
            </td>
          </tr>
        </tbody>
      </table>
      <br /><br />
    </div>
    <deleteModal :identifiant="key" v-show="showModalDelete" @close-modal="showModalDelete = false" @conf="setMessage" />
    <deleteMultipleModal :ids="checks" v-show="showModalMultipleDelete" @close-modal="showModalMultipleDelete = false"
      @conf="setMessage" />
    <exportModal v-show="exportModal" @close-modal="exportModal = false" />
    <pdfModal v-show="pdfModal" @close-modal="pdfModal = false" />
    <Impression :date_sell="identifiant1" :client="identifiant2" :factures="identifiant3" :montant="identifiant4"
      :rest="identifiant5" :tax="identifiant6" :qr_info="identifiant7" :compagn="identifiant8" v-show="showModal"
      @close-modal="showModal = false" />

    <!-- Footer -->
    <footer class="text-center text-lg-start bg-dark text-white">
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" rel="stylesheet" />
      <!-- Section: Social media -->
      <section class="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
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
      <div class="text-center p-2" style="background-color: rgba(0, 0, 0, 0.05)">
        Copyright © 2022 - Tous droits réservés TocManager
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </div>
</template>
  
  
<script>
import pdfModal from './pdfModal.vue';
import exportModal from './exportModal.vue';
import deleteMultipleModal from './deleteMultipleModal.vue';
import deleteModal from './deleteModal.vue';
import Impression from './impression.vue';
import moment from "moment";
import Sidebar from '../sidebar.vue'
import Userinfo from '../user_info.vue'
export default {
  auth: true,
  layout: "voir",
  components: {
    Sidebar,
    Userinfo,
    Impression,
    deleteModal,
    exportModal,
    pdfModal,
    deleteMultipleModal
  },
  data() {
    return {
      links: [],
      res_data: null,
      showModal: false,
      exportModal: false,
      identifiant1: '',
      identifiant2: '',
      identifiant3: '',
      identifiant4: '',
      identifiant5: '',
      identifiant6: '',
      identifiant7: '',
      identifiant8: '',
      ventes: [],
      vente: "",
      total: '',
      users: '',
      compagny: '',
      form: {
        nombre: '',
      },
      date_sell: '',
      montant: '',
      client: [],
      rest: '',
      tax: '',
      id: '',
      compagn: [],
      factures: [],
      qrcode: null,
      qr_info: null,
      key: '',
      showModalDelete: false,
      element_search: "",
      results: "",
      filtre: "",
      date_debut: "",
      date_fin: "",
      role: "",
      trie: "",
      pdfModal: false,
      sup_checkbox: 0,
      list_delete: [],
      checks: [],
      selection: 0,
      showModalMultipleDelete: false,
      choixNumber: 0,
      choix_acteur: 1,
      choix_montant: 1,
      choix_rest: 1,
      choix_paiement: 1
    }
  },

  methods: {
    //modal de suppression multiple
    multipleSup() {
      this.showModalMultipleDelete = true;
    },

    choisir() {
      this.choixNumber = 1
    },

    fin() {
      this.choixNumber = 0
      // this.choice()
    },

    defaultActeur() {
      this.choix_acteur = localStorage.getItem('auth.choix_acteur')
      if (localStorage.getItem('auth.choix_acteur') == 1) {
        this.choix_acteur = true
      }
      else {
        this.choix_acteur = false
      }
    },


    choiceActeur() {
      if (this.choix_acteur == true) {
        this.choix_acteur = 1
        this.$auth.$storage.setUniversal('choix_acteur', this.choix_acteur)
        this.defaultActeur()
      }
      else {
        this.choix_acteur = 0
        this.$auth.$storage.setUniversal('choix_acteur', this.choix_acteur)
        this.defaultActeur()
      }
    },

    defaultMontant() {
      this.choix_montant = localStorage.getItem('auth.choix_montant')
      if (localStorage.getItem('auth.choix_montant') == 1) {
        this.choix_montant = true
      }
      else {
        this.choix_montant = false
      }
    },

    choiceMontant() {
      if (this.choix_montant == true) {
        this.choix_montant = 1
        this.$auth.$storage.setUniversal('choix_montant', this.choix_montant)
        this.defaultMontant()
      }
      else {
        this.choix_montant = 0
        this.$auth.$storage.setUniversal('choix_montant', this.choix_montant)
        this.defaultMontant()
      }
    },


    defaultRest() {
      this.choix_rest = localStorage.getItem('auth.choix_rest')
      if (localStorage.getItem('auth.choix_rest') == 1) {
        this.choix_rest = true
      }
      else {
        this.choix_rest = false
      }
    },
    choiceRest() {
      if (this.choix_rest == true) {
        this.choix_rest = 1
        this.$auth.$storage.setUniversal('choix_rest', this.choix_rest)
        this.defaultRest()
      }
      else {
        this.choix_rest = 0
        this.$auth.$storage.setUniversal('choix_rest', this.choix_rest)
        this.defaultRest()
      }
    },

    defaultPaiement() {
      this.choix_paiement = localStorage.getItem('auth.choix_paiement')
      if (localStorage.getItem('auth.choix_paiement') == 1) {
        this.choix_paiement = true
      }
      else {
        this.choix_paiement = false
      }
    },
    choicePaiement() {
      if (this.choix_paiement == true) {
        this.choix_paiement = 1
        this.$auth.$storage.setUniversal('choix_paiement', this.choix_paiement)
        this.defaultPaiement()
      }
      else {
        this.choix_paiement = 0
        this.$auth.$storage.setUniversal('choix_paiement', this.choix_paiement)
        this.defaultPaiement()
      }
    },

    //afficher les cases à cocher
    selectionner() {
      this.selection = 1;
    },

    //ajout des valeurs dans checks
    checkbox(id) { },

    //fermer les cases à cocher
    deselectionner() {
      this.selection = 0;
      this.checks = [];
    },

    //ajout des cases
    checkbox(id) { },

    //modal d'exportation en excel
    exp() {
      this.exportModal = true;
    },

    //modal d'exportation en pdf
    pdf() {
      this.pdfModal = true;
    },

    //recherche des factures
    search() {
      this.$axios
        .get("/sells", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            search: this.element_search,
            date_debut: this.date_debut,
            date_fin: this.date_fin,
          },
        })
        .then((response) => {
          this.results = response.data.data.data;
          this.res_data = response.data.data;
          this.total = response.data.data.total;
          let firstE = response.data.data.links.shift();
          let lastE = response.data.data.links.splice(-1, 1);
        });
    },

    //modal de suppression d'une facture
    deleteVente(id) {
      this.showModalDelete = true;
      this.key = id;
    },

    //rappel de la fonction refresh après le modal
    setMessage() {
      this.refresh();
    },

    //liste des factures
    refresh(page = 1) {
      this.$axios
        .get("/sells", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            page: page,
            per_page: this.form.nombre,
            date_debut: this.date_debut,
            date_fin: this.date_fin,
          },
        })
        .then((response) => {
          this.ventes = response.data.data.data;
          this.res_data = response.data.data;
          this.total = response.data.data.total;
          let firstE = response.data.data.links.shift();
          let lastE = response.data.data.links.splice(-1, 1);
        });
    },

    //liste des factures triées en fonction du fait qu'elles soit normalisees ou pas
    TriFactures(trie) {
      if (trie == "toutes") {
        this.refresh();
      } else if (trie == "false") {
        this.$axios
          .get("/sells/filter", {
            params: {
              compagnie_id: localStorage.getItem("auth.company_id"),
              page: 1,
              is_invoiced: false,
            },
          })
          .then((response) => {
            this.ventes = response.data.data.data;
            this.res_data = response.data.data;
            this.total = response.data.data.total;
            let firstE = response.data.data.links.shift();
            let lastE = response.data.data.links.splice(-1, 1);
          });
      } else if (trie == "true") {
        this.$axios
          .get("/sells/filter", {
            params: {
              compagnie_id: localStorage.getItem("auth.company_id"),
              page: 1,
              is_invoiced: true,
            },
          })
          .then((response) => {
            this.ventes = response.data.data.data;
            this.res_data = response.data.data;
            this.total = response.data.data.total;
            let firstE = response.data.data.links.shift();
            let lastE = response.data.data.links.splice(-1, 1);
          });
      }
    },

    //liste des clients
    recupClient() {
      this.$axios
        .get("/clients", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          this.clients = response.data.data.data;
        });
    },

    //envoie des infos avant impression
    async print(id) {
      await this.$axios
        .get("/sells/" + id, {
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
      var fact = document.getElementById("impression");
      window.print(fact);
    },

    //impression du ticket de caisse
    async generateOtherpdf(id) {
      await this.$axios
        .get("/sells/" + id, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          this.showModal = true;
          (this.identifiant3 = response.data.data[0].sell_lines),
            (this.identifiant1 = moment(response.data.data[0].date_sell).format(
              "D MMM YYYY, h:mm:ss a"
            )),
            (this.identifiant2 = response.data.data[0].client),
            (this.identifiant4 = response.data.data[0].amount),
            (this.identifiant5 = response.data.data[0].rest);
          this.identifiant6 = response.data.data[0].tax;
          this.identifiant7 = response.data.data[0].facture;
          this.identifiant8 = response.data.data[0].client.compagny;
        });
    },
  },

  mounted() {
      // await this.exp()
        this.refresh()
        this.recupClient()
        this.defaultActeur()
        this.defaultMontant()
        this.defaultRest()
        this.defaultPaiement()
        this.users = this.$auth.$state.user.roles;
        this.compagny = localStorage.getItem('auth.company_id');
        this.role = localStorage.getItem('auth.roles')
        // console.log(this.$auth)
  },
};
</script>
  
<style scoped>
.nav {
  overflow: auto;
}

.client-info {
  margin-top: -10%;
}

.imprim {
  display: none;
}

.range {
  display: flex;
  /* border: 1px solid gainsboro; */
  border-radius: 10px;
  padding: 1% 2%;
  margin-bottom: 2%;
  margin-top: 2%;
  font-size: 18px;
}

.range input {
  margin-right: 2%;
}

.name_side {
  display: none;
}

@media print {
  .navbar {
    display: none !important;
  }

  .app-main__outer {
    display: none !important;
  }

  .imprim {
    display: block;
    padding: 1%;
  }

  /* nav, .trait, .other_page{
      display: none !important;
    } */
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

.fa {
  margin: 0 5px;
  font-size: 18px;
  cursor: pointer;
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

.action {
  display: flex;
}

.custom-btn {
  width: 180px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}

.btn-3 {
  background: rgb(0, 172, 238);
  background: linear-gradient(0deg,
      rgba(0, 172, 238, 1) 0%,
      rgba(2, 126, 251, 1) 100%);
  width: 180px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;
}

.btn-3 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}

.btn-3:before,
.btn-3:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
  background: rgba(2, 126, 251, 1);
  transition: all 0.3s ease;
}

.btn-3:before {
  height: 0%;
  width: 2px;
}

.btn-3:after {
  width: 0%;
  height: 2px;
}

.btn-3:hover {
  background: transparent;
  box-shadow: none;
}

.btn-3:hover:before {
  height: 100%;
}

.btn-3:hover:after {
  width: 100%;
}

.btn-3 span:hover {
  color: rgba(2, 126, 251, 1);
}

.btn-3 span:before,
.btn-3 span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  background: rgba(2, 126, 251, 1);
  transition: all 0.3s ease;
}

.btn-3 span:before {
  width: 2px;
  height: 0%;
}

.btn-3 span:after {
  width: 0%;
  height: 2px;
}

.btn-3 span:hover:before {
  height: 100%;
}

.btn-3 span:hover:after {
  width: 100%;
}

.mobile-btn {
  display: none;
}

.mobile-imprim {
  display: none;
}

#menu-demo2,
#menu-demo2 ul {
  padding: 0;
  margin: 0;
  list-style: none;
  text-align: center;
}

#menu-demo2 li {
  display: inline-block;
  position: relative;
  border-radius: 8px 8px 0 0;
}

#menu-demo2 ul li {
  display: inherit;
  border-radius: 0;
}

#menu-demo2 ul li:hover {
  border-radius: 0;
}

#menu-demo2 ul li:last-child {
  border-radius: 0 0 8px 8px;
}

#menu-demo2 ul {
  position: absolute;
  z-index: 1000;
  max-height: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  -moz-transition: 0.8s all 0.3s;
  -webkit-transition: 0.8s all 0.3s;
  transition: 0.8s all 0.3s;
}

#menu-demo2 li:hover ul {
  max-height: 15em;
}

/* background des liens menus */
/* #menu-demo2 li:last-child{
background-color: #CFFF6A;
background-image:-webkit-linear-gradient(top, #CFFF6A 0%, #677F35 100%);
background-image:linear-gradient(to bottom, #CFFF6A 0%, #677F35 100%);
} */
/* background des liens sous menus */
#menu-demo2 li:last-child li {
  background: #677f35;
}

/* background des liens menus et sous menus au survol */
#menu-demo2 li:last-child:hover,
#menu-demo2 li:last-child li:hover {
  background: #cfff6a;
}

/* les a href */
#menu-demo2 a {
  text-decoration: none;
  display: block;
  padding: 0 10px;
  color: #fff;
  font-family: arial;
}

#menu-demo2 ul a {
  padding: 8px 0;
}

#menu-demo2 li:hover li a {
  color: #fff;
  text-transform: inherit;
}

#menu-demo2 li:hover a,
#menu-demo2 li li:hover a {
  color: #000;
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

@media screen and (max-width: 900px) {
  .range input {
    width: 45%;
  }

  .web-btn {
    display: none;
  }

  .mobile-btn {
    display: block;
  }

  .mobile-imprim {
    display: block;
  }

  .web-imprim {
    display: none;
  }
}

.range {
  margin: 30px 0;
}
</style>
  