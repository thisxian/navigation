<script setup lang="ts">
import { Store } from "@/store";
const store = Store();

const props = defineProps({
  card: { type: Object, default: {} },
});

// 修改卡片
function editCard() {
  store.edit.isEditCard = true;
  store.edit.editCard.title = props.card.title;
  store.edit.editCard.url = props.card.url;
  store.edit.editCard.description = props.card.description;
  store.edit.editCard.icon = props.card.icon;
  store.edit.editCardFinish = () => {
    props.card.title = store.edit.editCard.title;
    props.card.url = store.edit.editCard.url;
    props.card.description = store.edit.editCard.description;
    props.card.icon = store.edit.editCard.icon;
  }
}

// 删除卡片
function deleteCard() {
  const isdel = confirm(`是否删除 ${props.card.title} 卡片`);
  if (!isdel) return;
  props.card.delete();
}
</script>
<template>
  <a
    target="_blank"
    :href="card.url"
    :title="card.description"
    class="h-[75px] relative bg-[#eef0f4] rounded-md border flex items-center shadow-lg cursor-pointer"
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
    <!-- 按钮 -->
    <div
      @click.prevent
      class="right-0 h-full z-10 bottom-0 flex flex-col justify-evenly"
    >
      <i class="iconfont icon-wrench _btnIcon" @mousedown="editCard"></i>
      <i class="iconfont icon-shanchu _btnIcon" @mousedown="deleteCard"></i>
    </div>
  </a>
</template>

<style lang="less" scoped>
._btnIcon {
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
</style>
