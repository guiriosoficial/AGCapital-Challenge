import type { FormRules } from 'element-plus'

export type AgcFormModel = Record<string, unknown>

export type AgcFormLabelPosition = 'top' | 'left' | 'right'

export type AgcFormRules = FormRules

export interface IAgcFormExpose {
  validate: (callback?: (valid: boolean) => void) => Promise<boolean> | undefined
}

export interface IAgcFormProps {
  model?: AgcFormModel
  rules?: AgcFormRules
  labelPosition?: AgcFormLabelPosition
}
