<template>
    <div class="content">
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css">
       <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css">

        <nav class="navbar navbar-expand-lg  nav-bar">
            <div class="container">
                <NuxtLink to="/">
                    <img src="/images/logo.png" class="logo-img" alt="">
                </NuxtLink>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <div class="col-md-7">
                        <ul class="navbar-nav  mb-2 mb-lg-0">
                            <li class="nav-item">
                                <NuxtLink to="" class="nav-link active">A propos</NuxtLink>
                            </li>
                            <!-- <li class="nav-item">
                                <NuxtLink to="" class="nav-link">Services</NuxtLink>
                            </li> -->
                        </ul>
                    </div>
                    <div class="col-md-5 row my-auto">
                        <div class="col-md-10 d-flex btns">
                            <NuxtLink to="/login" class="btn btn-outline-primary btn-offer mx-auto" >Connexion</NuxtLink>
                            <span class="mx-2"></span>
                            <NuxtLink to="/register" class="btn btn-outline-primary btn-offer mx-auto" >Inscription</NuxtLink>
                        <!-- </div> -->
                        <!-- <div class="col-md-2 m-auto d-flex btns aligns-items-center justify-content-center"> -->
                            <span class="mx-2"></span>
                            <img src="/images/france.png" alt="français" width="30" height="25" class="my-auto">
                            <span class="mx-2">/</span>
                            <img src="/images/usa.png" alt="anglais" width="35" height="25" class="my-auto">
                        </div>

                    </div>
                </div>
            </div>
        </nav>

        <div class="main-banner wow fadeIn" id="top" data-wow-duration="1s" data-wow-delay="0.5s">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="row">
                  <div class="col-lg-5 align-self-center">
                    <div class="left-content show-up header-text wow fadeInLeft" data-wow-duration="1s" data-wow-delay="1s">
                      <div class="row">
                        <div class="col-lg-12">
                          <h2>APPLICATION DE GESTION INTEGRE POUR VOTRE ENTREPRISE</h2>
                          <p>TOCMANAGER est une application de gestion conçue par une équipe de jeunes africains ayant décidé de participer activement au
                              développement du continent à travers le numérique.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-lg-7">
                    <div class="right-image wow fadeInRight" data-wow-duration="1s" data-wow-delay="0.5s">
                      <img src="/images/toc.png" alt="">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="col-md-8 mx-auto section2">
          <div class="description">
              <h2>Le Coup de Grace pour votre entreprise ???</h2>
              Tocmanager est une application de gestion commerciale accessible sur ordinateur et smartphone conçue par le jeune Béninois <b>Édouard DJOSSA</b> et <b>son équipe</b>. Utilisable partout en déplacement et n'importe quand. Elle conserve vos données en cas de désagrément. Avec un abonnement mensuel de 5.000 francs CFA et de 50.000 francs l'an, vous bénéficiez des mises à jour et de l'assistance technique sans aucun autre frais supplémentaire ! Ses fonctionnalités sont diverses et variées nous avons: La gestion des stocks et de trésorerie en temps réel, recouvrement des dettes client et créance fournisseurs, impression de facture ou ticket de caisse normalisé, gestion des ressources humaines... Souscrivez à l'abonnement chez nous et bénéficiez d'une réduction de 1000 francs CFA sur les 5000 francs CFA et de 4000 francs CFA sur les 50000 francs CFA.
          </div>
        </div>

        <div class="row homme">
            <div class="col-md-6 my-auto">
                <div class="rectangle-homme"></div>
                <img src="/images/homme1.png" alt="">
            </div>
            <div class="col-md-6 section31">
              <div id="services" class="services">
                  <div class="container">
                    <div class="row">
                      <div class="col-md-6">
                      <div class="service-item first-service">
                          <div class="icon"><img src="/images/interdit.jpg" alt="" class="service-img"></div>
                          <h4>PREVENIR LES CAS DE VOL</h4>
                          <p><b>Tocmanager</b> vous permet de suivre en temps réel vos stocks et cependant 
                              d'éviter ainsi les nombreux cas de vol ou encore les autres pertes inexpliquées.</p>
                          <div class="text-button">
                          <!-- <a href="#">Read More <i class="fa fa-arrow-right"></i></a> -->
                          </div>
                      </div>
                      </div>
                      <div class="col-md-6">
                      <div class="service-item second-service">
                          <div class="icon"><img src="/images/creance.jpg" alt="" class="service-img"></div>
                          <h4>RECOUVRER LES DETTES ET LES CREANCES</h4>
                          <p>L'application vous offre une possibilité directe de rentrer en contact avec vos clients ou vos fournisseurs afin 
                              de recouvrir respectivement aux dettes ou aux créances.
                          </p>
                          <div class="text-button">
                          <!-- <a href="#">Read More <i class="fa fa-arrow-right"></i></a> -->
                          </div>
                      </div>
                      </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                        <div class="service-item third-service">
                            <div class="icon"><img src="/images/gestion.jpg" alt="" class="service-img"></div>
                            <h4>GERER LE STOCK ET LA TRESORERIE </h4>
                            <p>Avec ses diverses fonctionalités, vous avez la possibilité de gérer efficacement à la fois 
                                le stock de vos marchandises et la trésorerie juste avec des clics.</p>
                            <div class="text-button">
                            <!-- <a href="#">Read More <i class="fa fa-arrow-right"></i></a> -->
                            </div>
                        </div>
                        </div>
                        <div class="col-md-6">
                        <div class="service-item fourth-service">
                            <div class="icon"><img src="/images/toc.png" alt="" class="service-img"></div>
                            <h4>UTILISABLE SUR PC OU SMARTPHONE</h4>
                            <p>Toujours dans l'optique de vous faciliter la tache, vous pouvez utiliser <b>Tocmanager</b>
                            n'importe où et n'importe quand; que ce soit sur téléphone ou sur votre ordinateur.</p>
                            <div class="text-button">
                            <!-- <a href="#">Read More <i class="fa fa-arrow-right"></i></a> -->
                            </div>
                        </div>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
        </div>

        <div id="services" class="services section3">
            <div class="container">
            <div class="row">
                <div class="col-lg-3">
                <div class="service-item first-service">
                    <div class="icon"><img src="/images/interdit.jpg" alt="" class="service-img"></div>
                    <h4>PREVENIR LES CAS DE VOL</h4>
                    <p><b>Tocmanager</b> vous permet de suivre en temps réel vos stocks et cependant 
                        d'éviter ainsi les nombreux cas de vol ou encore les autres pertes inexpliquées.</p>
                    <div class="text-button">
                    </div>
                </div>
                </div>
                <div class="col-lg-3">
                <div class="service-item second-service">
                    <div class="icon"><img src="/images/creance.jpg" alt="" class="service-img"></div>
                    <h4>RECOUVRER LES DETTES ET LES CREANCES</h4>
                    <p>L'application vous offre une possibilité directe de rentrer en contact avec vos clients ou vos fournisseurs afin 
                        de recouvrir respectivement aux dettes ou aux créances.
                    </p>
                    <div class="text-button">
                    </div>
                </div>
                </div>
                <div class="col-lg-3">
                <div class="service-item third-service">
                    <div class="icon"><img src="/images/gestion.jpg" alt="" class="service-img"></div>
                    <h4>GERER LE STOCK ET LA TRESORERIE </h4>
                    <p>Avec ses diverses fonctionalités, vous avez la possibilité de gérer efficacement à la fois 
                        le stock de vos marchandises et la trésorerie juste avec des clics.</p>
                    <div class="text-button">
                    </div>
                </div>
                </div>
                <div class="col-lg-3">
                <div class="service-item fourth-service">
                    <div class="icon"><img src="/images/toc.png" alt="" class="service-img"></div>
                    <h4>UTILISABLE SUR PC OU SMARTPHONE</h4>
                    <p>Toujours dans l'optique de vous faciliter la tache, vous pouvez utiliser <b>Tocmanager</b>
                    n'importe où et n'importe quand; que ce soit sur téléphone ou sur votre ordinateur.</p>
                    <div class="text-button">
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>

        <div id="about" class="about-us section">
          <div class="container">
            <div class="row">
              <div class="col-lg-12">
                <div class="section-heading">
                  <h4 class="text-center">A propos de notre <em>équipe</em></h4>
                </div>
                <div class="row">
                  <div class="col-lg-3">
                    <div class="box-item">
                      <h4>Maintenance</h4>
                      <p>Résolution de tous les problèmes techniques</p>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="box-item">
                      <h4>Aide &amp; Support</h4>
                      <p>Contactez - nous 24h/24 7j/7</p>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="box-item">
                      <h4>Manuels d'utilisation</h4>
                      <p>Afin de faciliter votre expérience utilisateur</p>
                    </div>
                  </div>
                  <div class="col-lg-3">
                    <div class="box-item">
                      <h4>Co. Development</h4>
                      <p>Lorem Ipsum Text</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="pricing" class="pricing-tables">
            <div class="container">
            <div class="row">
                <div class="col-lg-8 offset-lg-2">
                <div class="section-heading">
                    <h4>Découvrez nos offres !!!</h4>
                    <p>Accédez aux diverses fonctionnalités de <b>Tocmanager</b> en choississant un pack d'abonnement selon votre <em>budget</em>.</p>
                </div>
                </div>
                <div class="col-lg-10 row mx-auto">
                    <div class="col-lg-5">
                        <div class="pricing-item-pro">
                            <span class="price">5000F</span>
                            <h4>Abonnement mensuel</h4>
                            <div class="icon">
                            <img src="/images/toc.png" alt="">
                            </div>
                            <ul>
                            <li>2 SEMAINES D'ESSAI</li>
                            <li>ASSISTANCE TECHNIQUE 24H/24</li>
                            <li>FORMATION GRATUITE</li>
                            <li>ACCES AUX DIVERSES FONCTIONNALITES</li>
                            <li class="non-function">Fastest Network</li>
                            <!-- <li class="non-function">More Options</li> -->
                            </ul>
                            <div class="border-button">
                            <NuxtLink to="#" class="btn btn-outline-primary">En savoir plus</NuxtLink>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-2"></div>
                    <div class="col-lg-5">
                        <div class="pricing-item-pro">
                            <span class="price">50000 F</span>
                            <h4>Abonnement annuel</h4>
                            <div class="icon">
                            <img src="/images/toc.png" alt="">
                            </div>
                            <ul>
                            <li>2 SEMAINES D'ESSAI</li>
                            <li>ASSISTANCE TECHNIQUE 24H/24</li>
                            <li>FORMATION GRATUITE</li>
                            <li>ACCES AUX DIVERSES FONCTIONNALITES</li>
                            <!-- <li class="non-function">Fastest Network</li>
                            <li class="non-function">More Options</li> -->
                            </ul>
                            <div class="border-button">
                            <NuxtLink to="#" class="btn btn-outline-primary">En savoir plus</NuxtLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div> 

        <div class="row fonctions">
            <div class="col-md-1">
            </div>
            <div class="col-md-3 fonction">
                <div class="i-cercle"><i class="fa-solid fa-cart-shopping"></i></div>
                <h4 class="fonction-titre">Stock</h4><br><br>
                <p>You are allowed to use the Chain App Dev HTML template. 
                    Feel free to modify or edit this layout.</p>
            </div>
            <div class="col-md-3 fonction">
                <div class="i-cercle"><i class="fa-sharp fa-solid fa-building-columns"></i></div>
                <h4 class="fonction-titre">Trésorerie</h4><br><br>
                <p>You are allowed to use the Chain App Dev HTML template. 
                    Feel free to modify or edit this layout.</p>
            </div>
            <div class="col-md-3 fonction">
                <div class="i-cercle"><i class="fa-sharp fa-solid fa-file-circle-check"></i></div>
                <h4 class="fonction-titre">Facturation</h4><br><br>
                <p>You are allowed to use the Chain App Dev HTML template. 
                    Feel free to modify or edit this layout.</p>
            </div>
            <div class="col-md-1">
            </div>
        </div>

        <footer>
            <div class="row">
                <div class="col-md-4 p-5">
                    <h4 class="title-toc">TOCMANAGER</h4>
                    <p>TOCMANAGER est une application de gestion conçue par 
                        par une équipe de jeunes africains ayant décidé de 
                        participer activement au développement 
                        du continent à travers le numérique.
                    </p>
                </div>
                <div class="col-md-3 p-3">
                    <h6>SERVICE CLIENT</h6>
                    <ul>
                        <li>NOUS CONTACTER</li>
                        <li>INSTALLATION & SUIVI</li>
                        <li>RETOUR</li>
                        <li>FAQ</li>
                    </ul>
                </div>
                <div class="col-md-3 p-3">
                    <h6>INFORMATIONS PRATIQUES</h6>
                    <ul>
                        <li>CONFIDENTIALITE</li>
                        <li>MENTION LEGALES</li>
                        <li>CONDITION D'UTILISATION</li>
                    </ul>
                </div>
                <div class="col-md-2 p-3 address">
                    <h6>ADRESSE CLIENT</h6>
                    <ul>
                        <li><i class="fa fa-address-book-o" aria-hidden="true"></i> : Abomey - Calavi</li>
                        <li><i class="fa fa-phone-square" aria-hidden="true"></i> : +229 97 98 47 22</li>
                        <li><i class="fa fa-envelope" aria-hidden="true"></i> : contact@tocmanager.com</li>
                    </ul>
                    <div class="social">
                        <h6 class="text-right mt-4">Rejoignez-nous :</h6><hr>
                        <div class="d-flex">
                            <div class="mx-2 social-icon"><i class="fa-brands fa-whatsapp"></i></div>
                            <div class="mx-2 social-icon"><i class="fa-brands fa-facebook"></i></div>
                            <div class="mx-2 social-icon"><i class="fa-brands fa-telegram"></i></div>
                            <div class="mx-2 social-icon"><i class="fa-brands fa-telegram"></i></div>
                        </div>
                    </div>
                </div>

            </div>
            <hr class="text-light">
            <div class="text-center">
                Copyright © 2022 - Tous droits réservés 
            </div>
        </footer>
  
    </div>
  </template>
  
  <script>
  export default {
      auth: false,
      layout: 'landing',
    
        mounted(){
        },
  
  }
  </script>
  
  <style scoped>

  
  .content{
    overflow: hidden;
  }

  .navbar{
    box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
    height: 80px;
  }
   
/* 
---------------------------------------------
Banner Style
--------------------------------------------- 
*/

.main-banner {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  padding: 250px 120px 150px 0;
  position: relative;
  overflow: hidden;
}

.main-banner:after {
  content: '';
  background-image: url(/images/slider-left-dec.png);
  background-repeat: no-repeat;
  background-size: contain;
  position: absolute;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.main-banner .left-content {
  margin-right: 15px;
}

.main-banner .left-content h2 {
  z-index: 2;
  position: relative;
  font-weight: 700;
  line-height: 70px;
  font-size: 50px;
  margin-bottom: 20px;
}

.main-banner .left-content p {
  z-index: 2;
  position: relative;
  margin-bottom: 45px;
  color: #2a2a2a;
  font-weight: 400;
}

.main-banner .left-content .first-button {
  margin-right: 15px;
}

.main-banner .left-content .white-button {
  display: inline-block;
}

.main-banner .right-image {
  text-align: center;
  position: relative;
  z-index: 20;
}

.main-banner .right-image img {
  width: 100%;
}

.main-banner .left-content .white-button a {
  background-color: #4b8ef1;
  color: #fff !important;
}


  .section2{
    margin: 100px 0;
  }

  .navbar-toggler-icon{
    color: #fff;
  }

  .rectangle-homme{
      position: absolute;
      height: 532.69px;
      /* left: 534px;
      top: 70.67px; */
      width: 45%;
      background: linear-gradient(180deg, #2E9DDC 0%, #FFFAFA 100%);
      /* border-radius: 475px; */
      border-top-right-radius: 470px;
      border-bottom-right-radius: 470px;
      /* border-bottom-right-radius: 470px; */
      /* transform: rotate(-14.07deg); */
      z-index: 1;
      overflow: hidden;
  }


  .homme img{
    width: 100%;
    z-index: 9;
    position: relative;
    padding-top: 10px;
  }

  .description{
    padding: 20px;
    border: 1px solid transparent;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
  }

  .description h2{
    color: #2E9DDC;
    font-size: 30px;
    font-weight: 600;
    margin: 20px 0;
    text-align: center;
  }

  
/* 
---------------------------------------------
Services Style
--------------------------------------------- 
*/

.services {
  /* padding: 130px 0; */
  position: relative;
  background-color: #fff;
}

.services  .section-heading p {
  margin-top: 10px;
  margin-left: 18%;
  margin-right: 18%;
}

.services .container-fluid {
  padding-left: 65px;
  padding-right: 65px;
}

.services:after {
  content: '';
  /* background-image: url(../images/services-left-dec.png); */
  background-repeat: no-repeat;
  position: absolute;
  left: 0;
  bottom: -300px;
  width: 261px;
  height: 368px;
  z-index: 0;
}

.services:before {
  content: '';
  /* background-image: url(../images/services-right-dec.png); */
  background-repeat: no-repeat;
  position: absolute;
  right: 0;
  top: 0;
  width: 1136px;
  height: 244px;
  z-index: 0;
}

.services .section-heading {
  text-align: center;
  margin-bottom: 80px;
}

.services .section-heading .line-dec {
  margin: 0 auto;
}

.service-item {
  position: relative;
  z-index: 1;
  padding: 30px;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.1);
  background-color: #fff;
  border-radius: 10px;
  border-top-right-radius: 50px;
  transition: all .3s;
  height: 450px;
  margin: 20px 0;
}

.service-item .icon img {
  width: 100%;
  margin-bottom: 15px;
}

.service-item h4 {
  transition: all .3s;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 15px;
  text-align: center;
}

.service-item p {
  transition: all .3s;
  font-size: 15px;
  margin-bottom: 20px;
  text-align: justify;
}

.section3{
  display: none;
}



/*
---------------------------------------------
About Us
---------------------------------------------
*/

.about-us {
  padding-top: 130px;
  position: relative;
}

.about-us .section-heading {
  margin-bottom: 45px;
}

.about-us .box-item {
  box-shadow: 0px 0px 15px rgba(0,0,0,0.07);
  padding: 10px 30px;
  background-color: #2E9DDC;
  color: #fff;
  border-radius: 40px;
  margin-bottom: 30px;
  height: 100px;
  text-align: center;
}

.about-us .box-item h4 a {
  font-size: 20px;
  font-weight: 700;
  margin-top: 8px;
  color: #2a2a2a;
  transition: all .3s;
}

.about-us .box-item p {
  margin-bottom: 0px;
}

.about-us .box-item:hover h4 a {
  color: #4b8ef1;
}

.about-us .gradient-button {
  margin-top: 30px;
  margin-bottom: 10px;
}

.about-us span {
  font-size: 14px;
  color: #7a7a7a;
}

.about-us .right-image {
  position: relative;
  z-index: 1;
}

.about-us:after {
  /* background-image: url(../images/about-bg.jpg); */
  width: 777px;
  height: 1132px;
  content: '';
  position: absolute;
  background-repeat: no-repeat;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  z-index: 0;
}





/* 
---------------------------------------------
The Clients
---------------------------------------------
*/

.pricing-tables {
  padding: 50px 0;
  background-color: #fff;
}

.pricing-tables  .section-heading {
  text-align: center;
  margin-bottom: 80px;
}

.pricing-tables  .section-heading p {
  margin-top: 10px;
  margin-left: 18%;
  margin-right: 18%;
}

.pricing-item-regular {
  margin-top: 30px;
  box-shadow: 0px 0px 15px rgba(0,0,0,0.07);
  border-radius: 50px;
  padding: 90px 30px;
  text-align: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
  background-color: #fff;
}

.pricing-item-regular:before {
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(/images/regular-table-top.png);
  z-index: 0;
  content: '';
  width: 274px;
  height: 221px;
}

.pricing-item-regular:after {
  position: absolute;
  bottom: 0;
  right: 0;
  background-image: url(/images/regular-table-bottom.png);
  z-index: 0;
  content: '';
  width: 370px;
  height: 171px;
}

.pricing-item-regular span.price {
  font-size: 40px;
  color: #fff;
  position: absolute;
  font-weight: 700;
  z-index: 1;
  left: 30px;
  top: 30px;
}

.pricing-item-regular h4 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 30px;
}

.pricing-item-regular .icon img {
  width: 120px;
  height: 106px;
  margin-bottom: 30px;
}

.pricing-item-regular ul li {
  color: #4b8ef1;
  font-size: 15px;
  margin-bottom: 15px;
}

.pricing-item-regular ul li:last-child {
  margin-bottom: 0px;
}

.pricing-item-regular ul li.non-function {
  color: #afafaf;
  text-decoration: line-through;
}

.pricing-item-regular .border-button {
  position: relative;
  z-index: 1;
  margin-top: 40px;
}

.pricing-item-pro {
  box-shadow: 0px 0px 15px rgba(0,0,0,0.07);
  border-radius: 50px;
  padding: 120px 30px;
  text-align: center;
  position: relative;
  z-index: 1;
  overflow: hidden;
  background-color: #fff;
  height: 600px;
}

.pricing-item-pro:before {
  position: absolute;
  top: 0;
  left: 0;
  background-image: url(/images/pro-table-top.png);
  z-index: 0;
  content: '';
  width: 281px;
  height: 251px;
}

.pricing-item-pro:after {
  position: absolute;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: url(/images/pro-table-bottom.png);
  z-index: 0;
  content: '';
  width: 100%;
  height: 201px;
}

.pricing-item-pro span.price {
  font-size: 38px;
  color: #fff;
  position: absolute;
  font-weight: 700;
  z-index: 1;
  left: 10px;
  top: 30px;
}

.pricing-item-pro h4 {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 30px;
}

.pricing-item-pro .icon img {
  width: 120px;
  height: 106px;
  margin-bottom: 30px;
}

.pricing-item-pro ul li {
  color: #4b8ef1;
  font-size: 15px;
  margin-bottom: 15px;
  list-style: none;
}

.pricing-item-pro ul li:last-child {
  margin-bottom: 0px;
}

.pricing-item-pro ul li.non-function {
  color: #afafaf;
  text-decoration: line-through;
}

.pricing-item-pro .border-button {
  position: relative;
  z-index: 1;
  margin-top: 40px;
}



footer{
      background-color: rgb(0, 7, 11);
      color: white;
      font-weight: 400;
      border-top-left-radius: 120px;
      border-bottom-right-radius: 80px;
      padding: 30px 0;
      font-size: 15px;
  }
  
  footer ul li{
      list-style: none;
      margin-left: -25px;
  }
  
  .foot{
      background-color: black;
      z-index: 1;
  }
  .title-toc{
      font-size: 35px;
      font-weight: 800;
  }
  
  .address{
      border-left: 1px solid white;
  }
  
  .mobile{
      display: none;
  }
  
  .social-icon{
      border: 1px solid;
      border-radius: 100%;
      padding: 5px 10px;
      background: #fff;
      color: #2E9DDC;
      cursor: pointer;
  }








  
  .fonction{
      border: 1px solid black;
      background: linear-gradient(157.25deg, #2E9DDC 43.26%, rgba(255, 255, 255, 0) 97.71%);
      opacity: 0.6;
      width: 200px;
      filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25)) drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
      padding: 30px;
      height: 400px;
      text-align: center;
      margin-top: 12%;
  }
  
  .fonction:hover{
      border: 1px solid black;
      background: #06a0f9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
      height: max-content;
      text-align: center;
      padding: 6% 1%; 
      cursor: pointer;
      padding-top: 120px;
  }
  
  
  .fonction i{
      text-align: center;
      font-size: 75px;
  }
  
  /* .fonction i:hover{
      text-align: center;
      font-size: 75px;
  } */
  
  .fonction-titre{
      font-size: 28px;
      font-weight: 800;
  }
  
  .i-cercle{
      border: 1px solid white;
      background-color: white;
      padding: 25px;
      border-radius: 100%;
  }
  
  /* .i-cercle1{
      border: 1px solid white;
      background-color: white;
      padding: 45px;
      border-radius: 100%;
  } */
  
  .fonctions{
      margin: 40px 25%;
  }



  @media screen and (max-width: 900px) {
    .navbar{
      text-align: center;
    }


    .navbar .collapse{
      border: 1px solid transparent;
      margin: 10px 0;
      padding-top: 5px;
      padding-bottom: 15px;
      background-color: #eaeaea;
      z-index: 9;
    }

    .navbar .collapse ul li{
      border-bottom: 1px solid rgb(177, 176, 176);
      padding: 5px;
    }

    .btns{
        padding: 10px;
    }

    .service-item, .pricing-item-pro{
        margin-bottom: 35px;
    }

    .toc{
        margin-top: 80px;
    }

    .services{
      margin: 100px 0;
    }

    .section3{
      display: block;
    }

    .section31{
      display: none;
    }

    .rectangle-oblique{
      position: absolute;
      height: 250.69px;
      margin-top: 60px;
      width: 100%;
      background: linear-gradient(180deg, #2E9DDC 0%, #FFFAFA 100%);
      /* border-radius: 475px; */
      border-top-left-radius: 470px;
      border-bottom-left-radius: 470px;
      /* border-bottom-right-radius: 470px; */
      /* transform: rotate(-14.07deg); */
      z-index: 1;
      overflow: hidden;
    }


    .rectangle-homme{
        position: absolute;
        height: 250.69px;
        width: 100%;
        background: linear-gradient(180deg, #2E9DDC 0%, #FFFAFA 100%);
        /* border-radius: 475px; */
        border-top-right-radius: 470px;
        border-bottom-right-radius: 470px;
        margin-top: -80px;
        z-index: 1;
        overflow: hidden;
    }
    
    .homme img{
        margin-top: -80px;
        margin-left: 30px;
    }
    .description{
        margin: 0 30px;
    }
  }

  

/* 
---------------------------------------------
responsive
--------------------------------------------- 
*/



@media (max-width: 1200px) {
  
  .main-banner .left-content h2 {
    z-index: 2;
    position: relative;
    font-weight: 700;
    line-height: 70px;
    font-size: 50px;
    margin-bottom: 20px;
  }

  .main-banner .left-content p {
    margin-bottom: 45px;
  }
}

@media (max-width: 992px) {
  .header-area {
    background-color: #fff;
  }
  .main-banner:after {
    display: none;
  } 
  .main-banner .left-content h2 {
    color: #2a2a2a;
    margin-right: 0;
  }
  .main-banner .left-content p {
    color: #afafaf;
    margin-right: 0;
  }
  .main-banner .left-content .white-button a {
    background-color: #4b8ef1;
    color: #fff !important;
  }
  form#contact {
    overflow: hidden;
  }
  .header-area .main-nav .logo h4 {
    font-size: 20px;
  }
  .main-banner .left-content {
    margin-right: 0px;
  }
  .main-banner {
    text-align: center;
    padding: 70px 0px 30px 0px;
  }
  .main-banner:before {
    display: none;
  }
  .main-banner .right-image {
    margin: 30px auto 0px auto;
    text-align: center;
  }
}
  
  </style>
  