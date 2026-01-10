export type AgcPopoverInlineEditorModelValue = string | number

export interface IAgcPopoverInlineEditorOption {
  value: AgcPopoverInlineEditorModelValue
  label: string
}

export interface IAgcPopoverInlineEditorProps {
  options?: IAgcPopoverInlineEditorOption[]
}

export interface IAgcPopoverInlineEditorEmits {
  (e: 'change', value: AgcPopoverInlineEditorModelValue): void
}
