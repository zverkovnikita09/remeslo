import { MouseEvent, useCallback, useState } from "react"

export const useToggleDropdown = (defaultValue?: boolean) => {
  const [isOpen, setIsOpen] = useState(defaultValue ?? false);

  const onToggle = useCallback((e?: MouseEvent<HTMLElement>) => {
    e?.stopPropagation();
    setIsOpen(pr => !pr)
  }, [])

  return [isOpen, onToggle] as const;
}