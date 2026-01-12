<template>
  <div class="text-inline-editor">
    <span
      v-if="!isEditing"
      class="text-inline-editor__inner"
    >
      {{ modelValue }}
      <AgcIcon
        :icon="EditPen"
        role="button"
        class="hover-icon text-inline-editor__inner-actions"
        @click="startEdit"
        @keydown.enter.space.prevent="startEdit"
      />
    </span>

    <div
      v-else
      class="text-inline-editor__input"
    >
      <input
        ref="textInput"
        type="text"
        v-model="editingModelValue"
        class="text-inline-editor__input-inner"
        @blur.self="cancelEdit"
        @keydown.enter.prevent="confirmEdit"
        @keydown.esc.prevent="cancelEdit"
      >
      <span class="text-inline-editor__input-inner-actions">
        <AgcIcon
          :icon="Check"
          role="button"
          class="hover-icon"
          @click.stop="confirmEdit"
          @keydown.enter.space.prevent="confirmEdit"
        />
        <AgcIcon
          :icon="Close"
          role="button"
          class="hover-icon hover-icon--danger"
          @click.stop="cancelEdit"
          @keydown.enter.space.prevent="cancelEdit"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import AgcIcon from '@/components/atoms/AgcIcon'
import { ref, nextTick, watch, onMounted } from 'vue'
import { EditPen, Check, Close } from '@element-plus/icons-vue'
import {
  type AgcTextInlineEditorModelValue,
  type IAgcTextInlineEditorEmits,
  type IAgcTextInlineEditorProps
} from './types.ts'

const textInput = ref<HTMLInputElement | null>(null)

const modelValue = defineModel<AgcTextInlineEditorModelValue>({
  required: true,
})

const {
  startEditing = false
} = defineProps<IAgcTextInlineEditorProps>()

const emit = defineEmits<IAgcTextInlineEditorEmits>()

const isEditing = ref<boolean>(false)

const editingModelValue = ref<string | number>('')

async function startEdit (): Promise<void> {
  editingModelValue.value = modelValue.value ?? ''
  isEditing.value = true
  await nextTick(() => textInput.value?.focus())
}

function confirmEdit (): void {
  if (editingModelValue.value !== modelValue.value) {
    modelValue.value = editingModelValue.value
  }
  isEditing.value = false
}

function cancelEdit (): void {
  editingModelValue.value = modelValue.value
  isEditing.value = false
  emit('blur')
}

onMounted(() => {
  if (startEditing) {
    startEdit()
  }
})
</script>

<style lang="scss" scoped>
.text-inline-editor {
  width: 100%;
  .text-inline-editor__inner {
    cursor: default;
    display: flex;
    align-items: center;
    gap: 8px;
    .text-inline-editor__inner-actions {
      opacity: 0;
    }
    &:hover .text-inline-editor__inner-actions {
      opacity: 1;
    }
  }
  .text-inline-editor__input {
    position: relative;
    .text-inline-editor__input-inner {
      border: none;
      outline: none;
      line-height: normal;
      height: auto;
      padding: 0;
      font-size: inherit;
      width: calc(100% - 56px);
    }
    .text-inline-editor__input-inner-actions {
      display: flex;
      align-items: center;
      gap: 8px;
      position: absolute;
      right: 8px;
      top: 4px;
    }
  }
}
</style>
