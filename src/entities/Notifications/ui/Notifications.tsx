"use client"
import { useNotification } from '@providers/NotificationsProvider'
import style from './Notifications.module.scss'
import { NotificationsItem } from './NotificationsItem/NotificationsItem'
import { Portal } from '@shared/ui/Portal'

interface NotificationsProps {
  timeout?: number
}

export const Notifications = ({ timeout = 3000 }: NotificationsProps) => {
  const { notifications } = useNotification();

  if (!notifications.length) {
    return null
  }

  return (
    <Portal>
      <div className={style.notifications}>
        {notifications.map((notification) => <NotificationsItem {...notification} timeout={notification.timeout ?? timeout} key={notification.id} />)}
      </div>
    </Portal>
  )
}