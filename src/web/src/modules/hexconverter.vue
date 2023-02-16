<script setup>
import { defineComponent, ref, computed } from 'vue'

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
        label: '六十四进制',
        value: 64,
    }
])
const inputScale = ref(2)
const outputScale = ref(16)

</script>

<template>
    <div class="hex-title  hex-input mt-20">请选择待转换数的进制:</div>
    <n-space justify="center">
        <n-radio-group v-model:value="inputScale" name="radiogroup">
            <n-space>
                <n-radio v-for="hex in HexOptions" :key="hex.value" :value="hex.value">
                    {{ hex.label }}
                </n-radio>
            </n-space>
        </n-radio-group>
    </n-space>
    <div class="mt-20 mb-30 hex-input">
        <n-input-group>
            <n-input-group-label>转换数字</n-input-group-label>
            <n-input :style="{ width: '32%' }" placeholder="请输入转换数字" />
        </n-input-group>
    </div>
    <n-divider />
    <div class="hex-title  hex-input">请选择预输出数的进制:</div>
    <n-space justify="center">
        <n-radio-group v-model:value="outputScale" name="radiogroup">
            <n-space>
                <n-radio v-for="hex in HexOptions" :key="hex.value" :value="hex.value">
                    {{ hex.label }}
                </n-radio>
            </n-space>
        </n-radio-group>
    </n-space>
    <div class="mt-20 mb-20 hex-input">
        <n-input-group>
            <n-input :style="{ width: '40%' }" placeholder="转换结果" disabled />
        </n-input-group>
    </div>
</template>

<style scoped lang="scss">
.hex-input {
    margin-left:15%;
}
.hex-title {
    font-size: var(--n-title-font-size)
  }
</style>
