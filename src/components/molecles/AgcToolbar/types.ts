export interface IAgcToolbarProps {
  inputText?: string
  actionText?: string
  hideAction?: boolean
  searchDelay?: number
  disabled?: boolean
}

export interface IAgcToolbarEmits {
  (e: 'search', value: string): void
  (e: 'click-action', event: MouseEvent): void
}
