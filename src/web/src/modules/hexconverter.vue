<script setup>
import { defineComponent, ref, computed } from 'vue'
const HexOptions = ref([
    {
        label: "二进制",
        value: 2,
        checked: true
    },
    {
        label: "四进制",
        value: 4,
        checked: false
    },
    {
        label: "八进制",
        value: 8,
        checked: false
    },
    {
        label: "十进制",
        value: 10,
        checked: false
    },
    {
        label: "十六进制",
        value: 16,
        checked: false
    },
    {
        label: "三十二进制",
        value: 32,
        checked: false
    },
    {
        label: "六十四进制",
        value: 64,
        checked: false
    }
])
</script>

<template>
    <div>
        <n-space>
            <n-radio-group v-model:value="value" name="radiogroup">
                <n-space>
                    <n-radio v-for="hex in HexOptions" :key="hex.value" :value="hex.value" :checked="hex.checked">
                        {{ hex.label }}
                    </n-radio>
                </n-space>
            </n-radio-group>
        </n-space>
        <!--自己照着naive改的默认选项调不出来-->
        <n-input-group>
            <n-input-group-label>转换数字</n-input-group-label>
            <n-input :style="{ width: '30%' }" placeholder="请输入转换数字" />
        </n-input-group>
    </div>

    <div>
        <!-- <n-radio-group v-model:value="HexOptions.value" name="radiogroup">
            <n-space>
                <div v-for="h in HexOptions" :key="h.value">
                    <n-radio v-model:checked="h.checked" :key="h.value" :value="h.value">
                        {{ h.label }}
                    </n-radio>
                </div>
            </n-space>
        </n-radio-group> -->
        <n-space>
            <n-radio-group v-model:value="value" name="radiogroup">
                <n-space>
                    <n-radio v-for="hex in HexOptions" :key="hex.value" :value="hex.value">
                        {{ hex.label }}
                    </n-radio>
                </n-space>
            </n-radio-group>
        </n-space>
        <n-input-group>
            <n-input :style="{ width: '40%' }" placeholder="转换结果" />
        </n-input-group>
    </div>
</template>

<style scoped lang="scss">

</style>