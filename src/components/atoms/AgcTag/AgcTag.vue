<template>
  <ElTag
    v-bind="$attrs"
    :type="type"
    :closable="closable"
    :disable-transitions="disableTransitions"
    :hit="hit"
    :color="color"
    :size="size"
    :effect="effect"
    :round="round"
    @click="$emit('click', $event)"
    @close="$emit('close', $event)"
  >
    <slot name="default" />
  </ElTag>
</template>

<script setup lang="ts">
import { ElTag } from 'element-plus'
import type { PropType } from 'vue'

defineOptions({
  name: 'AgcTag',
  inheritAttrs: false
})

defineProps({
  type: {
    type: String as PropType<'primary' | 'success' | 'info' | 'warning' | 'danger'>,
    default: 'primary'
  },
  closable: {
    type: Boolean,
    default: false
  },
  disableTransitions: {
    type: Boolean,
    default: false
  },
  hit: {
    type: Boolean,
    default: false
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: String as PropType<'large' | 'default' | 'small'>,
    default: 'default'
  },
  effect: {
    type: String as PropType<'dark' | 'light' | 'plain'>,
    default: 'light'
  },
  round: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close', 'click'])
</script>
