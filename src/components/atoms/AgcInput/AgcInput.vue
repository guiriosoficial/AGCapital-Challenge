<!-- TODO: Verificar/Implementar defineExposes -->
<template>
  <ElInput
    ref="instance"
    v-model="modelValue"
    :class="$attrs.class"
    :type="type"
    :placeholder="placeholder"
    :disabled="disabled"
    :prefix-icon="prefixIcon"
    @input="emit('input', $event)"
  />
</template>

<script setup lang="ts">
import { ElInput } from 'element-plus'
import type {
  IAgcInputProps,
  IAgcInputEmits,
  AgcInputModelValue
} from './types'
import { ref } from 'vue'

const instance = ref()

const modelValue = defineModel<AgcInputModelValue>({
  required: true
})

const {
  type = 'text',
  placeholder = '',
  disabled = false,
  prefixIcon,
} = defineProps<IAgcInputProps>()

const emit = defineEmits<IAgcInputEmits>()
</script>
