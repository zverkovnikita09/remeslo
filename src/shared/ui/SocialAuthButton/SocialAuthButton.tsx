import Image from "next/image"
import { Button, ButtonSize, ButtonTheme } from "../Button"
import style from './SocialAuthButton.module.scss'
import vkIcon from "@images/vkIcon.svg"

interface SocialAuthButtonProps {
  type?: "vk"
}

export const SocialAuthButton = ({ type = "vk" }: SocialAuthButtonProps) => {
  if (type === "vk") return (
    <Button
      theme={ButtonTheme.OUTLINE}
      size={ButtonSize.M}
      className={style.socialButton}
    >
      <Image src={vkIcon} alt="Иконка VK" width={24} height={24} />
      Войти с помощью Vkontakte
    </Button>
  )
  return null;
}