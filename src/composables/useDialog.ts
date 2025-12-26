import { ref, type Ref } from 'vue'

type AnyObject = Record<string, any>

interface UseDialog {
  dialogProps: Ref<AnyObject>
  isDialogVisible: Ref<boolean>
  handleToggleDialog: (params?: object) => void
}

function useDialog (): UseDialog {
  const dialogProps = ref<AnyObject>({})
  const isDialogVisible = ref<boolean>(false)

  function handleToggleDialog (params?: AnyObject): void {
    dialogProps.value = params ?? {}
    isDialogVisible.value = !isDialogVisible.value
  }

  return {
    dialogProps,
    isDialogVisible,
    handleToggleDialog
  }
}

export default useDialog
export type { UseDialog }
