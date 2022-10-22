<script lang="ts" setup>
const indexStore = useIndexStore();
await indexStore.getWallpaperType();
await indexStore.getWallpaper();
</script>
<template>
  <div>
    <div>
      <span v-for="(item, index) in indexStore.types" :key="index">
        {{ item.name }},
      </span>
    </div>
    <div>
      <template v-for="(item, index) in indexStore.list">
        <img :src="item.url_thumb" width="80" />
      </template>
    </div>
  </div>
</template>
