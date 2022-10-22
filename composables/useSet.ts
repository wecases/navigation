/**
 * 首页
 */
export const useSetStore = definePiniaStore({
  id: 'set',
  state: () => ({
    // 壁纸模糊
    wallpaperFilter: {
      value: 0, // 值
      max: 5, // 最大值
      min: 0, // 最小值
    },
    // 毛玻璃
    groundGlass: {
      value: 10, // 值
      max: 15, // 最大值
      min: 5, // 最小值
      str: '10px', // 带单位的值
    },
    // 缩放大小
    scaleSize: {
      value: 1, // 值
      max: 1.15, // 最大值
      min: 0.85, // 最小值
    },
    // 输入框圆角
    inputRadius: {
      value: 100, // 值
      max: 100, // 最大值
      min: 0, // 最小值
    },
    // 搜索框透明度
    inputTransparent: {
      value: 50, // 值
      max: 100, // 最大值
      min: 50, // 最小值
    },
    // 搜索框大小
    inputSize: {
      value: 100, // 值
      max: 100, // 最大值
      min: 75, // 最小值
    },
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
