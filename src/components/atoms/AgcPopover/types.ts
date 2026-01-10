export type AgcPopoverTrigger =
  | 'click'
  | 'focus'
  | 'hover'
  | 'contextmenu'

export type AgcPopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

export type AgcPopoverModelValue = boolean

export interface IAgcPopoverProps {
  trigger?: AgcPopoverTrigger
  placement?: AgcPopoverPlacement
  popperClass?: string
}
