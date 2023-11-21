<template>
  <div class="contain">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" rel="stylesheet" />
    <!-- <div class="alert alert-success justify-content-center" role="alert">
      {{this.params.errors}}
  </div> -->

    <br /><br />

    <h2 class="text px-4 mt-5">Connectez vous</h2>
    <div class="container-fluid h-custom">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-md-9 col-lg-6 col-xl-5">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid"
            alt="Sample image" />
        </div>
        <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
          <form>
            <div class="alert alert-danger justify-content-center" role="alert" v-if="error">
              {{ error }}
            </div>
            <div class="divider d-flex align-items-center my-4">
              <p class="text-center fw-bold mx-3 mb-0">Connexion</p>
            </div>

            <!-- Email input -->
            <div class="form-outline mb-4">
              <div class="d-flex">
                <span class="fa fa-envelope px-2 mt-1"></span>
                <label class="form-label">Adresse Email</label>
              </div>
              <div class="input-field">
                <input type="email" class="form-control form-control-lg" v-model="form.email" required
                  placeholder="Entrer votre addresse email " />
              </div>
            </div>

            <!-- Password input -->
            <div class="form-outline mb-3">
              <div class="d-flex">
                <span class="fas fa-lock px-2 mt-1"></span><label class="form-label">Mot de passe</label>
              </div>
             <div class="input-field">
                <div class="password-container w-100">
                  <input type="password" id="password" class="form-control form-control-lg" v-model="form.password"
                    placeholder="Entrer votre mot de passe" />
                  <span class="password-toggle"><i class="fa fa-eye" id="eye" @click="changer()"></i></span>
                </div>
            </div>


            </div>

            <div class="d-flex justify-content-between align-items-center">
              <NuxtLink to="/password1" class="link-primary px-2">
                Mot de passe oublié ?
              </NuxtLink>
            </div>

            <div class="text-center text-lg-start mt-4 pt-2">
              <button type="button" :disabled="load" @click.prevent="login()" class="btn btn-primary btn-lg"
                style="padding-left: 1rem; padding-right: 1rem">
                Se connecter
              </button>
              <p class="small fw-bold mt-2 pt-1 mb-0">
                Vous n'avez pas de compte ?
                <NuxtLink to="/register" class="link-primary px-2">
                  Inscription
                </NuxtLink>
              </p>
            </div>
            <br /><br /><br />
          </form>
        </div>
      </div>
    </div>

    <modalEmail :identifiant="key" v-show="showModal" @close-modal="showModal = false" @conf="setMessage" />
  </div>
</template>

<script>
import modalEmail from "./modalEmail.vue";
export default {
  middleware: "auth",
  name: "login",
  layout: "public",
  components: {
    modalEmail,
  },

  data() {
    return {
      error: null,
      showModal: false,
      key: "",
      form: {
        email: "",
        password: "",
      },
      errors: [],
      role: "",
      load: false,
    };
  },

  mounted() {
    if (this.$auth.loggedIn) {
      this.$nuxt.$options.router.push("/dashboard")
    }
  },
  
  methods: {
    //afficher et cacher le mot de passe
    changer() {
      var pwd = document.getElementById("password");
      var fa = document.getElementById("eye");
      if (pwd.getAttribute("type") === "password") {
        pwd.setAttribute("type", "text");
        fa.className = "fa fa-eye-slash";

      } else {
        pwd.setAttribute("type", "password");
        fa.className = "fa fa-eye";

      }
    },

    //action à effectuer après le modal
    setMessage() {
      this.$router.push("/login");
    },

    //connexion
    async login() {
      this.load = true;
      if (this.form.password == "00000000") {
        try {
          let response = await this.$auth.loginWith("local", {
            data: this.form,
          });
          this.$auth.$storage.setUniversal(
            "roles",
            response.data.data.original.roles[0].name
          );
          this.$auth.$storage.setUniversal(
            "company_id",
            response.data.data.original.compagnies[0].id
          );
          this.$auth.$storage.setUniversal(
            "user_id",
            response.data.data.original.user.id
          );
          this.$auth.$storage.setUniversal("email", this.form.email);
          this.$auth
            .setUserToken(response.data.data.original.access_token)
            .then((response) => {
              this.$router.push("/change_pswd");
            });
        } catch (err) {
          console.log(err);
          this.load = false;
        }
      } else {
        try {
          let response = await this.$auth.loginWith("local", {
            data: this.form,
          });
          this.error = response.data.message;
          this.load = false;
          let verification = response.data.data.original.user.email_verified_at;
          this.$auth.$storage.setUniversal(
            "user_id",
            response.data.data.original.user.id
          );
          this.$auth.$storage.setUniversal(
            "roles",
            response.data.data.original.roles[0].name
          );
          this.$auth.$storage.setUniversal("email", this.form.email);
          this.$auth.setUserToken(response.data.data.original.access_token);
          this.role = localStorage.getItem("auth.roles");
          if (this.role == "super_admin") {
            this.$auth
              .setUserToken(response.data.data.original.access_token)
              .then((response) => {
                this.$router.push("/admin/admin");
              });
          } else if (this.role == "admin") {
            let checkAbonnement =
              response.data.data.original.compagnies[0].is_suscribed;

            this.$auth.$storage.setUniversal(
              "company_id",
              response.data.data.original.compagnies[0].id
            );
            this.$auth
              .setUserToken(response.data.data.original.access_token)
              .then((response) => {
                this.$axios
                  .get(
                    "/index/abonnement/compagnie/" +
                    localStorage.getItem("auth.company_id")
                  )
                  .then((result) => {
                    if (result.data.data.length == 0) {
                      this.$router.push("/choisirAbonnement");
                    } else {
                      this.$axios
                        .get(
                          "/index/abonnement/compagnie/active/" +
                          localStorage.getItem("auth.company_id")
                        )
                        .then((result) => {
                          if (result.data.data.length == 0) {
                            this.$axios
                              .get(
                                "/compagnies/grace/" +
                                localStorage.getItem("auth.company_id")
                              )
                              .then((response) => {
                                if (response.data.data.hasEndGrace == false) {
                                  this.$router.push("/dashboard");
                                } else {
                                  this.$router.push("/renouvelerAbonnement");
                                }
                              });
                          } else {
                            this.$router.push("/dashboard");
                          }
                        });
                    }
                  });
              });
          } else {
            let checkAbonnement =
              response.data.data.original.compagnies[0].is_suscribed;
            this.$axios
              .get(
                "/index/abonnement/compagnie/active/" +
                localStorage.getItem("auth.company_id")
              )
              .then((result) => {
                if (result.data.data.length == 0) {
                  this.$axios
                    .get(
                      "/compagnies/grace/" +
                      localStorage.getItem("auth.company_id")
                    )
                    .then((response) => {
                      console.log(response);
                      if (response.data.data.hasEndGrace == false) {
                        this.$router.push("/ventes/vente");
                      } else {
                        this.error =
                          "Veuillez contacter votre administrateur pour souscrire à un abonnement avant d'accéeder aux services de TocManager.";
                      }
                    });
                } else {
                  this.$router.push("/ventes/vente");
                }
              });
          }
        } catch (err) {
          console.log(err);
          // this.refresh();
          this.load = false
        }
      }
    },
  },
};
</script>

<style scoped>
/* .contain{
  background: #D3D4D6;
} */

.error-message {
  border: 1px solid transparent;
  color: red;
  font-size: 15px;
  text-align: center;
  font-weight: bold;
  margin-top: 5%;
}

.input-field {
  border-radius: 5px;
  padding: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #4343ff;
}

.divider:after,
.divider:before {
  content: "";
  flex: 1;
  height: 1px;
  background: #eee;
}

.h-custom {
  height: calc(100% - 73px);
}

.input-field {
  position: relative;
}

.password-container {
  position: relative;
}

input[type="password"] {
  padding-right: 30px; /* Ajustez la largeur pour laisser de la place à l'icône */
}

.password-toggle {
  position: absolute;
  top: 50%;
  right: 10px; /* Ajustez la position horizontale de l'icône */
  transform: translateY(-50%);
  cursor: pointer;
}



@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}
</style>