<template>
<div class="contenu">

           <router-link to='/listclient'><button>Clients</button></router-link>
           <router-link to='/listfournisseur'><button>Fournisseurs</button></router-link>
           <router-link to='/listcategorie'><button>Catégories de Produits</button></router-link>
           <router-link to='/listutilisateur'><button>Utilisateurs</button></router-link>
           <router-link to='/listachat'><button>Achats</button></router-link>
            <router-link to='/listvente'><button>Ventes</button></router-link>

    <SideBar/>
</div>

</template>

<script>
import bootstrap from "bootstrap"
bootstrap
import SideBar from './sidebar.vue'
export default {
  name: 'ListeT',
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