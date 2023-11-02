import { ReactNode, createContext, useState, useCallback } from "react";

interface INotificationsProvider {
    children?: ReactNode
}

interface INotification {
    id: string
    message: string
}

interface NotificationsContextProps {
    notifications: INotification[]
    addNotification: (message: string) => void
    removeNotification: (id: string) => void
}


export const NotificationsContext = createContext<NotificationsContextProps>({ notifications: [], addNotification: () => { }, removeNotification: () => { } })

export const NotificationsProvider = ({ children }: INotificationsProvider) => {
    const [notifications, setNotifications] = useState<INotification[]>([]);

    const addNotification = useCallback((message: string) => {
        const id = performance.now().toString();
        setNotifications(
            [...notifications, { id, message }]
        );
    }, []);

    const removeNotification = useCallback((id: string) => {
        setNotifications(
            [...notifications.filter(item => item.id !== id)]
        );
    }, []);

    return (
        <NotificationsContext.Provider value={{ addNotification, removeNotification, notifications }}>
            {children}
        </NotificationsContext.Provider>
    )
}