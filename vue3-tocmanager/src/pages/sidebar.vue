<template>
<link href='https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css' rel='stylesheet'>
 <div class="nav">
   <div class="sidebare">
    <div class="logo_content">
    <img src="./logo/logo.png" alt="logo" srcset=""><hr>
    </div> 
    <i class='bx bx-menu' id="btn"></i>
   
    <ul class="nav_list">
      <li>
        <a href="#">
         <i class='bx bx-search'></i>
          <input type="text" placeholder="Rechercher...">
        </a>
        <span class="tooltip">Recherche</span>
      </li>
      <li>
        <a href="#">
          <i class='bx bx-grid-alt'></i>
          <span class="links_name">Dashboard</span>
        </a>
        <span class="tooltip">Dashboard</span>
      </li>
      <li><router-link to='/achat'>
        <a href="#">
           <i class='bx bx-cart-add'></i>
          <span class="links_name">Nouvel achat</span>
        </a>
       <span class="tooltip">enregistrer un achat</span></router-link>
      </li>
      <li><router-link to='/vente'>
        <a href="#">
          <i class='bx bxs-log-in-circle' ></i>
          <span class="links_name">Nouvelle vente</span>
        </a>
       <span class="tooltip">enregistrer une vente</span></router-link>
      </li>
      <li><router-link to='/ajout'>
        <a href="#">
           <i class='bx bx-alarm-add'></i>
          <span class="links_name">Ajouter un groupe</span>
        </a>
       <span class="tooltip">ajouter </span></router-link>
      </li>

      <li> <router-link to='/liste'>
        <a href="#">
          <i class='bx bx-list-ul' ></i>
          <span class="links_name">Lister les entités</span>
        </a>
       <span class="tooltip">Liste</span></router-link>
      </li>   

       <li><router-link to='/listproduit'>
        <a href="#">
          <i class='bx bxl-product-hunt'></i>
          <span class="links_name">Tous les Produits</span>
        </a>
        <span class="tooltip">Produits</span></router-link>
      </li>

      <li><router-link to='/listutilisateur'>
        <a href="#">
          <i class='bx bx-user' ></i>
          <span class="links_name">Utilisateurs</span>
        </a>
        <span class="tooltip">Dashboard</span></router-link>
      </li> 
      <li> <router-link to='/corbeille'>
        <a href="#">
          <i class='bx bxs-trash'></i>
          <span class="links_name">Corbeille</span>
        </a>
        <span class="tooltip">objets supprimés</span></router-link>
      </li> 
      <div class="decon">
      <li>
        <a href="#">
          <i class='bx bx-log-out'></i>
          <span class="links_name">Deconnexion</span>
        </a>
        <span class="tooltip">Deconnexion</span>
      </li></div>
    </ul>
  </div>

 </div> 
</template>

<script>
export default {
  name: 'SideBar',
  components: {
    
  },

}
</script>

<style lang="scss">

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
    .sidebare{
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 280px;
      background: #70706d;
      padding: 6px 14px;
      transition: all 0.5s ease;

      #btn{
          position: absolute;
          color: rgb(3, 0, 0);
          left: 92%;
          top: 8px;
          font-size: 30px;
          height: 50px;
          width: 50px;
          text-align: center;
          line-height: 50px; 
          transform: translateX(-50%);
        }

      ul{
        margin-top: 20px;
        margin-left: -15%;

        .decon{
          margin-top:50% ;
        }

        li{
          position: relative;
          height: 50px;
          width: 100%;
          margin: 0 5px;
          list-style: none;
          line-height: 40px;

        &:hover .tooltip{
          transition: all 0.5s ease;
          top: 50%;
          opacity: 1; 
        }
        .tooltip{
            position: absolute;
            left: 122px;
            top: 0;
            transform: translateY(-50%);
            border-radius: 6px;
            height: 35px;
            width: 122px;
            background: rgb(10, 10, 10);
            line-height: 35px;
            text-align: center;
            box-shadow: 0 5px 10px rgba(254, 246, 246, 0.2);
            transition: 0s;
            opacity: 0;
            pointer-events: none;
            color: #fff;
          }

          input{
            position: absolute;
            height: 100%;
            width: 100%;
            left: 0;
            top: 0;
            border-radius: 12px;
            outline: none;
            border: none;
            background:  #565643;
            padding-left: 50px;
            font-size: 18px;
            color: #fff;
          }
          
          .bx-search{
            position: absolute;
            z-index: 99;
            margin-top: 20%;
            color: #fff;
          
          }

          a{
            color: #fff;
            display: flex;
            align-items: center;
            text-decoration: none;
            transition: all 0.4s ease;
            border-radius: 8px;  
           
          i{
              height: 50px;
              min-width: 50px;
              border-radius: 12px;
              line-height: 50px;
              text-align: center;
          }
            &:hover{
              color: #11101d;
              background: #fff;
            }         
          } 

        }
      }
      .logo_content{
        img{
          display: flex;
          height: 50px;
          width: 80%;
          align-items: center;
        }
        
      
     }
    }

}
</style>
