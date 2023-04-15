<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import moment from 'moment'
let timer = 0

const nowUxTimestamp = ref('')
const nowTimestamp = ref('')
//输入时间戳
const timestamp = ref(moment().format('X'))
//输入日期时间
const timedata = ref(moment().valueOf())
//输入时间戳毫秒
const timestampMs = ref(moment().valueOf())
//输入日期时间
const timedataMs = ref(moment().valueOf())
const timeResult = computed(() => {
    let inputTimedata = ref("")
    let inputTimestamp = ref("")
    let inputTimedataMs = ref("")
    let inputTimestampMs = ref("")
    if (timestamp.value) {
        var date = new Date(timestamp.value * 1000); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear();
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds();
        inputTimedata.value = Y + '-' + M + '-' + D + ' ' + h + m + s
    }
    else if (timestamp.value === 0) {
        inputTimedata.value = 1970 + '-' + 0 + 1 + '-' + 1 + '  ' + 8 + ':' + 0 + ':' + 0
    }
    else {
        inputTimedata.value = null
    }
    if (timedata.value) {
        inputTimestamp.value = Math.floor(timedata.value / 1000)
    }
    else {
        inputTimestamp.value = null
    }
    if (timestampMs.value) {
        var date = new Date(timestampMs.value); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        let Y = date.getFullYear();
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
        let D = date.getDate() + ' ';
        let h = date.getHours() + ':';
        let m = date.getMinutes() + ':';
        let s = date.getSeconds() + ':';
        let ms = date.getMilliseconds();
        inputTimedataMs.value = Y + '-' + M + '-' + D + ' ' + h + m + s + ms
    }
    else if (timestampMs.value === 0) {
        inputTimedataMs.value = 1970 + '-' + 0 + 1 + '-' + 1 + '  ' + 8 + ':' + 0 + ':' + 0 + ':' + 0
    }
    else {
        inputTimedataMs.value = null
    }
    if (timedataMs.value) {
        inputTimestampMs.value = Math.floor(timedata.value / 1000)*1000
    }
    else {
        inputTimestampMs.value = null
    }
    return {
        opTimedata: inputTimedata.value,
        opTimestamp: inputTimestamp.value,
        opTimedataMs: inputTimedataMs.value,
        opTimestampMs: inputTimestampMs.value
    }
})
onMounted(() => {
    timer = setInterval(() => {
        nowUxTimestamp.value = moment().format('X')
        nowTimestamp.value = moment().valueOf()
        // 100比较准
    }, 100)
})
onBeforeUnmount(() => {
    timer && clearInterval(timer)
})
</script>

<template>
    <mx-row class="timecal-horizontal">
        <div class="timecal-title1 mt-20">时间戳(毫秒)： {{ nowTimestamp }}</div>
    </mx-row>
    <mx-row class="timecal-horizontal">
        <div class="timecal-title1">Unix时间戳(秒)： {{ nowUxTimestamp }}</div>
    </mx-row>
    <mx-row class="timecal-horizontal timecal-title mt-20">
        时间戳与日期时间之间的转换：
    </mx-row>
    <mx-row class="timecal-center timecal-title1 mt-15">
        <div>
            <n-input-group>时间戳：<div :style="{ width: '200px' }"><n-input-number v-model:value="timestamp" clearable
                        size="small" /></div></n-input-group>
        </div>
        <div>
            <n-tag :bordered="false" type="warning">
                转换成
            </n-tag>
        </div>
        <div>
            <n-input-group>
                <div :style="{ marginRight: '17px' }">时</div>间： <div :style="{ width: '200px' }"><n-input
                        v-model:value="timeResult.opTimedata" size="small" placeholder="输出日期时间" :disabled="true" /></div>
            </n-input-group>
        </div>
    </mx-row>
    <mx-row class="timecal-center timecal-title1 mt-15">
        <div>
            <n-input-group>
                <div :style="{ marginRight: '16px' }">时</div>间： <div :style="{ width: '200px' }"><n-date-picker
                        v-model:value="timedata" type="datetime" size="small" clearable /></div>
            </n-input-group>
        </div>
        <div>
            <n-tag :bordered="false" type="warning">
                转换成
            </n-tag>
        </div>
        <div>
            <n-input-group>时间戳：<div :style="{ width: '200px' }"><n-input size="small" v-model:value="timeResult.opTimestamp"
                        placeholder="输出时间戳" :disabled="true" />
                </div></n-input-group>
        </div>
    </mx-row>
    <n-divider />
    <mx-row class="timecal-horizontal timecal-title mt-20">
        时间戳(毫秒)与日期时间(毫秒)之间的转换：
    </mx-row>
    <mx-row class="timecal-center timecal-title1 mt-15">
        <div>
            <n-input-group>时间戳：<div :style="{ width: '200px' }"><n-input-number v-model:value="timestampMs" clearable
                        size="small" /></div></n-input-group>
        </div>
        <div>
            <n-tag :bordered="false" type="warning">
                转换成
            </n-tag>
        </div>
        <div>
            <n-input-group>
                <div :style="{ marginRight: '17px' }">时</div>间： <div :style="{ width: '200px' }"><n-input
                        v-model:value="timeResult.opTimedataMs" size="small" placeholder="输出日期时间" :disabled="true" /></div>
            </n-input-group>
        </div>
    </mx-row>
    <mx-row class="timecal-center timecal-title1 mt-15">
        <div>
            <n-input-group>
                <div :style="{ marginRight: '16px' }">时</div>间： <div :style="{ width: '200px' }"><n-date-picker
                        v-model:value="timedataMs" type="datetime" size="small" clearable /></div>
            </n-input-group>
        </div>
        <div>
            <n-tag :bordered="false" type="warning">
                转换成
            </n-tag>
        </div>
        <div>
            <n-input-group>时间戳：<div :style="{ width: '200px' }"><n-input clearable size="small" placeholder="输出时间戳"
                        v-model:value="timeResult.opTimestampMs" :disabled="true" />
                </div></n-input-group>
        </div>
    </mx-row>
</template>

<style scoped lang="scss">
.timecal-title1 {
    font-size: 16px;
}

.timecal-title {
    font-size: var(--n-title-font-size);
}

.timecal-horizontal {
    display: flex;
    justify-content: space-around;
}

.timecal-center {
    display: flex;
    justify-content: center;
}
</style>