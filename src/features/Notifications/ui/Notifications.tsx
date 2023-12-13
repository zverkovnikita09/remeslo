import { useContext } from 'react'
import { NotificationsContext } from 'src/app/providers/NotificationsProvider'
import { Portal } from 'src/shared/ui/Portal/Portal'

import style from './Notifications.module.scss'
import { NotificationsItem } from './NotificationsItem/NotificationsItem'

interface NotificationsProps {
    timeout?: number
}

export const Notifications = ({ timeout = 2000 }: NotificationsProps) => {
    const { notifications } = useContext(NotificationsContext);

    if (!notifications.length) {
        return null
    }

    return (
        <Portal>
            <div className={style.notifications}>
                {notifications.map((notification) => (
                    <NotificationsItem {...notification} timeout={timeout} key={notification.id} />
                )
                )}
            </div>
        </Portal>
    )
}