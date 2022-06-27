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
                        <span class="links_name">Tableau de bord</span>
                    </div>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/achats/achat">
                    <div class="rubrique">
                        <i class='bx bx-cart-add'></i>
                        <span class="links_name">Achats</span>
                    </div>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ventes/vente">
                    <div class="rubrique">
                        <i class='bx bxs-log-in-circle' ></i>
                        <span class="links_name">Ventes</span>
                    </div>
                </NuxtLink>
            </li>
            <li>
                <NuxtLink to="/ventes/list_vente">
                    <div class="rubrique">
                        <i class='bx bxs-save'></i>
                        <span class="links_name">Factures des ventes</span>
                    </div>
                </NuxtLink>
            </li>
            <!-- <li>
                <NuxtLink to="/navigation">
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
                <NuxtLink to="/corbeille">
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
            <div class="bas-page">
                    <img src="./images/user.png" alt="logo" srcset="">
                    <span class="user_name">{{$auth.user.name}}</span> 
                    <div class="custom-btn btn-5" @click="logout">
                    <!-- <i class='bx bx-log-out'></i> -->
                    Déconnexion</div>    
            </div>

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
   margin-bottom: 3%;
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
      font-size: 12px;
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
.header.rubrique.active,
.header .rubrique:hover{
    color: #11101d !important;
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
  margin-top: 10%;
}

.bas-page{
    margin-top: 10%;
    display: flex;    
    border: 1px solid rgb(88, 87, 87);
    padding: 10px;
}

.bas-page img{
    width: 45px;
    border: 1px solid transparent;
    border-radius: 100%;
    cursor: pointer;
}
.bas-page .user_name{
    font-size: 12px;
    padding: 10px;
    color: white;
}

.bas-page .btn{
    margin-left: 7%;
    padding: 10px;
    cursor: pointer;
    border: 1px solid ;
    background-color: red;
    border-radius: 10px;
    font-size: 13px;
     color: rgba(255, 255, 255, 0.86);
}

.bas-page .btn:hover{
     background-color: rgba(255, 255, 255, 0.86);
     color: red;
}

.btn i{
    font-size: 18px;
    padding: 3px;

}


.custom-btn {
    width: 130px;
    height: 40px;
    color: #fff;
    border-radius: 5px;
    padding: 10px 25px;
    font-family: 'Lato', sans-serif;
    font-weight: 500;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
    display: inline-block;
     box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
     7px 7px 20px 0px rgba(0,0,0,.1),
     4px 4px 5px 0px rgba(0,0,0,.1);
    outline: none;
  }

.btn-5 {
    text-align: center;
    width: 130px;
    height: 40px;
    line-height: 42px;
    padding: 0;
    border: none;
    background: rgb(255,27,0);
    background: linear-gradient(0deg, rgba(255,27,0,1) 0%, rgba(251,75,2,1) 100%);
  }

.btn-5:hover {
    color: #f0094a;
    background: transparent;
     box-shadow:none;
  }

.btn-5:before,
.btn-5:after{
    content:'';
    position:absolute;
    top:0;
    right:0;
    height:2px;
    width:0;
    background: #f0094a;
    box-shadow:
     -1px -1px 5px 0px #fff,
     7px 7px 20px 0px #0003,
     4px 4px 5px 0px #0002;
    transition:400ms ease all;
  }

.btn-5:after{
    right:inherit;
    top:inherit;
    left:0;
    bottom:0;
  }

.btn-5:hover:before,
.btn-5:hover:after{
    width:100%;
    transition:800ms ease all;
  }

</style>