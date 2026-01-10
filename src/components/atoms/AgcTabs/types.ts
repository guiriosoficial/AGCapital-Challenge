export type AgcTabsModelValue = string | number

export interface IAgcTabsEmits {
  (e: 'tab-change', name: AgcTabsModelValue): void
}
