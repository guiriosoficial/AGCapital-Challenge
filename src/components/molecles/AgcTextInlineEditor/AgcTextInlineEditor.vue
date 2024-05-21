<template>
  <div class="text-inline-editor">
    <span
      v-if="!isEditing"
      class="text-inline-editor__inner"
    >
      {{ modelValue }}
      <AgcIcon
        :icon="EditPen"
        class="hover-icon text-inline-editor__inner-actions"
        @click="startEdit"
      />
    </span>

    <div
      v-else
      class="text-inline-editor__input"
    >
      <input
        id="textInlineEditorInput"
        ref="textInput"
        v-model="editingModelValue"
        class="text-inline-editor__input-inner"
        @blur.self="cancelEdit"
      >
      <span class="text-inline-editor__input-inner-actions">
        <AgcIcon
          :icon="Check"
          class="hover-icon"
          @click.stop="confirmEdit"
        />
        <AgcIcon
          :icon="Close"
          class="hover-icon hover-icon--danger"
          @click="cancelEdit"
        />
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, nextTick, watch, onMounted } from 'vue'
import { EditPen, Check, Close } from '@element-plus/icons-vue'
import AgcIcon from '@/components/atoms/AgcIcon'

enum KeyCodes {
  ENTER = 'Enter',
  ESCAPE = 'Escape'
}

const textInput = ref()

const modelValue = defineModel<string, number>('modelValue', {
  required: true,
  default: ''
})

const props = defineProps({
  startEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'blur',
  'change'
])

const isEditing = ref<boolean>(false)

const editingModelValue = ref<string | number>('')

async function startEdit (): Promise<void> {
  editingModelValue.value = modelValue.value ?? ''
  isEditing.value = true
  await nextTick(() => textInput.value.focus())
}

function confirmEdit (): void {
  if (editingModelValue.value !== modelValue.value) {
    emit('change', editingModelValue.value)
  }
  isEditing.value = false
}

function cancelEdit (): void {
  setTimeout(() => {
    editingModelValue.value = ''
    isEditing.value = false
    emit('blur')
  }, 200)
}

function handleKeys (event: KeyboardEvent): void {
  const { key, isTrusted } = event

  if (!isTrusted) {
    console.error('key is not trusted')
  } else if (key === KeyCodes.ENTER) {
    confirmEdit()
  } else if (key === KeyCodes.ESCAPE) {
    cancelEdit()
  }
}

watch(isEditing, (newValue: boolean) => {
  if (newValue) {
    document.addEventListener('keyup', handleKeys)
  } else {
    document.removeEventListener('keyup', handleKeys)
    emit('blur')
  }
})

onMounted(() => {
  if (props.startEditing) {
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
