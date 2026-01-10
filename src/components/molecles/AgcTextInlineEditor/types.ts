export enum KeyCodes {
  ENTER = 'Enter',
  ESCAPE = 'Escape'
}

export type AgcTextInlineEditorMovelValue = string | number

export interface IAgcTextInlineEditorProps {
  startEditing?: boolean
}

export interface IAgcTextInlineEditorEmits {
  (e: 'change', value: AgcTextInlineEditorMovelValue): void
  (e: 'blur'): void
}
