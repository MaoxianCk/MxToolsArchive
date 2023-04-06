<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import moment from 'moment'
let timer = 0

const nowTime = ref('')

const time = ref({
  start: null,
  // 组件的时间用的是时间戳
  end: null
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
    year: Math.floor(duration.years()),
    month: Math.floor(duration.months()),
    week: Math.floor(duration.weeks()),
    day: Math.floor(duration.days()),
    hour: Math.floor(duration.hours()),
    minute: Math.floor(duration.minutes()),
  } : {
    years: 0,
    months: 0,
    weeks: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    year: 0,
    month: 0,
    week: 0,
    day: 0,
    hour: 0,
    minute: 0,
  }
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
          <n-date-picker v-model:value="time.start" type="datetime" clearable />
        </n-input-group>
      </div>
    </mx-row>
    <mx-row class="timecal-horizontal">
      <div class="timecal-title">
        <n-input-group class="mt-20">
          结束时间：
          <n-date-picker v-model:value="time.end" type="datetime" clearable />
        </n-input-group>
      </div>
    </mx-row>
    <n-space vertical class="mt-20 mb-30 pr-40">
      <n-table :bordered="true" :single-line="false" size="large">
        <thead>
          <tr>
            <th>时间单位</th>
            <th>年</th>
            <th>月</th>
            <th>天</th>
            <th>小时</th>
            <th>分钟</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>两个时间差</th>
            <td>{{ timeResult.year }}</td>
            <td>{{ timeResult.month }}</td>
            <td>{{ timeResult.day }}</td>
            <td>{{ timeResult.hour }}</td>
            <td>{{ timeResult.minute }}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <th>按单位时间差</th>
            <td>{{ timeResult.years }}</td>
            <td>{{ timeResult.months }}</td>
            <td>{{ timeResult.days }}</td>
            <td>{{ timeResult.hours }}</td>
            <td>{{ timeResult.minutes }}</td>
          </tr>
        </tbody>
      </n-table>
    </n-space>
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