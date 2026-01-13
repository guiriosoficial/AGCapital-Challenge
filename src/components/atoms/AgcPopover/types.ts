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

export interface IAgcPopoverProps {
  placement?: AgcPopoverPlacement
  popperClass?: string
}

export interface IAgcInputExpose {
  hide: () => void
}
