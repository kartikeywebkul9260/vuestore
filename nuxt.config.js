export default {
  target: 'server',
  ssr: true,

  env: {
    BAGISTO_API_URL: process.env.BAGISTO_API_URL || 'http://localhost:8000/graphql',
    middlewareUrl: process.env.MIDDLEWARE_URL || 'http://localhost:8000/api/',
  },

  publicRuntimeConfig: {
      apiUrl: process.env.BAGISTO_API_URL || 'http://localhost:8000/graphql',
      middlewareUrl: process.env.MIDDLEWARE_URL || 'http://localhost:8000/api/',
  },

  privateRuntimeConfig: {
    middlewareUrl: process.env.MIDDLEWARE_URL || 'http://localhost:8000/api/',
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
          middlewareUrl: 'http://localhost:8000/api/', // Remove process.env and use direct string
        },
      },
    },
  },
}
