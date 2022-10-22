// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    // 引入 pinia
    ['@pinia/nuxt', {
      autoImports: [
        // 自动引入 `usePinia()` 并重命名为 `usePiniaStore()`
        ['defineStore', 'definePiniaStore'],
      ],
    }],
  ],
})
