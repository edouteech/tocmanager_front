<template>
  <div class="">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" rel="stylesheet" />
    <div class="authentication-wrapper authentication-cover authentication-bg">
      <div class="authentication-inner row">
        <!-- /Left Text -->
        <div class="d-none d-lg-flex col-lg-7 p-0">
          <div class="auth-cover-bg auth-cover-bg-color d-flex justify-content-center align-items-center">
            <img src="/assets/img/illustrations/auth-forgot-password-illustration-light.png"
              alt="auth-forgot-password-cover" class="img-fluid my-5 auth-illustration"
              data-app-light-img="illustrations/auth-forgot-password-illustration-light.png"
              data-app-dark-img="illustrations/auth-forgot-password-illustration-dark.png" />

            <img src="/assets/img/illustrations/bg-shape-image-light.png" alt="auth-forgot-password-cover"
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
            <h3 class="mb-1 fw-bold">Mot de passe oublié? 🔒</h3>
            <p class="mb-4">Entrer votre adresse email et consulter votre boite mail pour suivre les instructions</p>
            <form id="formAuthentication" class="mb-3">
              <div class="mb-3">
                <label for="email" class="form-label">Adresse Email</label>
                <input type="text" class="form-control" id="email" name="email" placeholder="Entrez votre adresse email"
                  v-model="form.email" autofocus />
              </div>
              <button class="btn btn-primary d-grid w-100" @click.prevent="submit()">Recevoir le lien</button>
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
  auth: false,
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
  name: "password",
  layout: "public",
  data() {
    return {
      status: "",
      error: null,
      form: {
        email: "",
      },
    };
  },
  methods: {
    //verification de l'email de l'utilisateur
    async submit() {
      await this.$axios
        .post("/forgot-password", {
          email: this.form.email,
          //   compagnie_id: localStorage.getItem('auth.company_id')
        })
        .then((response) => {
          this.status = response.data.status;
          this.error = response.data.message;

          if (response.data.status == "success") {
            this.$router.push({
              name: "password2",
              params: { email: this.form.email, error: this.error },

            });
            this.$toast("Consultez votre boite mail pour réinitialiser votre mot de passe !!!", {
              icon: "fa fa-check-circle",
            });
          } else {
            this.error = response.data.message;
            this.$toast.error(this.error, {
              icon: "fa fa-times-circle",
            });
          }
        })
        .catch((error) => console.log(error));
    },
  },
};
</script>

<style scoped>
</style>