import { Button, ButtonSize, ButtonTheme } from '@shared/ui/Button';
import style from './AuthByVk.module.scss';
import Image from 'next/image';
import vkIcon from "@images/vkIcon.svg"

export const AuthByVk = () => {
  return (
    <Button
      theme={ButtonTheme.OUTLINE}
      size={ButtonSize.M}
      className={style.socialButton}
    >
      <Image src={vkIcon} alt="Иконка VK" width={24} height={24} />
      Войти с помощью Vkontakte
    </Button>
  )
}