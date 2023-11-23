import { useContext, useEffect, useState } from 'react'
import { INotification, NotificationsContext } from 'src/app/providers/NotificationsProvider'
import style from './Notifications.module.scss'
import { classNames } from 'src/shared/lib/classNames/classNames'
import { Portal } from 'src/shared/ui/Portal/Portal'

interface NotificationsProps {
    timeout?: number
}

export const Notifications = ({ timeout = 2000 }: NotificationsProps) => {
    const { notifications, removeNotification } = useContext(NotificationsContext);
    const [currentNotification, setCurrentNotification] = useState<INotification | null>(null);

    useEffect(() => {
        let timeoutId;

        if (notifications[0]) {
            setCurrentNotification(notifications[0]);
            timeoutId = setTimeout(() => {
                removeNotification(notifications[0].id)
            }, timeout);
        }
        else {
            setCurrentNotification(null);
            clearTimeout(timeoutId);
        }

    }, [notifications])

    function handleOverlayClick() {
        if (currentNotification) {
            removeNotification(currentNotification.id)
        }
    }

    if (!currentNotification) {
        return null
    }

    return (
        <Portal>
            <div className={style.notification} onClick={handleOverlayClick}>
                <div onClick={(e) => { e.stopPropagation() }} className={classNames(style.notification__item, {}, [style[currentNotification.type]])}>
                    <div className={style.notification__text}>
                        {currentNotification.message}
                    </div>
                </div>
            </div>
        </Portal>
    )
}