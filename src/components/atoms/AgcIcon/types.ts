import type { Component } from 'vue'

export interface IAgcIconProps {
  color?: string
  size?: string | number
  icon?: Component
}

export interface IAgcIconEmits {
  (e: 'click', event: MouseEvent): void
}