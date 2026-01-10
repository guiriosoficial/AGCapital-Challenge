import type { FormRules, FormInstance } from 'element-plus'
import type { Ref } from 'vue'

export type AgcFormModel = Record<string, unknown>

export type AgcFormLabelPosition = 'top' | 'left' | 'right'

export type AgcFormRules = FormRules

export interface IAgcFormExpose {
  instance: Ref<FormInstance | null | undefined, FormInstance | null | undefined>
}

export interface IAgcFormProps {
  model?: AgcFormModel
  rules?: AgcFormRules
  labelPosition?: AgcFormLabelPosition
}
