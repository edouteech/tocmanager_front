<template>
<div class="contenu">

           <router-link to='/ajoutclient/'><button>Nouveau Client</button></router-link>
           <router-link to='/ajoutfournisseur/'><button>Nouveau Fournisseur</button></router-link>
           <router-link to='/ajoutcategorie/'><button>Nouvelle catégorie de produit</button></router-link>
           <router-link to='/ajoutproduit/'><button>Nouveau Produit</button></router-link>
           <router-link to='/ajoututilisateur'><button>Nouvel Utilisateur</button></router-link>

    <SideBar/>
</div>

</template>

<script>
import bootstrap from "bootstrap"
bootstrap
import SideBar from './sidebar.vue'
export default {
  name: 'AjouterT',
  components: {
    SideBar,
    
  },

  
}
</script>

<style lang="scss">
.contenu{
    button{
        padding :15px;

    }
}
</style>