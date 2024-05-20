<template>
  <ElCard
    v-bind="$attrs"
    :header="header"
    :footer="footer"
    :body-class="bodyClass"
    :body-style="bodyStyle"
    :shadow="shadow"
  >
    <template v-if="$slots.header" #header>
      <slot name="header" />
    </template>
    <slot name="default" />
    <template v-if="$slots.footer" #footer>
      <slot name="footer" />
    </template>
  </ElCard>
</template>

<script setup lang="ts">
import { ElCard } from 'element-plus'
import type { PropType, CSSProperties } from 'vue'

defineOptions({
  name: 'AgcCard',
  inheritAttrs: true
})

defineProps({
  header: {
    type: String
  },
  footer: {
    type: String
  },
  bodyStyle: {
    type: Object as PropType<CSSProperties>
  },
  bodyClass: {
    type: String
  },
  shadow: {
    type: String as PropType<'always' | 'hover' | 'never'>,
    default: 'always'
  }
})
</script>
