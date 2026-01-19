<template>
  <div class="toolbar">
    <AgcInput
      v-model="searchTerm"
      :prefix-icon="Search"
      :disabled="disabled"
      :placeholder="inputText"
      class="toolbar__input-search"
      @update:model-value="handleInputUpdate"
    />
    <AgcButton
      v-if="!hideAction"
      :icon="Plus"
      :disabled="disabled"
      type="primary"
      class="hover-icon"
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
import { useDebounce } from '@/composables/useDebounce'
import type { IAgcToolbarProps, IAgcToolbarEmits } from './types'

const searchTerm = defineModel<string>('searchTerm', {
  default: ''
})

const {
  actionText = '',
  inputText = '',
  searchDelay = 800,
  hideAction = false,
  disabled = false
} = defineProps<IAgcToolbarProps>()

const emit = defineEmits<IAgcToolbarEmits>()

const debouncedSearch = useDebounce((value: string) => {
  emit('search', value)
}, searchDelay)

function handleInputUpdate (value: string) {
  debouncedSearch(value)
}

function handleActionClick (event: MouseEvent) {
  emit('action-click', event)
}
</script>

<!-- TODO: Review this styles -->
<style scoped lang="scss">
//.toolbar {
//  position: absolute;
//  top: 8px;
//  right: 0;
//  z-index: 99;
//  display: flex;
//  gap: 8px;
//  width: 400px;
//  .toolbar__input-search {
//    flex: 1;
//  }
//}

//@media (max-width: 800px) {
//  .toolbar {
//    top: 56px;
//    width: 100%;
//  }
//}
</style>