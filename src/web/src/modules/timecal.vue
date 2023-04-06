<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import moment from 'moment'
let timer = 0

const nowTime = ref('')

const time = ref({
    start: null,
    // 组件的时间用的是时间戳
    end: null,
    nowdata: moment().valueOf(),
    yduration: 0,
    Mduration: 0,
    dduration: 0,
    hduration: 0,
    mduration: 0
})

onMounted(() => {
    timer = setInterval(() => {
        nowTime.value = moment().format('YYYY-MM-DD HH:mm:ss')
        // 100比较准
    }, 100)
})
onBeforeUnmount(() => {
    timer && clearInterval(timer)
})
const cal = computed(() => {
    let result = null
    if (!time.value.nowdata) {
        return 0
    }
    else {
        result = moment(time.value.nowdata).add(time.value.yduration, "years")
        // result = 
        result=result.add(time.value.Mduration, "months")
        result=result.add(time.value.dduration, "days")
        result=result.add(time.value.hduration, "hours")
        result=result.add(time.value.mduration, "minutes")
        console.log(result)
    }
    return result.format('YYYY-MM-DD HH:mm:ss')
})

</script>
<template>
    <mx-row class="timecal-horizontal mt-20">
        <div class="timecal-title">当前时间：北京时间 {{ nowTime }}</div>
    </mx-row>
    <mx-row class="timecal-horizontal">
        <div class="timecal-title">
            <n-input-group class="mt-20">
                开始时间：
                <n-date-picker v-model:value="time.nowdata" type="datetime" clearable />
            </n-input-group>
        </div>
    </mx-row>
    <mx-row class="timecal-horizontal">
        <div class="timecal-title">
            <n-input-group class="mt-20">
                距离时间：
                <n-input-number v-model:value="time.yduration" placeholder="请输入整数" min="-99999999" max="9999999"
                    style="width: 80px" /> 年
                <n-input-number v-model:value="time.Mduration" placeholder="请输入整数" min="-99999999" max="9999999"
                    style="width: 80px" /> 月
                <n-input-number v-model:value="time.dduration" placeholder="请输入整数" min="-99999999" max="9999999"
                    style="width: 80px" /> 天
                <n-input-number v-model:value="time.hduration" placeholder="请输入整数" min="-99999999" max="9999999"
                    style="width: 80px" /> 时
                <n-input-number v-model:value="time.mduration" placeholder="请输入整数" min="-99999999" max="9999999"
                    style="width: 80px" /> 分
            </n-input-group>
        </div>
    </mx-row>
    <mx-row class="timecal-horizontal mb-30">
        <div class="mt-30 timecal-title">
            <!-- {{ Math.abs(time.dduration) }} 天{{ (time.dduration > 0 ? '后' : '前') }}的日期为: -->
            计算得到的时间结果为
            {{cal }}
        </div>
    </mx-row>
</template>
<style scoped lang="scss">
.timecal-title {
    font-size: var(--n-title-font-size)
}

.timecal-horizontal {
    display: flex;
    justify-content: space-around;
}
</style>