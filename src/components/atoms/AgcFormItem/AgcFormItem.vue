<template>
  <ElFormItem
    :class="$attrs.class"
    :prop="prop"
    :label="label"
    :required="required"
  >
    <slot />
  </ElFormItem>
</template>

<script setup lang="ts">
import { ElFormItem } from 'element-plus'
import type { IAgcFormItemProps } from './types.ts'

const {
  prop,
  label,
  required,
} = defineProps<IAgcFormItemProps>()
</script>
