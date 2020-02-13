require('dotenv').config()

export default {

    mode: 'spa',

    /*
    ** Headers of the page
    */
    head: {
        title: 'Neuro',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Neuro App' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Rubik:400,500,700' },
            { rel: 'stylesheet', href: 'https://use.fontawesome.com/releases/v5.0.13/css/all.css' },
        ]
    },

    /*
    ** Customize the progress-bar color
    */
    loading: { color: '#fff' },
    /*
    ** Global CSS
    */
    css: [
    ],

    router: {
        middleware: [
            'clearValidationErrors',
        ]
    },

    plugins: [
        './plugins/editor.js',
        './plugins/axios.js',
        './plugins/portals.js',
        './plugins/mixins/user.js',
        './plugins/mixins/validation.js',
        './plugins/mixins/globals.js',
        './plugins/forms/index.js',
    ],

    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
        '@nuxtjs/tailwindcss',
        '@nuxtjs/dotenv',
    ],

    /*
    ** Nuxt.js modules
    */
    modules: [
        // Doc: https://axios.nuxtjs.org/usage
        '@nuxtjs/axios',
        '@nuxtjs/auth',
        '@nuxtjs/dotenv',
    ],

    auth: {
        localStorage: false,
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: 'auth/login',
                        method: 'post',
                        propertyName: 'data.token',
                        refresh_token_key: 'data.refreshToken',
                    },
                    user: {
                        url: 'auth/me',
                        method: 'get',
                        propertyName: 'data'
                    },
                    logout: {
                        url: 'auth/logout',
                        method: 'post'
                    }
                },
            }
        },
        redirect: {
            login: '/auth/login',
            home: '/',
        }
    },


    // env: {
    //     // API_URL: process.env.API_URL
    // },

    /*
    ** Axios module configuration
    ** See https://axios.nuxtjs.org/options
    */
    axios: {
        baseURL: process.env.API_URL,
    },


    /*
    ** Build configuration
    */
    build: {

        /*
        ** You can extend webpack config here
        */
        extend (config, ctx) {}

    }

}
