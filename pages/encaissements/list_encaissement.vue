<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name">Encaissements</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <div class="row">
        <div class="col-md-10">
          <h4>Liste des encaissements</h4>
        </div>
        <div class="col-md-2 d-flex justify-content-end" v-for="(user, i) in users" :key="i">
          <button class="btn btn-info py-2" @click.prevent="add()"
            v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1">
            <i class="fa fa-plus" aria-hidden="true"></i>
            <b>AJOUTER</b>
          </button>
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
        <!-- <NuxtLink to="/encaissements/encaissement" v-for="(user, i) in users" :key="i" class="web-btn"><button
            class="custom-btn btn-3" v-if="
              compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1
            ">
            <span>Remplir encaissement</span>
          </button></NuxtLink> -->
        <div class="col-md-6 d-flex justify-content-end mt-3 btn-mobile" v-for="(user, i) in users" :key="i">
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
          <button class="btn btn-outline-danger" v-if="
            compagny == user.pivot.compagnie_id &&
            user.pivot.droits_delete == 1 &&
            selection != 0
          " @click.prevent="multipleSup()">
            <i class="fa fa-trash-o cursor-pointer" aria-hidden="true"></i>
          </button>
        </div>
      </div>

      <!-- <div class="mobile-btn my-4">
        <NuxtLink to="/encaissements/encaissement" v-for="(user, i) in users" :key="i"><button class="custom-btn btn-3"
            v-if="
              compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1
            ">
            <span>Remplir encaissement</span>
          </button></NuxtLink>
      </div> -->



      <div v-if="this.element_search != ''" class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr class="table">
              <th v-if="selection != 0"></th>
              <th>DATES</th>
              <th>MONTANTS</th>
              <th>CLIENTS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(result, i) in results" :key="i">
              <td v-if="selection != 0">
                <div class="form-check">
                  <input type="checkbox" v-model="checks" @change="checkbox(result.id)" :value="result.id" />
                </div>
              </td>
              <td>{{ result.date }}</td>
              <td>{{ result.montant }}</td>
              <td>{{ result.client.name }}</td>
              <td>
                <div class="action d-flex aligns-items-center justify-content-center" v-for="(user, i) in users" :key="i">
                  <div @click="voirEncaissement(result.id)" v-if="compagny == user.pivot.compagnie_id">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                  </div>
                  <NuxtLink :to="'/encaissements/' + result.id" v-if="
                    compagny == user.pivot.compagnie_id &&
                    user.pivot.droits_edition == 1
                  "><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                  <div @click="deleteEncaissement(result.id)" v-if="
                    compagny == user.pivot.compagnie_id &&
                    user.pivot.droits_delete == 1
                  ">
                    <i class="fa fa-trash-o text-danger" aria-hidden="true"></i>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-center">
          <strong>{{ total }} encaissements au total </strong>
        </p>
        <hr class="text-primary" />
      </div>

      <div v-if="this.element_search == ''" class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr class="table">
              <th v-if="selection != 0"></th>
              <th>DATES</th>
              <th>MONTANTS</th>
              <th>CLIENTS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(encaissement, i) in encaissements" :key="i">
              <td v-if="selection != 0">
                <div class="form-check">
                  <input type="checkbox" v-model="checks" @change="checkbox(encaissement.id)" :value="encaissement.id" />
                </div>
              </td>
              <td>{{ encaissement.date }}</td>
              <td>{{ encaissement.montant }}</td>
              <td>{{ encaissement.client.name }}</td>
              <td>
                <div class="action d-flex aligns-items-center justify-content-center" v-for="(user, i) in users" :key="i">
                  <div @click="voirEncaissement(encaissement.id)" v-if="compagny == user.pivot.compagnie_id">
                    <i class="fa fa-info-circle" aria-hidden="true"></i>
                  </div>
                  <NuxtLink :to="'/encaissements/' + encaissement.id" v-if="
                    compagny == user.pivot.compagnie_id &&
                    user.pivot.droits_edition == 1
                  "><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                  <div @click="deleteEncaissement(encaissement.id)" v-if="
                    compagny == user.pivot.compagnie_id &&
                    user.pivot.droits_delete == 1
                  ">
                    <i class="fa fa-trash-o text-danger" aria-hidden="true"></i>
                  </div>
                  <NuxtLink :to="'/ventes/voir/' + encaissement.sell_id" v-b-tooltip.hover title="Accéder à la facture"
                    v-if="
                      compagny == user.pivot.compagnie_id &&
                      encaissement.sell_id
                    "><i class="fa fa-eye text-success" aria-hidden="true"></i></NuxtLink>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-center">
          <strong>{{ total }} encaissements au total </strong>
        </p>
        <hr class="text-primary" />
      </div>

      <form action="">
        <div class="nombre d-flex col-md-2 my-4 mx-auto">
          <label class="title mx-2 my-2"><strong> Affichage:</strong></label>
          <select class="form-control" v-model="form.nombre" required @click.prevent="refresh()">
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </form>
      <nav aria-label="Page navigation example " class="d-flex justify-content-center nav" v-if="res_data != null">
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

      <div class="col-md-10 section mx-auto">
        <form class="btn-group justify-content-end" role="search">
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
    </div>
    <br />
    <voirEncaissement :montant="identifiant1" :date="identifiant2" :client_id="identifiant3" v-show="showModal"
      @close-modal="showModal = false" />
    <deleteMultipleModal :ids="checks" v-show="showModalMultipleDelete" @close-modal="showModalMultipleDelete = false"
      @conf="setMessage" />
    <deleteModal :identifiant="key" v-show="showModalDelete" @close-modal="showModalDelete = false" @conf="setMessage" />
    <exportModal v-show="exportModal" @close-modal="exportModal = false" />
    <pdfModal v-show="pdfModal" @close-modal="pdfModal = false" />
    <addEncaissementModal v-show="addModal" @close-modal="addModal = false" @conf="setMessage" />
  </div>
</template>

<script>
import moment from "moment";
import voirEncaissement from "./voir_encaissement.vue";
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
import deleteModal from "./deleteModal.vue";
import exportModal from "./exportModal.vue";
import pdfModal from "./pdfModal.vue";
import deleteMultipleModal from "./deleteMultipleModal.vue";
import addEncaissementModal from './addEncaissementModal.vue'
export default {
  layout: "empty",
  auth: true,
  components: {
    Sidebar,
    voirEncaissement,
    Userinfo,
    deleteModal,
    exportModal,
    pdfModal,
    deleteMultipleModal,
    addEncaissementModal,
  },
  data() {
    return {
      file: "",
      links: [],
      res_data: null,
      showModal: false,
      identifiant1: "",
      identifiant2: "",
      identifiant3: "",
      compagnie_id: "",
      encaissements: [],
      encaissement: "",
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
      exportModal: false,
      pdfModal: false,
      role: "",
      checks: [],
      selection: 0,
      showModalMultipleDelete: false,
      addModal: false
    };
  },

  async mounted() {
    this.refresh();
    this.users = this.$auth.$state.user.roles;
    this.compagny = localStorage.getItem("auth.company_id");
    this.role = localStorage.getItem("auth.roles");
  },

  methods: {

    //modal d'ajout
    add() {
      this.addModal = true
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

    //modal d'exportation excel
    exp() {
      this.exportModal = true;
    },

    //modal d'exportation pdf
    pdf() {
      this.pdfModal = true;
    },

    //importation des encaissements
    submitFile() {
      let formData = new FormData();
      formData.append("fichier", this.file);

      this.$axios
        .post("/encaissements/import", formData, {
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

    //recherche des encaissements
    search() {
      this.$axios
        .get("/encaissements", {
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

    //modal de suppression
    deleteEncaissement(id) {
      this.showModalDelete = true;
      this.key = id;
    },

    //rappel de la fonction refresh après le modal
    setMessage() {
      this.refresh();
    },

    //liste des encaissements
    refresh(page = 1) {
      this.$axios
        .get("/encaissements", {
          params: {
            page: page,
            compagnie_id: localStorage.getItem("auth.company_id"),
            per_page: this.form.nombre,
          },
        })
        .then((response) => {
          this.encaissements = response.data.data.data;
          this.res_data = response.data.data;
          this.total = response.data.data.total;
          let firstE = response.data.data.links.shift();
          let lastE = response.data.data.links.splice(-1, 1);
        });
    },

    //ajout des valeurs dans checks
    checkbox(id) { },


    //détails de l'encaissement
    voirEncaissement(id) {
      this.showModal = true;
      this.$axios
        .get("/encaissements/" + id, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          this.identifiant1 = response.data.data[0].montant;
          this.identifiant2 = moment(response.data.data[0].date).format(
            "YYYY-MM-D"
          );
          this.identifiant3 = response.data.data[0].client.name;
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

.table th {
  padding: 20px 0;
}

thead tr {
  background-color: transparent;
}

tbody td {
  padding: 15px 0;
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

@media screen and (max-width: 900px) {
  /* .btn_recherche{
    display:none;
  } */

  .btn-mobile {
    margin: 30px 0;
  }


  .table th {
    padding: 20px;
  }

  tbody td {
    padding: 15px;
  }
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
