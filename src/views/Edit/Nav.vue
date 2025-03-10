<script setup lang="ts">
import { Store } from "@/store";
import { onMounted, ref } from "vue";
import xian from "@/script/xian";
import draggable from "vuedraggable";
import Card from "./Card.vue";
import { cardType } from "./type";
import { nanoid } from "nanoid";
import { useRoute } from "vue-router";
const route = useRoute();
const store = Store();

defineProps({
  isEditCard: { type: Boolean, default: false },
});

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
    if (x > 0 && route.name == "edit") {
      $sideDom.value.style.bottom = `${+x.toFixed(2)}px`;
    }
  });
});

// nav当前下标，实现点击nav展开对应tab
const nowNavId = ref("");

// 卡片操作---------------------------
// 添加卡片
function addCard(parent: cardType[]) {
  store.edit.isEditCard = true;
  store.edit.editCard.title = "";
  store.edit.editCard.url = "";
  store.edit.editCard.description = "";
  store.edit.editCard.icon = "";
  store.edit.editCardFinish = () => {
    const card: cardType = {
      id: nanoid(),
      title: store.edit.editCard.title,
      url: store.edit.editCard.url,
      description: store.edit.editCard.description,
      icon: store.edit.editCard.icon,
      delete() {
        const index = parent.findIndex((_: any) => _.id == this.id);
        parent.splice(index, 1);
      },
    };
    parent.push(card);
  };
}

// 修改导航  注意：nav和tab共用
function editNav(parent: any) {
  store.edit.isEditNav = true;
  store.edit.editNavOrigin = parent;
  store.edit.editNav = [
    ...parent.map((_: any) => {
      return { title: _.title, id: _.id };
    }),
  ];
  store.edit.editNavFinish = () => {
    // 过滤掉被删除的nav
    const filterParent = parent.filter((_: any) =>
      store.edit.editNav.find((e) => e.id == _.id && e.title !== "")
    );
    parent.splice(0, parent.length, ...filterParent);
    // 同步修改
    parent.forEach((_: any) => {
      _.title = store.edit.editNav.find((e: any) => e.id === _.id)?.title;
    });
  };
}
</script>

<template>
  <!-- 切换侧边导航定位浮标1 -->
  <div ref="$sideFlag"></div>
  <div ref="$navDom" class="bg-[#f3f5fb] flex relative overflow-hidden">
    <!-- 侧边导航 draggable不能使用ref所以多套一层 -->
    <div
      ref="$sideDom"
      class="w-[100px] bottom-0 bg-[#f9f9f9] flex-shrink-0 overflow-auto text-[#515c6b]"
      :class="{ 'fixed top-0 ': !sideEnter }"
    >
      <div @click="editNav(store.home.navs)" class="fcenter py-1">
        <i class="iconfont icon-wrench text-xl font-bold cursor-pointer"></i>
      </div>
      <draggable
        :list="store.home.navs"
        item-key="id"
        animation="300"
        group="navs"
      >
        <template #item="{ element: nav }">
          <div class="text-center font-bold cursor-pointer">
            <!-- 二级导航 -->
            <p
              class="h-[40px] fcenter"
              @click="goTo(nav.id), (nowNavId = nav.id)"
            >
              {{ nav.title }}
            </p>
            <draggable
              class="flex flex-col"
              :list="nav.list"
              item-key="id"
              animation="300"
              group="tabs"
            >
              <template #item="{ element: tab }">
                <p
                  class="text-sm text-[#8b929b] h-[25px] fcenter"
                  @click="goTo(tab.id)"
                >
                  {{ tab.title }}
                </p>
              </template>
            </draggable>
          </div>
        </template>
      </draggable>
    </div>
    <!-- 全部类别组 -->
    <div
      class="pt-5 ml-3 w-full text-black/70"
      :class="{ 'pl-[100px]': !sideEnter }"
    >
      <!-- 类别组 -->
      <div v-for="nav in store.home.navs" :id="nav.id">
        <!-- 类别组标题 -->
        <div class="font-bold">
          <span>{{ nav.title }}</span>
          <i
            @click="editNav(nav.list)"
            class="iconfont icon-wrench px-1 cursor-pointer"
          ></i>
        </div>
        <!-- 类别组 -->
        <div v-for="tab in nav.list" :id="tab.id">
          <div class="text-sm text-black/50 font-bold py-1 flex items-center">
            <span>{{ tab.title }}</span>
            <i
              @click="addCard(tab.list)"
              class="iconfont icon-tianjia text-xl text-black/60 cursor-pointer"
            ></i>
          </div>
          <!-- 卡组 -->
          <draggable
            class="_cards"
            :list="tab.list"
            item-key="id"
            animation="300"
            group="cards"
          >
            <template #item="{ element: card }">
              <Card :card="card" />
            </template>
          </draggable>
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
