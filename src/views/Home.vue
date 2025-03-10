<script setup lang="ts">
import TimeVue from "./Home/Time.vue";
import Search from "./Home/Search.vue";
import Ai from "./Home/Ai.vue";
import Nav from "./Home/Nav.vue";
import Chat from "./Home/Chat.vue";

import { Store } from "@/store";
const store = Store();

const tabs = [
  { title: "导航", Com: Nav },
  // { title: "聊天", Com: Chat },
  // { title: "AI", Com: Ai },
];
</script>

<template>
  <TimeVue />
  <Search />

  <div class="max-w-[1300px] mx-auto py-[80px]">
    <!-- tab栏标题 -->
    <div
      class="inline-flex rounded-tl-xl rounded-tr-xl overflow-hidden"
      :class="{ 'hidden': tabs.length == 1 }"
    >
      <p
        class="_tabtitle w-[100px] h-[35px] font-bold fcenter bg-white cursor-pointer"
        :class="{ con: store.home.tabIndex == i }"
        v-for="(t, i) in tabs"
        @click="store.home.tabIndex = i"
      >
        {{ t.title }}
      </p>
    </div>
    <!-- tab栏内容 -->
    <div v-for="(c, i) in tabs">
      <component v-if="store.home.tabIndex == i" :is="c.Com"></component>
    </div>
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
