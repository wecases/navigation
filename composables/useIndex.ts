/**
 * 首页
 */
export const useIndexStore = definePiniaStore({
  id: 'index',
  state: () => ({
    types: [] as wallpaperType['data'],
    list: [] as wallpaper['data'],
  }),
  getters: {
    // TODO
  },
  actions: {
    async getWallpaperType() {
      const { data } = await useFetch('/api/wallpaper/getType')
      if (data.value.errno == 0)
        this.types = data.value.data
    },
    async getWallpaper() {
      const { data } = await useFetch('/api/wallpaper/getList', { body: { class_id: 36 } })
      if (data.value.errno == 0)
        this.list = data.value.data
    },
  },

  /**
   * 是否持续化存储
   *
   * @see https://github.com/prazdevs/pinia-plugin-persistedstate
   */
  persist: false,
})
