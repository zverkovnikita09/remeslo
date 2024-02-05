import { useCallback, useRef } from "react"
import copyImg from '../images/copy.svg'
import vkImg from '../images/vk.svg'
import telegramImg from '../images/telegram.svg'
import { TelegramShareButton, VKShareButton } from 'react-share'
import cn from 'classnames'
import style from './Share.module.scss'
import { Button, ButtonTheme } from "@shared/ui/Button"
import { ShareIcon } from "@shared/ui/ShareIcon"
import Image from "next/image"
import { useCopyToClipboard } from "@shared/hooks/useCopyToClipboard"
import { useToggleDropdown } from "@shared/hooks/useToggleDropdown"
import { Dropdown } from "@shared/ui/Dropdown"
import { useIsClient } from "@shared/hooks/useIsClient"
/* import FocusTrap from "@mui/material/Unstable_TrapFocus" */

interface ShareProps {
  title?: string
  imagePath?: string
}

export const Share = ({ title, imagePath }: ShareProps) => {
  const [isDropdownOpen, toggleDropdown] = useToggleDropdown()
  const [_, copy] = useCopyToClipboard()
  const elementRef = useRef<HTMLButtonElement>(null)
  const isClien = useIsClient()

  const copyToClipboard = useCallback(() => {
    copy(window.location.href, "Ссылка скопирована!")
    toggleDropdown();
  }, [copy, toggleDropdown])

  return (
    <div className={style.share}>
      <Button
        className={cn(style.button, { [style.open]: isDropdownOpen })}
        theme={ButtonTheme.GREY}
        onClick={toggleDropdown}
        buttonRef={elementRef}
      >
        <ShareIcon strokeColor="currentColor" />
      </Button>
      <Dropdown
        className={style.dropdown}
        isOpen={isDropdownOpen}
        targetRef={elementRef}
        onClose={toggleDropdown}
      >
        {/* <FocusTrap open={isDropdownOpen}> */}
        <div>
          <Button className={style.linkButton} onClick={copyToClipboard}>
            <Image src={copyImg} alt="Копирование" width={24} height={24} />
            <span className={style.linkText}>Копировать ссылку</span>
          </Button>
          <TelegramShareButton
            url={isClien ? window.location.href : ""}
            title={title}
            className={style.linkButton}
            onClick={toggleDropdown}
          >
            <Image src={telegramImg} alt="Телеграм" width={24} height={20} />
            <span className={style.linkText}>Telegram</span>
          </TelegramShareButton>
          <VKShareButton
            url={isClien ? window.location.href : ""}
            title={title}
            image={imagePath}
            className={style.linkButton}
            onClick={toggleDropdown}
          >
            <Image src={vkImg} alt="Вконтакте" width={25} height={14} />
            <span className={style.linkText}>Вконтакте</span>
          </VKShareButton>
        </div>
        {/* </FocusTrap> */}
      </Dropdown>
    </div>
  )
}