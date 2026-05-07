import type { Component } from 'vue'

export type AgcIconTypes = 'primary' | 'danger'

export interface IAgcIconProps {
  size?: string | number
  icon?: Component
  type?: AgcIconTypes
}

export interface IAgcIconEmits {
  (e: 'click', event: MouseEvent): void
}
