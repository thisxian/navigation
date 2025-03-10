<script setup lang="ts">
import { Store } from "@/store";
import { nanoid } from "nanoid";
import { onUpdated } from "vue";
const store = Store();

// 关闭窗口
function close() {
  store.edit.isEditNav = false;
}

// 确认修改
function sure() {
  store.edit.isEditNav = false;
  store.edit.editNavFinish();
}

// 删除Nav
function deleteNav(id: string) {
  const nav = store.edit.editNav.find((_) => _.id == id);
  store.edit.editNav = store.edit.editNav.filter((_: any) => _ !== nav);
}

// 增加
function addNav() {
  const nav: any = { title: "", id: nanoid() };
  store.edit.editNav.push(nav);
  let packing:any = store.edit.editNavFinish;
  store.edit.editNavFinish = function () {
    nav.list = [];
    // 添加新的nav
    store.edit.editNavOrigin.push(nav)
    packing();
    packing = null;
  };
}
</script>

<template>
  <div class="fixed top-0 left-0 z-10 w-full h-full bg-black/60 fcenter">
    <div
      class="_box relative w-[90%] max-w-[400px] h-[400px] bg-white rounded-xl flex flex-col justify-center items-center pb-3"
    >
      <i
        class="iconfont icon-tianjia absolute right-1 top-1 w-[30px] h-[30px] fcenter text-4xl rotate-45 text-[#888] hover:text-[#444]"
        @click="close"
      ></i>
      <div class="_items">
        <div class="_item" v-for="nav in store.edit.editNav">
          <input type="text" v-model="nav.title" />
          <span></span>
          <i
            @click="deleteNav(nav.id)"
            class="delete iconfont icon-shanchu cursor-pointer"
          ></i>
        </div>
      </div>
      <!-- 确认按钮 -->
      <div class="_bottom relative">
        <i
          @click="addNav"
          class="iconfont icon-tianjia text-xl text-black/60 cursor-pointer scale-[2] absolute left-[180%]"
        ></i>
        <a class="_sure" href="javascript:;" @click="sure">确定</a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
._box {
  ._items {
    width: 60%;
    // height: 80%;
    // flex-grow: 1;
    overflow-y: auto;
    ._item {
      position: relative;
      padding: 5px 0;
      display: flex;
      margin-bottom: 10px;
      p {
        flex-shrink: 0;
      }
      input {
        font-weight: normal;
        width: 100%;
        outline: none;
        &:focus + span {
          border-bottom-color: #333;
        }
      }
      span {
        width: 100%;
        border-bottom: 2px solid #ccc;
        position: absolute;
        top: 100%;
        left: 0;
      }
    }
  }
  ._bottom {
    display: flex;
    margin-top: 20px;
    padding: 5px 0;

    ._sure {
      font-weight: bold;
      width: 75px;
      border-radius: 6px;
      color: #555;
      box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
        -2px -2px 12px rgba(195, 195, 195, 0.5),
        inset 2px 2px 4px rgba(255, 255, 255, 0.1),
        2px 2px 8px rgba(0, 0, 0, 0.15);
      background-color: rgb(247, 247, 247);
      &:hover {
        background-color: rgb(241, 241, 241);
      }
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px 0;
    }
  }
}
</style>
