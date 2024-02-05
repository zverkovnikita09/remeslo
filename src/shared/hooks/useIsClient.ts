import { useEffect, useState } from "react"

export const useIsClient = (): boolean => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (typeof window === undefined) {
      setIsClient(false)
    }
    else setIsClient(true)
  }, [])

  return isClient;
}