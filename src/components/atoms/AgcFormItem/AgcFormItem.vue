<template>
  <ElFormItem
    v-bind="$attrs"
    :prop="prop"
    :label="label"
    :required="required"
  >
    <slot />
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElFormItem } from 'element-plus'
import type { IAgcFormItemProps } from './types'

defineOptions({
  name: 'AgcFormItem',
  inheritAttrs: false
})

const {
  prop,
  label,
  required,
} = defineProps<IAgcFormItemProps>()
</script>
