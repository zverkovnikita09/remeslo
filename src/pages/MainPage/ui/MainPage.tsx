import { Title } from 'src/shared/ui/Title/TItle'
import style from './MainPage.module.scss'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { Container } from 'src/shared/ui/Container/Container'
import { Categories } from 'src/features/Categories'
import { GoodsGrid, IGoods } from 'src/entities/GoodsGrid'
import { useQuery } from 'react-query'
import { getData } from 'src/shared/lib/api/api'
import { useCategoriesContext } from 'src/app/providers/CategoriesProvider'


export const MainPage = () => {
  const { data: goods, isLoading } = useQuery({
    queryKey: 'goodsQuery',
    queryFn: () => getData<IGoods[]>({
      url: `/api/v1/good`,
      dataFlag: true,
    }),
  })
  const { categories } = useCategoriesContext()

  return (
    <Container className={style.mainPage}>
      <Title className={style.mainPage__categories}>Популярные категории</Title>
      <GreyText className={style.mainPage__catDescription}>
        Мы собрали для вас только лучшие и эксключизвные товары от  продавцов сервиса, чтобы вы могли быть уверены в их качестве и уникальности
      </GreyText>
      <Categories categories={categories} />
      <div className={style.mainPage__titleContainer}>
        <Title>Рекомендации для вас</Title>
      </div>
      <GoodsGrid goods={goods?.slice(0, 10)} isLoading={isLoading} />
      <div className={style.mainPage__titleContainer}>
        <Title>Объявления из других городов</Title>
      </div>
      <GoodsGrid goods={goods?.slice(5, 15)} isLoading={isLoading} />
    </Container>
  )
}