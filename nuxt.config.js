export default {
  target: 'server',
  ssr: true,

  plugins: [
    '~/plugins/fix-i18n.js',
  ],
  
  env: {
    BAGISTO_API_URL: process.env.BAGISTO_API_URL || 'http://localhost:8000/graphql',
    MIDDLEWARE_URL: 'http://localhost:3000/api/'
  },

  publicRuntimeConfig: {
    middlewareUrl: 'http://localhost:3000/api/', // Set a dummy URL to avoid errors
  },

  publicRuntimeConfig: {
    bagisto: {
      apiUrl: process.env.BAGISTO_API_URL || 'http://localhost:8000/graphql'
    }
  },

  privateRuntimeConfig: {
    middlewareUrl: 'http://localhost:3000/api/', // Ensure it's available on the server
  },

  head: {
    title: 'Bagisto Vue Storefront',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ]
  },

  buildModules: [
    '@vue-storefront/nuxt',
    '@vue-storefront/bagisto/nuxt',
    '@nuxtjs/composition-api/module'
  ],

  modules: [
    '@vue-storefront/nuxt',
    '@nuxtjs/composition-api/module',
    '~/packages/bagisto',
  ],


  plugins: [
    '~/plugins/bagisto.js',
  ],

  vsfOptions: {
    // This configures the Vue Storefront context
    useRawSource: {
      dev: [
        '@vue-storefront/core'
      ],
      prod: [
        '@vue-storefront/core'
      ]
    }
  },

  vueStorefront: {
    integrations: {
      bagisto: {
        location: '@vue-storefront/bagisto-api/server',
        configuration: {
          api: process.env.BAGISTO_API_URL || 'http://localhost:8000/graphql',
          middlewareUrl: process.env.MIDDLEWARE_URL || 'http://localhost:3000/api/',
        },
      },
    },
  },
}
