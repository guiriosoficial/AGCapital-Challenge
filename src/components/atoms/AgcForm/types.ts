import AgcForm from './AgcForm.vue'

export type AgcFormInstance = InstanceType<typeof AgcForm>

export type AgcFormModel = Record<string, unknown>

export type AgcFormLabelPosition = 'top' | 'left' | 'right'

export type AgcFormRules<T = AgcFormModel> = {
  [K in keyof T]?: IAgcValidationRule | IAgcValidationRule[]
};

export interface IAgcFormExpose {
  validate: (callback?: (valid: boolean) => void) => Promise<boolean> | undefined
  resetFields: () => void
  resetValidation: () => void
}

export interface IAgcFormProps {
  model?: AgcFormModel
  rules?: AgcFormRules
  labelPosition?: AgcFormLabelPosition
}

export interface IAgcValidationRule {
  required?: boolean
  message: string
  trigger?: 'change' | 'blur'
}
