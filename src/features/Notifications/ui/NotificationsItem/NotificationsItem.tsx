import { INotification, NotificationType, useNotification } from "src/app/providers/NotificationsProvider"
import { classNames } from "src/shared/lib/classNames/classNames"
import { CloseButton, CloseButtonSize } from "src/shared/ui/CloseButton/CloseButton"
import { IoCloseCircleOutline, IoCheckmarkCircleOutline, IoAlertCircleOutline } from "react-icons/io5";
import style from './NotificationstItem.module.scss'
import { useCallback, useEffect } from "react"

interface NotificationsItemProps extends INotification {
    timeout?: number
}

export const NotificationsItem = ({ id, type, message, timeout }: NotificationsItemProps) => {
    const { removeNotification } = useNotification();

    useEffect(() => {
        const timeoutId: NodeJS.Timeout = setTimeout(() => {
            removeNotification(id);
        }, timeout);

        return () => clearTimeout(timeoutId)
    }, [])

    const notificationIcon = useCallback((notificationType: NotificationType): JSX.Element => {
        switch (notificationType) {
            case NotificationType.Error:
                return <IoCloseCircleOutline size={30} />;
            case NotificationType.Warning:
                return <IoAlertCircleOutline size={30} />;
            case NotificationType.Success:
                return <IoCheckmarkCircleOutline size={30} />;
            case NotificationType.Info:
                return <IoAlertCircleOutline size={30} />;
            default:
                const unknownNotification: never = notificationType;
                throw new Error(`Неизвестный тип оповещения ${unknownNotification}`);
        }
    }, []);

    return (
        <div className={classNames(style.notificationsItem, {}, [style[type]])}>
            <CloseButton tabIndex={-1} onClick={() => removeNotification(id)} size={CloseButtonSize.S} className={style.notificationsItem__close} />
            {notificationIcon(type)}
            <p className={style.notificationsItem__text}>
                {message}
            </p>
        </div>
    )
}