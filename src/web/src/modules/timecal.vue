<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import moment from 'moment'
import { MonetizationOnFilled } from '@vicons/material';
let timer = 0

const nowTime = ref('')

const time = ref({
  start:null,
  // 组件的时间用的是时间戳
  end: null,
  nowdata:moment().valueOf(),
  dduration:0
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
    week:  Math.floor(duration.weeks()),
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
  <n-card content-style="padding: 0;">
    <n-tabs type="line" size="large" :tabs-padding="20" pane-style="padding: 20px;">
      <n-tab-pane name="计算两个时间的时间差">
        <mx-row class="timecal-horizontal">
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
        <n-space vertical class="mt-50 mb-30 pr-40">
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
                <td>{{ timeResult.year}}</td>
                <td>{{ timeResult.month}}</td>
                <td>{{ timeResult.day}}</td>
                <td>{{ timeResult.hour}}</td>
                <td>{{ timeResult.minute}}</td>
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
      </n-tab-pane>
      <n-tab-pane name="计算距离x天的日期">
        <mx-row class="timecal-horizontal">
          <div class="timecal-title">当前时间：北京时间 {{ nowTime }}</div>
        </mx-row>
        <mx-row class="timecal-horizontal">
          <div class="timecal-title">
            <n-input-group class="mt-20">
              开始时间：
              <n-date-picker v-model:value="time.nowdata" type="date" clearable/>
            </n-input-group>
          </div>
        </mx-row>
        <mx-row class="timecal-horizontal">
          <div class="timecal-title">
            <n-input-group class="mt-20">
              距离天数：
              <n-input-number v-model:value="time.dduration" placeholder="请输入整数" min="-99999999" max="9999999" style="width: 200px"  />
            </n-input-group>
          </div>
        </mx-row>
        <mx-row class="timecal-horizontal">
          <div class="mt-30 timecal-title">
            {{ Math.abs(time.dduration) }} 天{{( time.dduration>0 ? '后':'前')}}的日期为: {{moment().add(time.dduration,"days").format('YYYY-MM-DD') }}
          </div>
        </mx-row>
      </n-tab-pane>
    </n-tabs>
  </n-card>

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