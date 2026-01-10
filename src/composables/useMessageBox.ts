import { ElMessageBox } from 'element-plus'

interface IMessageBoxOptions {
  confirmButtonText?: string,
  cancelButtonText?: string,
  showClose?: boolean
}

export interface IUseMessageBox {
  alert: (
    title: string,
    message: string,
    options?: IMessageBoxOptions
  ) => Promise<void>

  confirm: (
    title: string,
    message: string,
    options?: IMessageBoxOptions
  ) => Promise<boolean>

  prompt: (
    title: string,
    message: string,
    options?: IMessageBoxOptions
  ) => Promise<string | null>
}

const defaults: IMessageBoxOptions = {
  confirmButtonText: 'Ok',
  cancelButtonText: 'Cancel',
  showClose: true
}

function resolveOptions (
  options?: IMessageBoxOptions
): IMessageBoxOptions {
  return {
    ...defaults,
    ...options
  }
}

async function alert (
  title: string,
  message: string,
  options?: IMessageBoxOptions
): Promise<void> {
  await ElMessageBox.alert(
    message,
    title,
    resolveOptions(options)
  )
}

async function confirm (
  title: string,
  message: string,
  options: IMessageBoxOptions = {}
): Promise<boolean> {
  try {
    await ElMessageBox.confirm(
      message,
      title,
      resolveOptions(options)
    )
    return true
  } catch {
    return false
  }
}

async function prompt (
  title: string,
  message: string,
  options: IMessageBoxOptions = {}
): Promise<string | null> {
  try {
    const { value } = await ElMessageBox.prompt(
      message,
      title,
      resolveOptions(options)
    )
    return value
  } catch {
    return null
  }
}

export function useMessageBox (): IUseMessageBox {
  return {
    alert,
    confirm,
    prompt
  }
}
