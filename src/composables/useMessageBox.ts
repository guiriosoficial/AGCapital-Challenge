import { ElMessageBox } from 'element-plus'
import type { ElMessageBoxOptions, MessageBoxData } from 'element-plus'

interface UseMessageBox {
  alert: (title: string, message: string, options: ElMessageBoxOptions) => Promise<MessageBoxData>
  confirm: (title: string, message: string, options: ElMessageBoxOptions) => Promise<MessageBoxData>
  prompt: (title: string, message: string, options: ElMessageBoxOptions) => Promise<MessageBoxData>
}

const defaults: object = {
  confirmButtonText: 'Ok',
  cancelButtonText: 'Cancel',
  showClose: true
}

function alert (title: string, message: string, options: ElMessageBoxOptions = {}): Promise<MessageBoxData> {
  return ElMessageBox.alert(message, title, {
    ...defaults,
    message,
    title,
    ...options
  })
}

function confirm (title: string, message: string, options: ElMessageBoxOptions = {}): Promise<MessageBoxData> {
  return ElMessageBox.confirm(message, title, {
    ...defaults,
    message,
    title,
    ...options
  })
}

function prompt (title: string, message: string, options: ElMessageBoxOptions = {}): Promise<MessageBoxData> {
  return ElMessageBox.prompt(message, title, {
    ...defaults,
    message,
    title,
    ...options
  })
}

function useMessageBox (): UseMessageBox {
  return {
    alert,
    confirm,
    prompt
  }
}

export default useMessageBox
export type { UseMessageBox }
