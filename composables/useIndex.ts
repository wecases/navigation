/**
 * 首页
 */
export const useIndexStore = definePiniaStore('index', {
    state: () => ({
        count: 0
    }),
    getters: {
        // TODO
    },
    actions: {
        // TODO
    },
    /**
     * 是否持续化存储
     *
     * @see https://github.com/prazdevs/pinia-plugin-persistedstate
     */
    persist: true,
})
