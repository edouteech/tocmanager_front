export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'TocManager',
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
      { 
        rel: 'icon', 
        type: 'image/x-icon', 
        href: '/images/icon3.png '
      },
      { 
        rel: 'stylesheet', 
        href: '/css/bootstrap.min.css', 
      },
      { 
        rel: 'stylesheet', 
        href: '/css/custom.css', 
      }
    ],
    script: [
      { 
        src: '/js/bootstrap.bundle.min.js', 
        type: 'text/javascript',
      }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/vue-tel-input',
    
    { src: '~/plugins/vue-excel-xlsx.js', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
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
  // env: {
  //   maxAge: 60 * 1
  // },

  auth: {
    strategies: {
      local: {
        token: {
          property: 'access_token',
          global: true,
          type: 'Bearer',
          maxAge: 18000,

        },
        autoLogout:false,

        user: {
          property: false,
          autoFetch: true
        },
        endpoints: {
          login: { url: '/login', method: 'post', propertyName: 'access_token' },
          user: { url: '/user', method: 'get', propertyName: 'content' },
          logout: false
        },
      },

    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "http://localhost:8000/api",
    credentials:true
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
