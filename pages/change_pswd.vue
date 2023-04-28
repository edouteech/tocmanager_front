<template >
  <div>
    <div class="authentication-wrapper authentication-cover authentication-bg">
      <div class="authentication-inner row">
        <!-- /Left Text -->
        <div class="d-none d-lg-flex col-lg-7 p-0">
          <div class="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
            <img src="/assets/img/illustrations/auth-reset-password-illustration-light.png"
              alt="auth-reset-password-cover" class="img-fluid my-5 auth-illustration"
              data-app-light-img="illustrations/auth-reset-password-illustration-light.png"
              data-app-dark-img="illustrations/auth-reset-password-illustration-dark.png" />

            <img src="/assets/img/illustrations/bg-shape-image-light.png" alt="auth-reset-password-cover"
              class="platform-bg" data-app-light-img="illustrations/bg-shape-image-light.png"
              data-app-dark-img="illustrations/bg-shape-image-dark.png" />
          </div>
        </div>
        <!-- /Left Text -->

        <!-- Forgot Password -->
        <div class="d-flex col-12 col-lg-5 align-items-center p-sm-5 p-4">
          <div class="w-px-400 mx-auto">
            <!-- Logo -->
            <div class="app-brand mb-4">
              <div class="logo_content">
                <img src="/images/icon3.png" class="logo_content" alt="logo" srcset="" width="50">
              </div>
            </div>
            <!-- /Logo -->
            <h3 class="mb-1 fw-bold">Modifier le mot de passe... 🔒</h3>
            <p class="mb-4">Pour une première connexion, vous devez changer votre mot de passe.</p>
            <form id="formAuthentication" class="mb-3" action="auth-reset-password-cover.html" method="POST">
              <label for="password" class="form-label">Nouveau mot de passe</label>
              <div class="mb-3 input-group ">
                <input type="password" id="password" class="form-control" name="password" v-model="form.password"
                  placeholder="Entrer votre nouveau mot de passe" aria-describedby="password" />
                <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off" @click="changer()"></i></span>
              </div>
              <label for="password1" class="form-label">Confirmer nouveau mot de passe</label>
              <div class="mb-3 input-group">
                <input type="password" id="password1" class="form-control" name="password1"
                  v-model="form.password_confirmation" placeholder="Confirmer le nouveau mot de passe"
                  aria-describedby="password" />
                <span class="input-group-text cursor-pointer"><i class="ti ti-eye-off" @click="change()"></i></span>
              </div>
              <button class="btn btn-primary d-grid w-100" @click.prevent="submit()">MODIFIER</button>
            </form>
            <div class="text-center">
              <NuxtLink to="/login" class="d-flex align-items-center justify-content-center">
                <i class="ti ti-chevron-left scaleX-n1-rtl"></i>
                Connexion
              </NuxtLink>
            </div>
          </div>
        </div>
        <!-- /Forgot Password -->
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
      { rel: 'stylesheet', href: '/assets/vendor/fonts/flag-icons.css' },
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
  layout: "empty",
  data() {
    return {
      error: null,
      email: "",
      role: "",
      form: {
        password: "",
        password_confirmation: "",
      },
    };
  },

  mounted() {
    this.email = localStorage.getItem("auth.email");
    this.role = localStorage.getItem("auth.roles");
  },

  methods: {
    //afficher ou cacher le mot de passe
    changer() {
      var pwd = document.getElementById("password");
      if (pwd.getAttribute("type") == "password") {
        pwd.setAttribute("type", "text");
      } else {
        pwd.setAttribute("type", "password");
      }
    },

    //afficher ou cacher la confirmation du mot de passe
    change() {
      var pwd = document.getElementById("password1");
      if (pwd.getAttribute("type") == "password") {
        pwd.setAttribute("type", "text");
      } else {
        pwd.setAttribute("type", "password");
      }
    },

    //modifier le mot de passe à la première connexion après que l'admin ait crée le compte
    async submit() {
      await this.$axios
        .post("/modify-password", {
          password: "00000000",
          newPassword: this.form.password,
          newPassword_confirmation: this.form.password_confirmation,
          email: this.email,
        })
        .then((response) => {
          if (response.data.status == "success") {
            this.$toast("Mot de passe modifié avec succès !!!", {
              icon: "fa fa-check-circle",
            });
            localStorage.removeItem("auth.user_id");
            localStorage.removeItem("auth.company_id");
            localStorage.removeItem("auth.email");
            this.$auth.logout();
            this.$router.push("/login");
          } else {
            this.error = response.data.message;
            this.$toast.error(this.error, {
              icon: "fa fa-times-circle",
            });
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>


<style scoped>
.app-main__outer {
  overflow: none;
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

@media (max-width: 450px) {
  .h-custom {
    height: 100%;
  }
}
</style>
