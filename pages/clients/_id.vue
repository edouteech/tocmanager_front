<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Clients</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <div class="row">
        <div class="col-md-4">
          <h4>Modifier les informations</h4>
        </div>
        <div class="col-md-8 d-flex justify-content-end">
          <NuxtLink to="/clients/list_client">
            <button class="btn btn-dark py-2 px-3">
             <b>LISTE</b>
            </button>
          </NuxtLink>
        </div>
      </div>
      <hr />
      <form action="" class="col-md-6 mx-auto">
        <div class="form-group ">
          <label class="title">Entrer le nom du client</label>
          <input type="text" class="form-control" v-model="form.name" autocomplete="off" required
            placeholder="Jean Doe" />
        </div>
        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors && errors.name">
          {{ errors.name }}
        </div>

        <div class="form-group ">
          <label class="title">Entrer le numero de téléphone du client</label>
          <input type="tel" class="form-control" v-model="form.phone" required placeholder="+525485335622" />
        </div>
        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors && errors.phone">
          {{ errors.phone }}
        </div>

        <div class="form-group ">
          <label class="title">Entrer l'email du client</label>
          <input type="email" class="form-control" v-model="form.email" autocomplete="off" required
            placeholder="azerty@azert.com" />
        </div>
        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors && errors.email">
          {{ errors.email }}
        </div>

        <div class="form-group ">
          <div class="form-group">
            <label class="title">Nature du client</label>
            <select class="form-control" v-model="form.nature">
              <option disabled value="">Choisissez...</option>
              <option value="0">Particulier</option>
              <option value="1">Entreprise</option>
            </select>
          </div>
        </div>
        <div class="alert alert-danger justify-content-center" role="alert" v-if="errors && errors.nature">
          {{ errors.nature }}
        </div>

        <div class="form-group " v-if="role == 'admin'">
          <label class="title">Type de client</label>
          <select class="form-control" v-model="form.type_client">
            <option disabled value="">Choisissez...</option>
            <option :value="type" v-for="(type, i) in types" :key="i">
              {{ type }}
            </option>
          </select>
        </div>
        <div class="form-group " v-if="form.type_client == 'douteux'">
          <label class="title">Entrer le seuil de crédit possible</label>
          <input type="email" class="form-control" v-model="form.seuil_max" autocomplete="off" required
            placeholder="azerty@azert.com" />
        </div>

        <button type="submit" class="btn btn-outline-success p-3 col-md-12" v-on:click.prevent="submit()">
          <b>MODIFIER</b>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Sidebar from "../sidebar.vue";
import Userinfo from "../user_info.vue";
export default {
  layout: "empty",
  auth: true,
  components: {
    Sidebar,
    Userinfo,
  },
  data() {
    return {
      client: "",
      clients: [],
      form: {
        id: "",
        name: "",
        email: "",
        phone: "",
        nature: "",
        type_client: "",
        compagnie_id: "",
      },
      error: null,
      errors: [],
      types: "",
      role: "",
    };
  },
  mounted() {
    this.recupClient();
    this.recupType();
    this.role = localStorage.getItem("auth.roles");
  },

  methods: {
    //recupérer les informations du client concerné
    recupClient() {
      this.$axios
        .get("/clients/" + this.$route.params.id, {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          let client = response.data.data[0];
          (this.form.name = client.name),
            (this.form.phone = client.phone),
            (this.form.email = client.email);
          this.form.seuil_max = client.seuil_max;
          this.form.type_client = client.type_client;
          if (client.nature == "Particulier") {
            this.form.nature = 0;
          } else {
            this.form.nature = 1;
          }
        });
    },

    //recupérer les types de client
    recupType() {
      this.$axios
        .get("/clients/types", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          this.types = response.data.data;
        });
    },

    //modification des infos du client
    submit() {
      this.$axios
        .put("/clients/" + this.$route.params.id, {
          id: this.$route.params.id,
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          nature: this.form.nature,
          type_client: this.form.type_client,
          seuil_max: this.form.seuil_max,
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$router.push({ path: "/clients/list_client" });
            this.$toast("Modifications éffectuées avec succès !!!", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.error = response.data.message;
            this.errors = response.data.data;
            this.$toast.error(this.error, {
              icon: "fa fa-times-circle",
            });
          }
        });
    },
  },
};
</script>

<style scoped>
form {
  margin-left: 10%;
  margin-top: 5%;
}

.form-group {
  margin-top: 2%;
}

.title {
  margin: 1% 0;
  font-weight: 600;
  font-size: 18px;
}

.btn {
  margin-top: 5%;
}

.app-main__outer {
  overflow: none;
}

/* input {
  border: none;
  outline: none;
  border-bottom: 2px solid #605050;
} */
</style>