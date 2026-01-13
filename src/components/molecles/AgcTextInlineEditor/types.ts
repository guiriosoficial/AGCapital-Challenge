export type AgcTextInlineEditorModelValue = string

export interface IAgcTextInlineEditorEmits {
  (e: 'blur'): void
}

export interface IAgcTextInlineEditorExposes {
  startEdit: () => Promise<void>
}