import style from './Footer.module.scss'
import { WhatsappIcon } from "@shared/ui/WhatsappIcon"
import { TelegramIcon } from "@shared/ui/TelegramIcon"
import Link from "next/link"
import { Container } from '@shared/ui/Container'
import { MainLogo } from '@shared/ui/MainLogo'
import cn from 'classnames'

export const Footer = () => {
  return (
    <div className={style.footer}>
      <Container>
        <div className={style.top}>
          <MainLogo />
          <div className={style.support}>
            <div>Техническая поддержка:</div>
            <div className={style.socials}>
              <Link href={'/whatsapp-route'} className={style.socialItem}>
                <WhatsappIcon />
              </Link>
              <Link href={'/tg-route'} className={style.socialItem}>
                <TelegramIcon />
              </Link>
            </div>
          </div>
        </div>

        <div className={style.bottom}>
          <p className={cn('greyText', style.copyright)}>
            © 2023 Remeslo
          </p>
          <div className={style.links}>
            <Link href={'policy'} className={cn('greyText', style.linkItem)}>
              Политика конфиденциальности
            </Link>
            <Link href={'agreement'} className={cn('greyText', style.linkItem)}>
              Пользовательское соглашение
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}