import { cloneFnJSON } from '@vueuse/core'

export function cloneDeep<T = unknown>(value: T): T {
  return cloneFnJSON(value)
}
