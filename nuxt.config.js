require('dotenv').config();
export default {
  server: {
    port: 3011, // Hoặc bất kỳ port nào bạn muốn
    host: '0.0.0.0'
  },
  serverMiddleware: ['~/serverMiddleware/sitemap.js'],
  router: {
    middleware: ['auth']
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'DailyChill - Blog chữa lành & cảm hứng sống tích cực',
    htmlAttrs: {
      lang: 'vi' // Ngôn ngữ tiếng Việt
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      
      // SEO cơ bản
      { hid: 'description', name: 'description', content: 'DailyChill là blog chia sẻ bài viết chữa lành, phát triển bản thân, giúp bạn tìm lại sự cân bằng và cảm hứng sống mỗi ngày.' },
      { name: 'keywords', content: 'blog chữa lành, phát triển bản thân, cảm hứng sống, thiền định, sức khỏe tinh thần, DailyChill' },
      { name: 'author', content: 'DailyChill Team' },
  
      // Open Graph cho chia sẻ Facebook, Zalo
      { hid: 'og:title', property: 'og:title', content: 'DailyChill - Blog chữa lành & cảm hứng sống tích cực' },
      { hid: 'og:description', property: 'og:description', content: 'Khám phá bài viết giúp chữa lành tâm hồn, cải thiện sức khỏe tinh thần và truyền cảm hứng tích cực mỗi ngày.' },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      { hid: 'og:url', property: 'og:url', content: 'https://dailychill.vn/' }, // thay bằng domain thật
      { hid: 'og:image', property: 'og:image', content: 'https://dailychill.vn/imgSeo.jpg' }, // thay bằng ảnh đại diện
  
      // Twitter Card
      { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
      { hid: 'twitter:title', name: 'twitter:title', content: 'DailyChill - Blog chữa lành' },
      { hid: 'twitter:description', name: 'twitter:description', content: 'Blog chia sẻ bài viết chữa lành và cảm hứng sống tích cực mỗi ngày.' },
      { hid: 'twitter:image', name: 'twitter:image', content: 'https://dailychill.vn/imgSeo.jpg' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.css' },
    ],
    script: [
      { src: "https://cdn.jsdelivr.net/npm/flowbite@2.5.2/dist/flowbite.min.js" },
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["@/assets/css/main.css", "@fortawesome/fontawesome-svg-core/styles.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fontawesome.js',
    { src: "~/plugins/carousel.js", ssr: false },
    { src: "~/plugins/ckeditor.js", ssr: false },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/robots',
  ],
  robots: {
    rules: [
      {
        UserAgent: '*',
        Disallow: ''
      },
      {
        UserAgent: 'facebookexternalhit',
        Allow: '/'
      }
    ],
    Sitemap: 'https://dailychill.vn/sitemap.xml'
  },
  pwa: {
    manifest: {
      name: 'DailyChill',
      short_name: 'App',
      lang: 'vi',
      display: 'standalone',
      start_url: '/',
      background_color: '#ffffff',
      theme_color: '#8b4513',
      icons: [
        {
          src: '/icon.png',
          sizes: '192x192',
          type: 'image/png'
        },
        {
          src: '/icon@512.png',
          sizes: '512x512',
          type: 'image/png'
        }
      ]
    },
    meta: {
      mobileApp: true,
      mobileAppIOS: true,
      appleStatusBarStyle: 'default',
      name: 'DailyChill',
      author: 'DailyChill'
    },
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/api\.dailychill\.vn\/articles/,
          handler: 'NetworkFirst',
          method: 'GET',
          strategyOptions: {
            cacheName: 'articles-cache',
            cacheExpiration: {
              maxEntries: 10,
              maxAgeSeconds: 60 * 20 // ❗ 20 phút = 60 giây * 20
            }
          }
        }
      ]
    }
  },
  

  axios: {
    // Base URL cho API Node.js của bạn
    baseURL: process.env.DOMAIN_API, // Thay đổi nếu API của bạn chạy trên cổng khác
  },
  

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['@fortawesome/vue-fontawesome'],
    postcss: {
      postcssOptions: {
          plugins: {
              "postcss-import": {},
              "tailwindcss/nesting": {},
              tailwindcss: {},
              autoprefixer: {},
          },
      },
    },
  }
}
