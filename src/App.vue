<script setup lang="ts">
import { nanoid } from "nanoid";
import { Store } from "@/store";
import { onMounted } from "vue";
import { getNavData } from "@/api/apiList";
import router from "./router";
import xian from "./script/xian";
const store = Store();

// 获取并初始化导航数据
async function getData() {
  const { data } = await getNavData();
  store.home.navs.splice(0, data.length, ...data);

  // 赋值锚点id
  store.home.navs.forEach((nav: any) => {
    nav.id = nanoid();
    nav.list.forEach((type: any) => {
      type.id = nanoid();
      type.list.forEach((card: any) => {
        card.id = nanoid();
        card.delete = () => {
          const index = type.list.findIndex((_: any) => _.id == card.id);
          type.list.splice(index, 1);
        };
      });
    });
  });
}
onMounted(() => {
  getData();
});

</script>

<template>
  <div class="_app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style lang="less">
._app {
  width: 100%;
  height: 100%;
  background: url("https://s1.ax1x.com/2022/11/30/zwQmut.jpg");
  background-attachment: fixed;
  background-size: cover;
  overflow: overlay;
}

// 滚动条样式
&::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}
&::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: rgba(0, 0, 0, 0.4);
}

// css 取消元素聚焦背景 手机端
div {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
