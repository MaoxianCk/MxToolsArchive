<script setup>
import { ref } from 'vue'
import foodTemplates from './food.json'
const num = ref(0)
const food = ref('神麽？')
const eatingTimes = ref(['早餐', '午餐', '晚餐'])
//按钮加载
const loading = ref(false)
const bottonText = ref('开始')

const changEatingTime = () => {
    num.value = (num.value + 1) % 3
}
//文字转动效果
const scrollAnimate = () => {
    let num = Math.floor(Math.random() * foodTemplates.length)
    food.value = foodTemplates[num]
    // console.log(foodTemplates)
}
let timer = 0
const getScroll = () => {
    loading.value = true
    bottonText.value = '安排中'
    timer = setInterval(scrollAnimate, 300)
    setTimeout(() => {
        // console.log('o',foodTemplates)
        clearInterval(timer)

        // console.log('out',foodTemplates)
        loading.value = false
        bottonText.value = '开始'
    }, 5000);
}
//按钮控制div移动
let timer2=null

</script>

<template>
    <div class="container">
        <n-space justify="center">
            <n-tooltip placement="bottom-start" trigger="hover">
                <template #trigger>
                    <!-- <n-button text :class="[!loading ? 'eat-title mt-50' : 'eat-title2 mt-50']" @click="changEatingTime()"> -->
                    <n-button text round :class="[!loading ? 'eat-title' : 'eat-title mt-70']"
                        @click="changEatingTime()">
                       今天{{ eatingTimes[num] }}吃<b>{{ food }}</b>
                    </n-button>
                </template>
                点击我更换饭点
            </n-tooltip>
        </n-space>
        <n-space justify="center">
            <n-button round color="#ff69b4" :loading="loading" :class="[!loading ? 'mt-10 mb-40' : 'mt-10 mb-40']"
                @click="getScroll()">
                {{ bottonText }}
            </n-button>
        </n-space>
    </div>
</template>

<style lang="scss" scoped>
.container {
    background-color: whitesmoke;
    height: 400px;
}

.eat-title {
    color: black;
    font-size: var(--n-title-font-size);
    margin-top: 120px;
}
.eat-title:hover {
    color: #1e1e2b;
    transition-delay: .5s;
}


.eat-title::after {
    content: "";
    pointer-events: none;
    bottom: -2px;
    left: 50%;
    position: absolute;
    width: 0%;
    height: 2px;
    background-color: grey;
    transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: 400ms;
    transition-property: width, left;
}

.eat-title:hover::after {
    width: 100%;
    left: 0%;
}
.eat-title:focus {
    color: black;
    background-color: whitesmoke;
    font-size: var(--n-title-font-size);
}
.eat-title2 {
    color: black;
    background-color: whitesmoke;
    font-size: var(--n-title-font-size);
}
.eat-title:focus {
    color: black;
    background-color: whitesmoke;
    font-size: var(--n-title-font-size);
}

</style>