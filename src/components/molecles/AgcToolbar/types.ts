import type { AgcInputModelValue } from '@/components/atoms/AgcInput/types'

export interface IAgcToolbarProps {
  inputText?: string
  actionText?: string
  hideAction?: boolean
  searchDelay?: number
  disabled?: boolean
}

export interface IAgcToolbarEmits {
  (e: 'search', value: AgcInputModelValue): void
  (e: 'action-click', event: MouseEvent): void
}
