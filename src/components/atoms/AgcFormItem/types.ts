import AgcFormItem from './AgcFormItem.vue'

export type AgcFormItemComponent = InstanceType<typeof AgcFormItem>

export interface IAgcFormItemProps {
  prop?: string | string[]
  label?: string
  required?: boolean

}
