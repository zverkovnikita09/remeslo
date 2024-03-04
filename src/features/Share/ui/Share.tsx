"use client"
import { useCallback } from "react"
import copyImg from '../images/copy.svg'
import vkImg from '../images/vk.svg'
import telegramImg from '../images/telegram.svg'
import { TelegramShareButton, VKShareButton } from 'react-share'
import { Button } from "@shared/ui/Button"
import { ShareIcon } from "@shared/ui/ShareIcon"
import Image from "next/image"
import { useCopyToClipboard } from "@shared/hooks/useCopyToClipboard"
import { useIsClient } from "@shared/hooks/useIsClient"
import { DropDownMenu } from "@shared/ui/DropDownMenu"
/* import FocusTrap from "@mui/material/Unstable_TrapFocus" */

interface ShareProps {
  title?: string
  imagePath?: string
}

export const Share = ({ title, imagePath }: ShareProps) => {
  const [_, copy] = useCopyToClipboard()
  const isClient = useIsClient()

  const copyToClipboard = useCallback((toggleDropdown: () => void) => () => {
    copy(window.location.href, "Ссылка скопирована!")
    toggleDropdown();
  }, [copy])

  return (
    <DropDownMenu
      buttonImage={<ShareIcon strokeColor="currentColor" />}
    >
      {(toggleDropdown, itemClassName) => (
        <>
          <Button className={itemClassName} onClick={copyToClipboard(toggleDropdown)}>
            <Image src={copyImg} alt="Копирование" width={24} height={24} />
            <span>Копировать ссылку</span>
          </Button>
          <TelegramShareButton
            url={isClient ? window.location.href : ""}
            title={title}
            className={itemClassName}
            onClick={toggleDropdown}
          >
            <Image src={telegramImg} alt="Телеграм" width={24} height={20} />
            <span>Telegram</span>
          </TelegramShareButton>
          <VKShareButton
            url={isClient ? window.location.href : ""}
            title={title}
            image={imagePath}
            className={itemClassName}
            onClick={toggleDropdown}
          >
            <Image src={vkImg} alt="Вконтакте" width={25} height={14} />
            <span>Вконтакте</span>
          </VKShareButton>
        </>
      )}
    </DropDownMenu>
  )
}