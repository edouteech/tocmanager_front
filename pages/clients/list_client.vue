<template >
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Clients</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <div class="row">
        <div class="col-md-10">
          <h4>Liste des clients</h4>
        </div>
        <div class="col-md-2 d-flex justify-content-end" v-for="(user, i) in users" :key="i">
          <button class="btn btn-info py-2" @click.prevent="addClient()"
            v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1">
            <i class="fa fa-plus" aria-hidden="true"></i>
            <b>Nouveau</b>
          </button>
        </div>
      </div>
      <hr />
      <!-- <div class="alert alert-danger justify-content-center" role="alert" v-if="error">
        {{ error }}
      </div> -->
      <div class="row">
        <div class="col-md-6">
          <form role="search">
            <label class="search-input">
              <i class="fa fa-search"></i>
              <input class="form-control me-2" type="search" placeholder="Recherche..." v-model="element_search"
                @input="search()" aria-label="Search">
            </label>
            <!-- <input
              class="form-control me-2"
              type="search"
              placeholder="<i class='fa fa-search'></i> Recherche..."
              v-model="element_search"
              @input="search()"
              aria-label="Search"
            /> -->
            <!-- <button
              class="btn btn-outline-success btn_recherche"
              type="submit"
              @click.prevent="search()"
            >
              Rechercher
            </button> -->
          </form>
        </div>
        <!-- <NuxtLink to="/clients/add_client" v-for="(user, i) in users" :key="i" class="web-btn"><button
            class="custom-btn btn-3" v-if="
              compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1
            ">
            <span>Ajouter nouveau client</span>
          </button></NuxtLink> -->
        <!-- <div class="mobile-btn my-4">
        <NuxtLink to="/clients/add_client" v-for="(user, i) in users" :key="i"><button class="custom-btn btn-3" v-if="
          compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1
        ">
            <span>Ajouter nouveau client</span>
          </button></NuxtLink>
      </div> -->

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
            <div v-if="defaultNum != 0">
              <button class="btn btn-outline-dark mx-3" @click.prevent="chooseDefaultClient()">
                Choisir commme client par défaut
              </button>
            </div>
            <button class="btn btn-outline-danger"  v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1 &&  selection !=0" @click.prevent="multipleSup()">
              <i class="fa fa-trash-o cursor-pointer" aria-hidden="true"></i>
            </button>
        </div>
          <div class="row col-md-12 mt-2" v-if="choixNumber != 0">
            <div class="col-md-2"><input type="checkbox" checked/>Noms</div>
            <div class="col-md-2"><input type="checkbox" v-model="choix_phone" @change="choicePhone()"/>Téléphone</div>
            <div class="col-md-2"><input type="checkbox" v-model="choix_email" @change="choiceEmail()"/>Emails</div>
            <div class="col-md-2"><input type="checkbox" v-model="choix_balance" @change="choiceBalance()"/>Balance</div>
            <div class="col-md-2"><input type="checkbox" v-model="choix_nature" @change="choiceNature()"/>Nature</div>
            <!-- <div><input type="checkbox" v-model="choix_name"/></div>
            <div><input type="checkbox" v-model="choix_name"/></div> -->
          </div>
      </div>
      <div class="table-responsive search_result" v-if="this.element_search != ''">
        <table class="table table-hover">
          <thead>
            <tr class="table">
              <th v-if="selection != 0"></th>
              <th>NOMS</th>
              <th v-if="choix_phone == 1">TELEPHONE</th>
              <th v-if="choix_email == 1">EMAILS</th>
              <th v-if="choix_balance == 1">BALANCE</th>
              <th v-if="choix_nature == 1">NATURE</th>
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
              <td>
                {{ result.name
                }}<span v-if="result.default_client == true"><i class="fa fa-star text-success mx-3 cursor-pointer"
                    aria-hidden="true" title="Démettre du fournisseur par défaut"
                    @click.prevent="supDefaultClient(result.id)"></i></span>
              </td>
              <td v-if="choix_phone == 1">{{ result.phone }}</td>
              <td v-if="choix_email == 1">{{ result.email }}</td>
              <td class="text-danger" v-if="choix_balance == 1">{{ result.balance }}</td>
              <td v-if="choix_nature == 1">{{ result.nature }}</td>
              <td>
                <div class="action d-flex aligns-items-center justify-content-center" v-for="(user, i) in users" :key="i">
                  <div @click="voirClient(result.id)" v-if="compagny == user.pivot.compagnie_id">
                    <i class="fa fa-info-circle text-warning" aria-hidden="true"></i>
                  </div>
                  <NuxtLink :to="'/clients/' + result.id" v-if="
                    compagny == user.pivot.compagnie_id &&
                    user.pivot.droits_edition == 1
                  "><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                  <div class="cursor-pointer" v-b-tooltip.hover title="Télécharger l'état de commande"
                    @click="stockExporte(result)" v-if="compagny == user.pivot.compagnie_id">
                    <i class="fa fa-download" aria-hidden="true"></i>
                  </div>
                  <div>
                    <a :href="
                      'https://api.whatsapp.com/send?phone=' +
                      result.phone +
                      '&text=Salut%0AJe%20souhaite%20en%20savoir%20plus%20sur%20votre%20offre%20d%27emploi!'
                    "><i class="fa-brands fa-whatsapp fa text-success"></i></a>
                  </div>
                  <div @click="deleteClient(result.id)" v-if="
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
      </div>

      <div class="table-responsive">
        <table class="table table-hover" v-if="this.element_search == ''">
          <thead>
            <tr class="table">
              <th v-if="selection != 0"></th>
              <th>NOMS</th>
              <th v-if="choix_phone == 1">TELEPHONE</th>
              <th v-if="choix_email == 1">EMAILS</th>
              <th v-if="choix_balance == 1">BALANCE</th>
              <th v-if="choix_nature == 1">NATURE</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(client, i) in clients" :key="i">
              <td v-if="selection != 0">
                <div class="form-check">
                  <input type="checkbox" v-model="checks" @change="checkbox(client.id)" :value="client.id" />
                </div>
              </td>
              <td>
                {{ client.name
                }}<span v-if="client.default_client == true"><i class="fa fa-star text-success mx-3 cursor-pointer"
                    aria-hidden="true" title="Démettre du client par défaut"
                    @click.prevent="supDefaultClient(client.id)"></i></span>
              </td>
              <td v-if="choix_phone == 1">{{ client.phone }}</td>
              <td v-if="choix_email == 1">{{ client.email }}</td>
              <td class="text-danger" v-if="choix_balance == 1">{{ client.balance }}</td>
              <td v-if="choix_nature == 1">{{ client.nature }}</td>
              <td>
                <div class="action d-flex aligns-items-center justify-content-center" v-for="(user, i) in users" :key="i">
                  <div @click="voirClient(client.id)" v-if="compagny == user.pivot.compagnie_id">
                    <i class="fa fa-info-circle text-warning" aria-hidden="true"></i>
                  </div>
                  <NuxtLink :to="'/clients/' + client.id" v-if="
                    compagny == user.pivot.compagnie_id &&
                    user.pivot.droits_edition == 1
                  "><i class="fa fa-pencil-square-o" aria-hidden="true"></i></NuxtLink>
                  <div class="cursor-pointer" v-b-tooltip.hover title="Télécharger l'état de commande"
                    @click="stockExporte(client)" v-if="compagny == user.pivot.compagnie_id">
                    <i class="fa fa-download" aria-hidden="true"></i>
                  </div>
                  <div>
                    <a :href="
                      'https://api.whatsapp.com/send?phone=' +
                      client.phone +
                      '&text=Salut%0AJe%20souhaite%20en%20savoir%20plus%20sur%20votre%20offre%20d%27emploi!'
                    "><i class="fa-brands fa-whatsapp fa text-success"></i></a>
                  </div>
                  <div @click="deleteClient(client.id)" v-if="
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
          <strong>{{ total }} client(s) au total </strong>
        </p>
        <hr class="text-primary" />
      </div>
      <div class="d-flex  col-md-2 my-4 mx-auto">
        <label class="title mt-2">Affichage :</label>
        <form action="">
          <div class="nombre">
            <select class="form-control" v-model="form.nombre" required @click.prevent="refresh()">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </form>
      </div>
      <nav class="page nav d-flex justify-content-center" aria-label="Page navigation example px-8"
        v-if="res_data != null">
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
      <div class="section col-md-10 mx-auto">
        <form class="btn-group" role="search">
          <input type="file" id="file" ref="file" @change="handleFileUpload()" />
          <button class="btn btn-outline-success web-btn" type="submit" @click.prevent="submitFile()">
            Importer
          </button>
          <button class="btn btn-outline-dark mx-2 web-btn" type="submit" @click.prevent="pdf()">
            Exporter en pdf
          </button>
          <button class="btn btn-outline-dark mx-2 web-btn" type="submit" @click.prevent="exporte()"
            v-if="role == 'admin'">
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

            <button class="btn btn-outline-dark mx-2 mobile-btn" type="submit" @click.prevent="exporte()"
              v-if="role == 'admin'" title="Exporter en excel">
              <i class="fa fa-file-excel-o" aria-hidden="true"></i>
            </button>
          </div>
        </form>
      </div>
      <br />
      <br />
    </div>
    <stockModal :cli="id_cli" :cli_name="nom_cli" v-show="stockModal" @close-modal="stockModal = false" />
    <voirClient :nom="identifiant1" :phone="identifiant2" :email="identifiant3" :balance="identifiant5"
      :nature="identifiant4" :type="type_client" :seuil="seuil_client" v-show="showModal"
      @close-modal="showModal = false" />
    <exportModal v-show="exportModal" @close-modal="exportModal = false" />
    <deleteMultipleModal :ids="checks" v-show="showModalMultipleDelete" @close-modal="showModalMultipleDelete = false"
      @conf="setMessage" />
    <deleteModal :identifiant="key" v-show="showModalDelete" @close-modal="showModalDelete = false" @conf="setMessage" />

    <addClientModal v-show="addModal" @close-modal="addModal = false" @conf="setMessage" />
  </div>
</template>

<script>
import stockModal from "./stockModal.vue";
import voirClient from "./voir_client.vue";
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
import deleteModal from "./deleteModal.vue";
import exportModal from "./exportModal.vue";
import deleteMultipleModal from "./deleteMultipleModal.vue";
import addClientModal from './addClientModal.vue'
export default {
  layout: "empty",
  auth: true,
  components: {
    Sidebar,
    voirClient,
    Userinfo,
    deleteModal,
    exportModal,
    stockModal,
    deleteMultipleModal,
    addClientModal,
  },
  data() {
    return {
      error: null,
      total: "",
      file: "",
      res_data: null,
      element_search: "",
      results: "",
      showModal: false,
      identifiant1: "",
      identifiant2: "",
      identifiant3: "",
      identifiant4: "",
      identifiant5: "",
      type_client: "",
      seuil_client: "",
      compagnie_id: "",
      clients: [],
      client: "",
      users: "",
      compagny: "",
      form: {
        nombre: 10,
      },
      key: "",
      showModalDelete: false,
      exportModal: false,
      role: "",
      id_cli: "",
      nom_cli: "",
      stockModal: false,
      checks: [],
      selection: 0,
      showModalMultipleDelete: false,
      defaultNum: 0,
      addModal: false,
        choixNumber: 0,
        choix_name: '',
        choix_phone: 1,
        choix_email:  1,
        choix_balance: 1,
        choix_nature: 1
    };
  },

  async mounted() {
      await this.exp()
      this.defaultPhone()
      this.defaultEmail()
      this.defaultBalance()
      this.defaultNature()
      this.refresh()
      this.users = this.$auth.$state.user.roles;
      this.compagny = localStorage.getItem('auth.company_id');
      this.role = localStorage.getItem('auth.roles');
  },

  methods: {
    choisir(){
        this.choixNumber = 1
      },

      fin(){
        this.choixNumber = 0
      },

      defaultPhone(){
        this.choix_phone = localStorage.getItem('auth.choix_phone')
        if(localStorage.getItem('auth.choix_phone') == 1){
          this.choix_phone = true
        }
        else{
          this.choix_phone = false
        }
      },


      choicePhone(){
          if(this.choix_phone == true){
            this.choix_phone = 1
            this.$auth.$storage.setUniversal('choix_phone', this.choix_phone)
            this.defaultPhone()
          }
          else{
            this.choix_phone = 0
            this.$auth.$storage.setUniversal('choix_phone', this.choix_phone)
            this.defaultPhone()
          }
      },
      
      defaultEmail(){
        this.choix_email = localStorage.getItem('auth.choix_email')
        if(localStorage.getItem('auth.choix_email') == 1){
          this.choix_email = true
        }
        else{
          this.choix_email = false
        }
      },

      choiceEmail(){
          if(this.choix_email == true){
            this.choix_email = 1
            this.$auth.$storage.setUniversal('choix_email', this.choix_email)
            this.defaultEmail()
          }
          else{
            this.choix_email = 0
            this.$auth.$storage.setUniversal('choix_email', this.choix_email)
            this.defaultEmail()
          }
      },

      
      defaultBalance(){
        this.choix_balance = localStorage.getItem('auth.choix_balance')
        if(localStorage.getItem('auth.choix_balance') == 1){
          this.choix_balance = true
        }
        else{
          this.choix_balance = false
        }
      },
      choiceBalance(){
        if(this.choix_balance == true){
            this.choix_balance = 1
            this.$auth.$storage.setUniversal('choix_balance', this.choix_balance)
            this.defaultBalance()
          }
          else{
            this.choix_balance = 0
            this.$auth.$storage.setUniversal('choix_balance', this.choix_balance)
            this.defaultBalance()
          }
      },

      
      defaultNature(){
        this.choix_nature = localStorage.getItem('auth.choix_nature')
        if(localStorage.getItem('auth.choix_nature') == 1){
          this.choix_nature = true
        }
        else{
          this.choix_nature = false
        }
      },
      choiceNature(){
          if(this.choix_nature == true){
            this.choix_nature = 1
            this.$auth.$storage.setUniversal('choix_nature', this.choix_nature)
            this.defaultNature()
          }
          else{
            this.choix_nature = 0
            this.$auth.$storage.setUniversal('choix_nature', this.choix_nature)
            this.defaultNature()
          }
        
      },


      choice(){
          // this.$auth.$storage.setUniversal('choix_name', this.choix_name)
          this.choicePhone()
          this.choiceEmail()
          this.choiceBalance()
          this.choiceNature()
      },

    //ajouter un client
    addClient() {
      this.addModal = true
    },

    //choisir un client par défaut
    chooseDefaultClient() {
      if (this.checks.length == "1") {
        let default_cli = this.checks[0];
        this.$axios
          .put("/clients/" + default_cli + "/default", {
            compagnie_id: localStorage.getItem("auth.company_id"),
          })
          .then((response) => {
            if (response.data.status == "success") {
              this.selection = 0;
              this.defaultNum = 0;
              this.checks = [];
              this.refresh();
              this.$toast("Client par défaut choisi avec succès !!!", {
                icon: "fa fa-check-circle",
              });
            } else {
              this.error = response.data.message;
              this.$toast.error(this.error, {
                icon: "fa fa-times-circle",
              });
            }
          });
      } else {
        this.error =
          "Vous ne pouvez que sélectionner qu'un seul client par défaut";
        this.$toast.error(this.error, {
          icon: "fa fa-times-circle",
        });
      }
    },

    //démettre le client par défaut
    supDefaultClient(default_client) {
      this.$axios
        .put("/clients/" + default_client + "/default/unset", {
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.refresh();
            this.$toast("Client par défaut supprimé avec succès !!!", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.error = response.data.message;

            this.$toast.error(this.error, {
              icon: "fa fa-times-circle",
            });
          }
        });
    },

    //modal de confirmation pour suppression multiple
    multipleSup() {
      this.showModalMultipleDelete = true;
    },

    //afficher les cases à cocher
    selectionner() {
      this.selection = 1;
      this.defaultNum = 1;
    },

    //fermer les cases à cocher
    deselectionner() {
      this.selection = 0;
      this.defaultNum = 0;
      this.checks = [];
    },

    //modal d'exportation en excel
    exporte() {
      this.exportModal = true;
    },

    //modal d'exportation de la fiche de stock
    stockExporte(client) {
      (this.stockModal = true), (this.id_cli = client.id);
      this.nom_cli = client.name;
    },

    //exportation en pdf
    pdf() {
      this.$axios
        .get("/clients/download", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            start_at: this.form.date_debut,
            end_at: this.form.date_fin,
          },
          responseType: "blob",
          Accept: "application/pdf",
        })
        .then((response) => {
          const url = window.URL.createObjectURL(
            new Blob([response.data], { type: "application/pdf" })
          );
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "clients.pdf");
          document.body.appendChild(link);
          link.click();
          this.$toast("Téléchargement", {
            icon: "fa fa-check-circle",
          });
          this.$emit("close-modal");
        });
    },

    //récupère la liste des clients dans data
    async exp() {
      await this.$axios
        .get("/clients", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            is_paginated: 0,
          },
        })
        .then((response) => {
          this.data = response.data.data;
        });
    },

    //ajout des valeurs dans checks
    checkbox(id) { },


    //importation des clients
    submitFile() {
      let formData = new FormData();
      formData.append("fichier", this.file);

      this.$axios
        .post("/clients/import", formData, {
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

    //recherche dans la liste de client
    search() {
      this.$axios
        .get("/clients", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            search: this.element_search,
          },
        })
        .then((response) => {
          this.results = response.data.data.data;
          this.total = response.data.data.total;
          this.res_data = response.data.data;
          let firstE = response.data.data.links.shift();
          let lastE = response.data.data.links.splice(-1, 1);
        });
    },

    //modal de confirmation pour suppression
    deleteClient(id) {
      this.showModalDelete = true;
      this.key = id;
    },

    //rappeler la fonction refresh après le modal
    setMessage() {
      this.refresh();
    },

    //liste de tous les clients
    refresh(page = 1) {
      this.$axios
        .get("/clients", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            page: page,
            per_page: this.form.nombre,
          },
        })
        .then((response) => {
          this.clients = response.data.data.data;
          this.total = response.data.data.total;
          this.res_data = response.data.data;
          let firstE = response.data.data.links.shift();
          let lastE = response.data.data.links.splice(-1, 1);
        });
    },

    //voir les informations du client
    voirClient(id) {
      this.showModal = true;
      this.$axios
        .get("/clients/" + id, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          this.identifiant1 = response.data.data[0].name;
          this.identifiant2 = response.data.data[0].phone;
          this.identifiant3 = response.data.data[0].email;
          this.identifiant4 = response.data.data[0].nature;
          this.identifiant5 = response.data.data[0].balance;
          this.type_client = response.data.data[0].type_client;
          this.seuil_client = response.data.data[0].seuil_max;
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

.page {
  display: flex;
}

.nombre {
  margin: 0;
}

.title {
  margin: 0.5% 2% 0 10%;
  font-weight: bold;
}

.bas-page img {
  width: 45px;
  border: 1px solid transparent;
  border-radius: 100%;
  cursor: pointer;
}

.bas-page .user_name {
  font-size: 12px;
  padding: 10px;
  color: rgb(246, 245, 245);
  font-weight: bold;
}

.app-main__outer {
  overflow: none;
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
}</style>
