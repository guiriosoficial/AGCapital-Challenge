import { ref, shallowRef, type Ref } from 'vue'

interface IUseDialog<T> {
  dialogProps: Ref<T | null>
  isDialogVisible: Ref<boolean>
  handleToggleDialog: (params?: T) => void
}

function useDialog<T> (): IUseDialog<T> {
  const dialogProps = shallowRef<T | null>(null)
  const isDialogVisible = ref<boolean>(false)

  function handleToggleDialog (params?: T): void {
    dialogProps.value = params ?? null
    isDialogVisible.value = !isDialogVisible.value
  }

  return {
    dialogProps,
    isDialogVisible,
    handleToggleDialog
  }
}

export default useDialog
export type { IUseDialog }
