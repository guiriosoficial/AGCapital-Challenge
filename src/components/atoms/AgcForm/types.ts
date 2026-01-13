import AgcForm from './AgcForm.vue'
// TODO: TEmover FormRules
import type { FormRules } from 'element-plus'

export type AgcFormComponent = InstanceType<typeof AgcForm>

export type AgcFormModel = Record<string, unknown>

export type AgcFormRules = FormRules

export type AgcFormLabelPosition = 'top' | 'left' | 'right'

export interface IAgcFormExpose {
  validate: (callback?: (valid: boolean) => void) => Promise<boolean> | undefined
}

export interface IAgcFormProps {
  model?: AgcFormModel
  rules?: AgcFormRules
  labelPosition?: AgcFormLabelPosition
}
