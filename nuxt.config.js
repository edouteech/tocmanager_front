export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'frontend',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
  ],
  
  // plugins: [
  //   '@/plugins/view-ui',
  //   { src: '~/plugins/vue-datepicker', ssr: false },
  // ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  router:{
    middleware:['auth']
  },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true,
          // required: true,
          type: 'Bearer'
        },
        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: '/authentifier', method: 'post', propertyName: 'access_token' },
          user: { url: '/user', method: 'get', propertyName: 'content' },
          logout: false
        },
      },
      // 'laravelSanctum': {
      //   provider: 'laravel/sanctum',
      //   url: 'http://localhost:8000',
      //   endpoints:{
      //     login:{ 
      //       url:'/api/authentifier', method: 'post', propertyName: 'access_token'
      //     },
      //     // user:{
      //     //   url:'/api/user', method: 'get', propertyName: false
      //     // },
      //   },
      
      // },
    }
    // redirect:{
    //   login: '/login',
    //   home: '/dashboard'
    // }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "https://api.tech-plux.com/api",
    credentials:true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
