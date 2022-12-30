<script setup>
import { Icon } from '@vicons/utils'
import MxGlobalSearch from '@/components/MxGlobalSearch.vue'
</script>

<template>
  <div class="header-wrapper">
    <!-- 左侧标题logo -->
    <div class="header-title">
      <div class="header-logo">
        <Icon :size="36">
          <img src="@/assets/svgs/hammer.svg">
        </Icon>
      </div>
      <div>Mx-Tools</div>
    </div>

    <!-- 搜索框 -->
    <div class="header-search">
      <MxGlobalSearch />
    </div>
  </div>
</template>

<style scoped>
.header-wrapper {
    --header-title-width: 160px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    height: var(--header-height);
    border-bottom: var(--main-color) 2px solid;
}

.header-title {
    /* background-color: gray; */
    width: var(--header-title-width);
    height: var(--header-height);
    display: flex;
    justify-content: center;
    align-items: center;

    font-family: 'smiley-sans';
    font-size: 20px;
}

.header-title > .header-logo {
    margin-right: 12px;
}

.header-search {
    margin-right: 50px;
}
</style>
