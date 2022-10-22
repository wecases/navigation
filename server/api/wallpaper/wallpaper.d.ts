interface result {
    /**
     * 接口名称
     */
    errmsg: string
    errno: number
    total?: number
    consume?: number
    data?: T
}

interface wallpaperType extends result {
    data: {
        create_time: string
        id: number
        name: string
        order_num: number
        tag: string
    }[]
}

interface wallpaper extends result {
    data: {
        id: number
        class_id: number
        resolution: string
        url_mobile: string
        url: string
        url_thumb: string
        url_mid: string
        utag: string
        img_1600_900: string
        img_1440_900: string
        img_1366_768: string
        img_1280_800: string
        img_1280_1024: string
        img_1024_768: string
    }[]
}
