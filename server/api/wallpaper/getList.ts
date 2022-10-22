export default defineEventHandler(async () => {
  const url = 'http://wallpaper.apc.360.cn/index.php'

  const data: wallpaper = await $fetch(url, {
    params: {
      c: 'WallPaper',
      a: 'getAppsByCategory',
      cid: 36,
      start: Math.floor(Math.random() * 60),
      count: 30,
      from: '360chrome',
    },
    method: 'GET',
  })

  return data
})
