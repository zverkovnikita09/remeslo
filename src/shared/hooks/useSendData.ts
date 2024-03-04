import { sendData } from "@shared/lib/api";
import { NotificationType, useNotification } from "@providers/NotificationsProvider";
import { useState } from "react";
import { useSession } from "next-auth/react";

interface useSendDataProps {
  url: string,
  defaultErrorMessage?: string
  onSuccess?: (...args: any[]) => any
  onError?: (...args: any[]) => any
  withAuthToken?: boolean
}

export const useSendData = ({ defaultErrorMessage = "Произошла ошибка при отправке данных", url, onSuccess, onError, withAuthToken }: useSendDataProps) => {
  const [isSending, setIsSending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const { addNotification } = useNotification();

  const { data: sessionData } = useSession();

  const handleSendData = async <T extends {}>(data: T) => {
    try {
      const headers = (withAuthToken && sessionData?.user.token) ? { Authorization: `Bearer ${sessionData.user.token}` } : undefined;
      setIsSending(true);
      const response = await sendData({ data, url, headers })
      const dataJson = await response.json()

      if (!response.ok) {
        throw new Error(dataJson?.message ? dataJson.message : defaultErrorMessage)
      }

      setIsSuccess(true);
      onSuccess?.(dataJson)
    } catch (error) {
      if (error instanceof Error) {
        addNotification(error.message, NotificationType.Error);
        setError(error.message)
        setIsError(true);
        onError?.(error);
      }
    }
    finally {
      setIsSending(false);
    }
  }

  return { isSuccess, isSending, handleSendData, isError, error }
}