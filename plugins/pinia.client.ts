import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
/**
 * 客户端引入 pinia 持续化存储插件
 */
export default defineNuxtPlugin(({ $pinia }) => {
  $pinia?.use(piniaPluginPersistedstate)
})
