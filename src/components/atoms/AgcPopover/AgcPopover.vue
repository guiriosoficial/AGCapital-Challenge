<template>
  <ElPopover
    ref="popoverInstanceRef"
    v-bind="$attrs"
    :placement="placement"
    :popper-class="popperClass"
    trigger="click"
  >
    <slot />
    <template
      v-if="$slots.reference"
      #reference
    >
      <slot name="reference" />
    </template>
  </ElPopover>
</template>

<script setup lang="ts">
import { ElPopover } from 'element-plus'
import { ref } from 'vue'
import type { IAgcPopoverProps, IAgcInputExpose } from './types'

const popoverInstanceRef = ref<InstanceType<typeof ElPopover>>()

defineOptions({
  name: 'AgcPopover',
  inheritAttrs: false
})

const {
  placement = 'bottom',
  popperClass,
} = defineProps<IAgcPopoverProps>()

defineExpose<IAgcInputExpose>({
  hide: () => popoverInstanceRef.value?.hide()
})
</script>
