<script setup lang="ts">
import { Store } from "@/store";
import { onMounted, ref } from "vue";
import xian from "@/script/xian";
import { useRoute } from "vue-router";
const route = useRoute();
const store = Store();

// 锚点链接平滑过渡
function goTo(id: string) {
  document.getElementById(id)!.scrollIntoView({ behavior: "smooth" });
}

// 滑动超过浮标时修改侧边导航样式
const $sideFlag = ref("$sideFlag");
const $navDom = ref("$navDom");
const sideEnter = ref(true);
onMounted(() => {
  xian.dom.enterOrQuit([$sideFlag.value], (status: boolean) => {
    sideEnter.value = status;
  });
});

// 监听滚动条滚动，动态更新侧边导航距离底部距离
const $sideDom: any = ref("$sideDom");
onMounted(() => {
  const $app = document.querySelector("._app") as Element;
  $app.addEventListener("scroll", () => {
    let x = xian.dom.getDomBottomToViewBottom($navDom.value);
    // 判断路由名是为了防止切换到其它界面时继续触发
    if (x > 0 && route.name == "home") {
      $sideDom.value.style.bottom = `${+x.toFixed(2)}px`;
    }
  });
});

// nav当前下标
const nowNavId = ref("");
</script>

<template>
  <!-- 切换侧边导航定位浮标1 -->
  <div ref="$sideFlag"></div>
  <div
    ref="$navDom"
    class="bg-[#f3f5fb] flex relative overflow-hidden rounded-md min-h-[500px]"
  >
    <!-- 侧边导航 -->
    <div
      ref="$sideDom"
      class="w-[100px] bottom-0 bg-[#f9f9f9] flex-shrink-0 overflow-auto"
      :class="{ 'fixed top-0 ': !sideEnter }"
    >
      <!-- 一级导航 -->
      <div
        class="text-center text-[#515c6b] font-bold cursor-pointer"
        v-for="nav in store.home.navs"
      >
        <p
          class="hover:bg-[#ededed] h-[40px] fcenter"
          @mousedown="goTo(nav.id), (nowNavId = nav.id)"
        >
          {{ nav.title }}
        </p>
        <!-- 二级导航 -->
        <div
          v-show="nowNavId == nav.id && nav.list.length > 1"
          class="flex flex-col"
        >
          <p
            class="text-sm text-[#8b929b] hover:bg-[#ededed] h-[25px] fcenter"
            v-for="tab in nav.list"
            @mousedown="goTo(tab.id)"
          >
            {{ tab.title }}
          </p>
        </div>
      </div>
    </div>

    <!-- 全部类别组 -->
    <div
      class="pt-5 ml-3 w-full text-black/70"
      :class="{ 'pl-[100px]': !sideEnter }"
    >
      <!-- 类别组 一及导航 -->
      <div v-for="nav in store.home.navs" :id="nav.id">
        <!-- 类别组标题 -->
        <p class="font-bold">{{ nav.title }}</p>
        <!-- 类别组 二级导航 -->
        <div v-for="tab in nav.list" :id="tab.id">
          <p
            v-show="nav.id && nav.list.length > 1"
            class="text-sm text-black/50 font-bold py-1"
          >
            {{ tab.title }}
          </p>
          <!-- 卡组 -->
          <div class="_cards">
            <!-- 卡 -->
            <div class="h-[75px]" v-for="card in tab.list">
              <a
                target="_blank"
                :href="card.url"
                :title="card.description"
                class="h-full bg-[#eef0f4] rounded-md border flex items-center shadow-lg cursor-pointer"
              >
                <!-- icon -->
                <div
                  class="w-[50px] h-[50px] mx-2 bg-no-repeat bg-cover rounded-md overflow-hidden flex-shrink-0"
                  :style="`background-image: url(${card.icon});`"
                ></div>
                <!-- 标题介绍 -->
                <div class="h-full w-full">
                  <p class="font-bold pt-2 line-clamp-1">{{ card.title }}</p>
                  <p class="text-xs text-black/50 pt-1 pr-1 line-clamp-2">
                    {{ card.description }}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
._cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  grid-gap: 14px 14px;
  margin-bottom: 14px;
  margin-right: 14px;
}
</style>
