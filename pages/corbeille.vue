<template>
<div class="contain">
     <SideBar/>

 
  <div class="zone">
        <div class="titre">
        Eléments supprimés
        </div>
        <div class="cases">
            <div class="case">
                Factures achats
            </div>
            <NuxtLink to="/ventes/delete_vente" class="case">      
                Factures ventes
            </NuxtLink>
            <NuxtLink to="/clients/delete_client" class="case">      
                Clients
            </NuxtLink>
            <NuxtLink to="/fournisseurs/delete_fournisseur" class="case">      
                Fournisseurs
            </NuxtLink>
        </div><hr>
        <div class="cases">
            <NuxtLink to="/produits/delete_produit" class="case">      
                Produits
            </NuxtLink>
            <NuxtLink to="/categorie/delete_categorie" class="case">      
                Catégories
            </NuxtLink>
            <NuxtLink to="/profils/delete_profil" class="case">      
                Utilisateurs 
            </NuxtLink>
        </div>
  </div>
 

</div>
</template>


<script>
import SideBar from './nav.vue'
export default {
  components: {
    SideBar,    
  },


}
</script>

<style scoped>

.cases{
    display: flex;
}

.cases .case{
    margin: 3%;
    padding: 6% 5%;
    border: 1px solid transparent;
    cursor: pointer;
    background-color: rgb(125, 93, 60);
    font-size: 19px;
    font-weight: bold;
    color: rgb(246, 226, 226)
}

.case:hover{
    background-color: azure;
    border: 1px solid rgb(125, 93, 60);
    color: black;
}

</style>