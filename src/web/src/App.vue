<script setup>
import {RouterView, useRoute} from 'vue-router'
import MxHeader from '@/components/MxHeader.vue'
import {zhCN, dateZhCN} from 'naive-ui'
import 'animate.css'

</script>

<template>
  <n-config-provider :locale="zhCN" :date-locale="dateZhCN">
    <n-message-provider>
      <n-layout class="wrapper">
        <n-layout-header>
          <mx-header />
        </n-layout-header>
        <n-layout-content content-style="padding: 20px 10% 0 10%;">
          <router-view v-slot="{ Component }">
            <transition
              name="slide-fade"
              enter-active-class="animate__animated animate__fadeInLeft animate__fast">
              <component :is="Component" />
            </transition>
          </router-view>
        </n-layout-content>
      </n-layout>
    </n-message-provider>
  </n-config-provider>
</template>

<style scoped>
.wrapper {
  width: 100%;
}
.slide-fade-enter-active {
  transition: all .25s ease-out;
}

.slide-fade-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
