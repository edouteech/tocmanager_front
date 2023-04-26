<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Produits</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <div class="row">
        <div class="col-md-10">
          <h4>Liste des produits</h4>
        </div>
        <div class="col-md-2 d-flex justify-content-end">
          <NuxtLink to="/produits/add_produit" v-for="(user, i) in users" :key="i" class="web-btn">
            <button class="btn btn-info py-2" v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1">
              <i class="fa fa-plus" aria-hidden="true"></i>
              <b>AJOUTER</b>
            </button>
          </NuxtLink>
        </div>
      </div>
      <hr />

      <div class="row">
        <div class="col-md-6">
          <form role="search">
            <label class="search-input">
              <i class="fa fa-search"></i>
              <input class="form-control me-2" type="search" placeholder="Recherche..." v-model="element_search"
                @input="search()" aria-label="Search">
            </label>
          </form>
        </div>

        <div class="col-md-6 d-flex justify-content-end mt-2 btn-mobile" v-for="(user, i) in users" :key="i">
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
      </div>
      <div class="row col-md-12 my-4" v-if="choixNumber != 0">
        <div class="col-md-2"><input type="checkbox" checked />Noms</div>
        <div class="col-md-2"><input type="checkbox" v-model="choix_categorie" @change="choiceCategorie()" />Noms de la
          catégorie</div>
        <div class="col-md-2"><input type="checkbox" v-model="choix_quantite" @change="choiceQuantite()" />Quantités en
          stock</div>
        <div class="col-md-2"><input type="checkbox" v-model="choix_achat" @change="choiceAchat()" />Prix d'achat</div>
        <div class="col-md-2"><input type="checkbox" v-model="choix_vente" @change="choiceVente()" />Prix de vente</div>
        <div class="col-md-2"><input type="checkbox" v-model="choix_valorisation"
            @change="choiceValorisation()" />Valorisation</div>
        <!-- <div class="col-md-2"><input type="checkbox" v-model="choix_nature" @change="choiceNature()"/>Nature</div> -->
        <!-- <div><input type="checkbox" v-model="choix_name"/></div>
            <div><input type="checkbox" v-model="choix_name"/></div> -->
      </div>

      <div class="table-responsive search_result" v-if="this.element_search != ''">
        <!-- <div >{{result.name}}</div> -->
        <table class="table table-hover">
          <thead>
            <tr class="table">
              <th v-if="selection != 0"></th>
              <th>NOMS</th>
              <th v-if="choix_categorie == 1">CATEGORIES</th>
              <th v-if="choix_quantite == 1">QUANTITES</th>
              <th>QUANTITES REELLES</th>
              <th v-if="choix_vente == 1">PRIX VENTE</th>
              <th v-if="choix_achat == 1">PRIX ACHAT</th>
              <!-- <th>Stock minimal</th>
                    <th>Stock maximal</th> -->
              <th v-if="choix_valorisation">VALORISATION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, j) in results" :key="j">
              <td v-if="selection != 0">
                <div class="form-check">
                  <input type="checkbox" v-model="checks" @change="checkbox(result.id)" :value="result.id" />
                </div>
              </td>
              <td>{{ result.name }}</td>
              <td v-if="result.category != null && choix_categorie == 1">{{ result.category.name }}</td>
              <td v-if="result.category == null && choix_categorie == 1">---</td>
              <td v-if="choix_quantite == 1">{{ result.quantity }}</td>
              <td class="controler">
                <div class="replace">
                  <input :id="'real_quantity_' + result.id" type="number" class="form-control w-75" placeholder="------"
                    autocomplete="off" required /><i class="fa fa-check-circle text-primary" aria-hidden="true"
                    @click="replaceQuantity(result.id)"></i>
                </div>
              </td>
              <td v-if="choix_vente == 1">{{ result.price_sell }}</td>
              <td v-if="choix_achat == 1">{{ result.price_buy }}</td>
              <!-- <td>{{result.stock_min}}</td>
                <td>{{result.stock_max}}</td> -->
              <td v-if="choix_valorisation">{{ result.quantity * result.price_sell }}</td>
              <td>
                <div class="action d-flex aligns-items-center justify-content-center" v-for="(user, i) in users" :key="i">
                  <div @click="voirProduit(result.id)" v-if="compagny == user.pivot.compagnie_id">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                  </div>
                  <NuxtLink :to="'/produits/' + result.id" v-if="
                    compagny == user.pivot.compagnie_id &&
                    user.pivot.droits_edition == 1
                  "><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                  <div @click="deleteProduit(result.id)" v-if="
                    compagny == user.pivot.compagnie_id &&
                    user.pivot.droits_delete == 1
                  ">
                    <i class="fa fa-trash-o text-danger" aria-hidden="true"></i>
                  </div>
                  <div class="cursor-pointer" v-b-tooltip.hover title="Télécharger l'état de stock"
                    @click="pdfExporte(result)" v-if="compagny == user.pivot.compagnie_id">
                    <i class="fa fa-download text-success" aria-hidden="true"></i>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="table-responsive">
        <table class="table table-hover" v-if="this.element_search == ''">
          <thead>
            <tr class="table">
              <th v-if="selection != 0"></th>
              <th>NOMS</th>
              <th v-if="choix_categorie == 1">CATEGORIES</th>
              <th v-if="choix_quantite == 1">QUANTITES</th>
              <th>QUANTITES REELLES</th>
              <th v-if="choix_vente == 1">PRIX VENTE</th>
              <th v-if="choix_achat == 1">PRIX ACHAT</th>
              <!-- <th>Stock minimal</th>
                    <th>Stock maximal</th> -->
              <th v-if="choix_valorisation">VALORISATION</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(produit, i) in produits" :key="i" :class="{ 'col-ligne': produit.quantity == 0 }">
              <td v-if="selection != 0">
                <div class="form-check">
                  <input type="checkbox" v-model="checks" @change="checkbox(produit.id)" :value="produit.id" />
                </div>
              </td>
              <td>{{ produit.name }}</td>
              <td v-if="produit.category != null && choix_categorie == 1">{{ produit.category.name }}</td>
              <td v-if="produit.category == null && choix_categorie == 1">---</td>
              <td v-if="choix_quantite == 1">{{ produit.quantity }}</td>
              <td class="controler">
                <div class="replace">
                  <input :id="'real_quantity_' + produit.id" type="number" class="form-control w-75" placeholder="------"
                    autocomplete="off" required /><i class="fa fa-check-circle text-primary" aria-hidden="true"
                    @click="replaceQuantity(produit.id)"></i>
                </div>
              </td>
              <td v-if="choix_vente == 1">{{ produit.price_sell }}</td>
              <td v-if="choix_achat == 1">{{ produit.price_buy }}</td>
              <!-- <td>{{produit.stock_min}}</td>
                <td>{{produit.stock_max}}</td> -->
              <td v-if="choix_valorisation">{{ produit.quantity * produit.price_sell }}</td>
              <td>
                <div class="action d-flex aligns-items-center justify-content-center" v-for="(user, i) in users" :key="i">
                  <div @click="voirProduit(produit.id)" v-if="compagny == user.pivot.compagnie_id">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                  </div>
                  <NuxtLink :to="'/produits/' + produit.id" v-if="
                    compagny == user.pivot.compagnie_id &&
                    user.pivot.droits_edition == 1
                  "><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                  <div @click="deleteProduit(produit.id)" v-if="
                    compagny == user.pivot.compagnie_id &&
                    user.pivot.droits_delete == 1
                  ">
                    <i class="fa fa-trash-o text-danger" aria-hidden="true"></i>
                  </div>
                  <div class="cursor-pointer" v-b-tooltip.hover title="Télécharger l'état de stock"
                    @click="pdfExporte(produit)" v-if="compagny == user.pivot.compagnie_id">
                    <i class="fa fa-download text-success" aria-hidden="true"></i>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-center">
          <strong>{{ total }} produit(s) au total </strong>
        </p>
        <hr class="text-primary" />
        <div class="d-flex col-md-2 my-4 mx-auto">
          <label class="title my-2">Affichage</label>
          <form action="">
            <div class="nombre">
              <!-- -->
              <select class="form-control" v-model="form.nombre" required @click.prevent="refresh()">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>
          </form>
        </div>

        <nav class="page nav d-flex justify-content-center" aria-label="Page navigation example " v-if="res_data != null">
          <ul class="pagination">
            <li :class="
              res_data.prev_page_url == null
                ? 'page-item disabled'
                : 'page-item'
            ">
              <a class="page-link" @click="refresh(res_data.current_page - 1)"><i class="fa fa-chevron-left"
                aria-hidden="true"></i></a>
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
              <a class="page-link" @click="refresh(res_data.current_page + 1)"><i class="fa fa-chevron-right"
                aria-hidden="true"></i></a>
            </li>
          </ul>
        </nav>
        

        <div class="table-responsive my-4" v-if="stats">
          <table class="table table-hover other_table">
            <thead>
              <tr class="table-dark">
                <th>QUANTITE TOTALE</th>
                <th>VALORISATION TOTALE</th>
                <th>COUT TOTAL</th>
                <th>BENEFICE TOTAL</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{{ stats.sum_quantity }}</td>
                <td>{{ stats.valorisation }}</td>
                <td>{{ stats.total_cost }}</td>
                <td>{{ stats.profit }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="col-md-10 mx-auto section">
          <form class="justify-content-end btn-group" role="search">
            <input type="file" id="file" ref="file" @change="handleFileUpload()" />
            <button class="btn btn-outline-success web-btn" type="submit" @click.prevent="submitFile()">
              Importer
            </button>
            <button class="btn btn-outline-dark mx-2 web-btn" type="submit" @click.prevent="pdf()">
              Exporter en pdf
            </button>
            <button class="btn btn-outline-dark mx-2 web-btn" type="submit" @click.prevent="exp()" v-if="role == 'admin'">
              Exporter en excel
            </button>

            <div class="d-flex mt-4">
              <button class="btn btn-outline-success mobile-btn" type="submit" @click.prevent="submitFile()"
                title="Importer fichier">
                <i class="fa fa-upload" aria-hidden="true"></i>
              </button>

              <button class="btn btn-outline-dark mx-2 mobile-btn" type="submit" @click.prevent="pdf()"
                title="Exporter en pdf">
                <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
              </button>

              <button class="btn btn-outline-dark mx-2 mobile-btn" type="submit" @click.prevent="exp()"
                v-if="role == 'admin'" title="Exporter en excel">
                <i class="fa fa-file-excel-o" aria-hidden="true"></i>
              </button>
            </div>
          </form>
        </div>
        
        <br />
      </div>
      <br /><br />

    </div>
    <!-- <pre> {{res_data}}</pre> --><br /><br />
    <voirProduit :prod_id="identifiant0" :id="identifiant1" :nom="identifiant2" :quantite="identifiant3"
      :vente="identifiant4" :achat="identifiant5" :min="identifiant6" :max="identifiant7" :group="identifiant8"
      :code="identifiant9" v-show="showModal" @close-modal="showModal = false" />
    <deleteModal :identifiant="key" v-show="showModalDelete" @close-modal="showModalDelete = false" @conf="setMessage" />
    <exportModal v-show="exportModal" @close-modal="exportModal = false" />
    <listpdfModal v-show="listModal" @close-modal="listModal = false" />
    <pdfModal :prod="id_prod" :prod_name="nom_prod" v-show="pdfModal" @close-modal="pdfModal = false" />
    <deleteMultipleModal :ids="checks" v-show="showModalMultipleDelete" @close-modal="showModalMultipleDelete = false"
      @conf="setMessage" />
  </div>
</template>

<script>
import listpdfModal from "./listpdfModal.vue";
import pdfModal from "./pdfModal.vue";
import deleteModal from "./deleteModal.vue";
import exportModal from "./exportModal.vue";
import voirProduit from "./voir_produit.vue";
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
import deleteMultipleModal from "./deleteMultipleModal.vue";
export default {
  layout: "empty",
  auth: true,
  components: {
    Sidebar,
    voirProduit,
    Userinfo,
    deleteModal,
    exportModal,
    pdfModal,
    listpdfModal,
    deleteMultipleModal,
  },

  data() {
    return {
      total: "",
      file: "",
      element_search: "",
      results: "",
      links: [],
      error: null,
      res_data: null,
      showModal: false,
      identifiant0: "",
      identifiant1: "",
      identifiant2: "",
      identifiant3: "",
      identifiant4: "",
      identifiant5: "",
      identifiant6: "",
      identifiant7: "",
      identifiant8: "",
      identifiant9: "",
      produits: [],
      produit: "",
      compagnie_id: "",
      category_id0: "",
      name0: "",
      // quantity0: '',
      price_sell0: "",
      price_buy0: "",
      stock_min0: "",
      stock_max0: "",
      users: "",
      compagny: "",
      form: {
        nombre: 10,
      },
      key: "",
      showModalDelete: false,
      exportModal: false,
      pdfModal: false,
      id_prod: "",
      nom_prod: "",
      role: "",
      listModal: "",
      checks: [],
      selection: 0,
      showModalMultipleDelete: false, choixNumber: 0,
      choix_categorie: 1,
      choix_quantite: 1,
      choix_vente: 1,
      choix_achat: 1,
      choix_valorisation: 1,
      stats: "",
    };
  },

  mounted() {
    this.prodStats();
    this.refresh()
    this.defaultAchat()
    this.defaultVente()
    this.defaultCategorie()
    this.defaultQuantite()
    this.defaultValorisation()
    this.users = this.$auth.$state.user.roles;
    this.compagny = localStorage.getItem('auth.company_id');
    this.role = localStorage.getItem('auth.roles');
  },

  methods: {
    choisir() {
      this.choixNumber = 1
    },

    fin() {
      this.choixNumber = 0
      // this.choice()
    },

    defaultCategorie() {
      this.choix_categorie = localStorage.getItem('auth.choix_categorie')
      if (localStorage.getItem('auth.choix_categorie') == 1) {
        this.choix_categorie = true
      }
      else {
        this.choix_categorie = false
      }
    },


    choiceCategorie() {
      if (this.choix_categorie == true) {
        this.choix_categorie = 1
        this.$auth.$storage.setUniversal('choix_categorie', this.choix_categorie)
        this.defaultCategorie()
      }
      else {
        this.choix_categorie = 0
        this.$auth.$storage.setUniversal('choix_categorie', this.choix_categorie)
        this.defaultCategorie()
      }
    },

    defaultQuantite() {
      this.choix_quantite = localStorage.getItem('auth.choix_quantite')
      if (localStorage.getItem('auth.choix_quantite') == 1) {
        this.choix_quantite = true
      }
      else {
        this.choix_quantite = false
      }
    },

    choiceQuantite() {
      if (this.choix_quantite == true) {
        this.choix_quantite = 1
        this.$auth.$storage.setUniversal('choix_quantite', this.choix_quantite)
        this.defaultQuantite()
      }
      else {
        this.choix_quantite = 0
        this.$auth.$storage.setUniversal('choix_quantite', this.choix_quantite)
        this.defaultQuantite()
      }
    },


    defaultVente() {
      this.choix_vente = localStorage.getItem('auth.choix_vente')
      if (localStorage.getItem('auth.choix_vente') == 1) {
        this.choix_vente = true
      }
      else {
        this.choix_vente = false
      }
    },
    choiceVente() {
      if (this.choix_vente == true) {
        this.choix_vente = 1
        this.$auth.$storage.setUniversal('choix_vente', this.choix_vente)
        this.defaultVente()
      }
      else {
        this.choix_vente = 0
        this.$auth.$storage.setUniversal('choix_vente', this.choix_vente)
        this.defaultVente()
      }
    },


    defaultAchat() {
      this.choix_achat = localStorage.getItem('auth.choix_achat')
      if (localStorage.getItem('auth.choix_achat') == 1) {
        this.choix_achat = true
      }
      else {
        this.choix_achat = false
      }
    },
    choiceAchat() {
      if (this.choix_achat == true) {
        this.choix_achat = 1
        this.$auth.$storage.setUniversal('choix_achat', this.choix_achat)
        this.defaultAchat()
      }
      else {
        this.choix_achat = 0
        this.$auth.$storage.setUniversal('choix_achat', this.choix_achat)
        this.defaultAchat()
      }
    },

    defaultValorisation() {
      this.choix_valorisation = localStorage.getItem('auth.choix_valorisation')
      if (localStorage.getItem('auth.choix_valorisation') == 1) {
        this.choix_valorisation = true
      }
      else {
        this.choix_valorisation = false
      }
    },
    choiceValorisation() {
      if (this.choix_valorisation == true) {
        this.choix_valorisation = 1
        this.$auth.$storage.setUniversal('choix_valorisation', this.choix_valorisation)
        this.defaultValorisation()
      }
      else {
        this.choix_valorisation = 0
        this.$auth.$storage.setUniversal('choix_valorisation', this.choix_valorisation)
        this.defaultValorisation()
      }
    },

    //statistiques du stock
    prodStats() {
      this.$axios
        .get("/products/stats", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          this.stats = response.data.data;
        });
    },

    //modal de suppression multiple
    multipleSup() {
      this.showModalMultipleDelete = true;
    },

    //afficher les cases à cocher
    selectionner() {
      this.selection = 1;
    },

    //fermer les cases à cocher
    deselectionner() {
      this.selection = 0;
      this.checks = [];
    },

    //ajout des valeurs dans checks
    checkbox(id) { },

    //modal pour exportation en excel
    exp() {
      this.exportModal = true;
    },

    //modal d'exportation en pdfd
    pdfExporte(produit) {
      this.pdfModal = true;
      this.id_prod = produit.id;
      this.nom_prod = produit.name;
    },

    //exportation de la liste des produits en pdf
    pdf() {
      this.listModal = true;
    },

    //importation des produits
    submitFile() {
      let formData = new FormData();
      formData.append("fichier", this.file);

      this.$axios
        .post("/products/import", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.refresh();
          } else {
            this.error = "Echec de l'importation. Veuillez réessayer !!!";
            this.$toast.error(this.error, {
              icon: "fa fa-times-circle",
            });
          }
        });
    },

    //upload de fichier
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },

    //recherche de produits
    search() {
      this.$axios
        .get("/products", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            search: this.element_search,
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

    //modal de suppression
    deleteProduit(id) {
      this.showModalDelete = true;
      this.key = id;
    },

    //rappel de la fonction refresh après le modal
    setMessage() {
      this.refresh();
    },

    //liste des produits
    refresh(page = 1) {
      this.$axios
        .get("/products", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            page: page,
            per_page: this.form.nombre,
          },
        })
        .then((response) => {
          this.produits = response.data.data.data;
          this.res_data = response.data.data;
          this.total = response.data.data.total;
          let firstE = response.data.data.links.shift();
          let lastE = response.data.data.links.splice(-1, 1);
        });
    },

    //détails du produit
    voirProduit(id) {
      this.showModal = true;
      this.$axios
        .get("products/" + id, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          this.identifiant0 = response.data.data[0].id;
          this.identifiant2 = response.data.data[0].name;
          this.identifiant3 = response.data.data[0].quantity;
          this.identifiant4 = response.data.data[0].price_sell;
          this.identifiant5 = response.data.data[0].price_buy;
          this.identifiant6 = response.data.data[0].stock_min;
          this.identifiant7 = response.data.data[0].stock_max;
          if (response.data.data[0].category) {
            this.identifiant1 = response.data.data[0].category.name;
          } else {
            this.identifiant1 = "Pas de catégorie associée";
          }
          if (response.data.data[0].tax_group) {
            this.identifiant8 = response.data.data[0].tax_group;
          } else {
            this.identifiant8 = "Relié à aucun groupe";
          }
          if (response.data.data[0].code) {
            this.identifiant9 = response.data.data[0].code;
          } else {
            this.identifiant9 = "Pas de code";
          }
        });
    },

    //changer la quantité en la quantité réelle
    replaceQuantity(id) {
      let input_btn = "real_quantity_" + id;
      let quantity0 = document.getElementById(input_btn).value;
      this.$axios
        .get("/products/" + id, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          let produit = response.data.data[0];
          this.$axios
            .put("products/" + id, {
              id: this.produit.id,
              category_id: produit.category_id,
              name: produit.name,
              quantity: quantity0,
              price_sell: produit.price_sell,
              price_buy: produit.price_buy,
              stock_min: produit.stock_min,
              stock_max: produit.stock_max,
              tax_group: produit.tax_group,
              compagnie_id: localStorage.getItem("auth.company_id"),
            })
            .then((response) => {
              this.refresh();
              document.getElementById(input_btn).value = "";
              this.element_search = "";
            });
        });
    },
  },
};
</script>

<style scoped>
.section {
  border: 1px solid rgb(255, 255, 255);
  position: relative;
  z-index: 1;
  padding: 50px 20px;
  margin: 50px 0;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

}

.search-input {
  display: inline-flex;
  align-items: center;
  padding: 0.375rem 0.75rem;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.search-input input {
  flex: 1 1 auto;
  width: 1%;
  border: none;
  outline: none;
  padding-left: 0.5rem;
}

.search-input i {
  margin-right: 0.5rem;
  color: #ced4da;
}

.col-ligne {
  background-color: rgb(251, 200, 200);
}

.nav {
  overflow: auto;
}

.page {
  display: flex;
}

.btn-group {
  display: flex;
}

.nombre {
  margin: 0;
}

.title {
  margin: 0.5% 2% 0 10%;
  font-weight: bold;
}

.app-main__outer {
  overflow: none;
}

.fa {
  margin: 2px 10px;
  font-size: 18px;
  cursor: pointer;
}

.other_table {
  margin-top: 0%;
}

.table {
  margin-top: 2%;
  text-align: center;
}

.replace {
  display: flex;
}

.controler {
  width: 15%;
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
  /* width: 180px;
  height: 40px; */
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

@media screen and (max-width: 600px) {
  .replace i {
    margin: 5px 2px;
    font-size: 20px;
  }
}

.mobile-btn {
  display: none;
}

@media screen and (max-width: 900px) {
  /* .btn_recherche{
    display:none;
  } */

  .mobile-btn {
    display: block;
  }

  .web-btn {
    display: none;
  }

  .btn-group {
    display: inline;
  }

  .btn-group .btn {
    margin: 10px 0;
  }
}
</style>
