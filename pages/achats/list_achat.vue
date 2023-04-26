<template >
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name">Achats</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <h4>Liste des achats éffectués</h4>
      <hr />
      <br />

      <div class="d-flex">
        <div class="col-md-10">
          <form class="d-flex col-md-7" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="recherche..."
              v-model="element_search"
              @input="search()"
              aria-label="Search"
            />
            <button
              class="btn btn-outline-success btn_recherche"
              type="submit"
              @click.prevent="search()"
            >
              <i class="fa fa-search" aria-hidden="true"></i>
            </button>
          </form>
        </div>
        <div class="web-btn">
          <NuxtLink to="/achats/achat" v-for="(user, i) in users" :key="i"
            ><button
              class="custom-btn btn-3"
              v-if="
                compagny == user.pivot.compagnie_id &&
                user.pivot.droits_add == 1
              "
            >
              <span>Nouvel achat</span>
            </button>
          </NuxtLink>
        </div>
      </div>

      <div class="mobile-btn mt-4">
        <NuxtLink to="/achats/achat" v-for="(user, i) in users" :key="i"
          ><button
            class="custom-btn btn-3"
            v-if="
              compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1
            "
          >
            <span>Nouvel achat</span>
          </button>
        </NuxtLink>
      </div>
      <div class="range">
        <input class="form-control" type="date" v-model="date_debut" required />
        <input class="form-control" type="date" v-model="date_fin" required />
        <button class="btn btn-outline-success" @click="refresh()">
          <i class="fa fa-check-circle" aria-hidden="true"></i>
        </button>
      </div>

      <div
        class="d-flex justify-content-end"
        v-for="(user, i) in users"
        :key="i"
      >
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
          <button class="btn btn-outline-danger"  v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1 &&  selection !=0" @click.prevent="multipleSup()">
            <i class="fa fa-trash-o cursor-pointer" aria-hidden="true"></i>
          </button>
      </div>
          <div class="row col-md-12 mt-2" v-if="choixNumber != 0">
            <div class="col-md-2"><input type="checkbox" checked/>Dates</div>
            <div class="col-md-2"><input type="checkbox" v-model="choix_acteur" @change="choiceActeur()"/>Fournisseurs</div>
            <div class="col-md-2"><input type="checkbox" v-model="choix_montant" @change="choiceMontant()"/>Montants Factures</div>
            <div class="col-md-2"><input type="checkbox" v-model="choix_rest" @change="choiceRest()"/>Restes à payer</div>
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
              <th v-if="choix_acteur == 1">Fournisseurs concernés</th>
              <th v-if="choix_montant == 1">Montants factures </th>
              <th v-if="choix_rest == 1">Montants restants à payer </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(result, i) in results" :key="i">
              <td v-if="selection != 0">
                <div class="form-check">
                  <input
                    type="checkbox"
                    v-model="checks"
                    @change="checkbox(result.id)"
                    :value="result.id"
                  />
                </div>
              </td>
              <td>{{ result.date_buy }}</td>
              <td v-if="choix_acteur == 1">{{ result.supplier.name }}</td>
              <td v-if="choix_montant == 1">{{ result.amount }}</td>
              <td v-if="choix_rest == 1">{{ result.rest }}</td>
              <td>
                <div
                  class="action d-flex aligns-items-center justify-content-center"
                  v-for="(user, i) in users"
                  :key="i"
                >
                  <NuxtLink
                    :to="'/achats/voir/' + result.id"
                    v-if="compagny == user.pivot.compagnie_id"
                    ><i
                      class="fa fa-info-circle text-success"
                      aria-hidden="true"
                    ></i
                  ></NuxtLink>
                  <NuxtLink
                    :to="'/achats/' + result.id"
                    v-if="
                      compagny == user.pivot.compagnie_id &&
                      user.pivot.droits_edition == 1
                    "
                    ><i class="fa fa-pencil-square-o" aria-hidden="true"></i
                  ></NuxtLink>
                  <div
                    @click="deleteAchat(result.id)"
                    v-if="
                      compagny == user.pivot.compagnie_id &&
                      user.pivot.droits_delete == 1
                    "
                  >
                    <i class="fa fa-trash-o text-danger" aria-hidden="true"></i>
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

      <div v-if="this.element_search == ''" class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th v-if="selection != 0"></th>
              <th>Date facture</th>
              <th v-if="choix_acteur == 1">Fournisseurs concernés</th>
              <th v-if="choix_montant == 1">Montants factures </th>
              <th v-if="choix_rest == 1">Montants restants à payer </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(achat, i) in achats" :key="i">
              <td v-if="selection != 0">
                <div class="form-check">
                  <input
                    type="checkbox"
                    v-model="checks"
                    @change="checkbox(achat.id)"
                    :value="achat.id"
                  />
                </div>
              </td>
              <td>{{ achat.date_buy }}</td>
              <td v-if="choix_acteur == 1">{{ achat.supplier.name }}</td>
              <td v-if="choix_montant == 1">{{ achat.amount }}</td>
              <td v-if="choix_rest == 1">{{ achat.rest }}</td>
              <td>
                <div
                  class="action d-flex aligns-items-center justify-content-center"
                  v-for="(user, i) in users"
                  :key="i"
                >
                  <NuxtLink
                    :to="'/achats/voir/' + achat.id"
                    v-if="compagny == user.pivot.compagnie_id"
                    ><i
                      class="fa fa-info-circle text-success"
                      aria-hidden="true"
                    ></i
                  ></NuxtLink>
                  <NuxtLink
                    :to="'/achats/' + achat.id"
                    v-if="
                      compagny == user.pivot.compagnie_id &&
                      user.pivot.droits_edition == 1
                    "
                    ><i class="fa fa-pencil-square-o" aria-hidden="true"></i
                  ></NuxtLink>
                  <div
                    @click="deleteAchat(achat.id)"
                    v-if="
                      compagny == user.pivot.compagnie_id &&
                      user.pivot.droits_delete == 1
                    "
                  >
                    <i class="fa fa-trash-o text-danger" aria-hidden="true"></i>
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
        <button
          class="btn btn-outline-dark mx-2"
          type="submit"
          @click.prevent="exp()"
          v-if="role == 'admin'"
        >
          <i class="fa fa-file-excel-o" aria-hidden="true"></i
          ><span class="text-ajout">Exporter en excel</span>
        </button>
        <button
          class="btn btn-outline-dark mx-2"
          type="submit"
          @click.prevent="pdf()"
        >
          <i class="fa fa-file-pdf-o" aria-hidden="true"></i
          ><span class="text-ajout">Exporter en pdf</span>
        </button>
      </form>
      <br /><br />

      <form action="">
        <div class="nombre d-flex col-md-2 my-4">
          <label class="title mx-3 my-2"><strong> Affichage:</strong></label>
          <select
            class="form-control"
            v-model="form.nombre"
            required
            @click.prevent="refresh()"
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </form>

      <nav
        aria-label="Page navigation example"
        class="d-flex nav"
        v-if="res_data != null"
      >
        <ul class="pagination">
          <li
            :class="
              res_data.prev_page_url == null
                ? 'page-item disabled'
                : 'page-item'
            "
          >
            <a class="page-link" @click="refresh(res_data.current_page - 1)"
              >Précédent</a
            >
          </li>
          <li
            class="page-item"
            v-for="(link, index) in res_data.links"
            :key="index"
          >
            <a
              :class="link.active == true ? 'page-link active' : 'page-link'"
              href="#"
              @click="refresh(link.label)"
              >{{ link.label }}</a
            >
          </li>

          <li
            :class="
              res_data.next_page_url == null
                ? 'page-item disabled'
                : 'page-item'
            "
          >
            <a class="page-link" @click="refresh(res_data.current_page + 1)"
              >Suivant</a
            >
          </li>
        </ul>
      </nav>
    </div>
    <br /><br />

    <voirAchat
      :date="identifiant1"
      :fournisseur="identifiant2"
      :montant="identifiant3"
      :facture="identifiant4"
      v-show="showModal"
      @close-modal="showModal = false"
    />
    <exportModal v-show="exportModal" @close-modal="exportModal = false" />
    <pdfModal v-show="pdfModal" @close-modal="pdfModal = false" />
    <deleteModal
      :identifiant="key"
      v-show="showModalDelete"
      @close-modal="showModalDelete = false"
      @conf="setMessage"
    />
    <deleteMultipleModal
      :ids="checks"
      v-show="showModalMultipleDelete"
      @close-modal="showModalMultipleDelete = false"
      @conf="setMessage"
    />
  </div>
</template>

<script>
import deleteMultipleModal from "./deleteMultipleModal.vue";
import pdfModal from "./pdfModal.vue";
import exportModal from "./exportModal.vue";
import deleteModal from "./deleteModal.vue";
import voirAchat from "./voir_achat.vue";
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
export default {
  auth: true,
  layout: "empty",
  components: {
    Sidebar,
    voirAchat,
    Userinfo,
    deleteModal,
    exportModal,
    pdfModal,
    deleteMultipleModal,
  },
  data() {
    return {
      links: [],
      res_data: null,
      showModal: false,
      exportModal: false,
      identifiant1: "",
      identifiant2: "",
      identifiant3: "",
      identifiant4: "",
      achats: [],
      achat: "",
      total: "",
      users: "",
      compagny: "",
      form: {
        nombre: 10,
      },
      key: "",
      showModalDelete: false,
      element_search: "",
      results: "",
      date_debut: "",
      date_fin: "",
      role: "",
      pdfModal: false,
      checks: [],
      selection: 0,
      showModalMultipleDelete: false,
      choixNumber: 0,
      choix_acteur: 1,
      choix_montant: 1,
      choix_rest:  1,
    }
  },

  methods: {

    choisir(){
      this.choixNumber = 1
    },

    fin(){
      this.choixNumber = 0
      // this.choice()
    },
    
    defaultActeur(){
        this.choix_acteur = localStorage.getItem('auth.choix_acteur')
        if(localStorage.getItem('auth.choix_acteur') == 1){
          this.choix_acteur = true
        }
        else{
          this.choix_acteur = false
        }
      },


      choiceActeur(){
          if(this.choix_acteur == true){
            this.choix_acteur = 1
            this.$auth.$storage.setUniversal('choix_acteur', this.choix_acteur)
            this.defaultActeur()
          }
          else{
            this.choix_acteur = 0
            this.$auth.$storage.setUniversal('choix_acteur', this.choix_acteur)
            this.defaultActeur()
          }
      },
      
      defaultMontant(){
        this.choix_montant = localStorage.getItem('auth.choix_montant')
        if(localStorage.getItem('auth.choix_montant') == 1){
          this.choix_montant = true
        }
        else{
          this.choix_montant = false
        }
      },

      choiceMontant(){
          if(this.choix_montant == true){
            this.choix_montant = 1
            this.$auth.$storage.setUniversal('choix_montant', this.choix_montant)
            this.defaultMontant()
          }
          else{
            this.choix_montant = 0
            this.$auth.$storage.setUniversal('choix_montant', this.choix_montant)
            this.defaultMontant()
          }
      },

      
      defaultRest(){
        this.choix_rest = localStorage.getItem('auth.choix_rest')
        if(localStorage.getItem('auth.choix_rest') == 1){
          this.choix_rest = true
        }
        else{
          this.choix_rest = false
        }
      },
      choiceRest(){
        if(this.choix_rest == true){
            this.choix_rest = 1
            this.$auth.$storage.setUniversal('choix_rest', this.choix_rest)
            this.defaultRest()
          }
          else{
            this.choix_rest = 0
            this.$auth.$storage.setUniversal('choix_rest', this.choix_rest)
            this.defaultRest()
          }
      },

      
    multipleSup(){
      this.showModalMultipleDelete = true
    },

    //afficher case à cocher
    selectionner() {
      this.selection = 1;
    },

    //fermer case à cocher
    deselectionner() {
      this.selection = 0;
      this.checks = [];
    },

    //modal d'exportation excel
    exp() {
      this.exportModal = true;
    },

    //modal d'exportation pdf
    pdf() {
      this.pdfModal = true;
    },

    //recherche dans la liste des factures
    search() {
      this.$axios
        .get("/buys", {
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


    //modal de suppression
    deleteAchat(id) {
      this.showModalDelete = true;
      this.key = id;
    },


    //recupère la liste des factures
    refresh(page = 1) {
      this.$axios
        .get("/buys", {
          params: {
            page: page,
            compagnie_id: localStorage.getItem("auth.company_id"),
            per_page: this.form.nombre,
            date_debut: this.date_debut,
            date_fin: this.date_fin,
          },
        })
        .then((response) => {
          this.achats = response.data.data.data;
          this.res_data = response.data.data;
          this.total = response.data.data.total;
          let firstE = response.data.data.links.shift();
          let lastE = response.data.data.links.splice(-1, 1);
        });
    },

    //recupère la liste des fournisseurs
    recupFournisseur() {
      this.$axios
        .get("/suppliers", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          this.fournisseurs = response.data.data.data;
        });
    },

    voirAchat(id) {
      this.showModal = true;
      this.$axios.get("/buys/" + id).then((response) => {
        this.identifiant1 = response.data.data[0].date_buy;
        this.identifiant2 = response.data.data[0].supplier_id;
        this.identifiant3 = response.data.data[0].amount;
        this.identifiant4 = response.data.data[0].id;
      });
    },

    //ajout des valeurs dans checks
    checkbox(id) {},


    //rappeler la fonction refresh après le modal
    setMessage() {
      this.refresh();
    },
  },

  async mounted() {
    this.refresh()
    this.defaultActeur()
    this.defaultMontant()
    this.defaultRest()
    this.recupFournisseur()
    this.users = this.$auth.$state.user.roles;
    this.compagny = localStorage.getItem("auth.company_id");
    this.role = localStorage.getItem("auth.roles");
  },
};
</script>

<style scoped>
.nav {
  overflow: auto;
}

.app-main__outer {
  overflow: none;
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

.fa {
  margin: 0 5px;
  font-size: 18px;
  cursor: pointer;
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
  background: linear-gradient(
    0deg,
    rgba(0, 172, 238, 1) 0%,
    rgba(2, 126, 251, 1) 100%
  );
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

@media screen and (max-width: 400px) {
  /* .action {
    padding: 20px 0;
  } */
}

@media screen and (max-width: 900px) {
  .range input {
    width: 45%;
  }

  .mobile-btn {
    display: block;
  }

  .web-btn {
    display: none;
  }
}
.range {
  margin: 30px 0;
}
</style>
