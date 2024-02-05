import { NotificationType, useNotification } from "@providers/NotificationsProvider"
import { useState } from "react"

type CopiedValue = string | null
type CopyFunction = (text: string, successText?: string) => Promise<void>

export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)
  const { addNotification } = useNotification()

  const copy: CopyFunction = async (text, successText?) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      addNotification(successText ?? "Текст скопирован", NotificationType.Success)
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        addNotification(error.message, NotificationType.Error)
      }
    }
  }

  return [copiedText, copy] as const;
}