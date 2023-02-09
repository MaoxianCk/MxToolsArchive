<script setup>
import { ref, computed } from 'vue';
import  moment from 'moment'
import { onMounted} from 'vue'

const starttime = ref(
  {
    startyear: 2044,
    startmon: 1,
    startday: 1,
    starthour: 0,
    startmin: 0,
    startsecond: 0,
  }
)
const endtime = ref(
  {
    endyear: 2058,
    endmon: 1,
    endday: 1,
    endhour: 0,
    endmin: 0,
    endsecond: 0,
  }
)
const scaleoption = ref(
  ['年', '月', '天', '小时', '分钟', '秒']
)
const time =ref(new Date()) 

onMounted(() => {//⽣命周期模板挂载之后
  this.timer = setInterval(() => {
    document.getElementById("nowTime").innerHTML =  timestampToTime(new Date());
  }, 1000)
})

function timestampToTime(timestamp) {
    return moment(timestamp).format('YYYY-MM-DD HH:mm:ss');
}

</script>

<template>
  <mx-row class="horizontal">
    <div class="title">当前时间：北京时间 <a id="nowTime">{{ timestampToTime(time)}}</a></div>
  </mx-row>
  <mx-row class="horizontal">
    <div class="top-title">
      <n-input-group class="mt-20">
        开始时间：
        <n-date-picker />
        <n-time-picker />
      </n-input-group>
    </div>
  </mx-row>
  <mx-row class="horizontal">
    <div class="b-title">
      <n-input-group class="mt-20">
        结束时间：
        <n-date-picker />
        <n-time-picker />
      </n-input-group>
    </div>
  </mx-row>
  <mx-row class="horizontal">
    <div class="mt-60">
      <n-input-group class="mb-30">
        <n-button color="#8a2be2" size="large" class="mr-20">计算时间差</n-button>
        <div>
          <n-input size="large" placeholder="时间差"></n-input>
        </div>
      </n-input-group>
    </div>
  </mx-row>
</template>

<style scoped lang="scss">
.title{
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