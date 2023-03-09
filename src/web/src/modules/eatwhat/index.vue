<script setup>
import { ref } from 'vue'
import foodTemplates from './food.json'

const num = ref(0)
const food = ref('神麽？')
const eatingTimes = ref(['早餐', '午餐', '晚餐'])
//按钮加载
const loading=ref(false)

const changEatingTime = () => {
    num.value = (num.value + 1) % 3
}
//文字转动效果
const scrollAnimate = () => {
    food.value = foodTemplates[0]
    foodTemplates.push(foodTemplates[0]);
    foodTemplates.shift();
    console.log(foodTemplates)
    setTimeout(() => {
        // console.log('o',foodTemplates)
        clearInterval(timer)
        let num = Math.floor(Math.random() * foodTemplates.length)
        food.value = foodTemplates[num]
        // console.log('out',foodTemplates)
        loading.value=false
    }, 5000);
}
let timer = 0
const getScroll = () => {
    loading.value=true
    timer = setInterval(scrollAnimate, 300)
}

</script>

<template>
    <n-space justify="center">
        <n-tooltip placement="bottom-start" trigger="hover">
            <template #trigger>
                <n-button text class="eat-title mt-50" @click="changEatingTime()">
                    今天{{ eatingTimes[num] }}吃<b>{{ food }}</b>
                </n-button>
            </template>
            点击我更换饭点
        </n-tooltip>
    </n-space>
    <n-space justify="center">
        <n-button round color="#ff69b4" :loading="loading" class="mt-80 mb-10" @click="getScroll()">
            开始
        </n-button>
    </n-space>
</template>

<style lang="scss">
.eat-title {
    font-size: var(--n-title-font-size);
}
</style>