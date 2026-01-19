import AgcFormItem from './AgcFormItem.vue'

export type AgcFormItemInstance = InstanceType<typeof AgcFormItem>

export interface IAgcFormItemProps {
  prop?: string | string[]
  label?: string
  required?: boolean

}
