<template>
  <div>
    <nav class="navbar navbar-expand-lg  nav-bar appheader">
          <div class="container">
              <NuxtLink to="/login">
                  <img src="/images/logo.png" class="logo-img" alt="">
              </NuxtLink>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <!-- <ul class="navbar-nav ms-auto mb-2 mb-lg-0"></ul> -->
              <div class="col-md-8">
                  <ul class="navbar-nav  mb-2 mb-lg-0">
                      <li class="nav-item mx-4">
                          <NuxtLink to="/" class="nav-link">A propos</NuxtLink>
                      </li>
                      <li class="nav-item">
                          <NuxtLink to="" class="nav-link">Services</NuxtLink>
                      </li>
                        <li class="nav-item">
                            <NuxtLink to="/abonnement" class="nav-link">Nos offres</NuxtLink>
                        </li>
                        <li class="nav-item" v-if="this.$auth.$state.loggedIn == true && role =='admin'">
                            <NuxtLink to="/dashboard" class="nav-link">Tableau de Bord</NuxtLink>
                        </li>
                        <li class="nav-item" v-if="this.$auth.$state.loggedIn == true ">
                            <NuxtLink to="/ventes/vente" class="nav-link">Effectuer une vente</NuxtLink>
                        </li>
                  </ul>
              </div>
              <div class="d-flex" v-if="this.$auth.$state.loggedIn != true">
                  <div>
                      <a href="/login"><button class="btn btn-outline-primary btn-offer mx-3" >Connexion</button></a>
                  </div>
                  <div>
                      <a href="/register"><button class="btn btn-outline-primary btn-offer mr-3" >Inscription</button></a>
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
    <!-- <nav class="navbar navbar-expand-lg bg-white shadow">
        <div class="container">
            <NuxtLink to="/login">
                <img src="/images/logo.png" class="logo-img" alt="">
            </NuxtLink>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav m-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <NuxtLink to="/landing_page" class="nav-link">Accueil</NuxtLink>
                </li>
                <li class="nav-item" v-if="this.$auth.$state.loggedIn != true ">
                    <NuxtLink to="/login" class="nav-link">Connexion</NuxtLink>
                </li>
                <li class="nav-item" v-if="this.$auth.$state.loggedIn != true ">
                    <NuxtLink to="/register" class="nav-link">Inscription</NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink to="/abonnement" class="nav-link">Nos offres</NuxtLink>
                </li>
                <li class="nav-item" v-if="this.$auth.$state.loggedIn == true && role =='admin'">
                    <NuxtLink to="/dashboard" class="nav-link">Tableau de Bord</NuxtLink>
                </li>
                <li class="nav-item" v-if="this.$auth.$state.loggedIn == true ">
                    <NuxtLink to="/ventes/vente" class="nav-link">Effectuer une vente</NuxtLink>
                </li>
            </ul>
            </div>
        </div>
    </nav> -->
  </div>
</template>

<script>
export default {
    name: 'AppHeader',
    data() {
        return { 
            role: ''

        }
      },

      mounted(){
        this.role = localStorage.getItem("auth.roles")
        // console.log(this.$auth)
      }

}
</script>

<style>
.logo-img{
    width: 170px;
}
.appheader{
      background: #D3D4D6;
  }

  .appheader .btn{
      border-radius: 50px;
  }
</style>