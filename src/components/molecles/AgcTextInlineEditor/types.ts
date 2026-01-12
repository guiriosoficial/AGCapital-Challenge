export type AgcTextInlineEditorModelValue = string | number

export interface IAgcTextInlineEditorProps {
  startEditing?: boolean
}

export interface IAgcTextInlineEditorEmits {
  (e: 'change', value: AgcTextInlineEditorModelValue): void
  (e: 'blur'): void
}
