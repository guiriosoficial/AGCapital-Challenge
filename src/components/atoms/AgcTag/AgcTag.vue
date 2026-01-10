<template>
  <ElTag
    :class="$attrs.class"
    :type="type"
  >
    <slot />
  </ElTag>
</template>

<script setup lang="ts">
import { ElTag } from 'element-plus'

import type {
  IAgcTagProps
} from './types.ts'

const {
  type = 'primary',
} = defineProps<IAgcTagProps>()
</script>
