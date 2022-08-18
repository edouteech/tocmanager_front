<template>
<div class="page ">
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Corbeille</h3>
    </nav>

    <section class="contenu">
        <div class="cases">
            <NuxtLink to="/achats/delete_achat" class="case">      
                Factures achats
            </NuxtLink>
            <NuxtLink to="/ventes/delete_vente" class="case">      
                Factures ventes
            </NuxtLink>
            <NuxtLink to="/clients/delete_client" class="case">      
                Clients
            </NuxtLink>
        </div><hr>
        <div class="cases">
             <NuxtLink to="/fournisseurs/delete_fournisseur" class="case">      
                Fournisseurs
            </NuxtLink>
            <NuxtLink to="/produits/delete_produit" class="case">      
                Produits
            </NuxtLink>
            <NuxtLink to="/categorie/delete_categorie" class="case">      
                Catégories
            </NuxtLink>
            <!-- <NuxtLink to="/profils/delete_profil" class="case">      
                Utilisateurs 
            </NuxtLink> -->
        </div><hr>
        <div class="cases">
            <NuxtLink to="/encaissements/delete_encaissement" class="case">      
                Encaissements
            </NuxtLink>
            <NuxtLink to="/decaissements/delete_decaissement" class="case">      
                Décaissements
            </NuxtLink>
            <!-- <NuxtLink to="/profils/delete_profil" class="case">      
                Utilisateurs 
            </NuxtLink> -->
        </div>
    </section>  
</div>
</template>


<script>
import Sidebar from './sidebar.vue'
export default {
  layout: "empty",
  components: {
    Sidebar,    
  },


}
</script>

<style scoped>
.contenu{
  margin: 5%;
  overflow: auto;
}

.contenu{
  margin: 5%;

}
.cases{
    display: flex;
}

.cases .case{
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

.case:hover{
    background-color: azure;
    border: 1px solid rgb(125, 93, 60);
    color: black;
}

</style>