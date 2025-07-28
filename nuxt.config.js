require('dotenv').config()
import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,

  head: {
    titleTemplate: '%s - guiban-qr-app',
    title: 'guiban-qr-app',
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

  css: [],

  plugins: [
    '~/plugins/html5-qrcode.js'
  ],

  components: true,

  buildModules: [
    '@nuxtjs/vuetify',
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next'
  ],

  auth: {
    redirect: {
      login: "/auth/signin",       // Redirect when not authenticated
      logout: "/auth/signin",      // Redirect on logout
      callback: "/auth/callback",  // Google will redirect here
      home: "/"                    // After login success
    },
    autoFetchUser: false,
    strategies: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID,
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://accounts.google.com/o/oauth2/auth',
          userInfo: 'https://www.googleapis.com/oauth2/v3/userinfo'
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          maxAge: 1800
        },
        responseType: 'token id_token',
        scope: ['openid', 'profile', 'email'],
        redirectUri: process.env.GOOGLE_REDIRECT_URI,
        codeChallengeMethod: ''
      }
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {}
}
