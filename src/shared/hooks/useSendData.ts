import { sendData } from "@shared/lib/api";
import { NotificationType, useNotification } from "@providers/NotificationsProvider";
import { useState } from "react";

interface useSendDataProps {
  url: string,
  defaultErrorMessage?: string
  onSuccess?: (...args: any[]) => any
  onError?: (...args: any[]) => any
}

export const useSendData = ({ defaultErrorMessage = "Произошла ошибка при отправке данных", url, onSuccess, onError }: useSendDataProps) => {
  const [isSending, setIsSending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const { addNotification } = useNotification();

  const handleSendData = async (data: unknown) => {
    try {
      setIsSending(true);
      const response = await sendData(data, url)
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