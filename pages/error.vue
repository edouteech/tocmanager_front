<template>
    <div>
      <div class="page-title-area">
        <div class="container">
          <ul>
            <li><nuxt-link to="/">Home</nuxt-link></li>
            <li>404 Not Found</li>
          </ul>
        </div>
      </div>
  
      <div class="error-area ptb-60">
        <div class="container">
          <div class="error-content">
            <!-- <img src="../assets/img/404.png" alt="error" /> -->
  
            <h3>Page Inaccessible</h3>
            <p>
              Vous n'avez pas accès à cette page.
            </p>
  
            <nuxt-link to="/" class="btn btn-light">Go to Home</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    // props: ['error'],
    // layout: 'error-layout',
  }
  </script>