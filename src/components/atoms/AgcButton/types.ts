import AgcButton from './AgcButton.vue'
import type { Component } from 'vue'

export type AgcButtonComponent = InstanceType<typeof AgcButton>

export type AgcButtonType =
  | 'primary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | ''

export type AgcButtonIcon = Component | string

export interface IAgcButtonProps {
  type?: AgcButtonType
  icon?: AgcButtonIcon
  disabled?: boolean
  link?: boolean
}

export interface IAgcButtonEmits {
  (e: 'click', event: MouseEvent): void
}

