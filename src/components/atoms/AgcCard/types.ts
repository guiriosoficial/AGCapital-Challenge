export type AgcCardShadow =
  | 'always'
  | 'hover'
  | 'never'

export interface IAgcCardProps {
  bodyClass?: string
}

export interface IAgcCardEmits {
  (e: 'click', event: MouseEvent): void
}
