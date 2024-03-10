import {sendData} from "@shared/lib/api";
import {NotificationType, useNotification} from "@providers/NotificationsProvider";
import {useState} from "react";
import {useSession} from "next-auth/react";

interface useSendDataProps {
  url: string,
  defaultErrorMessage?: string
  onSuccess?: (...args: any[]) => any
  onError?: (...args: any[]) => any
  withAuthToken?: boolean
  method?: string
  successNotification?: string
  params?: Record<string, string | number | undefined>
}

export const useSendData = <DataType extends {}>
({
   defaultErrorMessage = "Произошла ошибка при отправке данных",
   url,
   onSuccess,
   onError,
   withAuthToken,
   successNotification,
   params,
 }: useSendDataProps) => {
  const [isSending, setIsSending] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null)
  const {addNotification} = useNotification();

  const {data: sessionData} = useSession();

  const handleSendData = async (data: DataType) => {
    try {
      const headers = (withAuthToken && sessionData?.user.token) ? {Authorization: `Bearer ${sessionData.user.token}`} : undefined;
      setIsSending(true);
      const response = await sendData({data, url, headers, defaultErrorMessage, params})

      setIsSuccess(true);
      onSuccess?.(response)
      successNotification && addNotification(successNotification, NotificationType.Success);
    } catch (error) {
      if (error instanceof Error) {
        addNotification(error.message, NotificationType.Error);
        setError(error.message)
        setIsError(true);
        onError?.(error);
      }
    } finally {
      setIsSending(false);
    }
  }

  return {isSuccess, isSending, handleSendData, isError, error} as const
}