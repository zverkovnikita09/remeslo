import { createContext, useState, useCallback, PropsWithChildren } from "react";

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
}

interface NotificationsContextProps {
    notifications: INotification[]
    addNotification: (message: string, type: NotificationType) => void
    removeNotification: (id: string) => void
}


export const NotificationsContext = createContext<NotificationsContextProps>({ notifications: [], addNotification: () => { }, removeNotification: () => { } })

export const NotificationsProvider = ({ children }: PropsWithChildren) => {
    const [notifications, setNotifications] = useState<INotification[]>([]);

    const addNotification = useCallback((message: string, type: NotificationType) => {
        const id = performance.now().toString();
        setNotifications((prev) =>
            ([...prev, { id, message, type }])
        );
    }, []);

    const removeNotification = useCallback((id: string) => {
        setNotifications((prev) =>
            ([...prev.filter(item => item.id !== id)])
        );
    }, []);

    return (
        <NotificationsContext.Provider value={{ addNotification, removeNotification, notifications }}>
            {children}
        </NotificationsContext.Provider>
    )
}