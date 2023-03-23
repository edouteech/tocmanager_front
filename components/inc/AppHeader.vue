<template>
  <div>
    <link
      href="https://uploads-ssl.webflow.com/640e8ce2b257f2059aa05b85/css/tocmanager.webflow.fa0feb0a2.css"
      rel="stylesheet"
      type="text/css"
    />
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link
      href="https://fonts.gstatic.com"
      rel="preconnect"
      crossorigin="anonymous"
    />
    <div
      data-animation="default"
      data-collapse="medium"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
      role="banner"
      class="combine-nav1_component w-nav"
    >
      <div class="combine-padding-global-2">
        <div class="combine-nav1_container">
          <NuxtLink to="/" class="combine-nav1_logo-link w-inline-block"
            ><img
              src="https://uploads-ssl.webflow.com/640e8ce2b257f2059aa05b85/640e944791ce970857a300d4_logo.png"
              loading="lazy"
              sizes="(max-width: 479px) 100vw, 300px"
              srcset="
                https://uploads-ssl.webflow.com/640e8ce2b257f2059aa05b85/640e944791ce970857a300d4_logo-p-500.png   500w,
                https://uploads-ssl.webflow.com/640e8ce2b257f2059aa05b85/640e944791ce970857a300d4_logo-p-800.png   800w,
                https://uploads-ssl.webflow.com/640e8ce2b257f2059aa05b85/640e944791ce970857a300d4_logo-p-1080.png 1080w,
                https://uploads-ssl.webflow.com/640e8ce2b257f2059aa05b85/640e944791ce970857a300d4_logo-p-1600.png 1600w,
                https://uploads-ssl.webflow.com/640e8ce2b257f2059aa05b85/640e944791ce970857a300d4_logo-p-2000.png 2000w,
                https://uploads-ssl.webflow.com/640e8ce2b257f2059aa05b85/640e944791ce970857a300d4_logo-p-2600.png 2600w,
                https://uploads-ssl.webflow.com/640e8ce2b257f2059aa05b85/640e944791ce970857a300d4_logo-p-3200.png 3200w
              "
              alt=""
              class="combine-nav1_logo"
          /></NuxtLink>
          <nav role="navigation" class="combine-nav1_menu w-nav-menu">
            <NuxtLink to="/" class="combine-nav1_link w-nav-link">Accueil</NuxtLink
            ><a href="#features" class="combine-nav1_link w-nav-link"
              >A propos</a
            ><a href="#pricing" class="combine-nav1_link w-nav-link">Prix</a>
            <div class="combine-nav1_button-wrapper">
              <NuxtLink to="/login" class="combine-button-white-small w-button"
                >Connexion</NuxtLink
              ><NuxtLink to="/register" class="logo-color w-button"
                >Inscription</NuxtLink
              >
            </div>
          </nav>
          <div>
            <img
              src="https://uploads-ssl.webflow.com/640e8ce2b257f2059aa05b85/640f3a6d864089d5aabf7bc3_fr.png"
              loading="lazy"
              width="24"
              alt=""
              class="image"
            /><img
              src="https://uploads-ssl.webflow.com/640e8ce2b257f2059aa05b85/640f3a6e23d1bb424995a659_usa.png"
              loading="lazy"
              width="24"
              alt=""
              class="image-2"
            />
          </div>
          <div class="combine-nav1_menu-button w-nav-button">
            <div class="combine-menu-icon">
              <div class="combine-menu-icon_line-top"></div>
              <div class="combine-menu-icon_line-middle"></div>
              <div class="combine-menu-icon_line-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <nav class="navbar navbar-expand-lg  nav-bar appheader">
          <div class="container">
              <NuxtLink to="/">
                  <img src="/images/logo.png" class="logo-img" alt="">
              </NuxtLink>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <div class="col-md-8">
                  <ul class="navbar-nav  mb-2 mb-lg-0">
                      <li class="nav-item mx-4">
                          <NuxtLink to="/" class="nav-link">A propos</NuxtLink>
                      </li>
                      <li class="nav-item">
                          <NuxtLink to="" class="nav-link">Services</NuxtLink>
                      </li>
                        <li class="nav-item">
                            <NuxtLink to="/abonnement" class="nav-link">Nos offres</NuxtLink>
                        </li>
                        <li class="nav-item" v-if="this.$auth.$state.loggedIn == true && role =='admin'">
                            <NuxtLink to="/dashboard" class="nav-link">Tableau de Bord</NuxtLink>
                        </li>
                        <li class="nav-item" v-if="this.$auth.$state.loggedIn == true ">
                            <NuxtLink to="/ventes/vente" class="nav-link">Effectuer une vente</NuxtLink>
                        </li>
                  </ul>
              </div>
              <div class="d-flex" v-if="this.$auth.$state.loggedIn != true">
                  <div>
                      <NuxtLink to="/login" class="btn btn-outline-primary btn-offer mx-3" >Connexion</NuxtLink>
                  </div>
                  <div>
                      <NuxtLink to="/register" class="btn btn-outline-primary btn-offer mr-3" >Inscription</NuxtLink>
                  </div>
                    <div><img src="/images/france.png" alt="français" width="30" class="mx-1"></div>/
                    <div><img src="/images/usa.png" alt="anglais" width="35" class="mx-1"></div>
    
              </div>
              </div>
          </div>
      </nav> -->
  </div>
</template>

<script>
export default {
  head() {
    return {
      script: [
        {
          innerHTML: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`,
          type: "text/javascript",
        },
        {
          innerHTML: `WebFont.load({ google: { families: ["Montserrat:100,100italic,200,200italic,300,300italic,400,400italic,500,500italic,600,600italic,700,700italic,800,800italic,900,900italic", "Open Sans:300,300italic,400,400italic,600,600italic,700,700italic,800,800italic"] } });`,
          type: "text/javascript",
        },
        {
          src: "https://d3e54v103j8qbb.cloudfront.net/js/jquery-3.5.1.min.dc5e7f18c8.js?site=640e8ce2b257f2059aa05b85",
          type: "text/javascript",
          integrity: "sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=",
          crossorigin: "anonymous",
        },
      ],
    };
  },
  name: "AppHeader",
  data() {
    return {
      role: "",
    };
  },

  mounted() {
    this.role = localStorage.getItem("auth.roles");
    // console.log(this.$auth)
  },
};
</script>

<style>
.logo-img {
  width: 170px;
}
.appheader {
  background: #d3d4d6;
}

.appheader .btn {
  border-radius: 50px;
}
</style>