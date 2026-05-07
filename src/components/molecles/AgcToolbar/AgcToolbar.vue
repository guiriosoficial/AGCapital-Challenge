<template>
  <div class="toolbar">
    <AgcInput
      v-model="searchTerm"
      :prefix-icon="Search"
      :disabled="disabled"
      :placeholder="inputText"
      class="toolbar__input-search"
    />
    <AgcButton
      v-if="!hideAction"
      :icon="Plus"
      :disabled="disabled"
      type="primary"
      @click="handleActionClick"
    >
      {{ actionText }}
    </AgcButton>
  </div>
</template>

<script setup lang="ts">
import { AgcButton } from '@/components/atoms/AgcButton'
import { AgcInput } from '@/components/atoms/AgcInput'
import { Plus, Search } from '@element-plus/icons-vue'
import type { IAgcToolbarProps, IAgcToolbarEmits } from './types'

const searchTerm = defineModel<string>('searchTerm', {
  default: ''
})

const {
  actionText = '',
  inputText = '',
  hideAction = false,
  disabled = false
} = defineProps<IAgcToolbarProps>()

const emit = defineEmits<IAgcToolbarEmits>()

function handleActionClick (event: MouseEvent) {
  emit('click-action', event)
}
</script>

<style scoped lang="scss">
@use '@/styles/breakpoints' as *;

.toolbar {
  position: absolute;
  top: 8px;
  right: 0;
  z-index: 90;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 8px;
  width: 400px;
  @include respond-below(md) {
    top: 56px;
    width: 100%;
  };
}
</style>
