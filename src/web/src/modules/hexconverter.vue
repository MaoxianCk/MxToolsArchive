<script setup>
import { defineComponent, ref, computed } from 'vue'
import { doCopy } from '@/utils/copyUtil'
import { useMessage } from 'naive-ui'

const message = useMessage()
const convert = (base, num, tobase) => {
    //如果是number类型就将其转化为字符串
    if (typeof (num) === "number") {
        num = num.toString()
    }
    // 将数按小数点分开
    let decimal = num.split('.')[1], float10 = 0
    // 如果没有小数，则decimal === undefined为真
    if (decimal === undefined) {
        decimal = []
    }
    // 如果有小数，则计算小数部分的10进制的值
    for (let i = 0; i < decimal.length; i++) {
        float10 += parseInt(decimal[i]) * Math.pow(base, - (i + 1))
    }
    // 计算整数部分的10进制的值
    let int10 = parseInt(num.split('.')[0], base)
    // 10进制转化为tobase进制
    return (int10 + float10).toString(tobase)
}
const HexOptions = ref([
    {
        label: '二进制',
        value: 2,
    },
    {
        label: '四进制',
        value: 4,
    },
    {
        label: '八进制',
        value: 8,
    },
    {
        label: '十进制',
        value: 10,
    },
    {
        label: '十六进制',
        value: 16,
    },
    {
        label: '三十二进制',
        value: 32,
    },
    {
        label: '其它进制',
    }
])
const inputScale = ref(2)
const ipNumber = ref(111)
const ipOtherScale = ref(3)
const opOtherScale = ref(3)
const opNumber = computed(() => {
    // console.log(666666666666, inputScale.value)
    // console.log(99999, ipNumber.value != '')
    return inputScale.value != 'on' ? {
        two: convert(inputScale.value, ipNumber.value, 2),
        four: convert(inputScale.value, ipNumber.value, 4),
        eight: convert(inputScale.value, ipNumber.value, 8),
        ten: convert(inputScale.value, ipNumber.value, 10),
        sixteen: convert(inputScale.value, ipNumber.value, 16),
        thirty2: convert(inputScale.value, ipNumber.value, 32),
        out: convert(inputScale.value, ipNumber.value, opOtherScale.value)
    } : ipother.value ? {
        two: convert(ipOtherScale.value, ipNumber.value, 2),
        four: convert(ipOtherScale.value, ipNumber.value, 4),
        eight: convert(ipOtherScale.value, ipNumber.value, 8),
        ten: convert(ipOtherScale.value, ipNumber.value, 10),
        sixteen: convert(ipOtherScale.value, ipNumber.value, 16),
        thirty2: convert(ipOtherScale.value, ipNumber.value, 32),
        out: convert(ipOtherScale.value, ipNumber.value, opOtherScale.value)
    } : {
        two: 0,
        four: 0,
        eight: 0,
        ten: 0,
        sixteen: 0,
        thirty2: 0,
        out: 0
    }
})
const handleCopy = (text) => {
    if (text!=="NaN") {
        doCopy(JSON.parse(text), () => message.success('帮你复制好了 !'))
    }
    else {
        message.error('你复制了个寂寞')
    }
}
</script>

<template>
    <div class="hex-title  mt-20 mb-10">请选择待转换数的进制:</div>
    <n-space>
        <n-radio-group v-model:value="inputScale" name="radiogroup">
            <n-space>
                <n-radio v-for="hex in HexOptions.slice(0, -1)" :key="hex.value" :value="hex.value">
                    <div>{{ hex.label }}</div>
                </n-radio>
            </n-space>
            <n-space class="mt-10">
                <n-radio v-for="hex in HexOptions.slice(-1)" :key="hex.value">
                    {{ hex.label }}
                </n-radio>
            </n-space>
        </n-radio-group>
    </n-space>
    <div>
        <div :style="{ width: '200px' }" v-if="inputScale === 'on'"><n-input-number v-model:value="ipOtherScale"
                :style="{ width: '100%' }" min="2" max="32" placeholder="请输入2-32以内进制" clearable /></div>
        <div :style="{ width: '200px' }" v-else><n-input-number v-model:value="ipOtherScale" placeholder="等待中..."
                :style="{ width: '100%' }" disabled />
        </div>
    </div>
    <div class="mt-20">
        <n-input-group>
            <n-input-group-label>转换数字</n-input-group-label>
            <n-input :style="{ width: '300px' }" v-model:value="ipNumber" placeholder="请输入转换数字" clearable />
        </n-input-group>
    </div>
    <n-divider />
    <div class="hex-title mt-20 mb-10">常用的进制转换:</div>
    <div class="mb-20  hex-title">
        <n-table :single-line="false" :style="{ width: '800px' }" striped>
            <thead >
                <tr>
                    <th>进制</th>
                    <th>输出结果</th>
                    <th>进制</th> 
                    <th>输出结果</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2</td>
                    <td>
                        <n-input :style="{ width: '200px' }" v-model:value="opNumber.two" placeholder="转换结果"
                            class="hex-output" disabled />
                        <n-button size="small" @click="handleCopy(opNumber.two)" class="ml-10">
                            复制
                        </n-button>
                    </td>
                    <td>10</td>
                    <td>
                        <n-input :style="{ width: '200px' }" v-model:value="opNumber.ten" placeholder="转换结果"
                            class="hex-output" disabled />
                        <n-button size="small" @click="handleCopy(opNumber.ten)" class="ml-10">
                            复制
                        </n-button>
                    </td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>
                        <n-input :style="{ width: '200px' }" v-model:value="opNumber.four" placeholder="转换结果"
                            class="hex-output" disabled />
                        <n-button size="small" @click="handleCopy(opNumber.four)" class="ml-10">
                            复制
                        </n-button>
                    </td>
                    <td>16</td>
                    <td>
                        <n-input :style="{ width: '200px' }" v-model:value="opNumber.sixteen" placeholder="转换结果"
                            class="hex-output" disabled />
                        <n-button size="small" @click="handleCopy(opNumber.sixteen)" class="ml-10">
                            复制
                        </n-button>
                    </td>
                </tr>
                <tr>
                    <td>8</td>
                    <td>
                        <n-input :style="{ width: '200px' }" v-model:value="opNumber.eight" placeholder="转换结果"
                            class="hex-output" disabled />
                        <n-button size="small" @click="handleCopy(opNumber.eight)" class="ml-10">
                            复制
                        </n-button>
                    </td>
                    <td>32</td>
                    <td>
                        <n-input :style="{ width: '200px' }" v-model:value="opNumber.thirty2" placeholder="转换结果"
                            class="hex-output" disabled />
                        <n-button size="small" @click="handleCopy(opNumber.thirty2)" class="ml-10">
                            复制
                        </n-button>
                    </td>
                </tr>
            </tbody>
        </n-table>
        <n-divider />
        <div class="hex-title mb-10">任意进制转换:</div>
        <n-table :single-line="false" :style="{ width: '800px' }">
            <thead>
                <tr>
                    <th>进制</th>
                    <th>输出结果</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        输出进制
                        <n-input-number v-model:value="opOtherScale" min="2" max="32" :style="{ width: '250px' }"/>
                    </td>
                    <td>
                        <n-input :style="{ width: '353px' }" v-model:value="opNumber.out" placeholder="转换结果"
                            class="hex-output" disabled />
                        <n-button size="small" @click="handleCopy(opNumber.out)" class="ml-10">
                            复制
                        </n-button>
                    </td>
                </tr>
            </tbody>
        </n-table>
    </div>
</template>

<style scoped lang="scss">


.hex-output {
    background-color: white;
}

.hex-iptable {
 padding-right: 200px;
}
.hex-title {
    font-size: var(--n-title-font-size)
}
</style>
