<template>
  <div class="">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" rel="stylesheet" />

    <div class="authentication-wrapper authentication-cover authentication-bg">
      <div class="authentication-inner row">
        <!-- /Left Text -->
        <div class="d-none d-lg-flex col-lg-7 p-0">
          <div class="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
            <img src="../static/assets/img/illustrations/auth-login-illustration-light.png" alt="auth-login-cover"
              class="img-fluid my-5 auth-illustration"
              data-app-light-img="illustrations/auth-login-illustration-light.png"
              data-app-dark-img="illustrations/auth-login-illustration-dark.png" />

            <img src="../static/assets/img/illustrations/bg-shape-image-light.png" alt="auth-login-cover"
              class="platform-bg" data-app-light-img="illustrations/bg-shape-image-light.png"
              data-app-dark-img="illustrations/bg-shape-image-dark.png" />
          </div>
        </div>
        <!-- /Left Text -->

        <!-- Login -->
        <div class="d-flex col-12 col-lg-5 align-items-center p-sm-5 p-4">
          <div class="w-px-400 mx-auto">
            <!-- Logo -->
            <div class="app-brand mb-4">
              <div class="logo_content">
                  <img src="/images/icon3.png" class="logo_content" alt="logo" srcset="" width="50">
              </div>
            </div>
            <!-- /Logo -->
            <h3 class="mb-1 fw-bold">Bienvenue! 👋</h3>
            <p class="mb-4">Veuillez vous connecter à votre compte pour accéder aux diverses fonctionnalités</p>

            <form id="formAuthentication" class="mb-3">
              <div class="mb-3">
                <label for="email" class="form-label">Adresse Email</label>
                <input type="text" class="form-control" id="email" name="email-username" v-model="form.email"
                  placeholder="Entrer votre addresse email" autofocus />
              </div>
              <div class="mb-3 form-password-toggle">
                <div class="d-flex justify-content-between">
                  <label class="form-label" for="password">Mot de passe</label>
                  <NuxtLink to="/password1">
                    <small>Mot de passe oublié ?</small>
                  </NuxtLink>
                </div>
                <div class="input-group input-group-merge">
                  <input type="password" id="password" class="form-control" name="password" v-model="form.password"
                    placeholder="Entrer votre mot de passe" aria-describedby="password" />
                  <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off" @click="changer()"></i></span>
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="remember-me" />
                  <label class="form-check-label" for="remember-me"> Se souvenir de moi </label>
                </div>
              </div>
              <button class="btn btn-primary d-grid w-100" @click.prevent="login()">Se connecter</button>
            </form>

            <p class="text-center">
              <span>Etes vous nouveau ?</span>
              <a href="auth-register-cover.html">
                <span>Créer un compte</span>
              </a>
            </p>

            <div class="divider my-4">
              <div class="divider-text">ou</div>
            </div>

            <div class="d-flex justify-content-center">
              <a href="javascript:;" class="btn btn-icon btn-label-facebook me-3">
                <i class="tf-icons fa-brands fa-facebook-f fs-5"></i>
              </a>

              <a href="javascript:;" class="btn btn-icon btn-label-google-plus me-3">
                <i class="tf-icons fa-brands fa-google fs-5"></i>
              </a>

              <a href="javascript:;" class="btn btn-icon btn-label-twitter">
                <i class="tf-icons fa-brands fa-twitter fs-5"></i>
              </a>
            </div>
          </div>
        </div>
        <!-- /Login -->
      </div>
    </div>


    <modalEmail :identifiant="key" v-show="showModal" @close-modal="showModal = false" @conf="setMessage" />
  </div>
</template>


<script>
import modalEmail from "./modalEmail.vue";
export default {
  head: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap' },
      { rel: 'stylesheet', href: '/assets/vendor/fonts/fontawesome.css' },
      { rel: 'stylesheet', href: '/assets/vendor/fonts/tabler-icons.css' },
      { rel: 'stylesheet', href: '/assets/vendor/css/rtl/core.css' },
      { rel: 'stylesheet', href: '/assets/vendor/css/rtl/theme-default.css' },
      { rel: 'stylesheet', href: '/assets/css/demo.css' },
      { rel: 'stylesheet', href: '/assets/vendor/libs/perfect-scrollbar/perfect-scrollbar.css' },
      { rel: 'stylesheet', href: '/assets/vendor/libs/node-waves/node-waves.css' },
      { rel: 'stylesheet', href: '/assets/vendor/libs/typeahead-js/typeahead.css' },
      { rel: 'stylesheet', href: '/assets/vendor/libs/formvalidation/dist/css/formValidation.min.css' },
      { rel: 'stylesheet', href: '/assets/vendor/css/pages/page-auth.css' },
    ],
    // Ajoutez les éléments suivants à l'intérieur de la propriété head
    script: [
      { src: '/assets/vendor/js/helpers.js' },
      { src: '/assets/js/config.js' },
      { src: '/assets/vendor/libs/jquery/jquery.js' },
      { src: '/assets/vendor/libs/popper/popper.js' },
      { src: '/assets/vendor/js/bootstrap.js' },
      { src: '/assets/libs/perfect-scrollbar/perfect-scrollbar.js' },
      { src: '/assets/vendor/libs/node-waves/node-waves.js' },
      { src: '/assets/vendor/libs/hammer/hammer.js' },
      { src: '/assets/vendor/libs/i18n/i18n.js' },
      { src: '/assets/vendor/libs/typeahead-js/typeahead.js' },
      { src: '/assets/vendor/js/menu.js' },
      { src: '/assets/vendor/libs/formvalidation/dist/js/FormValidation.min.js' },
      { src: '/assets/vendor/libs/formvalidation/dist/js/plugins/Bootstrap5.min.js' },
      { src: '/assets/vendor/libs/formvalidation/dist/js/plugins/AutoFocus.min.js' },
      { src: '/assets/js/main.js' },
      { src: '/assets/js/pages-auth.js' },
    ]
  },
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
      if (pwd.getAttribute("type") == "password") {
        pwd.setAttribute("type", "text");
      } else {
        pwd.setAttribute("type", "password");
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
                                  this.$toast("Vous etes connectés !!!", {
                                    icon: "fa fa-check-circle",
                                  });
                                } else {
                                  this.$router.push("/renouvelerAbonnement");
                                }
                              });
                          } else {
                            this.$router.push("/dashboard");
                            this.$toast("Vous etes connectés !!!", {
                              icon: "fa fa-check-circle",
                            });
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
                        this.$toast("Vous etes connectés !!!", {
                          icon: "fa fa-check-circle",
                        });
                      } else {
                        this.error =
                          "Veuillez contacter votre administrateur pour souscrire à un abonnement avant d'accéeder aux services de TocManager.";
                        this.$toast.error(this.error, {
                          icon: "fa fa-times-circle",
                        });
                      }
                    });
                } else {
                  this.$router.push("/ventes/vente");
                  this.$toast("Vous etes connectés !!!", {
                    icon: "fa fa-check-circle",
                  });
                }
              });
          }
        } catch (err) {
          console.log(err);
          // this.refresh();
        }
      }
    },
  },
};
</script>
</style>