<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()

</script>



<template>
  <!-- <div class="tool-box"> -->
  <n-card
    :title="route.name"
    :segmented="{
      content: true,
    }"
    bordered>
    <router-view />
  </n-card>
  <!-- </div> -->
</template>

<style scoped lang="scss">
</style>