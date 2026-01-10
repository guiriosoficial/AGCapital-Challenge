export type AgcCollapseModelValue = string | number

export interface IAgcCollapseEmits {
  (e: 'change', value: AgcCollapseModelValue | AgcCollapseModelValue[]): void
}
