import { ElMessageBox } from 'element-plus'
import type { MessageBoxOptions, MessageBoxHandle } from 'element-plus'

const defaults: object = {
  confirmButtonText: 'Ok',
  cancelButtonText: 'Cancel',
  showClose: true
}

function alert (title: string, message: string, options: MessageBoxOptions = {}): MessageBoxHandle {
  return ElMessageBox.alert(message, title, {
    ...defaults,
    message,
    title,
    ...options
  })
}

function confirm (title: string, message: string, options: MessageBoxOptions = {}): MessageBoxHandle {
  return ElMessageBox.confirm(message, title, {
    ...defaults,
    message,
    title,
    ...options
  })
}

function prompt (title: string, message: string, options: MessageBoxOptions = {}): MessageBoxHandle {
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

interface UseMessageBox {
  alert: (title: string, message: string, options: MessageBoxOptions) => MessageBoxHandle
  confirm: (title: string, message: string, options: MessageBoxOptions) => MessageBoxHandle
  prompt: (title: string, message: string, options: MessageBoxOptions) => MessageBoxHandle
}

export type { UseMessageBox }