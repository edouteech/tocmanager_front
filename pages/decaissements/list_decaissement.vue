<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name">Décaissements</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <h4>Liste des décaissements</h4>
      <hr />
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
              Rechercher
            </button>
          </form>
        </div>
        <NuxtLink
          class="web-btn"
          to="/decaissements/decaissement"
          v-for="(user, i) in users"
          :key="i"
          ><button
            class="custom-btn btn-3"
            v-if="
              compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1
            "
          >
            <span>Remplir décaissement</span>
          </button></NuxtLink
        >
      </div>

      <div class="mobile-btn my-4">
        <NuxtLink
          to="/decaissements/decaissement"
          v-for="(user, i) in users"
          :key="i"
          ><button
            class="custom-btn btn-3"
            v-if="
              compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1
            "
          >
            <span>Remplir décaissement</span>
          </button></NuxtLink
        >
      </div>
      <div
        class="d-flex justify-content-end mt-3"
        v-for="(user, i) in users"
        :key="i"
      >
        <div v-if="selection == 0">
          <button class="btn btn-outline-info" @click.prevent="selectionner()">
            Sélectionner
          </button>
        </div>
        <div v-else>
          <button
            class="btn btn-outline-dark mx-3"
            @click.prevent="deselectionner()"
          >
            Annuler
          </button>
        </div>
        <button
          class="btn btn-outline-danger"
          v-if="
            compagny == user.pivot.compagnie_id &&
            user.pivot.droits_delete == 1 &&
            selection != 0
          "
          @click.prevent="multipleSup()"
        >
          <i class="fa fa-trash-o cursor-pointer" aria-hidden="true"></i>
        </button>
      </div>
      <div v-if="this.element_search != ''" class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th v-if="selection != 0"></th>
              <th>Dates de décaissement</th>
              <th>Montants</th>
              <th>Fournisseurs concernés</th>
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
              <td>{{ result.date }}</td>
              <td>{{ result.montant }}</td>
              <td>{{ result.supplier.name }}</td>
              <td>
                <div
                  class="action d-flex aligns-items-center justify-content-center"
                  v-for="(user, i) in users"
                  :key="i"
                >
                  <div
                    @click="voirDecaissement(result.id)"
                    v-if="compagny == user.pivot.compagnie_id"
                  >
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                  </div>
                  <NuxtLink
                    :to="'/decaissements/' + result.id"
                    v-if="
                      compagny == user.pivot.compagnie_id &&
                      user.pivot.droits_edition == 1
                    "
                    ><i class="fa fa-pencil-square-o" aria-hidden="true"></i
                  ></NuxtLink>
                  <div
                    @click="deleteDecaissement(result.id)"
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
          <strong>{{ total }} décaissement(s) au total </strong>
        </p>
        <hr class="text-primary" />
      </div>

      <div v-if="this.element_search == ''" class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr class="table-primary">
              <th v-if="selection != 0"></th>
              <th>Dates de décaissement</th>
              <th>Montants</th>
              <th>Fournisseurs concernés</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(decaissement, i) in decaissements" :key="i">
              <td v-if="selection != 0">
                <div class="form-check">
                  <input
                    type="checkbox"
                    v-model="checks"
                    @change="checkbox(decaissement.id)"
                    :value="decaissement.id"
                  />
                </div>
              </td>
              <td>{{ decaissement.date }}</td>
              <td>{{ decaissement.montant }}</td>
              <td>{{ decaissement.supplier.name }}</td>
              <td>
                <div
                  class="action d-flex aligns-items-center justify-content-center"
                  v-for="(user, i) in users"
                  :key="i"
                >
                  <div
                    @click="voirDecaissement(decaissement.id)"
                    v-if="compagny == user.pivot.compagnie_id"
                  >
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                  </div>
                  <NuxtLink
                    :to="'/decaissements/' + decaissement.id"
                    v-if="
                      compagny == user.pivot.compagnie_id &&
                      user.pivot.droits_edition == 1
                    "
                    ><i class="fa fa-pencil-square-o" aria-hidden="true"></i
                  ></NuxtLink>
                  <div
                    @click="deleteDecaissement(decaissement.id)"
                    v-if="
                      compagny == user.pivot.compagnie_id &&
                      user.pivot.droits_delete == 1
                    "
                  >
                    <i class="fa fa-trash-o text-danger" aria-hidden="true"></i>
                  </div>
                  <NuxtLink
                    :to="'/achats/voir/' + decaissement.buy_id"
                    v-b-tooltip.hover
                    title="Accéder à la facture"
                    v-if="
                      compagny == user.pivot.compagnie_id && decaissement.buy_id
                    "
                    ><i class="fa fa-eye text-success" aria-hidden="true"></i
                  ></NuxtLink>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-center">
          <strong>{{ total }} décaissement(s) au total </strong>
        </p>
        <hr class="text-primary" />
      </div>
      <br /><br />

      <form class="btn-group justify-content-end" role="search">
        <input type="file" id="file" ref="file" @change="handleFileUpload()" />
        <button
          class="btn btn-outline-success web-btn"
          type="submit"
          @click.prevent="submitFile()"
        >
          Importer
        </button>
        <button
          class="btn btn-outline-dark mx-2 web-btn"
          type="submit"
          @click.prevent="pdf()"
        >
          Exporter en pdf
        </button>
        <button
          class="btn btn-outline-dark mx-2 web-btn"
          type="submit"
          @click.prevent="exporte()"
          v-if="role == 'admin'"
        >
          Exporter en excel
        </button>

        <div class="d-flex mt-4">
          <button
            class="btn btn-outline-success mobile-btn"
            type="submit"
            @click.prevent="submitFile()"
            title="Importer fichier"
          >
            <i class="fa fa-upload" aria-hidden="true"></i>
          </button>

          <button
            class="btn btn-outline-dark mx-2 mobile-btn"
            type="submit"
            @click.prevent="pdf()"
            title="Exporter en pdf"
          >
            <i class="fa fa-file-pdf-o" aria-hidden="true"></i>
          </button>

          <button
            class="btn btn-outline-dark mx-2 mobile-btn"
            type="submit"
            @click.prevent="exporte()"
            v-if="role == 'admin'"
            title="Exporter en excel"
          >
            <i class="fa fa-file-excel-o" aria-hidden="true"></i>
          </button>
        </div>
      </form>
      <br />

      <form action="">
        <div class="nombre d-flex col-md-2 my-4">
          <label class="title mx-2 my-2"><strong> Affichage:</strong></label>
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
        aria-label="Page navigation example "
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
    <br />
    <voirDecaissement
      :montant="identifiant1"
      :date="identifiant2"
      :supplier_id="identifiant3"
      v-show="showModal"
      @close-modal="showModal = false"
    />
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
import moment from "moment";
import pdfModal from "./pdfModal.vue";
import deleteModal from "./deleteModal.vue";
import exportModal from "./exportModal.vue";
import voirDecaissement from "./voir_decaissement.vue";
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
import deleteMultipleModal from "./deleteMultipleModal.vue";
export default {
  layout: "empty",
  auth: true,
  components: {
    Sidebar,
    voirDecaissement,
    Userinfo,
    deleteModal,
    exportModal,
    pdfModal,
    deleteMultipleModal,
  },
  data() {
    return {
      links: [],
      file: "",
      res_data: null,
      showModal: false,
      identifiant1: "",
      identifiant2: "",
      identifiant3: "",
      compagnie_id: "",
      decaissements: [],
      decaissement: "",
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
      expotModal: false,
      pdfModal: false,
      role: "",
      checks: [],
      selection: 0,
      showModalMultipleDelete: false,
    };
  },

  mounted() {
    this.refresh();
    this.users = this.$auth.$state.user.roles;
    this.compagny = localStorage.getItem("auth.company_id");
    this.role = localStorage.getItem("auth.roles");
  },

  methods: {
    //modal de confirmation de suppression multiple
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

    //modal d'exportation en excel
    exporte() {
      this.expotModal = true;
    },

    //modal d'exportation en pdf
    pdf() {
      this.pdfModal = true;
    },

    //import importation de décaissements
    submitFile() {
      let formData = new FormData();
      formData.append("fichier", this.file);

      this.$axios
        .post("/decaissements/import", formData, {
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
          }
        });
    },

    //recherche des décaissements dans la liste des décaissements
    search() {
      this.$axios
        .get("/decaissements", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            search: this.element_search,
          },
        })
        .then((response) => {
          this.results = response.data.data.data;
          this.total = response.data.data.total;
        });
    },

    //modal de confirmation de suppression
    deleteDecaissement(id) {
      this.showModalDelete = true;
      this.key = id;
    },

    //rappel de la fonction refresh après le modal
    setMessage() {
      this.refresh();
    },

    //ajout des valeurs dans checks
    checkbox(id) {},


    //récupère la liste des décaissements
    refresh(page = 1) {
      this.$axios
        .get("/decaissements", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            page: page,
            per_page: this.form.nombre,
          },
        })
        .then((response) => {
          this.decaissements = response.data.data.data;
          this.res_data = response.data.data;
          this.total = response.data.data.total;
          let firstE = response.data.data.links.shift();
          let lastE = response.data.data.links.splice(-1, 1);
        });
    },

    //voir les infos de décaissement
    voirDecaissement(id) {
      this.showModal = true;
      this.$axios
        .get("/decaissements/" + id, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          this.identifiant1 = response.data.data[0].montant;
          this.identifiant2 = moment(response.data.data[0].date).format(
            "D-MM-YYYY"
          );
          this.identifiant3 = response.data.data[0].supplier.name;
        });
    },
  },
};
</script>

<style scoped>
.nav {
  overflow: auto;
}

.btn-group {
  display: flex;
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
