/**
 * 在客户端引入 pinia 持续化存储插件
 */
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = ({ $pinia }) => {
    $pinia.use(piniaPluginPersistedstate)
}

export default pinia
