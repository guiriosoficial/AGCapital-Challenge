import { cloneFnJSON } from '@vueuse/core'

export function clone<T = unknown>(value: T): T {
  return cloneFnJSON(value)
}
