<template>
    <div>
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
                  <!-- <ul class="navbar-nav ms-auto mb-2 mb-lg-0"></ul> -->
              <div class="col-md-4">
                  <ul class="navbar-nav  mb-2 mb-lg-0">
                      <li class="nav-item mx-4">
                          <NuxtLink to="" class="nav-link">A propos</NuxtLink>
                      </li>
                      <li class="nav-item">
                          <NuxtLink to="" class="nav-link">Services</NuxtLink>
                      </li>
                  </ul>
              </div>
              <div class="d-flex">
                  <div>
                      <a href="/login"><button class="btn btn-outline-primary btn-offer" >Connexion</button></a>
                  </div>
                  <div>
                      <a href="/register"><button class="btn btn-outline-primary btn-offer" >Inscription</button></a>
                  </div>
                  <!-- <div v-if="this.$auth.$state.loggedIn == true && role =='admin' ">
                      <a href="/dashboard"><button class="btn btn-outline-primary btn-offer" >Tableau de Bord</button></a>
                  </div>
                  <div v-if="this.$auth.$state.loggedIn == true">
                      <a href="/ventes/vente"><button class="btn btn-outline-warning btn-offer" >Vente</button></a>
                  </div> -->
                  <div><img src="/images/france.png" alt="français" width="30" class="mx-1"></div>/
                  <div><img src="/images/usa.png" alt="anglais" width="35" class="mx-1"></div>
  <!-- <a href="#" onclick="doGTranslate('en|en');return false;" title="English" class="gflag nturl" style="background-position:-0px -0px;"><img src="//gtranslate.net/flags/blank.png" height="16" width="16" alt="English" /></a><a href="#" onclick="doGTranslate('en|fr');return false;" title="French" class="gflag nturl" style="background-position:-200px -100px;"><img src="//gtranslate.net/flags/blank.png" height="16" width="16" alt="French" /></a>
  
  <div id="google_translate_element2"></div>
  <script type="text/javascript">
  function googleTranslateElementInit2() {new google.translate.TranslateElement({pageLanguage: 'en',autoDisplay: false}, 'google_translate_element2');}
  </script><script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2"></script>
  
  
  <script type="text/javascript">
  eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6 7(a,b){n{4(2.9){3 c=2.9("o");c.p(b,f,f);a.q(c)}g{3 c=2.r();a.s(\'t\'+b,c)}}u(e){}}6 h(a){4(a.8)a=a.8;4(a==\'\')v;3 b=a.w(\'|\')[1];3 c;3 d=2.x(\'y\');z(3 i=0;i<d.5;i++)4(d[i].A==\'B-C-D\')c=d[i];4(2.j(\'k\')==E||2.j(\'k\').l.5==0||c.5==0||c.l.5==0){F(6(){h(a)},G)}g{c.8=b;7(c,\'m\');7(c,\'m\')}}',43,43,'||document|var|if|length|function|GTranslateFireEvent|value|createEvent||||||true|else|doGTranslate||getElementById|google_translate_element2|innerHTML|change|try|HTMLEvents|initEvent|dispatchEvent|createEventObject|fireEvent|on|catch|return|split|getElementsByTagName|select|for|className|goog|te|combo|null|setTimeout|500'.split('|'),0,{}))
  </script> -->
  
              
              </div>
              <!-- <form class="d-flex" role="search">
                  <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                  <button class="btn btn-outline-success" type="submit">Search</button>
              </form> -->
              </div>
          </div>
      </nav>
  
  
  
  
      <section class="first-section">
          <div class="row first-page">
              <div class="col-md-4 px-5 ">
                  <h2 class="py-5 mt-5 first-page-title">APPLICATION DE GESTION <br>
                      INTEGRE POUR VOTRE <br>
                      ENTREPRISE
                  </h2>
  
                  <p class="mt-3">
                      TOCMANAGER est une application de gestion conçue par <br>
                      par une équipe de jeunes africains ayant décidé de <br>
                      participer activement au développement <br>
                      du continent à travers le numérique. <br>
  
                      <button class="btn btn-outline-primary mobile mt-3" >En savoir plus </button>
                  </p>
  
                  <button class="btn-first-page">En savoir plus <i class="fa fa-long-arrow-right" aria-hidden="true"></i></button>
              </div>
              <div class="col-md-8 row">
                  <div class="rectangle-oblique"></div>
                  <img src="/images/toc.png" alt="landing" class="toc"> 
              </div>
          </div>
      </section>
      <section class="role">
          <div class="row">
              <div class="col-md-4 ">
                  <div class="rectangle-homme"></div>
                  <div class="img-homme"><img src="/images/homme1.png" alt="" class="homme"></div>
              </div>
  
              <div class="col-md-1">
              </div>
  
              <div class="col-md-7">
                  <div class="row">
                      <div class="col-lg-5 service bloc1">
                          <div class="img">
                              <img src="/images/interdit.jpg" alt="" class="service-img">
                          </div><br><hr>
                          <h5 class="text-center mt-3">PREVENIR LE VOL ET AUTRES <br> PERTES
                              INEXPLIQUEES
                          </h5>
                          <p class="px-3">You are allowed to use the Chain App Dev HTML template. 
                              Feel free to modify or edit this layout.</p>
                      </div>
                      <!-- <div class="col-md-2">
                      </div> -->
                      <div class="col-lg-5 service">
                          <div class="img">
                              <img src="/images/creance.jpg" alt="" class="service-img">
                          </div><hr>
                          <h5 class="text-center mt-3">RECOUVRER LES DETTES<br> CLIENT ET CREANCES <br> FOURNISSEURS</h5>
                          <p class="px-3">You are allowed to use the Chain App Dev HTML template. 
                              Feel free to modify or edit this layout.</p>
                      </div>
                  </div>
                  <div class="row  mt-5">
                      <div class="col-lg-5 service bloc1">
                          <div class="img">
                              <img src="/images/gestion.jpg" alt="" class="service-img">
                          </div><br><hr>
                          <h5 class="text-center mt-3">GERER LE STOCK ET LA <br> TRESORERIE EN TEMPS <br> REEL</h5>
                          <p class="px-3">You are allowed to use the Chain App Dev HTML template. 
                              Feel free to modify or edit this layout.</p>
                      </div>
                      <!-- <div class="col-md-2">
                      </div> -->
                      <div class="col-lg-5 service ml-2">
                          <div class="img">
                              <img src="/images/toc.png" alt="" class="service-img">
                          </div><hr>
                          <h5 class="text-center mt-3">UTILISABLE SUR PC OU <br>SMARTPHONE N'IMPORTE OU,<br> 
                              N'IMPORTE QUAND</h5>
                          <p class="px-3">You are allowed to use the Chain App Dev HTML template. 
                              Feel free to modify or edit this layout.</p>
                      </div>
                  </div>
              </div>
          </div>
      </section>
      <!-- <section class="contenu">
          <div class="row">
              <div class="col-md-1">
              </div>
              
              <div class="col-md-4 py-5">
                  TOCMANAGER est une application de gestion conçue par 
                  par une équipe de jeunes africains ayant décidé de 
                  participer activement au développement 
                  du continent à travers le numérique.
              </div>
              <div class="col-md-4 py-5">
                  TOCMANAGER est une application de gestion conçue par 
                  par une équipe de jeunes africains ayant décidé de 
                  participer activement au développement 
                  du continent à travers le numérique.
              </div>
  
              <div class="col-md-1">
              </div>
          </div>
      </section> -->
      <!-- <section class="contenu">
          <div class="row">
              <div class="col-md-1">
              </div>
              
              <div class="col-md-4 py-5">
                  TOCMANAGER est une application de gestion conçue par 
                  par une équipe de jeunes africains ayant décidé de 
                  participer activement au développement 
                  du continent à travers le numérique.
              </div>
  
              <div class="col-md-2">
              </div>
  
              <div class="col-md-4 py-5">
                 
              </div>
  
              <div class="col-md-1">
              </div>
          </div>
      </section> -->
      <section class="contenu">
          <div class="col-md-6 mx-auto mt-5">
              <carousel
                  :autoplay = true
                  :autoplayTimeout = 3000
                  :navigationEnabled = "true"
                  navigationNextLabel="<i class='fa fa-arrow-right' aria-hidden='true'></i>"
                  navigationPrevLabel="<i class='fa fa-arrow-left' aria-hidden='true'></i>"
                  :paginationEnabled = true
                  :perPage="1"
                  :loop="true"
              >
                  <slide>
                      <div class="slide-img">
                          <img src="images/carousel1.jpg" alt="First slide" width="800">
                      </div>
                  </slide>
                  <slide>
                      <div class="slide-img">
                          <img src="images/carousel.jpg" alt="First slide" width="800">
                      </div>
                  </slide>
                  <slide>
                      <div class="slide-img">
                          <img src="images/poignee.jpg" alt="First slide" width="800">
                      </div>
                  </slide>
              </carousel>
          </div>
      </section>
      <section class="cadre-offre">
          <div class="text-offre">
              <div class="title-offre">
                  NOS OFFRES
              </div>
              <div class="row">
                  <div class="col-md-1">
                  </div>
                  <div class="col-md-4 mx-auto offre">
                      <div class="img">
                          <img src="/images/poignee.jpg" alt="" class="img-offer mx-5  w-75">
                          <div class="price-offer text-primary">5000F / AN</div>
                      </div>
                      <div>
                          <div class="liste">
                              <div class="number-text"><span class="number">1</span><span class="text-liste"> 2 SEMAINES D'ESSAI</span></div><hr class="text-warning">
                              <div class="number-text"><span class="number">2</span><span class="text-liste">ASSISTANCE TECHNIQUE 24H/24</span></div><hr class="text-warning">
                              <div class="number-text"><span class="number">3</span><span class="text-liste">FORMATION GRATUITE</span></div><hr class="text-warning">
                          </div>
                          <button class="btn btn-outline-primary btn-offer p-2">En savoir plus</button>
                      </div>
                  </div>
                  <div class="col-md-1 mx auto">
                  </div>
                  <div class="col-md-4 mx auto offre">
                      <div class="img">
                          <img src="/images/carousel.jpg" alt="" class="img-offer mx-5  w-75">
                          <div class="price-offer text-primary">50000F / AN</div>
                      </div>
                      <div>
                          <div class="liste">
                              <div class="number-text"><span class="number">1</span><span class="text-liste">2 SEMAINES D'ESSAI</span></div><hr class="text-warning">
                              <div class="number-text"><span class="number">2</span><span class="text-liste">ASSISTANCE TECHNIQUE 24H/24</span></div><hr class="text-warning">
                              <div class="number-text"><span class="number">3</span><span class="text-liste">FORMATION GRATUITE</span></div><hr class="text-warning">
                          </div>
                          <button class="btn btn-outline-primary btn-offer p-2">En savoir plus</button>
                      </div>
  
                  </div>
                  <div class="col-md-1 mx auto">
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
      </section>
      <section class="foot">
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
              <div class="text-center">
                  Copyright © 2022 - Tous droits réservés 
              </div>
              
      <!-- <script type="text/javascript">
      function googleTranslateElementInit2() {new google.translate.TranslateElement({pageLanguage: 'fr',autoDisplay: false}, 'google_translate_element2');}
      </script><script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit2"></script>
  
  
      <script type="text/javascript">
      eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('6 7(a,b){n{4(2.9){3 c=2.9("o");c.p(b,f,f);a.q(c)}g{3 c=2.r();a.s(\'t\'+b,c)}}u(e){}}6 h(a){4(a.8)a=a.8;4(a==\'\')v;3 b=a.w(\'|\')[1];3 c;3 d=2.x(\'y\');z(3 i=0;i<d.5;i++)4(d[i].A==\'B-C-D\')c=d[i];4(2.j(\'k\')==E||2.j(\'k\').l.5==0||c.5==0||c.l.5==0){F(6(){h(a)},G)}g{c.8=b;7(c,\'m\');7(c,\'m\')}}',43,43,'||document|var|if|length|function|GTranslateFireEvent|value|createEvent||||||true|else|doGTranslate||getElementById|google_translate_element2|innerHTML|change|try|HTMLEvents|initEvent|dispatchEvent|createEventObject|fireEvent|on|catch|return|split|getElementsByTagName|select|for|className|goog|te|combo|null|setTimeout|500'.split('|'),0,{}))
      </script> -->
          </footer>
      </section>
    </div>
  </template>
  
  <script>
  export default {
      auth: false,
      layout: 'landing',
    //   data() {
    //     return { 
    //         role: ''

    //     }
    //   },

    //   mounted(){
    //     this.role = localStorage.getItem("auth.roles")
    //     // console.log(this.$auth)
    //   }
        mounted(){
            if (this.$auth.loggedIn) {
                this.$nuxt.$options.router.push("/dashboard")
            }
        },
  
  }
  </script>
  
  <style scoped>
  *{
      overflow-x: hidden;
  }
  .first-section{
      overflow: hidden;
  }
  .nav-bar{
      background: #D3D4D6;
  }
  
  .first-page-title{
      font-weight: 700;
  }
  
  .rectangle-oblique{
      position: absolute;
      height: 602.69px;
      left: 534px;
      top: 70.67px;
      width: 65%;
      background: linear-gradient(180deg, #2E9DDC 0%, #FFFAFA 100%);
      /* border-radius: 475px; */
      border-top-left-radius: 470px;
      border-bottom-left-radius: 470px;
      border-bottom-right-radius: 470px;
      transform: rotate(-14.07deg);
      z-index: 1;
      overflow: hidden;
  }
  
  .btn-first-page{
      position: absolute;
      width: 230px;
      height: 58px;
      left: 150px;
      top: 650px;
      color: #fff;
      background: #2E9DDC;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 100px;
  }
  
  .rectangle-homme{
      background: linear-gradient(90deg, rgba(0, 6, 10, 0) 11.13%, #2E9DDC 55.95%);
      background-blend-mode: luminosity;
      height: 500px;
      width: 35%;
      margin-top: 7%;
      left: 0;
      transform: rotate(155deg); 
      position: absolute;
      border-top-left-radius: 400px;
      border-bottom-left-radius: 400px;
  }
  
  .toc{
      z-index: 9;
  }
  
  .homme{
      width: 40%;
      position: absolute;
      z-index: 99;
      margin-top: 7%;
  }
  
  
  .first-page{
      padding-bottom: 70px;
      background: #D3D4D6;
  }
  
  .navbar .btn{
      border-radius: 50px;
  }
  
  .logo-img{
      width: 170px;
  }
  
  .service{
      box-sizing: border-box;
  
      /* position: absolute; */
      width: 350px;
      height: 454px;
      /* left: 633px; */
      top: 940px;
  
      background: radial-gradient(50% 50% at 50% 50%, #D9D9D9 0%, #FFFCFC 100%);
      border: 2px solid #2E9DDC;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 50px;
  
  }
  
  .service-img{
      width: 350px;
      height: 198px;
      margin-left: -4%;
      top: 940px;
  }
  
  .bloc1{
      margin-right: 15px;
  }
  
  /* .slide-imge{
      width: 500px;
  } */
  
  
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
      background: #2E9DDC;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
      height: 500px;
      text-align: center;
      padding: 6% 1%; 
      cursor: pointer;
  }
  
  /* .fonction1{
      border: 1px solid black;
      background: #2E9DDC;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25);
      height: 500px;
      text-align: center;
      padding: 6% 1%;
  } */
  
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
  
  .cadre-offre{
      background: url(/images/offr.jpg);
      padding: 25px 0;
  }
  
  
  
  .title-offre{
      text-align: center;
      border: 1px solid rgb(54, 147, 254);
      padding: 10px;
      background-color: rgb(54, 147, 254);
      color: white;
      font-size: 22px;
      font-weight: 500;
      cursor: pointer;
      border-radius: 15px;
      margin: 2% 45%;
      width: 150px;
  }
  
  .offre{
      border: 2px solid black;
      padding: 10px 2px;
  }
  
  .liste{
      font-size: 18px
  }
  
  .number{
      border: 3px solid white;
      background-color: rgb(120, 190, 251);
      border-radius: 100%;
      padding: 5px 10px;
  }
  
  .number-text{
      margin: 5px 50px;
  }
  
  .img-offer{
      margin-bottom: 40px;
  }
  
  .price-offer{
      border: 1px solid gainsboro;
      width: 250px;
      text-align: center;
      margin-left: 8%;
      margin-top: -6%;
      /* margin-bottom: 10%; */
      font-size: 35px;
      font-weight: 700;
      background-color: rgb(237, 237, 237);
      position: absolute;
      border-top-right-radius: 100px;
      border-top-left-radius: 100px;
  }
  
  .btn-offer{
      margin: 0 20px;
  }
  
  .contenu{
      background: #ecebeb;
      padding: 15px 0;
  }
  
  .role{
      background-color: rgb(216, 216, 216);
      padding: 5% 2%;
  }
  
  
  footer{
      background-color: rgb(61, 161, 228);
      color: white;
      font-weight: 400;
      border-top-left-radius: 120px;
      border-bottom-right-radius: 80px;
      padding: 5% 0;
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
  
  
  @media screen and (max-width: 900px) {
     .rectangle-oblique, .rectangle-homme, .homme, .btn-first-page{
      display: none;
     }
  
     .mobile{
      display: block;
     }
  
     .price-offer{
          margin-top: -25%;
          margin-left: 20%;
     }    
  }
  
  </style>
  