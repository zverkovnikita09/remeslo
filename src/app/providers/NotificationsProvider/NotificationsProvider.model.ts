export enum NotificationType {
  Error = 'error',
  Warning = 'warning',
  Success = 'success',
  Info = 'info',
}

export interface INotification {
  id: string
  message: string
  type: NotificationType
  timeout?: number
}