<template>
  <ElCollapseItem v-bind="$attrs">
    <template
      v-if="$slots.title"
      #title
    >
      <slot name="title" />
    </template>
    <slot />
  </ElCollapseItem>
</template>

<script setup lang="ts">
import { ElCollapseItem } from 'element-plus'

defineOptions({
  name: 'AgcCollapseItem',
  inheritAttrs: false
})
</script>

<style lang="scss">
.agc-collapse-item__header {
  line-height: 64px;
  height: 64px;
}
.agc-collapse-item__wrap {
  border: none;
}
</style>
