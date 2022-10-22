export default defineEventHandler(async () => {
  const url = 'http://wallpaper.apc.360.cn/index.php'

  const data: wallpaperType = await $fetch(url, {
    params: {
      c: 'WallPaper',
      a: 'getAllCategoriesV2',
      from: '360chrome',
    },
    method: 'GET',
  })

  return data
})
