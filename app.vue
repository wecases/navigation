<template>
  <div>
    <NuxtWelcome />
  </div>
</template>

<script lang="ts" setup>
// 测试 pinia 及其持续化存储
const indexStore = useIndexStore();
console.log(indexStore.count);
indexStore.count++;
</script>
