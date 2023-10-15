import { Title } from 'src/shared/ui/Title/TItile'
import style from './MainPage.module.scss'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { Container } from 'src/shared/ui/Container/Container'
import { Categories } from 'src/features/Categories'
import { GoodsGrid, IGoods } from 'src/entities/GoodsGrid'
import { Filters } from 'src/features/Filters'

const goods: IGoods[] = [
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' },
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' },
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' },
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' },
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' },
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' },
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' },
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' },
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' },
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' },
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' },
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' },
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' },
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' },
  { isFavorite: false, imagePath: '', price: '2200.00', published_at: '1 октября 17:28', title: 'Портмоне', slug: '' }
]

export const MainPage = () => {
  return (
    <Container className={style.mainPage}>
      <Title className={style.mainPage__categories}>Популярные категории</Title>
      <GreyText className={style.mainPage__catDescription}>
        Мы собрали для вас только лучшие и эксключизвные товары от  продавцов сервиса, чтобы вы могли быть уверены в их качестве и уникальности
      </GreyText>
      <Categories />
      <div className={style.mainPage__titleContainer}>
        <Title>Рекомендации для вас</Title>
        <Filters />
      </div>
      <GoodsGrid goods={goods} />
      <div className={style.mainPage__titleContainer}>
        <Title>Объявления из других городов</Title>
        <Filters />
      </div>
      <GoodsGrid goods={goods} />
    </Container>
  )
}