import AgcTabPane from './AgcTabPane.vue'

export type AgcTabPaneInstance = InstanceType<typeof AgcTabPane>

export interface IAgcTabPaneProps {
  label?: string
  name?: string
  disabled?: boolean
}
