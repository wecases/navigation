/**
 * 首页
 */
export const useIndexStore = definePiniaStore({
  id: 'index',
  state: () => ({
    webisteList: [
      {
        name: '百度',
        search: 'https://www.baidu.com/s?wd=%q',
        icon: 'website/baidu.png',
      },
      {
        name: 'CSDN',
        search: 'https://so.csdn.net/so/search?from=chrome_plugin&q=%q',
        icon: 'website/csdn.png',
      },
      {
        name: '掘金',
        search: 'https://juejin.cn/search?query=%q',
        icon: 'website/juejin.webp',
      },
      {
        name: 'github',
        search: 'https://github.com/search?q=%q',
        icon: 'website/github.png',
      },
    ],
    siteNavigation: [
      {
        name: '百度',
        search: 'https://www.baidu.com',
        icon: 'website/baidu.png',
      },
      {
        name: 'CSDN',
        search: 'https://www.csdn.net',
        icon: 'website/csdn.png',
      },
      {
        name: '掘金',
        search: 'https://juejin.cn',
        icon: 'website/juejin.webp',
      },
      {
        name: 'github',
        search: 'https://github.com',
        icon: 'website/github.png',
      },

    ],
    onlineTools: [
      {
        name: 'JSON格式化',
        search: 'https://c.runoob.com/front-end/53/',
        icon: 'website/juejin.webp',
      },
      {
        name: '时间戳转换',
        search: 'https://c.runoob.com/front-end/852/',
        icon: 'website/github.png',
      },
      {
        name: '进制转换器',
        search: 'https://c.runoob.com/front-end/58/',
        icon: 'website/github.png',
      },
      {
        name: 'XML格式化',
        search: 'https://c.runoob.com/front-end/710/',
        icon: 'website/github.png',
      },
      {
        name: 'MD5加密',
        search: 'https://c.runoob.com/front-end/703/',
        icon: 'website/github.png',
      },
      {
        name: '正则测试工具',
        search: 'https://tool.lu/regex/',
        icon: 'website/github.png',
      },
    ],
    types: [] as wallpaperType['data'],
    list: [] as wallpaper['data'],
  }),
  getters: {
    actWebiste() {
      return this.webisteList[0]
    },

    wallpaperImg(): string {
      let url = this.list[Math.floor(Math.random() * this.list.length)].img_1024_768
      url = url.replace(/^http:\/\//i, 'https://')
      return `url(${url})`
    },

    searchWebisteListHeight() {
      return `${Math.ceil(this.webisteList.length / 7) * 119}px`
    },
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
    selectWebiste(item: { name: string; search: string; icon: string }): void {
      this.actWebiste = item
    },
    operationItem(
      type: 'webiste' | 'site' | 'tools',
      item: { name: string; search: string; icon: string },
       index: number | undefined = undefined,
    ): void {
      let list: null | {}[] = null
      switch (type) {
        case 'webiste':
          list = this.webisteList
          break
        case 'site':
          list = this.siteNavigation
          break
        case 'tools':
          list = this.onlineTools
          break
      }
      // 如果要替换的index则替换 否则 添加
      index ? list.splice(index, 1, item) : list.push(item)
      // // 如果添加搜索网址则重新获取网站列表高度
      if (type == 'webiste')
        this.searchWebisteListHeight = `${Math.ceil(this.webisteList.length / 7) * 119}px`

      else
        this.searchWebisteListHeight = ''
    },
  },

  /**
   * 是否持续化存储
   *
   * @see https://github.com/prazdevs/pinia-plugin-persistedstate
   */
  persist: false,
})
