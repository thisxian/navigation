<script setup lang="ts">
import { reactive, ref, nextTick } from "vue";

import { baidu, bing } from "@/api/apiList";
import { Store } from "@/store/index";
import xian from "@/script/xian";

const store = Store();

// 输入框数据
const inputData = reactive({
  isFocus: false, // 搜索框是否获取焦点
  text: "", // 输入框当前文本
  list: [] as string[], // 补全列表
  listIndex: -1,
});

// 输入框结点
const $search = ref();

// 搜索引擎选择 0百度、1必应    store.home.engineIndex
const engineList = [
  {
    name: "百度",
    icon: "icon-baidu-fill",
    search(keyword: string) {
      baidu.search(keyword);
    },
  },
  {
    name: "必应",
    icon: "icon-windows",
    search(keyword: string) {
      bing.search(keyword);
    },
  },
];

// 搜索
function search() {
  inputData.text = inputData.text.trim();
  if (!inputData.text) return;
  engineList[store.home.engineIndex].search(inputData.text);
  inputData.text = "";
  inputData.list = [];
}

// 切换搜素引擎
function tabSearch(event:Event) {
  event.preventDefault()  // 没效果，原因不清楚 
  store.home.engineIndex += 1;
  store.home.engineIndex %= engineList.length;
}

// 关键字补全
const keywordTabDebounce = xian.debounce(keywordTab, 100);
function keywordTab() {
  let text = inputData.text.trim();
  if (!text) return;

  baidu.keywordTab(text).then((res: any) => {
    text = inputData.text.trim();
    if (!text) return;
    inputData.list = [...new Set([inputData.text, ...res])];
    inputData.listIndex = -1;
  });
}

// 点击关键字
function clickKeyword(text: string) {
  inputData.text = text;
  search();
}

// 搜索框按键监听
function inputKeydown(evt: KeyboardEvent) {
  // 关键字为空时清空补全列表
  setTimeout(() => {
    if (!inputData.text) inputData.list = [];
  }, 0);

  // 切换引擎快捷键 tab
  if (evt.key == "Tab") {
    evt.preventDefault();
    tabSearch(evt);
    return;
  }

  // 按下回车，进行搜索
  if (evt.key == "Enter") {
    search();
    return;
  }

  // 按上下，切换关键字列表
  if (evt.key == "ArrowUp" || evt.key == "ArrowDown") {
    if (!inputData.list.length) return;
    if (evt.key == "ArrowUp") {
      inputData.listIndex -= 1;
      const index = inputData.listIndex;
      inputData.listIndex = index < 0 ? inputData.list.length - 1 : index;
    }
    if (evt.key == "ArrowDown") {
      inputData.listIndex += 1;
      const index = inputData.listIndex;
      inputData.listIndex = index >= inputData.list.length ? 0 : index;
    }
    inputData.text = inputData.list[inputData.listIndex];
    return;
  }
  // 关键字补全
  keywordTabDebounce();
}
</script>

<template>
  <!-- 手机端输入框获取焦点时进行填充 -->
  <div :class="{ _phone_searchFlagdiv: inputData.isFocus }"></div>
  <div :class="{ _phone_searchWrap: inputData.isFocus }">
    <div
      class="text-slate-100 relative mx-auto flex flex-col h-[40px] w-full max-w-lg items-center px-3"
    >
      <!-- 收索框 -->
      <div
        class="flex h-full w-full bg-black/50 backdrop-blur-sm backdrop-filter flex-shrink-0"
        :class="
          inputData.isFocus && inputData.list.length
            ? 'rounded-tl-xl rounded-tr-xl'
            : 'rounded-xl'
        "
      >
        <!-- 引擎类型提示 -->
        <div
          class="left-0 flex h-full flex-shrink-0 cursor-pointer select-none items-center"
          @mousedown="tabSearch($event)"
        >
          <i
            class="iconfont ml-2 h-8 w-8 text-center text-3xl"
            :class="engineList[store.home.engineIndex].icon"
          ></i>
          <div class="relative">
            {{ engineList[store.home.engineIndex].name }}：
            <p
              v-if="!inputData.isFocus && !inputData.text"
              class="w-9 text-slate-300 text-sm absolute left-11 top-0 bottom-0 flex items-center justify-center pointer-events-none"
            >
              搜索
            </p>
          </div>
        </div>
        <!-- 输入框 -->
        <input
          class="h-full w-full rounded-full bg-transparent pl-1 outline-none"
          type="text"
          ref="$search"
          @focus="inputData.isFocus = true"
          @blur="inputData.isFocus = false"
          v-model="inputData.text"
          @keydown="inputKeydown"
        />
        <!-- 搜素图标 -->
        <i
          class="iconfont icon-sousuo flex cursor-pointer items-center px-1 text-2xl"
          @mousedown="search()"
        ></i>
      </div>
      <!-- 关键字补全列表 -->
      <div
        v-if="inputData.isFocus && inputData.list.length"
        class="w-full z-10 top-[40px] cursor-pointer rounded-bl-xl rounded-br-xl bg-black/50 backdrop-blur-sm backdrop-filter border-t-2 border-black/30 box-border"
      >
        <div
          class="transition-all py-1 pl-4 hover:bg-black/50 hover:pl-6 line-clamp-1"
          v-for="(t, i) in inputData.list"
          :class="{ 'bg-black/50 pl-6': inputData.listIndex == i }"
          @mousedown.prevent="clickKeyword(t)"
        >
          {{ t }}
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
._phone_searchFlagdiv {
  @media (max-width: @phone) {
    height: 40px;
  }
}

._phone_searchWrap {
  @media (max-width: @phone) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-top: 20px;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 10;
  }
}
</style>
