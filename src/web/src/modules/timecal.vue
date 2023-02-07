<script setup>
import { ref, computed } from 'vue';
const starttime = ref(
  {
    startyear: 2044,
    startmon: 1,
    startday: 1,
    starthour: 0,
    startmin: 0,
    startsecond: 0,
    styear: [],
    stmon: [],
    stday: [],
    stmin: [],
    sthour: [],
    stsecond: []
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
    edyear: [],
    edmon: [],
    edday: [],
    edhour: [],
    edmin: [],
    edsecond: []
  }
)
const scaleoption = ref(
  ['年', '月', '天', '小时', '分钟', '秒']
)
</script>

<template>
  <mx-row>
    开始时间：
    <div>
      <n-input-group>
        <select>
          <option v-for="n in starttime.styear" :value=n>{{ n }}</option>
        </select>年
        <select>
          <option v-for="n in starttime.stmon" :value=n>{{ n }}</option>
        </select>月
        <select>
          <option v-for="n in starttime.stday" :value=n>{{ n }}</option>
        </select>日
        <select>
          <option v-for="n in starttime.sthour" :value=n>{{ n }}</option>
        </select>时
        <select>
          <option v-for="n in starttime.stmin" :value=n>{{ n }}</option>
        </select>分
        <select>
          <option v-for="n in starttime.stsecond" :value=n>{{ n }}</option>
        </select>秒
      </n-input-group>
    </div>
  </mx-row>
  <mx-row>
    结束时间：
    <div>
      <n-input-group>
        <select>
          <option v-for="n in endtime.edyear" :value=n>{{ n }}</option>
        </select>年
        <select>
          <option v-for="n in endtime.edmon" :value=n>{{ n }}</option>
        </select>月
        <select>
          <option v-for="n in endtime.edday" :value=n>{{ n }}</option>
        </select>日
        <select>
          <option v-for="n in endtime.edhour" :value=n>{{ n }}</option>
        </select>时
        <select>
          <option v-for="n in endtime.edmin" :value=n>{{ n }}</option>
        </select>分
        <select>
          <option v-for="n in endtime.edsecond" :value=n>{{ n }}</option>
        </select>秒
      </n-input-group>
    </div>
  </mx-row>
  <mx-row>
    <n-button>计算时间差</n-button>
    <n-input-group>
      <div>
        <n-input placeholder="时间差"></n-input>
      </div>
      <select>
        <option v-for="n in scaleoption" :value=n>{{ n }}</option>
      </select>
    </n-input-group>
  </mx-row>
</template>

<style scoped lang="scss">

</style>