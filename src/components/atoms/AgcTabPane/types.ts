import AgcTabPane from './AgcTabPane.vue'

export type AgcTabPaneComponent = InstanceType<typeof AgcTabPane>

export interface IAgcTabPaneProps {
  label?: string
  name?: string
  disabled?: boolean
}
