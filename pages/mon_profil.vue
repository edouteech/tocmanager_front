<template>
  <div>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Utilisateurs</h3>
      <Userinfo />
    </nav>

    <div class="app-main__outer py-5 px-2">
      <h4 class="mx-4">Mon profil</h4>
      <hr />
      <br />
      <div class="row">
        <div class="col-lg-5 col-md-12 img">
          <div class="contact-info">
            <img
              src="./../static/images/profil.png"
              alt="profil"
              class="profil"
            />
          </div>
        </div>

        <div class="col-lg-6 col-md-12 mt-2">
          <div
            class="alert alert-danger justify-content-center"
            role="alert"
            v-if="error != null"
          >
            {{ error }}
          </div>
          <div
            class="alert alert-success justify-content-center"
            role="alert"
            v-if="errors != null"
          >
            {{ errors }}
          </div>

          <br />

          <div class="form-outline mb-4">
            <span class="fa fa-address-book px-2"></span
            ><label class="form-label">Nom Complet</label>
            <div class="input-field">
              <input
                type="text"
                class="form-control form-control-lg"
                v-model="form.name"
                required
                placeholder="Entrer votre nom"
              />
            </div>
          </div>
          <!-- Email input -->
          <div class="form-outline mb-4">
            <span class="fa fa-envelope px-2"></span>
            <label class="form-label">Adresse Email</label>
            <div class="input-field">
              <input
                type="email"
                class="form-control form-control-lg"
                v-model="form.email"
                required
                placeholder="Entrer une addresse email valide"
              />
            </div>
          </div>

          <div class="form-outline mb-4">
            <span class="fa fa-mobile px-2"></span>
            <label class="form-label">Téléphone</label>
            <vue-tel-input
              class="form-control form-control-sm"
              v-model="form.phone"
            ></vue-tel-input>
          </div>

          <div class="form-outline mb-4">
            <span class="fa fa-university px-2"></span
            ><label class="form-label">Ville</label>
            <div class="input-field">
              <input
                type="text"
                class="form-control form-control-lg"
                v-model="form.city"
                required
                placeholder="Entrer la ville"
              />
            </div>
          </div>
          <div class="form-outline mb-4">
            <span class="fa fa-address-card px-2"></span
            ><label class="form-label">Addresse</label>
            <div class="input-field">
              <input
                type="text"
                class="form-control form-control-lg"
                v-model="form.address"
                required
                placeholder="Entrer une addresse"
              />
            </div>
          </div>

          <div class="d-flex">
            <button
              type="submit"
              class="btn btn-success mx-5"
              v-on:click.prevent="submit()"
            >
              Modifier
            </button>
            <button
              type="submit"
              class="btn btn-info ml-5"
              v-on:click.prevent="change()"
            >
              Changer de compagnie
            </button>
          </div>
        </div>
      </div>
    </div>
    <br />

    <changeCompagnie
      :compagnies="liste"
      v-show="showModal"
      @close-modal="showModal = false"
    />
  </div>
</template>

<script>
import changeCompagnie from "./change_compagnie.vue";
import Sidebar from "./sidebar.vue";
import Userinfo from "./user_info.vue";
export default {
  auth: true,
  layout: "empty",
  components: {
    Sidebar,
    Userinfo,
    changeCompagnie,
  },
  data() {
    return {
      showModal: false,
      liste: "",
      error: null,
      errors: null,
      form: {
        name: "",
        email: "",
        phone: "",
        country: "",
        role: "",
        city: "",
        address: "",
      },
      countries: "",
      compagny: "",
    };
  },

  mounted() {
    this.recup();
    this.compagny = localStorage.getItem("auth.company_id");
  },

  methods: {
    //détails de l'utilisateur connecté
    recup() {
      this.$axios
        .get("user", {
          params: {
            compagnie_id: localStorage.getItem("auth.company_id"),
          },
        })
        .then((response) => {
          this.form.name = response.data.name;
          this.form.email = response.data.email;
          this.form.phone = response.data.phone;
          this.form.country = response.data.country;
          this.form.city = response.data.city;
          this.form.address = response.data.address;
        });
    },

    //modifications des infos de l'utilisateur
    submit() {
      this.$axios
        .put("/users/" + this.$auth.$state.user.id, {
          id: this.$auth.$state.user.id,
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          // country: this.form.country,
          city: this.form.city,
          address: this.form.address,
          compagnie_id: localStorage.getItem("auth.company_id"),
        })
        .then((response) => {
          this.$router.push({
            path: "/mon_profil",
          });
          if (response.data.status == "success") {
            this.errors = "Modifications éffectuées avec succès !!!";
            this.$router.push("/dashboard");
          } else {
            this.error = "Echec!!! Veuillez réessayer...";
          }
        });
    },

    //changer de compagnie
    change() {
      this.showModal = true;
      this.$axios.get("/user/compagnies").then((response) => {
        this.liste = response.data;
      });
    },
  },
};
</script>

<style scoped>
.fa {
  /* margin: 0 5px; */
  font-size: 15px;
  cursor: pointer;
}
.table {
  margin-top: 5%;
  text-align: center;
  justify-content: center;
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

@media screen and (max-width: 800px) {
  .img {
    display: none;
}

.name_side{
    display: none;
}
}
</style>
