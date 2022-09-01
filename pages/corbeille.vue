<template>
<div class="page ">
    <link href="https://demo.dashboardpack.com/architectui-html-free/main.css" rel="stylesheet">
    <link href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css' rel='stylesheet'>
    <nav class="navbar navbar-fixed-top navbar-dark bg-dark text-white p-3"> 
      <Sidebar /><h3 class="name">Corbeille</h3>
    </nav>

    <section class="app-main__outer p-5">
        <div class="row mt-5">       
            <div class="col-md-6 col-xl-3">
                <NuxtLink to="/achats/delete_achat">
                <div class="card mb-3 widget-content bg-secondary text-white">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper p-5">
                            <div class="widget-content-left">
                                <div class="widget-heading fsize-2">Factures achats supprimées</div>
                            </div>
                        </div>
                    </div>
                </div>
                </NuxtLink>
            </div>
            
            
            <div class="col-md-6 col-xl-3">
                <NuxtLink to="/ventes/delete_vente"> 
                <div class="card mb-3 widget-content bg-secondary text-white">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper p-5">
                            <div class="widget-content-left">
                                <div class="widget-heading fsize-2">Factures Ventes supprimées</div>
                            </div>
                        </div>
                    </div>
                </div>
                </NuxtLink>
            </div>
             
            <div class="col-md-6 col-xl-3">
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
            
            <div class="col-md-6 col-xl-3">
                <NuxtLink to="/fournisseurs/delete_fournisseur">
                <div class="card mb-3 widget-content bg-secondary text-white">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper p-5">
                            <div class="widget-content-left">
                                <div class="widget-heading fsize-2">Fournisseurs supprimés</div>
                            </div>
                        </div>
                    </div>
                </div>
                </NuxtLink>
            </div>
            
        </div><hr class="line bg-dark">

        <div class="row mt-5">
            
            <div class="col-md-6 col-xl-3">
                <NuxtLink to="/produits/delete_produit" >
                <div class="card mb-3 widget-content bg-secondary text-white">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper p-5">
                            <div class="widget-content-left">
                                <div class="widget-heading">Produits supprimés</div>
                            </div>
                        </div>
                    </div>
                </div>
                </NuxtLink>
            </div>
            
            
            <div class="col-md-6 col-xl-3">
                <NuxtLink to="/categorie/delete_categorie">
                <div class="card mb-3 widget-content bg-secondary text-white">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper p-5">
                            <div class="widget-content-left">
                                <div class="widget-heading fsize-2">Catégories supprimées</div>
                            </div>
                        </div>
                    </div>
                </div>
                </NuxtLink>
            </div>
              
            <div class="col-md-6 col-xl-3">
                <NuxtLink to="/encaissements/delete_encaissement">
                <div class="card mb-3 widget-content bg-secondary text-white">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper p-5">
                            <div class="widget-content-left">
                                <div class="widget-heading fsize-2">Encaissements supprimés</div>
                            </div>
                        </div>
                    </div>
                </div>
                </NuxtLink>
            </div>
            
            <div class="col-md-6 col-xl-3">
                <NuxtLink to="/decaissements/delete_decaissement" > 
                <div class="card mb-3 widget-content bg-secondary text-white">
                    <div class="widget-content-outer">
                        <div class="widget-content-wrapper p-5">
                            <div class="widget-content-left">
                                <div class="widget-heading fsize-2">Décaissements supprimés</div>
                            </div>
                        </div>
                    </div>
                </div>
                </NuxtLink>
            </div>
            
        </div><hr>
        <!-- <div class="cases">
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
            <NuxtLink to="/profils/delete_profil" class="case">      
                Utilisateurs 
            </NuxtLink>
        </div><hr>
        <div class="cases">
            <NuxtLink to="/encaissements/delete_encaissement" class="case">      
                Encaissements
            </NuxtLink>
            <NuxtLink to="/decaissements/delete_decaissement" class="case">      
                Décaissements
            </NuxtLink>
            <NuxtLink to="/profils/delete_profil" class="case">      
                Utilisateurs 
            </NuxtLink>
        </div> -->
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
.app-main__outer{
  overflow: auto;
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