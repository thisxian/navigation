<script setup lang="ts">
import Nav from "./Edit/Nav.vue";
import EditCard from "./Edit/EditCard.vue";
import EditNav from "./Edit/EditNav.vue";
import { Store } from "@/store";
import router from "@/router";
import xian from "@/script/xian";
const store = Store();

// 返回主页
function goHome() {
  router.push({ name: "home" });
}

// 复制数据
function copy() {
  const data = JSON.parse(JSON.stringify(store.home.navs));
  data.forEach((nav: any) => {
    delete nav.id;
    nav.list.forEach((tab: any) => {
      delete tab.id;
      tab.list.forEach((card: any) => {
        delete card.id;
      });
    });
  });
  xian.toase({tips:"复制成功"})
  xian.copy(JSON.stringify(data));
}
</script>

<template>
  <div class="max-w-[1300px] mx-auto py-[84px] relative">
    <div class="top-0 mx-auto max-w-[1300px] w-full z-10 flex justify-between">
      <i
        @click="goHome"
        class="iconfont icon-return text-3xl text-black/60 cursor-pointer"
      ></i>
      <span
        @click="copy"
        class="bg-[#444] cursor-pointer p-1 text-[#ccc] right-0 fcenter"
        >复制数据</span
      >
    </div>
    <!-- tab栏内容 -->
    <Nav />
    <!-- 弹窗 -->
    <EditCard v-show="store.edit.isEditCard" />
    <EditNav v-show="store.edit.isEditNav" />
  </div>
</template>

<style lang="less" scoped>
._tabtitle {
  &:hover {
    background-color: rgb(244, 244, 244);
  }
  &.con {
    background-color: rgb(237, 237, 237);
  }
}
</style>
