<template>
  <ElIcon
    v-bind="$attrs"
    :size="size"
    :class="iconClasses"
    @click="emit('click', $event)"
  >
    <component :is="icon" />
  </ElIcon>
</template>

<script setup lang="ts">
import { ElIcon } from 'element-plus'
import { computed, getCurrentInstance } from 'vue'
import type { IAgcIconProps, IAgcIconEmits } from './types'

defineOptions({
  name: 'AgcIcon',
  inheritAttrs: false
})

const {
  size = '1em',
  type = 'primary',
  icon
} = defineProps<IAgcIconProps>()

const emit = defineEmits<IAgcIconEmits>()

const instance = getCurrentInstance()

const iconClasses = computed(() => {
  const isClickable = !!instance?.vnode.props?.onClick

  return [
    { 'icon-clickable': isClickable },
    isClickable ? `icon-clickable--${type}` : ''
  ]
})
</script>

<style scoped lang="scss">
.icon-clickable {
  transition: var(--agc-transition-duration);
  cursor: pointer;
  &:hover {
    color: var(--agc-color-primary);
  }
  &--danger:hover {
    color: var(--agc-color-danger);
  }
}

</style>
