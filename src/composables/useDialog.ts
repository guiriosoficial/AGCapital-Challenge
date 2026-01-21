import { ref, shallowRef, type Ref } from 'vue'

export interface IUseDialog<T> {
  props: Ref<T | null>
  isOpen: Ref<boolean>
  toggle: (params?: T) => void
  open: (params?: T) => void
  close: () => void
}

export function useDialog<T> (): IUseDialog<T> {
  const props = shallowRef<T | null>(null)
  const isOpen = ref<boolean>(false)

  function open (params?: T): void {
    props.value = params ?? null
    isOpen.value = true
  }

  function close (): void {
    props.value = null
    isOpen.value = false
  }

  function toggle (params?: T): void {
    if (isOpen.value) {
      close()
    } else {
      open(params)
    }
  }

  return {
    props,
    isOpen,
    toggle,
    open,
    close,
  }
}
