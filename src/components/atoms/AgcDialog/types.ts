import AgcDialog from './AgcDialog.vue'

export type AgcDialogComponent = InstanceType<typeof AgcDialog>

export type AgcDialogModelValue = boolean

export interface IAgcDialogProps {
  title?: string
}
