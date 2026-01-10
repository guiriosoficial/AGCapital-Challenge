import { useDebounceFn, type PromisifyFn } from '@vueuse/core'

export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  delay: number = 200
): PromisifyFn<T> {
  return useDebounceFn(fn, delay)
}