<template>
  <ElTabs
    v-model="modelValue"
    v-bind="$attrs"
  >
    <slot />
  </ElTabs>
</template>

<script setup lang="ts" generic="T extends AgcTabsModelValue">
import { ElTabs } from 'element-plus'
import type { AgcTabsModelValue } from './types'

defineOptions({
  name: 'AgcTabs',
  inheritAttrs: false
})

const modelValue = defineModel<T>({
  required: true
})
</script>

<style lang="scss">
@use "@/styles/breakpoints" as *;

.agc-tabs__header {
  @include respond-below(md) {
    margin-bottom: 48px;
  }
  .agc-tabs__item {
    font-size: 18px !important;
    height: 48px !important;
  }
}
</style>
