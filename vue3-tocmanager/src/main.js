
import { createApp } from 'vue'
import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import 'boxicons'

import{createRouter, createWebHashHistory} from 'vue-router';
import SideBar from './pages/sidebar.vue'

import CorbeilleT from './pages/corbeille.vue'
import CorbeilleClient from './pages/corbeille_client.vue'
import CorbeilleFournisseur from './pages/corbeille_fournisseur.vue'
import CorbeilleCategorie from './pages/corbeille_categorie.vue'
import CorbeilleAchat from './pages/corbeille_achat.vue'
import CorbeilleProduit from './pages/corbeille_produit.vue'
import CorbeilleUtilisateur from './pages/corbeille_user.vue'

import ListeT from './pages/liste.vue'
import ListClient from './pages/list_client.vue'
import ListFournisseur from './pages/list_fournisseur.vue'
import ListCategorie from './pages/list_categorie.vue'
import ListProduit from './pages/list_produit.vue'
import ListUtilisateur from './pages/list_user.vue'
import ListAchat from './pages/list_achat.vue'
import ListVente from './pages/list_vente.vue'

import AjouterT from './pages/ajout.vue'
import AjoutClient from './pages/ajout_client.vue'
import AjouterFournisseur from './pages/ajout_fournisseur.vue'
import AjoutCategorie from './pages/ajout_categorie.vue'
import AjouterProduit from './pages/ajout_produit.vue'
import AjouterUtilisateur from './pages/ajout_user.vue'
import AjoutAchat from './pages/achat.vue'
import AjoutVente from './pages/vente.vue'

import VoirClient from './pages/voir_client.vue'
import VoirFournisseur from './pages/voir_fournisseur.vue'

import ModifierClient from './pages/modifier_client.vue'
import ModifierFournisseur from './pages/modifier_fournisseur.vue'
import ModifierCategorie from './pages/modifier_categorie.vue'
import ModifierProduit from './pages/modifier_produit.vue'
import ModifierUtilisateur from './pages/modifier_user.vue'
import ModifierAchat from './pages/modifier_achat.vue'
import ModifierVente from './pages/modifier_vente.vue'




const routes =[
    { path: '/', component: SideBar },

    { path: '/corbeille', component: CorbeilleT},
    { path: '/corbeilleclient', component: CorbeilleClient},
    { path: '/corbeillefournisseur', component: CorbeilleFournisseur},
    { path: '/corbeillecategorie', component: CorbeilleCategorie},
    { path: '/corbeilleachat', component: CorbeilleAchat},
    { path: '/corbeilleproduit', component: CorbeilleProduit},
    { path: '/corbeilleutilisateur', component: CorbeilleUtilisateur},

    { path: '/liste', component: ListeT},
    { path: '/listclient', component: ListClient},
    { path: '/listfournisseur', component: ListFournisseur},
    { path: '/listcategorie', component: ListCategorie},
    { path: '/listproduit', component: ListProduit},
    { path: '/listutilisateur', component: ListUtilisateur},
    { path: '/listachat', component: ListAchat},
    { path: '/listvente', component: ListVente},

    { path: '/ajout', component: AjouterT},
    { path: '/ajoutclient', component: AjoutClient},
    { path: '/ajoutcategorie', component: AjoutCategorie},
    { path: '/ajoutfournisseur', component: AjouterFournisseur},
    { path: '/ajoutproduit', component: AjouterProduit},
    { path: '/ajoututilisateur', component: AjouterUtilisateur},
    { path: '/achat', component: AjoutAchat},
    { path: '/vente', component: AjoutVente},
    

    { path: '/voirclient/:id', component: VoirClient},
    { path: '/voirfournisseur/:id', component: VoirFournisseur},

    { path: '/modifierclient/:id', component: ModifierClient},
    { path: '/modifierfournisseur/:id', component: ModifierFournisseur},
    { path: '/modifiercategorie/:id', component: ModifierCategorie},
    { path: '/modifierproduit/:id', component: ModifierProduit},
    { path: '/modifierutilisateur/:id', component: ModifierUtilisateur},
    { path: '/modifierachat/:id', component: ModifierAchat},
    { path: '/modifiervente/:id', component: ModifierVente},
   
    
   

]
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
const VueApp =createApp(App)

VueApp.use(router)

VueApp.mount('#app')
