<script setup lang="ts">
import router from "@/router";
import { ref } from "vue";

function getHours() {
  const date = new Date();
  return date.getHours() < 10 ? "0" + date.getHours() : `${date.getHours()}`;
}
function getMinutes() {
  const date = new Date();
  return date.getMinutes() < 10
    ? "0" + date.getMinutes()
    : `${date.getMinutes()}`;
}

let hours = ref(getHours());
let minutes = ref(getMinutes());

setInterval(() => {
  hours.value = getHours();
  minutes.value = getMinutes();
}, 1000);


// 点击5次进入修改
let clickNum = 0;
function goEdit(){
  clickNum++;
  if(clickNum>=5){
    router.push({name:'edit'})
    clickNum=0;
  }
}

</script>

<template>
  <div class="text-white text-4xl pt-24 pb-3 text-center">
    <span @click="goEdit" class="text-shadow select-none">
      {{ `${hours}:${minutes}` }}
    </span>
  </div>
</template>
