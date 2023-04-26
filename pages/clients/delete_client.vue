<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Clients</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <h4>Clients supprimés</h4>
      <hr />

      <div
        class="alert alert-danger justify-content-center"
        role="alert"
        v-if="error"
      >
        {{ error }}
      </div>
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr class="table-success">
              <th>NOMS</th>
              <th>TELEPHONE</th>
              <th>EMAILS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(client, i) in clients"
              :key="i"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td>{{ client.name }}</td>
              <td>{{ client.phone }}</td>
              <td>{{ client.email }}</td>
              <td>
                <div
                  class="action d-flex aligns-items-center justify-content-center"
                >
                  <button class="btn btn-outline-danger mx-2" @click="supClient(client.id)">
                    Supprimer
                  </button>
                  <button class="btn btn-outline-success" @click="restaurerClient(client.id)">
                    Restaurer
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <p class="text-center">
          <strong>{{ total }} clients au total </strong>
        </p>
        <hr class="text-primary" />
      </div>
      <br /><br />
      <form action="">
        <div class="nombre d-flex my-4 col-md-2 mx-auto">
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
        aria-label="Page navigation example "
        class="d-flex nav d-flex justify-content-center"
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
              ><i class="fa fa-chevron-left"
                aria-hidden="true"></i></a
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
              ><i class="fa fa-chevron-right"
                aria-hidden="true"></i></a
            >
          </li>
        </ul>
      </nav>
    </div>
    <br />

    <deleteModal
      :infos="identifiant"
      v-show="showModal"
      @close-modal="showModal = false"
    />
  </div>
</template>


<script>
import deleteModal from "./modal_delete.vue";
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
export default {
  layout: "empty",
  components: {
    Sidebar,
    deleteModal,
    Userinfo,
  },

  data() {
    return {
      error: null,
      links: [],
      res_data: null,
      showModal: false,
      client: "",
      identifiant: "0",
      clients: [],
      total: "",
      form: {
        nombre: 10,
      },
    };
  },

  mounted() {
    //liste des clients supprimés
    this.$axios
      .get("/get/clients", {
        params: {
          compagnie_id: localStorage.getItem("auth.company_id"),
          per_page: this.form.nombre,
        },
      })
      .then((response) => {
        this.clients = response.data.data.data;
        this.res_data = response.data.data;
        this.total = response.data.data.total;
        let firstE = response.data.data.links.shift();
        let lastE = response.data.data.links.splice(-1, 1);
      });
  },

  methods: {
    //restaurer le client
    restaurerClient(id) {
      this.$axios
        .get("/restore/client/" + id, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.client = response.data.data;
            this.$router.push({ path: "/clients/list_client" });
          } else {
            this.error = response.data.message;
          }
        });
    },

    //modal de confirmation de suppression
    supClient(id) {
      this.showModal = true;
      this.identifiant = id;
    },
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

.action {
  display: flex;
  margin: 0 15%;
}
.table {
  margin-top: 2%;
  text-align: center;
}

.table th {
  padding: 20px;
}

tbody tr:last-of-type {
  border-bottom: 2px solid rgb(241, 20, 20);
}
.sup {
  border: 1px solid black;
  border-radius: 15px;
  height: 35px;
  padding: 5px;
  margin: 0 10px;
  cursor: pointer;
}

.sup:hover {
  color: #fff;
  background-color: red;
}

.restore {
  cursor: pointer;
  border: 1px solid black;
  border-radius: 15px;
  height: 35px;
  padding: 5px;
  margin: 0 10px;
}

.restore:hover {
  color: #fff;
  background-color: green;
}
</style>