<template>
  <div class="page">
    <link href="https://demo.dashboardpack.com/architectui-html-free/main.css" rel="stylesheet" />
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3">
      <Sidebar />
      <h3 class="name_side">Corbeille</h3>
      <User_info />
    </nav>

    <section class="app-main__outer py-5 px-2 section" v-for="(user, i) in users" :key="i">
      <div class="">
        <h3 class="titre_contain">Retrouver ici tous les éléments supprimés</h3>
        <div class="row">
          <div class="col-md-1 bloc_fichier" v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1">
            <NuxtLink to="/achats/delete_achat"><div class="text-center"><i class="fa fa-folder fichier" aria-hidden="true"></i></div></NuxtLink>
            <div class="text-center text-fichier">Achats</div>
          </div>
          <div class="col-md-1 bloc_fichier" v-if="(compagny == user.pivot.compagnie_id && user.pivot.droits_ventes == 1) || (compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1)">
            <NuxtLink to="/categorie/delete_categorie"><div class="text-center"><i class="fa fa-folder fichier" aria-hidden="true"></i></div></NuxtLink>
            <div class="text-center text-fichier">Catégories</div>
          </div>
          <div class="col-md-1 bloc_fichier" v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_ventes == 1">
            <NuxtLink to="/clients/delete_client"><div class="text-center"><i class="fa fa-folder fichier" aria-hidden="true"></i></div></NuxtLink>
            <div class="text-center text-fichier">Clients</div>
          </div>
          <div class="col-md-1 bloc_fichier" v-if="compagny == compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1">
            <NuxtLink to="/decaissements/delete_decaissement"><div class="text-center"><i class="fa fa-folder fichier" aria-hidden="true"></i></div></NuxtLink>
            <div class="text-center text-fichier">Décaissements</div>
          </div>
          <div class="col-md-1 bloc_fichier" v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_tresorerie == 1">
            <NuxtLink to="/encaissements/delete_encaissement"><div class="text-center"><i class="fa fa-folder fichier" aria-hidden="true"></i></div></NuxtLink>
            <div class="text-center text-fichier">Encaissements</div>
          </div>
          <div class="col-md-1 bloc_fichier" v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1">
            <NuxtLink to="/fournisseurs/delete_fournisseur"><div class="text-center"><i class="fa fa-folder fichier" aria-hidden="true"></i></div></NuxtLink>
            <div class="text-center text-fichier">Fournisseurs</div>
          </div>
          <div class="col-md-1 bloc_fichier" v-if="(compagny == user.pivot.compagnie_id && user.pivot.droits_ventes == 1) || (compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1)">
            <NuxtLink to="/produits/delete_produit"><div class="text-center"><i class="fa fa-folder fichier" aria-hidden="true"></i></div></NuxtLink>
            <div class="text-center text-fichier">Produits</div>
          </div>
          <div class="col-md-1 bloc_fichier" v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_ventes == 1">
            <NuxtLink to="/ventes/delete_vente"><div class="text-center"><i class="fa fa-folder fichier" aria-hidden="true"></i></div></NuxtLink>
            <div class="text-center text-fichier">Ventes</div>
          </div>
        </div>
      </div>
      <!-- <div class="row mt-5">
        <div class="col-md-6 col-xl-3" v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1">
          <NuxtLink to="/achats/delete_achat">
            <div class="card mb-3 widget-content bg-secondary text-white">
              <div class="widget-content-outer">
                <div class="widget-content-wrapper p-5">
                  <div class="widget-content-left">
                    <div class="widget-heading fsize-2">
                      Factures achats supprimées
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="col-md-6 col-xl-3" v-if="
          compagny == user.pivot.compagnie_id && user.pivot.droits_ventes == 1
        ">
          <NuxtLink to="/ventes/delete_vente">
            <div class="card mb-3 widget-content bg-secondary text-white">
              <div class="widget-content-outer">
                <div class="widget-content-wrapper p-5">
                  <div class="widget-content-left">
                    <div class="widget-heading fsize-2">
                      Factures Ventes supprimées
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="col-md-6 col-xl-3" v-if="
          compagny == user.pivot.compagnie_id && user.pivot.droits_ventes == 1
        ">
          <NuxtLink to="/clients/delete_client">
            <div class="card mb-3 widget-content bg-secondary text-white">
              <div class="widget-content-outer">
                <div class="widget-content-wrapper p-5">
                  <div class="widget-content-left">
                    <div class="widget-heading fsize-2">Clients supprimés</div>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="col-md-6 col-xl-3" v-if="
          compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1
        ">
          <NuxtLink to="/fournisseurs/delete_fournisseur">
            <div class="card mb-3 widget-content bg-secondary text-white">
              <div class="widget-content-outer">
                <div class="widget-content-wrapper p-5">
                  <div class="widget-content-left">
                    <div class="widget-heading fsize-2">
                      Fournisseurs supprimés
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <hr class="line bg-dark" />

      <div class="row mt-5">
        <div class="col-md-6 col-xl-3" v-if="
          (compagny == user.pivot.compagnie_id &&
            user.pivot.droits_ventes == 1) ||
          (compagny == user.pivot.compagnie_id &&
            user.pivot.droits_stock == 1)
        ">
          <NuxtLink to="/produits/delete_produit">
            <div class="card mb-3 widget-content bg-secondary text-white">
              <div class="widget-content-outer">
                <div class="widget-content-wrapper p-5">
                  <div class="widget-content-left">
                    <div class="widget-heading fsize-2">Produits supprimés</div>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="col-md-6 col-xl-3" v-if="(compagny == user.pivot.compagnie_id && user.pivot.droits_ventes == 1) || (compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1)">
          <NuxtLink to="/categorie/delete_categorie">
            <div class="card mb-3 widget-content bg-secondary text-white">
              <div class="widget-content-outer">
                <div class="widget-content-wrapper p-5">
                  <div class="widget-content-left">
                    <div class="widget-heading fsize-2">
                      Catégories supprimées
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="col-md-6 col-xl-3" v-if="compagny == user.pivot.compagnie_id && user.pivot.droits_tresorerie == 1">
          <NuxtLink to="/encaissements/delete_encaissement">
            <div class="card mb-3 widget-content bg-secondary text-white">
              <div class="widget-content-outer">
                <div class="widget-content-wrapper p-5">
                  <div class="widget-content-left">
                    <div class="widget-heading fsize-2">
                      Encaissements supprimés
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="col-md-6 col-xl-3" v-if="
          compagny == user.pivot.compagnie_id && user.pivot.droits_stock == 1
        ">
          <NuxtLink to="/decaissements/delete_decaissement">
            <div class="card mb-3 widget-content bg-secondary text-white">
              <div class="widget-content-outer">
                <div class="widget-content-wrapper p-5">
                  <div class="widget-content-left">
                    <div class="widget-heading fsize-2">
                      Décaissements supprimés
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
      <hr /> -->
    </section>
  </div>
</template>


<script>
import Sidebar from "./sidebar.vue";
import User_info from "./user_info.vue";
export default {
  layout: "empty",
  components: {
    Sidebar,
    User_info,
  },

  data() {
    return {
      users: "",
      compagny: "",
    };
  },

  mounted() {
    this.users = this.$auth.$state.user.roles;
    this.compagny = localStorage.getItem("auth.company_id");
  },
};
</script>

<style scoped>
.titre_contain{
  margin-bottom: 25px;
  font-weight: 600;
}

.bloc_fichier{
  padding: 10px 0;
  margin: 0 20px;
}
.fichier {
  font-size: 70px;
  cursor: pointer;
  color: rgb(148, 119, 61);
}
.fichier:hover {
  color: rgb(0, 0, 0);
}
.text-fichier{
  font-size: 16px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 600;
}

.section {
  border: 1px solid rgb(255, 255, 255);
  position: relative;
  z-index: 1;
  padding: 30px;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.1);

}


@media screen and (max-width: 900px) {
  .fichier {
    font-size: 200px;
  }

  .bloc_fichier{
  margin: 10px 0;
}

  .text-fichier{
  font-size: 25px;
}
.titre_contain{
  margin-bottom: 35px;
  font-size: 18px;
}
}
/* .app-main__outer{
  overflow: auto;
} */

.cases {
  display: flex;
}

.cases .case {
  margin: 3%;
  padding: 6% 5%;
  border: 1px solid transparent;
  cursor: pointer;
  background-color: rgb(125, 93, 60);
  /* font-size: 19px; */
  font-weight: bold;
  color: rgb(246, 226, 226);
  text-decoration: none;
}

.case:hover {
  background-color: azure;
  border: 1px solid rgb(125, 93, 60);
  color: black;
}
</style>