<template>
  <div>
    <div class="zone">
      <div class="titre">
        <Sidebar />
        <p class="name">Utilisateurs</p>
      </div>
      <div
        class="alert alert-danger justify-content-center"
        role="alert"
        v-if="error"
      >
        {{ error }}
      </div>
      <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div class="table-responsive">
          <table
            class="table w-full text-sm text-left text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
            >
              <tr>
                <th scope="col" class="p-4"></th>
                <th scope="col" class="px-6 py-3">Noms</th>
                <th scope="col" class="px-6 py-3">Numéros de téléphone</th>
                <th scope="col" class="px-6 py-3">Emails</th>
                <th scope="col" class="px-6 py-3">Pays</th>
                <th scope="col" class="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(user, i) in users"
                :key="i"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td class="w-4 p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-table-search-1" class="sr-only"
                      >checkbox</label
                    >
                  </div>
                </td>

                <td>{{ user.name }}</td>
                <td>{{ user.phone }}</td>
                <td>{{ user.email }}</td>
                <td>{{ user.country }}</td>
                <td>
                  <div
                    class="action d-flex aligns-items-center justify-content-center"
                  >
                    <div class="sup" @click="supProfil(user.id)">
                      Supprimer
                    </div>
                    <div class="restore" @click="restaurerUser(user.id)">
                      Restaurer
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
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
export default {
  layout: "empty",
  components: {
    Sidebar,
    deleteModal,
  },

  data() {
    return {
      showModal: false,
      user: "",
      identifiant: "0",
      users: [],
      error: null,
    };
  },

  mounted() {
    //liste des utilisateurs supprimés
    this.$axios
      .get("/get/profil", {
        params: {
          compagnie_id: localStorage.getItem("auth.company_id"),
        },
      })
      .then((response) => {
        this.users = response.data.data;
      });
  },

  methods: {
    //restaurer un utilisateur
    restaurerUser(id) {
      this.$axios
        .get("/restore/profil/" + id, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$toast("Restauration de l'utilisateur !!!", {
              icon: "fa fa-check-circle",
            });
            this.user = response.data.data;
            this.$router.push({ path: "/profils/profil" });
          } else {
            this.error = response.data.message;
          }
        });
    },

    //modal de suppression
    supClient(id) {
      this.showModal = true;
      this.identifiant = id;
    },
  },
};
</script>

<style scoped>
.action {
  display: flex;
  margin-left: 20%;
}
.sup {
  border: 1px solid black;
  border-radius: 15px;
  padding: 5px;
  margin: 15px;
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
  margin: 15px;
  padding: 5px;
}

.restore:hover {
  color: #fff;
  background-color: green;
}

.w-full {
  text-align: center;
}
</style>