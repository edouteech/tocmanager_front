import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8faee852 = () => interopDefault(import('..\\pages\\about.vue' /* webpackChunkName: "pages/about" */))
const _6c5b9686 = () => interopDefault(import('..\\pages\\achatVente.vue' /* webpackChunkName: "pages/achatVente" */))
const _65e5dc82 = () => interopDefault(import('..\\pages\\compagnie.vue' /* webpackChunkName: "pages/compagnie" */))
const _52b1c66a = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _15a688ef = () => interopDefault(import('..\\pages\\corbeille.vue' /* webpackChunkName: "pages/corbeille" */))
const _5dd40e5e = () => interopDefault(import('..\\pages\\dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _bcefec9a = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _5431ce49 = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _5f054af8 = () => interopDefault(import('..\\pages\\services.vue' /* webpackChunkName: "pages/services" */))
const _37c6afa6 = () => interopDefault(import('..\\pages\\sidebar.vue' /* webpackChunkName: "pages/sidebar" */))
const _bbab112e = () => interopDefault(import('..\\pages\\achats\\achat.vue' /* webpackChunkName: "pages/achats/achat" */))
const _3b6022b0 = () => interopDefault(import('..\\pages\\achats\\ajoutModal.vue' /* webpackChunkName: "pages/achats/ajoutModal" */))
const _2ab276a5 = () => interopDefault(import('..\\pages\\achats\\delete_achat.vue' /* webpackChunkName: "pages/achats/delete_achat" */))
const _99f73050 = () => interopDefault(import('..\\pages\\achats\\list_achat.vue' /* webpackChunkName: "pages/achats/list_achat" */))
const _55d32e7d = () => interopDefault(import('..\\pages\\achats\\modal_delete.vue' /* webpackChunkName: "pages/achats/modal_delete" */))
const _418bd3f8 = () => interopDefault(import('..\\pages\\achats\\produitModal.vue' /* webpackChunkName: "pages/achats/produitModal" */))
const _6ee615f4 = () => interopDefault(import('..\\pages\\achats\\SavedModal.vue' /* webpackChunkName: "pages/achats/SavedModal" */))
const _b3f2d848 = () => interopDefault(import('..\\pages\\achats\\voir_achat.vue' /* webpackChunkName: "pages/achats/voir_achat" */))
const _161249a8 = () => interopDefault(import('..\\pages\\categorie\\add_categorie.vue' /* webpackChunkName: "pages/categorie/add_categorie" */))
const _33ff3ce4 = () => interopDefault(import('..\\pages\\categorie\\delete_categorie.vue' /* webpackChunkName: "pages/categorie/delete_categorie" */))
const _2ed28e52 = () => interopDefault(import('..\\pages\\categorie\\list_categorie.vue' /* webpackChunkName: "pages/categorie/list_categorie" */))
const _07515f84 = () => interopDefault(import('..\\pages\\categorie\\modal_delete.vue' /* webpackChunkName: "pages/categorie/modal_delete" */))
const _12497a4a = () => interopDefault(import('..\\pages\\categorie\\voir_categorie.vue' /* webpackChunkName: "pages/categorie/voir_categorie" */))
const _0c1b0d7b = () => interopDefault(import('..\\pages\\clients\\add_client.vue' /* webpackChunkName: "pages/clients/add_client" */))
const _458e277d = () => interopDefault(import('..\\pages\\clients\\delete_client.vue' /* webpackChunkName: "pages/clients/delete_client" */))
const _30503fac = () => interopDefault(import('..\\pages\\clients\\list_client.vue' /* webpackChunkName: "pages/clients/list_client" */))
const _3b2e074f = () => interopDefault(import('..\\pages\\clients\\modal_delete.vue' /* webpackChunkName: "pages/clients/modal_delete" */))
const _551b34a6 = () => interopDefault(import('..\\pages\\clients\\voir_client.vue' /* webpackChunkName: "pages/clients/voir_client" */))
const _2529947a = () => interopDefault(import('..\\pages\\compagnies\\add_compagnie.vue' /* webpackChunkName: "pages/compagnies/add_compagnie" */))
const _5f40d425 = () => interopDefault(import('..\\pages\\compagnies\\delete_compagnie.vue' /* webpackChunkName: "pages/compagnies/delete_compagnie" */))
const _08fab4d8 = () => interopDefault(import('..\\pages\\compagnies\\list_compagnie.vue' /* webpackChunkName: "pages/compagnies/list_compagnie" */))
const _1f626a7e = () => interopDefault(import('..\\pages\\compagnies\\modal_delete.vue' /* webpackChunkName: "pages/compagnies/modal_delete" */))
const _58f2995d = () => interopDefault(import('..\\pages\\decaissements\\decaissement.vue' /* webpackChunkName: "pages/decaissements/decaissement" */))
const _3782f959 = () => interopDefault(import('..\\pages\\decaissements\\delete_decaissement.vue' /* webpackChunkName: "pages/decaissements/delete_decaissement" */))
const _6b616fc6 = () => interopDefault(import('..\\pages\\decaissements\\list_decaissement.vue' /* webpackChunkName: "pages/decaissements/list_decaissement" */))
const _71f534e1 = () => interopDefault(import('..\\pages\\decaissements\\modal_delete.vue' /* webpackChunkName: "pages/decaissements/modal_delete" */))
const _754b117c = () => interopDefault(import('..\\pages\\decaissements\\voir_decaissement.vue' /* webpackChunkName: "pages/decaissements/voir_decaissement" */))
const _54049fa9 = () => interopDefault(import('..\\pages\\encaissements\\delete_encaissement.vue' /* webpackChunkName: "pages/encaissements/delete_encaissement" */))
const _7e36045d = () => interopDefault(import('..\\pages\\encaissements\\encaissement.vue' /* webpackChunkName: "pages/encaissements/encaissement" */))
const _f0efffd4 = () => interopDefault(import('..\\pages\\encaissements\\list_encaissement.vue' /* webpackChunkName: "pages/encaissements/list_encaissement" */))
const _e61ff48e = () => interopDefault(import('..\\pages\\encaissements\\modal_delete.vue' /* webpackChunkName: "pages/encaissements/modal_delete" */))
const _3cfdf0dc = () => interopDefault(import('..\\pages\\encaissements\\voir_encaissement.vue' /* webpackChunkName: "pages/encaissements/voir_encaissement" */))
const _5407851b = () => interopDefault(import('..\\pages\\fournisseurs\\add_fournisseur.vue' /* webpackChunkName: "pages/fournisseurs/add_fournisseur" */))
const _5aa253b6 = () => interopDefault(import('..\\pages\\fournisseurs\\delete_fournisseur.vue' /* webpackChunkName: "pages/fournisseurs/delete_fournisseur" */))
const _5957bb18 = () => interopDefault(import('..\\pages\\fournisseurs\\list_fournisseur.vue' /* webpackChunkName: "pages/fournisseurs/list_fournisseur" */))
const _71eed395 = () => interopDefault(import('..\\pages\\fournisseurs\\modal_delete.vue' /* webpackChunkName: "pages/fournisseurs/modal_delete" */))
const _2ebc57c8 = () => interopDefault(import('..\\pages\\fournisseurs\\voir_fournisseur.vue' /* webpackChunkName: "pages/fournisseurs/voir_fournisseur" */))
const _756c3f2b = () => interopDefault(import('..\\pages\\produits\\add_produit.vue' /* webpackChunkName: "pages/produits/add_produit" */))
const _047d5425 = () => interopDefault(import('..\\pages\\produits\\delete_produit.vue' /* webpackChunkName: "pages/produits/delete_produit" */))
const _e72aeed0 = () => interopDefault(import('..\\pages\\produits\\list_produit.vue' /* webpackChunkName: "pages/produits/list_produit" */))
const _13b58ae6 = () => interopDefault(import('..\\pages\\produits\\modal_delete.vue' /* webpackChunkName: "pages/produits/modal_delete" */))
const _70dc78c8 = () => interopDefault(import('..\\pages\\produits\\voir_produit.vue' /* webpackChunkName: "pages/produits/voir_produit" */))
const _2019795f = () => interopDefault(import('..\\pages\\profils\\delete_profil.vue' /* webpackChunkName: "pages/profils/delete_profil" */))
const _bd61c584 = () => interopDefault(import('..\\pages\\profils\\modal_delete.vue' /* webpackChunkName: "pages/profils/modal_delete" */))
const _693c0986 = () => interopDefault(import('..\\pages\\profils\\profil.vue' /* webpackChunkName: "pages/profils/profil" */))
const _315e3071 = () => interopDefault(import('..\\pages\\ventes\\ajoutModal.vue' /* webpackChunkName: "pages/ventes/ajoutModal" */))
const _4594f5c5 = () => interopDefault(import('..\\pages\\ventes\\delete_vente.vue' /* webpackChunkName: "pages/ventes/delete_vente" */))
const _58703538 = () => interopDefault(import('..\\pages\\ventes\\list_vente.vue' /* webpackChunkName: "pages/ventes/list_vente" */))
const _1a582206 = () => interopDefault(import('..\\pages\\ventes\\modal_delete.vue' /* webpackChunkName: "pages/ventes/modal_delete" */))
const _b881ece6 = () => interopDefault(import('..\\pages\\ventes\\produitModal.vue' /* webpackChunkName: "pages/ventes/produitModal" */))
const _179b36cf = () => interopDefault(import('..\\pages\\ventes\\SavedModal.vue' /* webpackChunkName: "pages/ventes/SavedModal" */))
const _3e880797 = () => interopDefault(import('..\\pages\\ventes\\vente.vue' /* webpackChunkName: "pages/ventes/vente" */))
const _4b72613c = () => interopDefault(import('..\\pages\\ventes\\voir_vente.vue' /* webpackChunkName: "pages/ventes/voir_vente" */))
const _4b51eb6a = () => interopDefault(import('..\\pages\\achats\\_id.vue' /* webpackChunkName: "pages/achats/_id" */))
const _126cc6ee = () => interopDefault(import('..\\pages\\categorie\\_id.vue' /* webpackChunkName: "pages/categorie/_id" */))
const _7a7b0350 = () => interopDefault(import('..\\pages\\clients\\_id.vue' /* webpackChunkName: "pages/clients/_id" */))
const _1f869ab4 = () => interopDefault(import('..\\pages\\compagnies\\_id.vue' /* webpackChunkName: "pages/compagnies/_id" */))
const _5f706486 = () => interopDefault(import('..\\pages\\decaissements\\_id.vue' /* webpackChunkName: "pages/decaissements/_id" */))
const _5756c0ae = () => interopDefault(import('..\\pages\\encaissements\\_id.vue' /* webpackChunkName: "pages/encaissements/_id" */))
const _f568a95c = () => interopDefault(import('..\\pages\\fournisseurs\\_id.vue' /* webpackChunkName: "pages/fournisseurs/_id" */))
const _a7e1e54c = () => interopDefault(import('..\\pages\\produits\\_id.vue' /* webpackChunkName: "pages/produits/_id" */))
const _442fac7e = () => interopDefault(import('..\\pages\\ventes\\_id.vue' /* webpackChunkName: "pages/ventes/_id" */))
const _503f32c8 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _8faee852,
    name: "about"
  }, {
    path: "/achatVente",
    component: _6c5b9686,
    name: "achatVente"
  }, {
    path: "/compagnie",
    component: _65e5dc82,
    name: "compagnie"
  }, {
    path: "/contact",
    component: _52b1c66a,
    name: "contact"
  }, {
    path: "/corbeille",
    component: _15a688ef,
    name: "corbeille"
  }, {
    path: "/dashboard",
    component: _5dd40e5e,
    name: "dashboard"
  }, {
    path: "/login",
    component: _bcefec9a,
    name: "login"
  }, {
    path: "/register",
    component: _5431ce49,
    name: "register"
  }, {
    path: "/services",
    component: _5f054af8,
    name: "services"
  }, {
    path: "/sidebar",
    component: _37c6afa6,
    name: "sidebar"
  }, {
    path: "/achats/achat",
    component: _bbab112e,
    name: "achats-achat"
  }, {
    path: "/achats/ajoutModal",
    component: _3b6022b0,
    name: "achats-ajoutModal"
  }, {
    path: "/achats/delete_achat",
    component: _2ab276a5,
    name: "achats-delete_achat"
  }, {
    path: "/achats/list_achat",
    component: _99f73050,
    name: "achats-list_achat"
  }, {
    path: "/achats/modal_delete",
    component: _55d32e7d,
    name: "achats-modal_delete"
  }, {
    path: "/achats/produitModal",
    component: _418bd3f8,
    name: "achats-produitModal"
  }, {
    path: "/achats/SavedModal",
    component: _6ee615f4,
    name: "achats-SavedModal"
  }, {
    path: "/achats/voir_achat",
    component: _b3f2d848,
    name: "achats-voir_achat"
  }, {
    path: "/categorie/add_categorie",
    component: _161249a8,
    name: "categorie-add_categorie"
  }, {
    path: "/categorie/delete_categorie",
    component: _33ff3ce4,
    name: "categorie-delete_categorie"
  }, {
    path: "/categorie/list_categorie",
    component: _2ed28e52,
    name: "categorie-list_categorie"
  }, {
    path: "/categorie/modal_delete",
    component: _07515f84,
    name: "categorie-modal_delete"
  }, {
    path: "/categorie/voir_categorie",
    component: _12497a4a,
    name: "categorie-voir_categorie"
  }, {
    path: "/clients/add_client",
    component: _0c1b0d7b,
    name: "clients-add_client"
  }, {
    path: "/clients/delete_client",
    component: _458e277d,
    name: "clients-delete_client"
  }, {
    path: "/clients/list_client",
    component: _30503fac,
    name: "clients-list_client"
  }, {
    path: "/clients/modal_delete",
    component: _3b2e074f,
    name: "clients-modal_delete"
  }, {
    path: "/clients/voir_client",
    component: _551b34a6,
    name: "clients-voir_client"
  }, {
    path: "/compagnies/add_compagnie",
    component: _2529947a,
    name: "compagnies-add_compagnie"
  }, {
    path: "/compagnies/delete_compagnie",
    component: _5f40d425,
    name: "compagnies-delete_compagnie"
  }, {
    path: "/compagnies/list_compagnie",
    component: _08fab4d8,
    name: "compagnies-list_compagnie"
  }, {
    path: "/compagnies/modal_delete",
    component: _1f626a7e,
    name: "compagnies-modal_delete"
  }, {
    path: "/decaissements/decaissement",
    component: _58f2995d,
    name: "decaissements-decaissement"
  }, {
    path: "/decaissements/delete_decaissement",
    component: _3782f959,
    name: "decaissements-delete_decaissement"
  }, {
    path: "/decaissements/list_decaissement",
    component: _6b616fc6,
    name: "decaissements-list_decaissement"
  }, {
    path: "/decaissements/modal_delete",
    component: _71f534e1,
    name: "decaissements-modal_delete"
  }, {
    path: "/decaissements/voir_decaissement",
    component: _754b117c,
    name: "decaissements-voir_decaissement"
  }, {
    path: "/encaissements/delete_encaissement",
    component: _54049fa9,
    name: "encaissements-delete_encaissement"
  }, {
    path: "/encaissements/encaissement",
    component: _7e36045d,
    name: "encaissements-encaissement"
  }, {
    path: "/encaissements/list_encaissement",
    component: _f0efffd4,
    name: "encaissements-list_encaissement"
  }, {
    path: "/encaissements/modal_delete",
    component: _e61ff48e,
    name: "encaissements-modal_delete"
  }, {
    path: "/encaissements/voir_encaissement",
    component: _3cfdf0dc,
    name: "encaissements-voir_encaissement"
  }, {
    path: "/fournisseurs/add_fournisseur",
    component: _5407851b,
    name: "fournisseurs-add_fournisseur"
  }, {
    path: "/fournisseurs/delete_fournisseur",
    component: _5aa253b6,
    name: "fournisseurs-delete_fournisseur"
  }, {
    path: "/fournisseurs/list_fournisseur",
    component: _5957bb18,
    name: "fournisseurs-list_fournisseur"
  }, {
    path: "/fournisseurs/modal_delete",
    component: _71eed395,
    name: "fournisseurs-modal_delete"
  }, {
    path: "/fournisseurs/voir_fournisseur",
    component: _2ebc57c8,
    name: "fournisseurs-voir_fournisseur"
  }, {
    path: "/produits/add_produit",
    component: _756c3f2b,
    name: "produits-add_produit"
  }, {
    path: "/produits/delete_produit",
    component: _047d5425,
    name: "produits-delete_produit"
  }, {
    path: "/produits/list_produit",
    component: _e72aeed0,
    name: "produits-list_produit"
  }, {
    path: "/produits/modal_delete",
    component: _13b58ae6,
    name: "produits-modal_delete"
  }, {
    path: "/produits/voir_produit",
    component: _70dc78c8,
    name: "produits-voir_produit"
  }, {
    path: "/profils/delete_profil",
    component: _2019795f,
    name: "profils-delete_profil"
  }, {
    path: "/profils/modal_delete",
    component: _bd61c584,
    name: "profils-modal_delete"
  }, {
    path: "/profils/profil",
    component: _693c0986,
    name: "profils-profil"
  }, {
    path: "/ventes/ajoutModal",
    component: _315e3071,
    name: "ventes-ajoutModal"
  }, {
    path: "/ventes/delete_vente",
    component: _4594f5c5,
    name: "ventes-delete_vente"
  }, {
    path: "/ventes/list_vente",
    component: _58703538,
    name: "ventes-list_vente"
  }, {
    path: "/ventes/modal_delete",
    component: _1a582206,
    name: "ventes-modal_delete"
  }, {
    path: "/ventes/produitModal",
    component: _b881ece6,
    name: "ventes-produitModal"
  }, {
    path: "/ventes/SavedModal",
    component: _179b36cf,
    name: "ventes-SavedModal"
  }, {
    path: "/ventes/vente",
    component: _3e880797,
    name: "ventes-vente"
  }, {
    path: "/ventes/voir_vente",
    component: _4b72613c,
    name: "ventes-voir_vente"
  }, {
    path: "/achats/:id?",
    component: _4b51eb6a,
    name: "achats-id"
  }, {
    path: "/categorie/:id?",
    component: _126cc6ee,
    name: "categorie-id"
  }, {
    path: "/clients/:id?",
    component: _7a7b0350,
    name: "clients-id"
  }, {
    path: "/compagnies/:id?",
    component: _1f869ab4,
    name: "compagnies-id"
  }, {
    path: "/decaissements/:id?",
    component: _5f706486,
    name: "decaissements-id"
  }, {
    path: "/encaissements/:id?",
    component: _5756c0ae,
    name: "encaissements-id"
  }, {
    path: "/fournisseurs/:id?",
    component: _f568a95c,
    name: "fournisseurs-id"
  }, {
    path: "/produits/:id?",
    component: _a7e1e54c,
    name: "produits-id"
  }, {
    path: "/ventes/:id?",
    component: _442fac7e,
    name: "ventes-id"
  }, {
    path: "/",
    component: _503f32c8,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
