<template>
    <div>
      <div class="page-title-area">
        <div class="container">
        </div>
      </div>
  
      <div class="error-area ptb-60">
        <div class="container">
          <div class="error-content">
             <img src="/images/404.png" class="m-5" alt="error">
  
            <h3>Page Non Trouvée</h3>
            <p>
              La page que vous éssayez d'afficher n'existe pas. Plusieurs raisons peuvent justifier celà:
                <ul>
                    <li>Raffraichissez la page</li>
                    <li>Vérifiez que vous etes bien connectés</li>
                    <li>Vérifiez que votre profil dispose des permissions nécessaires pour afficher cette page</li>
                </ul>
            </p>
  
            <nuxt-link to="/ventes/vente" class="btn btn-warning m-5">Lancer une vente</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    layout: 'error-layout',
  }
  </script>