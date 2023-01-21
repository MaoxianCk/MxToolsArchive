<script setup>
import { ref, computed } from 'vue';
import { doCopy } from '@/utils/copyUtil'
import { useMessage } from 'naive-ui'
import { Icon } from '@vicons/utils'
import { ArrowDropDownOutlined } from '@vicons/material'
const message = useMessage()

const pattern = computed(() => {
  return input.value.prefix + input.value.pattern + '/' + input.value.suffix
})

const suffixOptions = ref([
  {
    label: '-g 全局搜索',
    value: 'g',
    checked: true
  }, {
    label: '-i 忽略大小写',
    value: 'i',
    checked: false
  }, {
    label: '-m 多行模式',
    value: 'm',
    checked: false
  }, {
    label: '-s 包含换行符',
    value: 's',
    checked: false
  },
])

const changeSuffix = () => {
  input.value.suffix = suffixOptions.value.filter(item => item.checked).map(item => item.value).join('')
}

const input = ref({
  prefix: '/',
  pattern: '\\d+',
  suffix: suffixOptions.value.filter(item => item.checked).map(item => item.value).join('')
})

const testedContent = computed(() => {
  const tag = 'span'
  let text = test.value.testContent
  const regex = new RegExp(input.value.pattern, input.value.suffix);
  console.log(regex, input.value.pattern, input.value.suffix, regex.exec(text), text.match(regex))
  if (regex.test(text)) {
    text = text.replace(regex, word => `<${tag} class="regex-highlight">${word}</${tag}>`);
  }
  return text
})

const test = ref({
  testContent: '123a123b123a123',
  testedContent: testedContent
})

const handleCopy = () => {
  doCopy(pattern.value, () => message.success('帮你复制好了 !'))
}
</script>

<template>
  <div>
    <mx-row>
      <n-input-group>
        <n-input-group-label>{{ input.prefix }}</n-input-group-label>
        <n-input v-model:value="input.pattern" placeholder="输入正则表达式" />
        <n-input-group-label>/{{ input.suffix }}</n-input-group-label>
      </n-input-group>
      <n-popover trigger="click" placement="bottom-end">
        <template #trigger>
          <n-button icon-placement="right">修饰符
            <template #icon>
              <Icon>
                <ArrowDropDownOutlined />
              </Icon>
            </template>
          </n-button>
        </template>
        <div v-for="item in suffixOptions" :key="item.value" style="padding: 2px;"><n-checkbox
          v-model:checked="item.checked"
          @change="changeSuffix"> {{ item.label }} </n-checkbox></div>
      </n-popover>
    </mx-row>
    <mx-row class="mt-10 preview" align="center">
      预览: <span class="preview-pattern">{{ pattern }}</span>
      <n-button size="small" @click="handleCopy">
        复制
      </n-button>
    </mx-row>
    <n-divider />
    <div>
      <n-input v-model:value="test.testContent" type="textarea" placeholder="测试文本" />
      <div class="highlight-box" v-html="test.testedContent" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.preview {
  text-align: center;

  .preview-pattern {
    font-weight: bold;
    font-family: 'Courier New';
    font-size: 16px;
    line-height: 1.6;

    padding: 3px 7px;
    border: 1px solid rgb(224, 224, 230);
    border-radius: 3px;
  }
}
</style>
<style lang="scss">
.regex-highlight {
  border-radius: 5px;
  &:nth-of-type(odd) {
    border: 1px solid rgba(255, 0, 0, 0.5);
  }

  &:nth-of-type(even) {
    border: 1px solid rgba(0, 0, 255, 0.5);
  }
}
</style>