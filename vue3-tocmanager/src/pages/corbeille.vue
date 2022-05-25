<template>
<div class="contenu">

           <router-link to='/corbeilleclient'><button>Clients supprimés</button></router-link>
           <router-link to='/corbeillefournisseur'><button>Fournisseurs supprimés</button></router-link>
           <router-link to='/corbeilleproduit'><button>Produits supprimés</button></router-link>
           <router-link to='/corbeillecategorie'><button>Catégories de Produits supprimés</button></router-link>
           <router-link to='/corbeilleutilisateur'><button>Utilisateurs supprimés</button></router-link>
           <router-link to='/corbeilleachat'><button>Achats supprimés</button></router-link>

    <SideBar/>
</div>

</template>

<script>
import bootstrap from "bootstrap"
bootstrap
import SideBar from './sidebar.vue'
export default {
  name: 'CorbeilleT',
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