export interface IAgcToolbarProps {
  inputText?: string
  actionText?: string
  hideAction?: boolean
  disabled?: boolean
}

export interface IAgcToolbarEmits {
  (e: 'click-action', event: MouseEvent): void
}
