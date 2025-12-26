import { ElNotification } from 'element-plus'
import type { NotificationHandle, NotificationParams } from 'element-plus'

interface UseNotification {
  success: (options: NotificationParams) => NotificationHandle
  warning: (options: NotificationParams) => NotificationHandle
  info: (options: NotificationParams) => NotificationHandle
  error: (options: NotificationParams) => NotificationHandle
}

const defaults: object = {
  position: 'top-right',
  duration: 5000,
  offset: 110,
  showClose: true
}

function success (options: NotificationParams = {}): NotificationHandle {
  const title: string = 'Yay!'
  const message: string = 'Realizado com sucesso!'

  return ElNotification({
    ...defaults,
    title,
    message,
    type: 'success',
    ...(options as object)
  })
}

function warning (options: NotificationParams = {}): NotificationHandle {
  const title: string = 'Atenção!'
  const message: string = ''

  return ElNotification({
    ...defaults,
    title,
    message,
    type: 'warning',
    ...(options as object)
  })
}

function info (options: NotificationParams = {}): NotificationHandle {
  const title: string = 'Informação!'
  const message: string = ''

  return ElNotification({
    ...defaults,
    title,
    message,
    type: 'info',
    ...(options as object)
  })
}

function error (options: NotificationParams = {}): NotificationHandle {
  const title: string = 'Ops!'
  const message: string = 'Tente novamente ou entre em contato com o administrador do sistema.'

  return ElNotification({
    ...defaults,
    title,
    message,
    type: 'error',
    ...(options as object)
  })
}

function useNotification (): UseNotification {
  return {
    success,
    warning,
    info,
    error
  }
}

export default useNotification
export type { UseNotification }
