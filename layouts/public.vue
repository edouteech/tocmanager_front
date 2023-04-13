<template>
    <div>
      <AppHeader  />
      <Nuxt />
      <PublicFooter />
    </div>
  </template>
  
  <script>
  import AppHeader from '~/components/inc/AppHeader.vue';
  import PublicFooter from '~/components/inc/PublicFooter.vue';
  
  export default{
      name: 'default',
      components:{
          AppHeader,
          PublicFooter,
      }
  } 
  </script>