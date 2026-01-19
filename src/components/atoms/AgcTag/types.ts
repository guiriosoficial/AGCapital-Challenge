import AgcTag from './AgcTag.vue'

export type AgcTagInstance = InstanceType<typeof AgcTag>

export type AgcTagType =
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'

export interface IAgcTagProps {
  type?: AgcTagType
}
