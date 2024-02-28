'use client'
import { Container } from "@shared/ui/Container"
import { Title, TitleSize } from "@shared/ui/Title"
import cn from 'classnames'
import style from './MainPage.module.scss'
import { GoodsGrid, Goods } from "@entities/GoodsGrid"
import { Categories } from "@entities/Categories"
import { ICategory } from "@entities/Categories/models/categories.model"

interface MainPageProps {
  goods?: Goods[]
  categories?: ICategory[]
}

export const MainPage = ({ goods, categories }: MainPageProps) => {

  return (
    <Container className={style.mainPage}>
      <Title className={style.categoriesTitle} size={TitleSize.L}>Популярные категории</Title>
      <p className={cn(style.catDescription, "greyText")}>
        Мы собрали для вас только лучшие и эксключизвные товары от  продавцов сервиса, чтобы вы могли быть уверены в их качестве и уникальности
      </p>
      <Categories categories={categories}/>
      <GoodsGrid
        goods={goods?.slice(0, 10)}
        title="Рекомендации для вас"
      />
      <GoodsGrid
        goods={goods?.slice(5, 15)}
        title="Объявления из других городов"
      />
    </Container>
  )
}