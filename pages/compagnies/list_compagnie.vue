<template>
  <div>
    <div class="titre">
      <Sidebar />
      <p class="name">Compagnies</p>
      <Userinfo />
    </div>
    <div class="container">
      <p>Liste des compagnies</p>
      <NuxtLink
        class="custom-btn btn-10"
        to="/compagnies/add_compagnie"
        v-if="ajout == 1"
        >Ajouter compagnie</NuxtLink
      >
      <div class="table-responsive">
        <table class="table table-striped">
          <thead>
            <tr class="table-primary">
              <th>Noms</th>
              <th>Numéros de téléphone</th>
              <th>Emails</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(compagnie, i) in compagnies" :key="i">
              <td>{{ compagnie.name }}</td>
              <td>{{ compagnie.phone }}</td>
              <td>{{ compagnie.email }}</td>
              <td class="action">
                <NuxtLink
                  :to="'/compagnies/' + compagnie.id"
                  v-if="modifier == 1"
                  ><i class="fa fa-pencil-square-o" aria-hidden="true"></i
                ></NuxtLink>
                <div
                  @click="deleteCompagnie(compagnie.id)"
                  v-if="supprimer == 1"
                >
                  <i class="fa fa-trash-o text-danger" aria-hidden="true"></i>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <br /><br /><br />

    <deleteModal
      :identifiant="key"
      v-show="showModalDelete"
      @close-modal="showModalDelete = false"
      @conf="setMessage"
    />
  </div>
</template>

<script>
import deleteModal from "./deleteModal.vue";
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
export default {
  auth: true,
  layout: "empty",
  components: {
    Sidebar,
    Userinfo,
    deleteModal,
  },
  data() {
    return {
      compagnies: [],
      compagnie: "",
      ajout: "",
      modifier: "",
      supprimer: "",
      key: "",
      showModalDelete: false,
    };
  },

  mounted() {
    this.refresh();
    this.ajout = localStorage.getItem("auth.ajout");
    this.modifier = localStorage.getItem("auth.modifier");
    this.supprimer = localStorage.getItem("auth.supprimer");
  },

  methods: {
    //modal de suppression
    deleteCompagnie(id) {
      this.showModalDelete = true;
      this.key = id;
    },

    //rappel de la fonction refresh après le modal
    setMessage() {
      this.refresh();
    },

    //liste des compagnies
    refresh() {
      this.$axios.get("/compagnies").then((response) => {
        this.compagnies = response.data.data;
      });
    },
  },
};
</script>

<style scoped>
.fa {
  margin: 0 5px;
  font-size: 22px;
  cursor: pointer;
}
.table {
  margin-top: 5%;
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

.titre {
  display: flex;
  border: 1px solid #202020;
  padding: 2% 10%;
  margin-bottom: 3%;
  margin-left: -5%;
  background-color: #202020;
  color: #fff;
  letter-spacing: 2px;
}

.titre .name {
  margin-left: 15%;
  font-size: 24px;
}

.custom-btn {
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

.btn-10 {
  background: rgb(35, 240, 82);
  background: linear-gradient(
    0deg,
    rgb(53, 246, 56) 0%,
    rgb(28, 243, 107) 100%
  );
  color: #fff;
  border: none;
  transition: all 0.3s ease;
  overflow: hidden;
  margin-left: 80%;
}
.btn-10:after {
  position: absolute;
  content: " ";
  top: 0;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  transition: all 0.3s ease;
  -webkit-transform: scale(0.1);
  transform: scale(0.1);
}
.btn-10:hover {
  color: #fff;
  border: none;
  background: transparent;
}
.btn-10:hover:after {
  background: rgb(50, 242, 73);
  background: linear-gradient(
    0deg,
    rgb(92, 228, 42) 0%,
    rgb(100, 243, 56) 100%
  );
  -webkit-transform: scale(1);
  transform: scale(1);
}
</style>
