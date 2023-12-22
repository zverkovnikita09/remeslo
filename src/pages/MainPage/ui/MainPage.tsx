import { Title } from 'src/shared/ui/Title/TItle'
import style from './MainPage.module.scss'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { Container } from 'src/shared/ui/Container/Container'
import { Categories } from 'src/features/Categories'
import { GoodsGrid, IGoods } from 'src/entities/GoodsGrid'
import { Filters } from 'src/features/Filters'
import { useQuery } from 'react-query'
import { getData } from 'src/shared/lib/api/api'
import { useContext } from 'react'
import { CategoriesContext } from 'src/app/providers/CategoriesProvider'
import { Select } from '@mui/material'

export const MainPage = () => {
  const { data: goods, isLoading } = useQuery({
    queryKey: 'goodsQuery',
    queryFn: () => getData<IGoods[]>({
      url: `/api/v1/good`,
      dataFlag: true,
    }),
  })
  const { categories } = useContext(CategoriesContext)

  return (
    <Container className={style.mainPage}>
      <Select></Select>

      <Title className={style.mainPage__categories}>Популярные категории</Title>
      <GreyText className={style.mainPage__catDescription}>
        Мы собрали для вас только лучшие и эксключизвные товары от  продавцов сервиса, чтобы вы могли быть уверены в их качестве и уникальности
      </GreyText>
      <Categories categories={categories} />
      <div className={style.mainPage__titleContainer}>
        <Title>Рекомендации для вас</Title>
        <Filters />
      </div>
      <GoodsGrid goods={goods?.slice(0, 10)} isLoading={isLoading} />
      <div className={style.mainPage__titleContainer}>
        <Title>Объявления из других городов</Title>
        <Filters />
      </div>
      <GoodsGrid goods={goods?.slice(5, 15)} isLoading={isLoading} />
    </Container>
  )
}