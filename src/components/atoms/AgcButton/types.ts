import type { Component } from 'vue'

export type AgcButtonType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'

export type AgcButtonIcon = Component | string

export interface IAgcButtonProps {
  type?: AgcButtonType
  disabled?: boolean
  icon?: AgcButtonIcon
  link?: boolean
}

export interface IAgcButtonEmits {
  (e: 'click', event: MouseEvent): void
}
