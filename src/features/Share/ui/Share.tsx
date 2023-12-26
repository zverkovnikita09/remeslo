import { Button, ButtonTheme } from "src/shared/ui/Button/Button"
import { ShareIcon } from "src/shared/ui/ShareIcon/ShareIcon"
import style from './Share.module.scss'
import { useCallback, useRef } from "react"
import { Dropdown } from "src/shared/ui/Dropdown/Dropdown"
import copyImg from '../assets/copy.svg'
import vkImg from '../assets/vk.svg'
import telegramImg from '../assets/telegram.svg'
import { classNames } from "src/shared/lib/classNames/classNames"
import { useToggleDropdown } from "src/shared/hooks/useToggle"
import { useCopyToClipboard } from "src/shared/hooks/useCopyToClipboard"
import { TelegramShareButton, VKShareButton } from 'react-share'
import FocusTrap from "@mui/material/Unstable_TrapFocus"

interface ShareProps {
    title?: string
    imagePath?: string
}

export const Share = ({ title, imagePath }: ShareProps) => {
    const [isDropdownOpen, toggleDropdown] = useToggleDropdown()
    const [_, copy] = useCopyToClipboard()
    const elementRef = useRef<HTMLButtonElement>(null)

    const copyToClipboard = useCallback(() => {
        copy(window.location.href, "Ссылка скопирована!")
        toggleDropdown();
    }, [copy])

    return (
        <Button
            className={classNames(style.share, { [style.open]: isDropdownOpen })}
            theme={ButtonTheme.GREY}
            onClick={toggleDropdown}
            ref={elementRef}
        >
            <ShareIcon strokeColor="currentColor" />
            <Dropdown
                className={style.share__dropdown}
                isOpen={isDropdownOpen}
                targetRef={elementRef}
                onClose={toggleDropdown}
                closeOnItemClick={false}
            >
                <FocusTrap open={isDropdownOpen}>
                    <div>
                        <Button className={style.share__linkButton} onClick={copyToClipboard}>
                            <img src={copyImg} alt="Копирование" width={24} height={24} />
                            <span className={style.share__linkText}>Копировать ссылку</span>
                        </Button>
                        <TelegramShareButton
                            url={window.location.href}
                            title={title}
                            className={style.share__linkButton}
                            onClick={toggleDropdown}
                        >
                            <img src={telegramImg} alt="Телеграм" width={24} height={20} />
                            <span className={style.share__linkText}>Telegram</span>
                        </TelegramShareButton>
                        <VKShareButton
                            url={window.location.href}
                            title={title}
                            image={imagePath}
                            className={style.share__linkButton}
                            onClick={toggleDropdown}
                        >
                            <img src={vkImg} alt="Вконтакте" width={25} height={14} />
                            <span className={style.share__linkText}>Вконтакте</span>
                        </VKShareButton>
                    </div>
                </FocusTrap>
            </Dropdown>
        </Button>
    )
}