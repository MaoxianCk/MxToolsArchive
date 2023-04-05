<script setup>
import { ref } from 'vue'
import foodTemplates from './food.json'
const num = ref(0)
const food = ref('神麽？')
const eatingTimes = ref(['早餐', '午餐', '晚餐'])
const back = document.getElementsByClassName("back") //背景动画******
//背景食物文本样式数组
let backFood = []
//按钮是否在加载
const loading = ref(false)
const bottonText = ref('开始')
//切换饭点
const changEatingTime = () => {
    num.value = (num.value + 1) % 3
}
const colors = [ //备选颜色
    "#eccc68",
    "#ffa502",
    "#7bed9f",
    "#a4b0be",
    "#70a1ff",
    "#ff6b81"
]
//文字转动效果
const scrollAnimate = () => {
    //获取div背景组件的宽高
    let h = document.getElementById('background').offsetHeight
    let w = document.getElementById('background').offsetWidth
    back[0].innerHTML = ""
    let num = Math.floor(Math.random() * foodTemplates.length)


    // console.log(foodTemplates)
    for (let i = 0; i < backFood.length; i++) {
        let text = backFood[i]
        var span = document.createElement("span")
        span.style.position = "absolute"
        span.style.top = text.sy + "px"
        span.style.left = text.sx + "px"
        span.style.color = text.color
        span.style.fontSize = text.size + "px"
        span.style.opacity = 1 - text.age / 100 //渐变透明度
        if (!loading.value) {
            span.innerHTML = food.value //停止状态则显示备选框文字
        }
        else { //运行状态则显示菜单内容
            span.innerHTML = text.str
            food.value = foodTemplates[num]
            food.value += '?'
        }
        back[0].appendChild(span) //添加进背景
        text.sy += text.vy //位移
        text.age++ //增加生命值
        if (text.age > 100) { //大于100则从数组中删除
            backFood.splice(i, 1)
        }
    }
    //根据页面背景大小填充文字背景数量
    if (backFood.length < h * w / 8000) {
        backFood.push({
            str: foodTemplates[parseInt(Math.random() * foodTemplates.length)], //随机选择菜名
            //获取background高度宽度并生成随机位置
            sx: 20 + Math.random() * (w - 132),
            sy: Math.random() * h,
            vy: -Math.random()-1, //随机位移速度
            color: colors[parseInt(Math.random() * colors.length)], //随机选择颜色
            size: Math.random() * 15 + 8, //文字尺寸范围为5-23
            age: Math.random() * 20 //起始生命值为0-20
        })
        // console.log(document.getElementById('background').offsetWidth, document.getElementById('background').offsetHeight)
    }
}
//选择
const getEnding = () => {
    loading.value = false
    food.value = food.value.slice(0, food.value.length - 1)
    food.value += '!'
    bottonText.value = '开始'
}

//文字不断跳转
let timer = 0
const getScroll = () => {
    back[0].innerHTML = ""
    loading.value = true
    bottonText.value = '就决定是你了！'
    timer = setInterval(scrollAnimate, 30)
}

</script>

<template>
    <div class="bg">
        <div id="background" class="back" style="height: 500px;width:100%"></div>
        <n-space justify="center">
            <n-tooltip placement="bottom-start" trigger="hover">
                <template #trigger>
                    <!-- <n-button text :class="[!loading ? 'eat-title mt-50' : 'eat-title2 mt-50']" @click="changEatingTime()"> -->
                    <n-button text round class="eat-title" @click="changEatingTime()">
                        今天{{ eatingTimes[num] }}吃<b>{{ food }}</b>
                    </n-button>
                </template>
                点击我更换饭点
            </n-tooltip>
        </n-space>
        <n-space justify="center">
            <n-button round color="#ff69b4" class="mt-10 mb-40" @click="[!loading ? getScroll() : getEnding()]">
                {{ bottonText }}
            </n-button>
        </n-space>
    </div>
</template>

<style lang="scss" scoped>

.bg {
  height: 500px;
  position: relative;
  width: 100%;
  background-image: url('eat.jpg');
  background-size: cover;
  background-repeat: repeat-y;
  animation: bg-animation 15s linear infinite;
  background-position: 0 0;
}
@keyframes bg-animation {
    0% {
        background-position: 0 0;
    }

    100% {
        background-position: 0 -676px;
    }
}
.eat-title {
    color: orange;
    font-size: 30px;
    margin-top: 180px;
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
    color: orange;
    background-color: whitesmoke;
    font-size: 30px;
}

.eat-title:hover {
    color: orange;
    background-color: whitesmoke;
    font-size: 30px;
}

.back {
    position: absolute;
    //超出边界隐藏
    overflow: hidden
}

.back span {
    white-space: nowrap;
}
</style>