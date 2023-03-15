<template>
  <div>
    <nav class="navbar navbar-expand-lg  nav-bar appheader">
          <div class="container">
              <NuxtLink to="/">
                  <img src="/images/logo.png" class="logo-img" alt="">
              </NuxtLink>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <!-- <ul class="navbar-nav ms-auto mb-2 mb-lg-0"></ul> -->
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
      </nav>
  </div>
</template>

<script>
export default {
    name: 'AppHeader',
    data() {
        return { 
            role: ''

        }
      },

      mounted(){
        this.role = localStorage.getItem("auth.roles")
        // console.log(this.$auth)
      }

}
</script>

<style>
.logo-img{
    width: 170px;
}
.appheader{
      background: #D3D4D6;
  }

  .appheader .btn{
      border-radius: 50px;
  }
</style>