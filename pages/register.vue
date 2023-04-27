<template>
  <div class="pt-5">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" rel="stylesheet" />

    <div class="authentication-wrapper authentication-cover authentication-bg">
      <div class="authentication-inner row">
        <!-- /Left Text -->
        <div class="d-none d-lg-flex col-lg-7 p-0">
          <div class="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
            <img src="/assets/img/illustrations/auth-register-illustration-light.png" alt="auth-register-cover"
              class="img-fluid my-5 auth-illustration"
              data-app-light-img="illustrations/auth-register-illustration-light.png"
              data-app-dark-img="illustrations/auth-register-illustration-dark.png" />

            <img src="/assets/img/illustrations/bg-shape-image-light.png" alt="auth-register-cover" class="platform-bg"
              data-app-light-img="illustrations/bg-shape-image-light.png"
              data-app-dark-img="illustrations/bg-shape-image-dark.png" />
          </div>
        </div>
        <!-- /Left Text -->

        <!-- Register -->
        <div class="d-flex col-12 col-lg-5 align-items-center p-sm-5 p-4">
          <div class="w-px-400 mx-auto">
            <!-- Logo -->
            <div class="app-brand mb-4">
              <div class="logo_content">
                <img src="/images/icon3.png" class="logo_content" alt="logo" srcset="" width="50">
              </div>
            </div>
            <!-- /Logo -->
            <h3 class="mb-1 fw-bold">Rejoignez nous 🚀</h3>
            <p class="mb-4">Faciliter la gestion de votre entreprise dès aujourd'hui !</p>

            <form id="formAuthentication" class="mb-3">
              <div class="mb-3">
                <label for="name" class="form-label">Nom Complet</label>
                <input type="text" class="form-control" id="name" name="name" placeholder="Enter votre nom"
                  v-model="form.name" autofocus />
                <div class="alert alert-danger justify-content-center" role="alert" v-if="errors && errors.name">
                  {{ errors.name[0] }}
                </div>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Adresse Email</label>
                <input type="email" class="form-control" id="email" name="email"
                  placeholder="Enter une adresse email valide" v-model="form.email" />
                <div class="alert alert-danger justify-content-center" role="alert" v-if="errors && errors.email">
                  {{ errors.email[0] }}
                </div>
              </div>
              <div class="mb-3 form-password-toggle">
                <label class="form-label" for="password">Mot de passe</label>
                <div class="input-group input-group-merge">
                  <input type="password" id="password" class="form-control" name="password"
                    placeholder="Entrer un mot de passe" aria-describedby="password" v-model="form.password" />
                  <span class="input-group-text cursor-pointer" @click.prevent="changer()"><i
                      class="ti ti-eye-off"></i></span>
                  <div class="alert alert-danger justify-content-center" role="alert" v-if="errors && errors.password">
                    {{ errors.password[0] }}
                  </div>
                </div>
              </div>

              <div class="mb-3 form-password-toggle">
                <label class="form-label" for="password1">Confirmer le Mot de passe</label>
                <div class="input-group input-group-merge">
                  <input type="password" id="password1" class="form-control" name="password1"
                    placeholder="Confirmer votre mot de passe" aria-describedby="password1"
                    v-model="form.password_confirmation" />
                  <span class="input-group-text cursor-pointer" @click.prevent="change()"><i
                      class="ti ti-eye-off"></i></span>
                  <div class="alert alert-danger justify-content-center" role="alert"
                    v-if="errors && errors.password_confirmation">
                    {{ errors.password_confirmation[0] }}
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="phone" class="form-label">Téléphone</label>
                <vue-tel-input class="form-control form-control-sm" v-model="form.phone" id="password1"
                  autocomplete="off">
                </vue-tel-input>
                <div class="alert alert-danger justify-content-center" role="alert" v-if="errors && errors.phone">
                  {{ errors.phone[0] }}
                </div>
              </div>

              <div class="mb-3">
                <label for="compagnie" class="form-label">Nom de votre entreprise</label>
                <input type="text" class="form-control" id="compagnie" name="compagnie"
                  placeholder="Entrer le nom de votre entreprise" v-model="form.compagnie.name" autofocus />
                <div class="alert alert-danger justify-content-center" role="alert" v-if="errors && errors.name">
                  {{ errors.name[0] }}
                </div>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="terms-conditions" name="terms" />
                  <label class="form-check-label" for="terms-conditions">
                    J'accepte
                    <a href="javascript:void(0);">la politique de confidentialité</a>
                  </label>
                </div>
              </div>
              <button class="btn btn-primary d-grid w-100" @click.prevent="register()">S'INSCRIRE</button>
            </form>

            <p class="text-center">
              <span>Avez vous déjà un compte?</span>
              <NuxtLink to="/login">
                <span>Connectez vous</span>
              </NuxtLink>
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
        <!-- /Register -->
      </div>
    </div>
  </div>
</template>

<script>
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
  auth: false,
  layout: "public",
  data() {
    return {
      user: "",
      errors: "",
      error: null,
      form: {
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        phone: "",
        // country: '',
        compagnie: {
          name: "",
        },
      },
    };
  },

  methods: {
    async register() {
      await this.$axios
        .post("/register", {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
          phone: this.form.phone,
          // country: this.form.country,
          compagnie: this.form.compagnie,
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$toast("Inscription réussie !!!", {
              icon: "fa fa-check-circle",
            });
            this.$router.push({ path: "/registerSuccess" });
          } else {
            this.errors = response.data.data;
            this.error = response.data.message;
            this.$toast.error(this.error, {
              icon: "fa fa-times-circle",
            });
          }
        })
        .catch((err) => console.log(err));
    },

    //afficher et cacher le mot de passe
    changer() {
      var pwd = document.getElementById("password");
      if (pwd.getAttribute("type") == "password") {
        pwd.setAttribute("type", "text");
      } else {
        pwd.setAttribute("type", "password");
      }
    },

    //afficher et cacher la confirmation du mot de passe
    change() {
      var pwd = document.getElementById("password1");
      if (pwd.getAttribute("type") == "password") {
        pwd.setAttribute("type", "text");
      } else {
        pwd.setAttribute("type", "password");
      }
    },
  },
};
</script>

<style scoped>

</style>