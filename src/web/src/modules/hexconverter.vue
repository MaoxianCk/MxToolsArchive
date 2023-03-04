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
const ipNumber = ref(null)
const ipOtherScale = ref(3)
const opOtherScale = ref(10)
const mConvert = (scale) => {
    return convert(inputScale.value, ipNumber.value, scale)
}
const oConvert = (scale) => {
    return convert(ipOtherScale.value, ipNumber.value, scale)
}
const opNumber = computed(() => {
    //输入数字是否为空
    return !ipNumber.value || ipNumber.value === '-' ? {
        two: null,
        four: null,
        eight: null,
        ten: null,
        sixteen: null,
        thirty2: null,
        out: null
    }//是否自定义进制 
        : inputScale.value != 'on' ? {
            two: mConvert(2),
            four: mConvert(4),
            eight: mConvert(8),
            ten: mConvert(10),
            sixteen: mConvert(16),
            thirty2: mConvert(32),
            out: mConvert(opOtherScale.value)
        }//自定义进制是否为空 
            : ipOtherScale.value ? {
                two: oConvert(2),
                four: oConvert(4),
                eight: oConvert(8),
                ten: oConvert(10),
                sixteen: oConvert(16),
                thirty2: oConvert(32),
                out: oConvert(opOtherScale.value)
            } : {
                two: null,
                four: null,
                eight: null,
                ten: null,
                sixteen: null,
                thirty2: null,
                out: null
            }
})
const handleCopy = (text) => {
    if (text !== "NaN") {
        doCopy(text, () => message.success('帮你复制好了 !'))
    }
    else {
        message.error('你复制了个寂寞')
    }
}
//输入框不允许有空格
// const noSpace = (value) =>!value || /^\S+$/.test(value) 
const reg = (value) => {
    let scale
    if (inputScale.value !== 'on') {
        scale = convert(10, (inputScale.value - 1), 32)
    }
    else {
        scale = convert(10, (ipOtherScale.value - 1), 32)////////////
    }
    let re = `[0-${scale}]`
    // console.log('666', eval(`/^-?\\b${re}*\\b$/.test(value)`))
    // console.log('re', re, 'scale', scale)
    return !value || eval(`/^-?${re}*$/.test(value)`)
}

//点击单选框与自定义进制时重置输入
const reset = () => {
    ipNumber.value = null
    //输入自定义进制与单选框联动
    if (inputScale.value !== 'on') {
        ipOtherScale.value = inputScale.value
    }
}
</script>

<template>
    <div class="hex-title  mt-20 mb-10">请选择待转换数的进制:</div>
    <n-space>
        <n-radio-group v-model:value="inputScale" name="radiogroup" @click="reset">
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
                :style="{ width: '100%' }" min="2" max="32" placeholder="请输入2-32以内进制" @update:value="reset" clearable />
        </div>
        <div :style="{ width: '200px' }" v-else><n-input-number v-model:value="inputScale" placeholder="等待中..."
                :style="{ width: '100%' }" disabled />
        </div>
    </div>
    <div class="mt-20">
        <n-input-group>
            <n-input-group-label>转换数字</n-input-group-label>
            <n-input :style="{ width: '300px' }" v-model:value="ipNumber" :allow-input="reg" placeholder="请输入转换数字"
                clearable />
        </n-input-group>
    </div>
    <n-divider />
    <div class="hex-title mt-20 mb-10">常用的进制转换:</div>
    <div class="mb-20  hex-title">
        <n-table :single-line="false" :style="{ width: '800px' }" striped>
            <thead>
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
                        <n-input-number v-model:value="opOtherScale" min="2" max="32" :style="{ width: '250px' }" />
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
        <n-divider />
        <div class="hex-title mb-10">0-15基数(二,八,十,十六)进制对照表:</div>
        <n-table :single-line="false" :style="{ width: '800px' }" striped>
            <thead>
                <tr>
                    <th>十进制</th>
                    <th>二进制</th>
                    <th>八进制</th>
                    <th>十六进制</th>
                    <th>十进制</th>
                    <th>二进制</th>
                    <th>八进制</th>
                    <th>十六进制</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>0</td>
                    <td>8</td>
                    <td>1000</td>
                    <td>10</td>
                    <td>8</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>9</td>
                    <td>1001</td>
                    <td>11</td>
                    <td>9</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>10</td>
                    <td>2</td>
                    <td>2</td>
                    <td>10</td>
                    <td>1010</td>
                    <td>12</td>
                    <td>a</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td>11</td>
                    <td>3</td>
                    <td>3</td>
                    <td>11</td>
                    <td>1011</td>
                    <td>13</td>
                    <td>b</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td>100</td>
                    <td>4</td>
                    <td>4</td>
                    <td>12</td>
                    <td>1100</td>
                    <td>14</td>
                    <td>c</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td>101</td>
                    <td>5</td>
                    <td>5</td>
                    <td>13</td>
                    <td>1101</td>
                    <td>15</td>
                    <td>d</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td>110</td>
                    <td>6</td>
                    <td>6</td>
                    <td>14</td>
                    <td>1110</td>
                    <td>16</td>
                    <td>e</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td>111</td>
                    <td>7</td>
                    <td>7</td>
                    <td>15</td>
                    <td>1111</td>
                    <td>17</td>
                    <td>f</td>
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
