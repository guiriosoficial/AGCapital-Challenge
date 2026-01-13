import AgcPopoverInlineEditor from './AgcPopoverInlineEditor.vue'

export type AgcPopoverInlineEditorComponent = InstanceType<typeof AgcPopoverInlineEditor>

// TODO: Review type number
export type AgcPopoverInlineEditorModelValue = string | number

export interface IAgcPopoverInlineEditorOption {
  value: AgcPopoverInlineEditorModelValue
  label: string
}

export interface IAgcPopoverInlineEditorProps {
  options?: readonly IAgcPopoverInlineEditorOption[]
}
