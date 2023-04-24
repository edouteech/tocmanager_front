<template >
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Devis</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <h4>Liste des devis enregistrés</h4>
      <hr />
      <br />
      <div
        class="alert alert-danger justify-content-center"
        role="alert"
        v-if="error"
      >
        {{ error }}
      </div>
      <br />
      <div class="d-flex">
        <NuxtLink
          to="/devis/devis"
          v-for="(user, i) in users"
          :key="i"
          class="web-btn"
          ><button
            class="custom-btn btn-3"
            v-if="
              compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1
            "
          >
            <span>Ajouter nouveau devis</span>
          </button></NuxtLink
        >
      </div>
      <div class="mobile-btn my-4">
        <NuxtLink to="/devis/devis" v-for="(user, i) in users" :key="i"
          ><button
            class="custom-btn btn-3"
            v-if="
              compagny == user.pivot.compagnie_id && user.pivot.droits_add == 1
            "
          >
            <span>Ajouter nouveau devis</span>
          </button></NuxtLink
        >
      </div>
      <div class="table-responsive">
        <table class="table table-hover" v-if="this.element_search == ''">
          <thead>
            <tr class="table-primary">
              <!-- <th v-if="selection != 0"></th> -->
              <th>Dates d'édition</th>
              <th>Clients</th>
              <th>Montants HT</th>
              <th>Montants TTC</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(devi, i) in devis" :key="i">
              <!-- <td v-if="selection != 0"><div class="form-check"><input type="checkbox" v-model="checks" @change="checkbox(devi.id)" :value="devi.id"/></div></td> -->
              <td>{{ devi.date_devis }}</td>
              <td>{{ devi.client.name }}</td>
              <td>{{ devi.amount_ht }}</td>
              <td>{{ devi.amount_ttc }}</td>
              <td>
                <div
                  class="action d-flex aligns-items-center justify-content-center"
                  v-for="(user, i) in users"
                  :key="i"
                >
                  <NuxtLink
                    :to="'/devis/voir/' + devi.id"
                    v-if="compagny == user.pivot.compagnie_id"
                    ><i
                      class="fa fa-info-circle text-info"
                      aria-hidden="true"
                    ></i
                  ></NuxtLink>
                  <NuxtLink
                    :to="'/devis/' + devi.id"
                    v-if="
                      compagny == user.pivot.compagnie_id &&
                      user.pivot.droits_edition == 1
                    "
                    ><i class="fa fa-pencil-square-o" aria-hidden="true"></i
                  ></NuxtLink>
                  <div
                    @click="deleteClient(devi.id)"
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
          <strong>{{ total }} devis au total </strong>
        </p>
        <hr class="text-primary" />
      </div>
      <br /><br />

      <div class="d-flex col-md-2 my-4">
        <label class="title mt-2">Affichage :</label>
        <form action="">
          <div class="nombre">
            <select
              class="form-control"
              v-model="form.nombre"
              required
              @click.prevent="refresh()"
            >
              <option disabled value>10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="10">100</option>
            </select>
          </div>
        </form>
      </div>
      <nav
        class="page nav"
        aria-label="Page navigation example px-8"
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
      <br />
    </div>
    <deleteModal
      :identifiant="key"
      v-show="showModalDelete"
      @close-modal="showModalDelete = false"
      @conf="setMessage"
    />
  </div>
</template>
    
    <script>
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
import deleteModal from "./deleteModal.vue";
export default {
  layout: "empty",
  auth: true,
  components: {
    Sidebar,
    Userinfo,
    deleteModal,
  },
  data() {
    return {
      error: null,
      total: "",
      file: "",
      res_data: null,
      element_search: "",
      results: "",
      compagnie_id: "",
      devis: "",
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
    };
  },

  async mounted() {
    this.refresh();
    this.users = this.$auth.$state.user.roles;
    this.compagny = localStorage.getItem("auth.company_id");
    this.role = localStorage.getItem("auth.roles");
  },

  methods: {
    //modal de suppression
    deleteClient(id) {
      this.showModalDelete = true;
      this.key = id;
    },

    //rappel de refresh après le modal
    setMessage() {
      this.refresh();
    },

    //liste des devis
    refresh(page = 1) {
      this.$axios
        .get("/devis", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
            page: page,
            per_page: this.form.nombre,
          },
        })
        .then((response) => {
          this.devis = response.data.data.data;
          this.total = response.data.data.total;
          this.res_data = response.data.data;
          // this.links = response.data.data.links
          let firstE = response.data.data.links.shift();
          let lastE = response.data.data.links.splice(-1, 1);
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
    