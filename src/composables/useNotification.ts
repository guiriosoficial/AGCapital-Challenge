import { ElNotification } from 'element-plus'

type NotificationPositions = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'

type NotificationType = 'success' | 'warning' | 'info' | 'error'

interface INotificationOptions {
  position?: NotificationPositions,
  duration?: number,
  offset?: number,
  showClose?: boolean,
  title?: string,
  message?: string
}

interface INotificationHandle {
  close: () => void
}

interface IUseNotification {
  success: (message?: string, options?: INotificationOptions) => INotificationHandle
  warning: (message?: string, options?: INotificationOptions) => INotificationHandle
  info: (message?: string, options?: INotificationOptions) => INotificationHandle
  error: (message?: string, options?: INotificationOptions) => INotificationHandle
}

const defaults: INotificationOptions = {
  position: 'top-right',
  duration: 5000,
  offset: 110,
  showClose: true
}

function notify (
  type: NotificationType,
  defaultTitle: string,
  defaultMessage: string,
  options: INotificationOptions = {}
): INotificationHandle {
  const {
    title = defaultTitle,
    message = defaultMessage,
    ...rest
  } = options

  return ElNotification({
    ...defaults,
    ...rest,
    title,
    message,
    type
  })
}

function success (message?: string, options?: INotificationOptions) {
  return notify(
    'success',
    'Yay!',
    message ?? 'Realizado com sucesso!',
    options
  )
}

function warning (message?: string, options?: INotificationOptions) {
  return notify(
    'warning',
    'Atenção!',
    message ?? '',
    options
  )
}

function info (message?: string, options?: INotificationOptions) {
  return notify(
    'info',
    'Informação!',
    message ?? '',
    options
  )
}

function error (message?: string, options?: INotificationOptions) {
  return notify(
    'error',
    'Ops!',
    message ?? 'Tente novamente ou entre em contato com o administrador do sistema.',
    options
  )
}

export function useNotification (): IUseNotification {
  return {
    success,
    warning,
    info,
    error
  }
}
