import { Container } from 'src/shared/ui/Container/Container'
import style from './ViewPage.module.scss'
import { Title } from 'src/shared/ui/Title/TItile'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { Button, ButtonSize, ButtonTheme } from 'src/shared/ui/Button/Button'
import image from '../assets/view.png'
import geolocation from 'src/shared/assets/location.svg'

export const ViewPage = () => {
  return (
    <Container className={style.viewPage}>
      <div className={style.viewPage__main}>
        <img src={image} alt="" className={style.viewPage__mainImage} />
        <Title className={style.viewPage__title}>Адрес</Title>
        <div className={style.viewPage__addressBlock}>
          Ростовская область, Ростов-на-Дону, Будённовский пр-т,
          28 р-н Ленинский
          <Button className={style.viewPage__location}>
            <img src={geolocation} alt="Геолокация" />
            Показать на карте
          </Button>
        </div>
        <Title className={style.viewPage__title}>Характеристики</Title>
        <div className={style.viewPage__feature}></div>
        <Title className={style.viewPage__title}>Описание</Title>
        <div className={style.viewPage__description}>Ваза с сухоцветами для вашего интерьера.</div>
        <Title className={style.viewPage__title}>Написать продавцу</Title>
        <div className={style.viewPage__views}>
          245 просмотров <GreyText>(+9 сегодня)</GreyText>
        </div>
      </div>
      <div className={style.viewPage__rigthBlock}>
        <Title>Украшение ваза</Title>
        <GreyText className={style.viewPage__greyText}>Цена:</GreyText>
        <p className={style.viewPage__price}>3249.00 ₽</p>
        <GreyText className={style.viewPage__greyText}>Опубликовано</GreyText>
        <p className={style.viewPage__date}>1 октября 17:28</p>
        <Button
          className={style.viewPage__phoneButton}
          theme={ButtonTheme.RED}
          size={ButtonSize.M}
        >
          Позвонить 8 (958) XXX-XX-XX
        </Button>
        <Button
          className={style.viewPage__messageButton}
          theme={ButtonTheme.OUTLINE}
          size={ButtonSize.M}
        >
          Написать сообщение
        </Button>
      </div>
    </Container>
  )
}