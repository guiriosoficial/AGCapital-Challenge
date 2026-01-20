export type AgcPopoverInlineEditorModelValue = string | number

export interface IAgcPopoverInlineEditorOption<T = AgcPopoverInlineEditorModelValue> {
  value: T
  label: string
}

export interface IAgcPopoverInlineEditorProps<T = AgcPopoverInlineEditorModelValue> {
  options?: readonly IAgcPopoverInlineEditorOption<T>[]
}
