<script setup>
import { Icon } from '@vicons/utils'
import MxGlobalSearch from '@/components/MxGlobalSearch.vue'
</script>

<template>
  <div class="header-wrapper">
    <!-- 左侧标题logo -->
    <!-- todo hover鼠标特效 -->
    <RouterLink to="/index" class="no-link">
      <div class="header-title">
        <div class="header-logo">
          <Icon :size="36">
            <img src="@/assets/svgs/hammer.svg">
          </Icon>
        </div>
        <div class="header-text">Mx-Tools</div>
      </div>
    </RouterLink>

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

  cursor: pointer;
}

.header-title>.header-logo {
  margin-right: 12px;
}

.header-search {
  padding-right: 10%;
}
</style>
