import type { Component } from 'vue'

export type AgcInputModelValue = string | number | undefined

export type AgcInputType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'password'
  | 'email'
  | 'search'
  | 'tel'
  | 'url'

export interface IAgcInputProps {
  type?: AgcInputType
  placeholder?: string
  disabled?: boolean
  prefixIcon?: string | Component
}
