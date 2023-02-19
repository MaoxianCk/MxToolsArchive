<script setup>
import { defineComponent, ref, computed } from 'vue'
import { Icon } from '@vicons/utils'
import { ArrowDropDownOutlined } from '@vicons/material'

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
const outputScale = ref(10)
const ipnumber = ref(111)
const ipother = ref(3)
const opother = ref(3)
const opnumber = computed(() => {
    console.log(666666666666, inputScale.value)
    console.log(99999, ipnumber.value != '')
    return inputScale.value != 'on' ? {
        two: convert(inputScale.value, ipnumber.value, 2),
        four: convert(inputScale.value, ipnumber.value, 4),
        eight: convert(inputScale.value, ipnumber.value, 8),
        ten: convert(inputScale.value, ipnumber.value, 10),
        sixteen: convert(inputScale.value, ipnumber.value, 16),
        thirty2: convert(inputScale.value, ipnumber.value, 32),
        out: convert(inputScale.value, ipnumber.value, opother.value)
    } : ipother.value ? {
        two: convert(ipother.value, ipnumber.value, 2),
        four: convert(ipother.value, ipnumber.value, 4),
        eight: convert(ipother.value, ipnumber.value, 8),
        ten: convert(ipother.value, ipnumber.value, 10),
        sixteen: convert(ipother.value, ipnumber.value, 16),
        thirty2: convert(ipother.value, ipnumber.value, 32),
        out: convert(ipother.value, ipnumber.value, opother.value)
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

</script>

<template>
    <div class="hex-title  hex-input mt-20 mb-10">请选择待转换数的进制:</div>
    <n-space justify="space-around">
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
    <div class="hex-inputS">
        <div :style="{ width: '42%' }" v-if="inputScale == 'on'"><n-input-number v-model:value="ipother"
                :style="{ width: '100%' }" min="2" max="32" placeholder="请输入2-32以内的待转换数的进制" clearable /></div>
        <div :style="{ width: '42%' }" v-else><n-input-number v-model:value="ipother" placeholder="等待中..."
                :style="{ width: '100%' }" disabled />
        </div>
    </div>
    <n-divider dashed />
    <div class="mt-20  hex-input">
        <n-input-group>
            <n-input-group-label>转换数字</n-input-group-label>
            <n-input :style="{ width: '52%' }" v-model:value="ipnumber" placeholder="请输入转换数字" clearable />
        </n-input-group>
    </div>
    <n-divider />
    <div class="hex-title  hex-input mt-20 mb-10">常用的进制转换:</div>
    <div class="mb-20 hex-iptable hex-title">
        <n-table :single-line="false">
            <thead>
                <tr>
                    <th>进制</th>
                    <th>输出结果</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>2</td>
                    <td>
                        <n-input :style="{ width: '90%' }" v-model:value="opnumber.two" placeholder="转换结果"
                            class="hex-output" disabled />
                        <n-button size="small" @click="handleCopy" class="ml-10">
                            复制
                        </n-button>
                    </td>
                </tr>
                <tr>
                    <th>4</th>
                    <th>
                        <n-input :style="{ width: '90%' }" v-model:value="opnumber.four" placeholder="转换结果"
                            class="hex-output" disabled />
                        <n-button size="small" @click="handleCopy" class="ml-10">
                            复制
                        </n-button>
                    </th>
                </tr>
                <tr>
                    <td>8</td>
                    <td>
                        <n-input :style="{ width: '90%' }" v-model:value="opnumber.eight" placeholder="转换结果"
                            class="hex-output" disabled />
                        <n-button size="small" @click="handleCopy" class="ml-10">
                            复制
                        </n-button>
                    </td>
                </tr>
                <tr>
                    <th>10</th>
                    <th>
                        <n-input :style="{ width: '90%' }" v-model:value="opnumber.ten" placeholder="转换结果"
                            class="hex-output" disabled />
                        <n-button size="small" @click="handleCopy" class="ml-10">
                            复制
                        </n-button>
                    </th>
                </tr>
                <tr>
                    <td>16</td>
                    <td>
                        <n-input :style="{ width: '90%' }" v-model:value="opnumber.sixteen" placeholder="转换结果"
                            class="hex-output" disabled />
                        <n-button size="small" @click="handleCopy" class="ml-10">
                            复制
                        </n-button>
                    </td>
                </tr>
                <tr>
                    <th>32</th>
                    <th>
                        <n-input :style="{ width: '90%' }" v-model:value="opnumber.thirty2" placeholder="转换结果"
                            class="hex-output" disabled />
                        <n-button size="small" @click="handleCopy" class="ml-10">
                            复制
                        </n-button>
                    </th>
                </tr>
            </tbody>
        </n-table>
        <n-divider />
        <div class="hex-title">任意进制转换:</div>
        <n-table :single-line="false">
            <thead>
                <tr>
                    <th>进制</th>
                    <th>输出结果</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td :style="{ width: '17%' }">
                        选择输出进制
                        <n-popover trigger="click" placement="top-end">
                            <template #trigger>
                                <n-button icon-placement="right">{{opother}}
                                    <template #icon>
                                        <Icon>
                                            <ArrowDropDownOutlined />
                                        </Icon>
                                    </template>
                                </n-button>
                            </template>
                            <n-radio-group v-model:value="opother" name="radiogroup" >
                                <n-space  v-for="index of 31" :key="index">
                                    <n-radio  :value="index">
                                        <div>{{ index+1 }}</div>
                                    </n-radio>
                                </n-space>
                            </n-radio-group>
                        </n-popover>
                    </td>
                    <td>
                        <n-input :style="{ width: '90%' }" v-model:value="opnumber.out" placeholder="转换结果"
                            class="hex-output" disabled />
                        <n-button size="small" @click="handleCopy" class="ml-10">
                            复制
                        </n-button>
                    </td>
                </tr>
            </tbody>
        </n-table>
    </div>
</template>

<style scoped lang="scss">
.hex-input {
    margin-left: 15%;
}

.hex-inputS {
    margin-left: 26%;
}

.hex-output {
    background-color: white;
    color: black;
}

.hex-iptable {
    padding-right: 15%;
    padding-left: 15%;
}

.hex-title {
    font-size: var(--n-title-font-size)
}
</style>
