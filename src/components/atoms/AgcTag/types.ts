export type AgcTagType =
  | 'primary'
  | 'success'
  | 'info'
  | 'warning'
  | 'danger'

export interface IAgcTagProps {
  type?: AgcTagType
}
