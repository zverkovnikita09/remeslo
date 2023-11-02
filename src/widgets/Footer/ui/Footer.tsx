import { Container } from "src/shared/ui/Container/Container"
import style from './Footer.module.scss'
import { MainLogo } from "src/shared/ui/MainLogo/MainLogo"
import { GreyText } from "src/shared/ui/GreyText/GreyText"
import { Link } from "react-router-dom"
import { WhatsappIcon } from "src/shared/ui/WhatsappIcon/WhatsappIcon"
import { TelegramIcon } from "src/shared/ui/TelegramIcon/TelegramIcon"

export const Footer = () => {
    return (
        <div className={style.footer}>
            <Container className={style.footer__container}>
                <div className={style.footer__top}>
                    <MainLogo />
                    <div className={style.footer__support}>
                        <div>Техническая поддержка:</div>
                        <div className={style.footer__socials}>
                            <Link to={'/whatsapp-route'} className={style.footer__socialItem}>
                                <WhatsappIcon  />
                            </Link>
                            <Link to={'/tg-route'} className={style.footer__socialItem}>
                                <TelegramIcon />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={style.footer__bottom}>
                    <GreyText className={style.footer__copyright}>
                        © 2023 Remeslo
                    </GreyText>
                    <div className={style.footer__links}>
                        <Link to={'policy'}>
                            <GreyText className={style.footer__linkItem}>
                                Политика конфиденциальности
                            </GreyText>
                        </Link>
                        <Link to={'agreement'}>
                            <GreyText className={style.footer__linkItem}>
                                Пользовательское соглашение
                            </GreyText>
                        </Link>
                    </div>
                </div>
            </Container>
        </div>
    )
}