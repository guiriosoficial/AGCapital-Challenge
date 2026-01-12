<template>
  <ElPopover
    ref="popoverRef"
    :class="$attrs.class"
    :trigger="trigger"
    :placement="placement"
    :popper-class="popperClass"
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
import { ref } from 'vue'
import { ElPopover } from 'element-plus'
import type {
  IAgcPopoverProps,
  IAgcInputExpose
} from './types'

const popoverRef = ref<InstanceType<typeof ElPopover>>()

const {
  trigger = 'hover',
  placement = 'bottom',
  popperClass,
} = defineProps<IAgcPopoverProps>()

defineExpose<IAgcInputExpose>({
  hide: () => popoverRef.value?.hide()
})
</script>
