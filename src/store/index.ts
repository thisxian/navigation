import { defineStore } from "pinia";

const state = {
    home: {
        engineIndex: 0,      // 搜索模块
        tabIndex: 0,         // 导航模块
        navs: [] as any,     // 导航数据
    },
    edit: {
        isEditCard: false,
        editCard: {
            title: "",
            url: "",
            icon: "",
            description: "",
        },
        editCardFinish: () => { },
        isEditNav: false,
        editNav: [{ title: '', id: '' }],
        editNavOrigin: [] as any,
        editNavFinish: () => { },
    }
}

export const Store = defineStore('storeData', {
    state: () => state,
    // 开启数据持久化
    persist: {
        paths: ['home.engineIndex', 'home.tabIndex'],
    }
})