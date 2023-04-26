<template>
<div>
  <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css' rel='stylesheet'>
  <button class="btn btn-primary px-6" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
    <i class="fa fa-bars" aria-hidden="true"></i>
  </button>
  
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <div class="logo_content">
          <img src="/images/logo.png" class="logo_content" alt="logo" srcset="">
      </div> 
      <hr>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
          <ul class="nav_list" v-for="(user, i) in users" :key="i">
              <div class="recherche">
                <li v-if="compagny == user.pivot.compagnie_id">             
                    <NuxtLink to="">
                        <i class="fa fa-search" aria-hidden="true"></i>
                        <input type="text" placeholder="Rechercher...">
                    </NuxtLink>
                </li>
              </div>
              <li v-if=" compagny == user.pivot.compagnie_id && user.pivot.droits_admin == 1">
                  <NuxtLink to="/dashboard" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                          <i class="fa fa-th-large" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Tableau de bord</span>
                      </div>
                  </NuxtLink>
              </li>
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1">
                  <NuxtLink to="/achats/achat" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                          <i class="fa fa-shopping-cart" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Lancer un achat</span>
                      </div>
                  </NuxtLink>
              </li>
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_ventes == 1">
                  <NuxtLink to="/ventes/vente" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                          <i class="fa fa-share-square-o" aria-hidden="true"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Lancer une vente</span>
                      </div>
                  </NuxtLink>
              </li>
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_ventes == 1">
                  <NuxtLink to="/ventes/list_vente" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                          <i class="fa fa-floppy-o" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Factures des ventes</span>
                      </div>
                  </NuxtLink>
              </li>
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1">
                  <NuxtLink to="/achats/list_achat" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                          <i class="fa fa-floppy-o" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Factures des achats</span>
                      </div>
                  </NuxtLink>
              </li>
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_ventes == 1">
                  <NuxtLink to="/clients/list_client" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                          <i class="fa fa-list-ul" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Liste des Clients</span>
                      </div>
                  </NuxtLink>
              </li>
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1">
                  <NuxtLink to="/fournisseurs/list_fournisseur" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                          <i class="fa fa-list-ul" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Liste des Fournisseurs</span>
                      </div>
                  </NuxtLink>
              </li>
              
              <!-- <li class="nav-item dropdown">
                  <div class="rubrique">
                      <i class="fa fa-list-ul" aria-hidden="true"></i>
                  <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                     <span class="links_name">Listes</span>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                      <li><NuxtLink to="/clients/list_client"><span class="dropdown-item">Clients</span></NuxtLink></li>
                      <li><NuxtLink to="/fournisseurs/list_fournisseur"><span class="dropdown-item">Fournisseurs</span></NuxtLink></li>
                  </ul>
                  </div>
              </li> -->
  
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_tresorerie == 1">
                  <NuxtLink to="/encaissements/list_encaissement" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                          <i class="fa fa-credit-card-alt" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Encaissements</span>
                      </div>
                  </NuxtLink>
              </li>
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1">
                  <NuxtLink to="/decaissements/list_decaissement" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                          <i class="fa fa-credit-card-alt" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Décaissements</span>
                      </div>
                  </NuxtLink>
              </li>
              <li v-if="(compagny == user.pivot.compagnie_id && user.pivot.droits_ventes == 1) || (compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1)">
                  <NuxtLink to="/produits/list_produit" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                         <i class="fa fa-cubes" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Liste des Produits</span>
                      </div>
                  </NuxtLink>
              </li>
              <li  v-if="(compagny == user.pivot.compagnie_id && user.pivot.droits_ventes == 1) || (compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1)">
                  <NuxtLink to="/categorie/list_categorie" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                          <i class="fa fa-database" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Toutes les Catégories</span>
                      </div>
                  </NuxtLink>
              </li>
              
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_admin == 1">
                  <NuxtLink to="/update_compagnie" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                          <i class="fa fa-briefcase" aria-hidden="true " data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Ma compagnie</span>
                      </div>
                  </NuxtLink>
              </li>
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_admin == 1">
                  <NuxtLink to="/employes/list_employe" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                        <i class="fa fa-users" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Employés de la compagnie</span>
                      </div>
                  </NuxtLink>
              </li>
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_admin == 1">
                  <NuxtLink to="/conges/list_conge" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                        <i class="fa fa-calendar" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Congés des Employés</span>
                      </div>
                  </NuxtLink>
              </li>
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_admin == 1">
                  <NuxtLink to="/prets/list_pret" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                        <i class="fa fa-balance-scale" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Prêts des Employés</span>
                      </div>
                  </NuxtLink>
              </li>
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_admin == 1">
                  <NuxtLink to="/paies/list_paie" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                        <i class="fa fa-money" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Bulletins de paie</span>
                      </div>
                  </NuxtLink>
              </li>
              <!-- <li>
                  <NuxtLink to="/compagnies/list_compagnie">
                      <div class="rubrique">
                          <i class="fa fa-briefcase" aria-hidden="true"></i>
                          <span class="links_name">Compagnies</span>
                      </div>
                  </NuxtLink>
              </li> -->
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_utilisateurs == 1">
                  <NuxtLink to="/profils/profil" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                          <i class="fa fa-address-card-o" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Utilisateurs</span>
                      </div>
                  </NuxtLink>
              </li> 
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_delete == 1">
                  <NuxtLink to="/corbeille" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                          <i class="fa fa-trash" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Corbeille</span>
                      </div>
                  </NuxtLink>   
              </li> 
              <li v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_admin == 1">
                  <NuxtLink to="/renouvelerAbonnement" data-bs-dismiss="offcanvas">
                      <div class="rubrique" data-bs-dismiss="offcanvas">
                        <i class="fa fa-handshake-o" aria-hidden="true" data-bs-dismiss="offcanvas"></i>
                          <span class="links_name" data-bs-dismiss="offcanvas">Renouveler l'abonnement</span>
                      </div>
                  </NuxtLink>
              </li>
              
  
              <!-- <div class="bas-page" data-bs-dismiss="offcanvas">
                      <img src="/images/user.png" alt="logo" srcset="" data-bs-dismiss="offcanvas">
                      <span class="user_name" data-bs-dismiss="offcanvas">{{$auth.user.name}}</span> 
                      <div class="custom-btn btn-5" @click="logout" data-bs-dismiss="offcanvas">
                      
                      Déconnexion</div>    
              </div> -->
  
          </ul>
    </div>
  </div>
</div>
</template>
  
  <script>
export default {
  name: "Sidebar",
  auth: true,
  data() {
    return {
      users: "",
      compagny: "",
    };
  },

  mounted() {
    this.compagny = localStorage.getItem("auth.company_id");
    this.users = this.$auth.$state.user.roles;
  },

  methods: {
    async logout() {
      localStorage.removeItem("auth.user_id");
      localStorage.removeItem("auth.company_id");
      localStorage.removeItem("auth.roles");
      localStorage.removeItem("auth.role");
      this.$auth.logout();
      this.$router.push("/login");
    },
  },
};
</script>
  
  <style scoped>
body {
  overflow: auto;
}
.logo_content img {
  display: flex;
  height: 50px;
  width: 80%;
  align-items: center;
  margin-bottom: 3%;
}

ul li {
  position: relative;
  height: 50px;
  width: 100%;
  margin: 0 5px;
  list-style: none;
  line-height: 40px;
  text-decoration: none;
}

li i {
  min-width: 50px;
  border-radius: 12px;
  text-align: center;
  text-decoration: none;
}

input {
  position: absolute;
  height: 75%;
  width: 100%;
  left: 0;
  top: 0;
  border-radius: 12px;
  outline: none;
  border: none;
  background: #f3f3ec;
  padding-left: 50px;
  font-size: 12px;
  color: #565643;
}

.fa-search {
  position: absolute;
  z-index: 99;
  color: #565643;
  margin-top: 4%;
}

.rubrique {
  width: 100%;
  position: absolute;
  display: flex;
  align-items: center;
  transition: all 0.4s ease;
  border-radius: 8px;
  text-decoration: none;
  color: #11101d !important;
}

.rubrique.active,
.rubrique:hover {
  background: rgb(211, 232, 240);
}

.bas-page {
  margin-top: 10%;
  display: flex;
  border: 1px solid rgb(88, 87, 87);
  padding: 10px;
}

.bas-page img {
  width: 45px;
  border: 1px solid transparent;
  border-radius: 100%;
  cursor: pointer;
}
.bas-page .user_name {
  font-size: 12px;
  padding: 10px;
  color: black;
}

.bas-page .btn {
  margin-left: 7%;
  padding: 10px;
  cursor: pointer;
  border: 1px solid;
  background-color: red;
  border-radius: 10px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.86);
}

.bas-page .btn:hover {
  background-color: rgba(255, 255, 255, 0.86);
  color: red;
}

.custom-btn {
  width: 130px;
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

.btn-5 {
  text-align: center;
  width: 130px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;
  background: rgb(255, 27, 0);
  background: linear-gradient(
    0deg,
    rgba(255, 27, 0, 1) 0%,
    rgba(251, 75, 2, 1) 100%
  );
}

.btn-5:hover {
  color: #f0094a;
  background: transparent;
  box-shadow: none;
}

.btn-5:before,
.btn-5:after {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  height: 2px;
  width: 0;
  background: #f0094a;
  box-shadow: -1px -1px 5px 0px #fff, 7px 7px 20px 0px #0003,
    4px 4px 5px 0px #0002;
  transition: 400ms ease all;
}

.btn-5:after {
  right: inherit;
  top: inherit;
  left: 0;
  bottom: 0;
}

.btn-5:hover:before,
.btn-5:hover:after {
  width: 100%;
  transition: 800ms ease all;
}
</style>