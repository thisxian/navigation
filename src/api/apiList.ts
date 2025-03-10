import jsonp from '@/script/jsonp'
import axios from 'axios'

// 百度搜索引擎
export const baidu = {
    // 搜索
    search(keyword: string) {
        const src = `https://www.baidu.com/s?wd=${keyword}`
        window.open(src)
    },
    // 关键字补全
    keywordTab(keyword: string) {
        return new Promise((resolve, rejects) => {
            jsonp(`https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su`, {
                srcbName: 'cb',
                data: {
                    wd: keyword,
                    json: 1
                },
                callback: function (data: { s: Array<string> }) {
                    resolve(data.s)
                }
            })
        })
    },
    // 百度翻译
    translate(keyword: string) {
        const src = `https://fanyi.baidu.com/#zh/en/${keyword}`
        window.open(src)
    }

}

// 必应搜索引擎
export const bing = {
    search(keyword: string) {
        const src = `https://cn.bing.com/search?q=${keyword}`
        window.open(src)
    }
}

// 获取导航数据
export function getNavData() {
    return axios({
        url: '/data.json'
    })
}