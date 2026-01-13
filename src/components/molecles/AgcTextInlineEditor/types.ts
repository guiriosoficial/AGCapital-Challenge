import AgcTextInlineEditor from './AgcTextInlineEditor.vue'

export type AgcTextInlineEditorComponent = InstanceType<typeof AgcTextInlineEditor>

export type AgcTextInlineEditorModelValue = string

export interface IAgcTextInlineEditorEmits {
  (e: 'blur'): void
}

export interface IAgcTextInlineEditorExposes {
  startEdit: () => Promise<void>
}