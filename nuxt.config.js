import dotenv from 'dotenv'

dotenv.config()

export default {
  server: {
    port: 9000,
    host: '0.0.0.0',
  },
  /*
   * Server Side Rendering
   */
  ssr: false,
  // buildDir: 'nuxt-dist',
  /*
   * Modern Build ES6
   */
  modern: process.env.NODE_ENV !== 'development',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    title: 'Staymenity',
    // script: [
    //   {
    //     src: 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js',
    //   },
    // ],
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: '',
      },
    ],

    link: [
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', sizes: '32x32', type: 'image/png', href: '/favicon-32x32.png' },
      { rel: 'icon', sizes: '16x16', type: 'image/png', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
  },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    '~plugins/vue-js-modal.js',
    // '~plugins/vue-star-rating.client.js',
    '~plugins/vue2-datepicker.js',
    '~plugins/v-select.js',
    '~plugins/axios.js',

    { src: '~plugins/set-scrollbar-width.js', ssr: false },
    { src: '~plugins/fb-sdk.js', ssr: false },
    { src: '~plugins/vue-google-oauth2.js', ssr: false },
    { src: '~plugins/vue-awesome-swiper.js', ssr: true },
    { src: '~plugins/vue-slider-component.js', ssr: false },
    { src: '~plugins/vue2-google-maps.js', ssr: false },
    // { src: '~plugins/file-pond-plugin.js', ssr: false },
    { src: '~/plugins/client-only.js', ssr: false },
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/pwa',
    '@nuxtjs/svg-sprite',
    'nuxt-stripejs',
    // 'cookie-universal-nuxt',
    '@nuxtjs/device',
    '@nuxtjs/gtm',
    // [
    //   'nuxt-stripe-module',
    //   {
    //     publishableKey:
    //       'pk_test_51HJdBZIFDQsDl8swJQFrJ1cfZyOhdIpa9s1KIwjllnC495zbbqBPNqrIxVfmiewzccRvdhXWoGL5tPGLRTa53Xxm0094Y0JODp',
    //   },
    // ],
    [
      '@nuxtjs/firebase',
      {
        config: {
          apiKey: 'AIzaSyCCic4gdrx9DxaQtdEzI_eQTxPF49zarGc',
          authDomain: 'staymenity-database.firebaseapp.com',
          databaseURL: 'https://staymenity-database-default-rtdb.firebaseio.com',
          projectId: 'staymenity-database',
          storageBucket: 'staymenity-database.appspot.com',
          messagingSenderId: '160811102397',
          appId: '1:160811102397:web:6998c8d2d5729c123f47d4',
        },
        // lazy: true,
        services: {
          database: true,
          messaging: {
            createServiceWorker: true,
            // actions: [
            //   {
            //     action: 'randomName',
            //     url: 'randomUrl',
            //   },
            // ],
            // fcmPublicVapidKey: '<publicVapidKey>' // OPTIONAL : Sets vapid key for FCM after initialization
          },
          // auth: true, // Just as example. Can be any other service.
        },
      },
    ],
  ],
  gtm: {
    id: 'G-JD10X11G83',
    enabled: false,
  },
  stripe: {
    publishableKey:
      // 'pk_test_51HJdBZIFDQsDl8swJQFrJ1cfZyOhdIpa9s1KIwjllnC495zbbqBPNqrIxVfmiewzccRvdhXWoGL5tPGLRTa53Xxm0094Y0JODp',
      'pk_live_51Hr6oqBjOsOk8hlJ0a5hwQARHnm3Dr2qqs7OysBqaNT0cMBeomWbUFWjnfgksnDhZOYylCVuWGlyOxLoz4uzt2Td00rmkDdluA',
  },
  // svgSprite: {
  //   input: '~/assets/svg',
  // },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    credentials: true,
    baseURL:
      process.env.NODE_ENV === 'development' ? process.env.PROD_API_URL : process.env.PROD_API_URL,
    debug: process.env.NODE_ENV === 'development',
  },
  /*
   * https://github.com/nuxt-community/auth-module/blob/dev/docs/content/en/providers/laravel-sanctum.md
   */
  auth: {
    redirect: {
      home: false,
    },
    cookie: {
      prefix: 'auth.',
      options: {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
      },
    },
    strategies: {
      local: {
        endpoints: {
          // login: { url: '/auth/login', method: 'post' },
          login: { url: 'https://api.staymenity.com/public/api/login', method: 'post', propertyName: 'remember_token'},
          // user: { url: 'https://api.staymenity.com/public/api/user', method: 'get', propertyName: 'user' },
          // user: { property: false},
          user: false,
          // user: { property: false, autoFetch: true},
          logout: { url: '/logout', method: 'post' },
          home: false,
        },
        refreshToken: {
          property: 'refresh_token',
          data: 'refresh_token',
          maxAge: 60 * 60 * 24 * 32,
        },
        token: {
          property: 'remember_token',
          maxAge: 60 * 60 * 24 * 30,
        },
        user: {
          property: 'data',
          autoFetch: true,
        },
      },
    },
  },
  //  protocol: oauth2
  // response_type: token
  // access_type:
  // client_id: 961395667724924
  // redirect_uri: http://localhost:3000/login
  // scope: public_profile email user_birthday
  // state: D2ay0AzebxuJwrDD5fLEw
  // code_challenge_method: implicit
  /*
   * PWA configuration
   * See https://pwa.nuxtjs.org/
   */
  pwa: {
    workbox: {
      cacheOptions: {
        revision: process.env.APP_REVISION,
      },
      cleanupOutdatedCaches: true,
    },
    manifest: {
      name: 'Staymenity',
      description: '',
      background_color: '#5d44f6',
    },
    icon: false,
    // pwa: {
    //   icon: {
    //     /* icon options */
    //   }
    // }
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    extractCSS: false,
    postcss: {
      plugins: {
        'postcss-import': {},
        'postcss-nested': {},
        'postcss-hexrgba': {},
      },
      // preset: {
      //   features: {
      //     // Fixes: https://github.com/tailwindcss/tailwindcss/issues/1190#issuecomment-546621554
      //     "focus-within-pseudo-class": false
      //   }
      // }
      // plugins: [
      //   require('postcss-import')(),
      //   require('postcss-nested')(),
      //   require('postcss-hexrgba')(),
      // ],
    },
  },
}
