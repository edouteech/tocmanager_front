<template> 
  <div class="nav" v-if="$auth.loggedIn == true">
    <link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>
    <div class="header">
        <div class="logo_content">
            <img src="./images/logo.png" alt="logo" srcset=""><hr>
        </div> 
    
        <ul class="nav_list">
            <div class="recherche">
              <li>             
                  <NuxtLink to="">
                      <i class='bx bx-search'></i>
                      <input type="text" placeholder="Rechercher...">
                  </NuxtLink>
              </li>
            </div>
            <li>
                <NuxtLink to="/dashboard">
                    <div class="rubrique">
                        <i class='bx bx-grid-alt'></i>
                        <span class="links_name">Dashboard</span>
                    </div>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/achat">
                    <div class="rubrique">
                        <i class='bx bx-cart-add'></i>
                        <span class="links_name">Achats</span>
                    </div>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/vente">
                    <div class="rubrique">
                        <i class='bx bxs-log-in-circle' ></i>
                        <span class="links_name">Ventes</span>
                    </div>
                </NuxtLink>
            </li>
            <!-- <li>
                <NuxtLink to="/">
                    <div class="rubrique">
                        <i class='bx bx-alarm-add'></i>
                        <span class="links_name">Ajouter un groupe</span>
                    </div>
                </NuxtLink>
            </li> -->
            <li> 
                <NuxtLink to="/clients/list_client">
                    <div class="rubrique">
                        <i class='bx bx-list-ul' ></i>
                        <span class="links_name">Liste des clients</span>
                    </div>
                </NuxtLink>
            </li>   
            <li> 
                <NuxtLink to="/fournisseurs/list_fournisseur">
                    <div class="rubrique">
                        <i class='bx bx-list-ul' ></i>
                        <span class="links_name">Liste des fournisseurs</span>
                    </div>
                </NuxtLink>
            </li>   
            <li>
                <NuxtLink to="/produits/list_produit">
                    <div class="rubrique">
                        <i class='bx bxl-product-hunt'></i>
                        <span class="links_name">Liste des Produits</span>
                    </div>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/categorie/list_categorie">
                    <div class="rubrique">
                        <i class='bx bxs-data'></i>
                        <span class="links_name">Toutes les Catégories</span>
                    </div>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/profils/profil">
                    <div class="rubrique">
                        <i class='bx bx-user' ></i>
                        <span class="links_name">Utilisateurs</span>
                    </div>
                </NuxtLink>
            </li> 
            <li>
                <NuxtLink to="/">
                    <div class="rubrique">
                        <i class='bx bxs-trash'></i>
                        <span class="links_name">Corbeille</span>
                    </div>
                </NuxtLink>   
            </li> 
            <!-- <li>
                <button type="button" @click="logout">
                    <div class="rubrique">
                        <i class='bx bx-log-out'></i>
                        <span class="links_name">Deconnexion</span>
                    </div>
                </button>
            </li> -->

        </ul>
    </div>
 </div> 
</template>

<script>
export default {
    name: 'SideBar',
    auth:true,
    methods:{
            async logout(){
                this.$auth.logout();
                this.$router.push('/login');
            }
            
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family:'Poppins', sans-serif;
}
.nav { 
  position: relative;
  min-height: 100vh;
  width:100%;
  overflow: hidden;
}
.logo_content img{
    display: flex;
    height: 50px;
    width: 80%;
    align-items: center;
   margin-bottom: 5%;
    }
.header{
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 270px;
      background: #202020;
      padding: 6px 14px;
      transition: all 0.5s ease;
      font-size: 14px;
}
.header ul li{
    position: relative;
    height: 50px;
    width: 100%;
    margin: 0 5px;
    list-style: none;
    line-height: 40px;
}
.header input{
    position: absolute;
    height: 75%;
    width: 100%;
    left: 0;
    top: 0;
    border-radius: 12px;
    outline: none;
    border: none;
    background:  #f3f3ec;
    padding-left: 50px;
    font-size: 12px;
    color: #565643;

}
.header .bx-search{
    position: absolute;
    z-index: 99;
    color: #565643;
    margin-top: -2%;
}
.header .rubrique{
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: all 0.4s ease;
    border-radius: 8px; 
}
.header .rubrique:hover{
    color: #11101d;
    background: #fff;

}         
.header li i{
    height: 50px;
    min-width: 50px;
    border-radius: 12px;
    line-height: 50px;
    text-align: center;
} 

.recherche{
  margin-top: 20%;
}
.decon{
    margin-top:50% ;
}
</style>