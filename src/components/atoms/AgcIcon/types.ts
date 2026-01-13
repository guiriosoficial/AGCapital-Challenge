import AgcIcon from './AgcIcon.vue'
import type { Component } from 'vue'

export type AgcIconComponent = InstanceType<typeof AgcIcon>

export interface IAgcIconProps {
  color?: string
  size?: string | number
  icon?: Component
}

export interface IAgcIconEmits {
  (e: 'click', event: MouseEvent): void
}