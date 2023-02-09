<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import moment from 'moment'
let timer = 0

const nowTime = ref('')

const time = ref({
  start: null,
  // 组件的时间用的是时间戳
  end: moment().valueOf()
})

onMounted(() => {
  timer = setInterval(() => {
    nowTime.value = moment().format('YYYY-MM-DD HH:mm:ss')
    // 100比较准
  }, 100)
})
onUnmounted(() => {
  timer && clearInterval(timer)
})

// 用computed自动计算，当 time.start || time.end这两个值变的时候会自动更新 timeResult
const timeResult = computed(() => {
  let duration = null
  if (time.value.start && time.value.end) {
    duration = moment.duration(time.value.end - time.value.start)
  }
  return duration ? {
    // floor 向下取整
    years: Math.floor(duration.asYears()),
    months: Math.floor(duration.asMonths()),
    weeks: Math.floor(duration.asWeeks()),
    days: Math.floor(duration.asDays()),
    hours: Math.floor(duration.asHours()),
    minutes: Math.floor(duration.asMinutes()),
  } : {
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
  }
})

function timestampToTime(timestamp) {
  return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
}

</script>

<template>
  <mx-row class="horizontal">
    <div class="title">当前时间：北京时间 <a id="nowTime">{{ nowTime }}</a></div>
  </mx-row>
  <mx-row class="horizontal">
    <div class="top-title">
      <n-input-group class="mt-20">
        开始时间：
        <n-date-picker v-model:value="time.start" type="datetime" clearable />
      </n-input-group>
    </div>
  </mx-row>
  <mx-row class="horizontal">
    <div class="b-title">
      <n-input-group class="mt-20">
        结束时间：
        <n-date-picker v-model:value="time.end" type="datetime" clearable />
      </n-input-group>
    </div>
  </mx-row>
  <mx-row class="horizontal">
    <div class="mt-60">
      <mx-row>
        年： {{ timeResult.years }}
      </mx-row>
      <mx-row>
        月：{{ timeResult.months }}
      </mx-row>
      <mx-row>
        天：{{ timeResult.days }}
      </mx-row>
      <mx-row>
        分钟: {{ timeResult.minutes }}
      </mx-row>
    </div>
  </mx-row>
</template>

<style scoped lang="scss">
.title {
  font-size: 35px;
}

.top-title {
  font-size: large;
  color: darkcyan;
}

.b-title {
  font-size: large;
  color: burlywood;
}

.horizontal {
  display: flex;
  justify-content: space-around;
}
</style>