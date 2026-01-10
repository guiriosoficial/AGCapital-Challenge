<template>
  <ElTabs
    v-model="modelValue"
    @tab-change="emit('tab-change', $event)"
  >
    <template v-if="$slots.addIcon" #add-icon>
      <slot name="add-icon" />
    </template>
    <slot />
  </ElTabs>
</template>

<script setup lang="ts">
import { ElTabs } from 'element-plus'
import type {
  AgcTabsModelValue,
  IAgcTabsEmits,
} from './types.ts'

const modelValue = defineModel<AgcTabsModelValue>({
  required: true
})

const emit = defineEmits<IAgcTabsEmits>()
</script>
