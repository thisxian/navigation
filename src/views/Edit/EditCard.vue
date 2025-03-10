<script setup lang="ts">
import { Store } from "@/store";
const store = Store();

// 关闭窗口
function close() {
  store.edit.isEditCard = false;
}

// 确认修改
function sure() {
  store.edit.isEditCard = false;
  store.edit.editCardFinish();
}

</script>

<template>
  <div class="fixed top-0 left-0 z-10 w-full h-full bg-black/60 fcenter">
    <div
      class="_box relative w-[90%] max-w-[400px] h-[400px] bg-white rounded-xl flex flex-col justify-center items-center"
    >
      <i class="iconfont icon-tianjia absolute right-1 top-1 w-[30px] h-[30px] fcenter text-4xl rotate-45 text-[#888] hover:text-[#444]" @click="close"></i>
      <div class="_item">
        <p>标题：</p>
        <input type="text" v-model="store.edit.editCard.title" />
        <span></span>
      </div>
      <div class="_item">
        <p>链接：</p>
        <input type="text" v-model="store.edit.editCard.url" />
        <span></span>
      </div>
      <div class="_item">
        <p>图标：</p>
        <input type="text" v-model="store.edit.editCard.icon" />
        <span></span>
      </div>
      <div class="_item">
        <p>描述：</p>
        <input type="text" v-model="store.edit.editCard.description" />
        <span></span>
      </div>
      <div class="_bottom">
        <a href="javascript:;" @click="sure">确定</a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
._box {
  color: #555555;
  font-weight: bold;
  ._item {
    width: 80%;
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
      font-size: 14px;
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
  ._bottom {
    width: 75px;
    border-radius: 6px;
    margin-top: 20px;
    color: #555;
    box-shadow: -2px -2px 8px rgba(255, 255, 255, 1),
      -2px -2px 12px rgba(195, 195, 195, 0.5),
      inset 2px 2px 4px rgba(255, 255, 255, 0.1),
      2px 2px 8px rgba(0, 0, 0, 0.15);
    background-color: rgb(247, 247, 247);
    text-align: center;
    padding: 5px 0;
    &:hover {
      background-color: rgb(241, 241, 241);
    }
  }
}
</style>
