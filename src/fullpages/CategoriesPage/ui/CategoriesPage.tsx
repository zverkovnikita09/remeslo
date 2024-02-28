
import { Goods, GoodsGrid } from '@entities/GoodsGrid';
import style from './CategoriesPage.module.scss'
import { ICategory, ISubcategory } from "@entities/Categories/models/categories.model"
import { Container } from '@shared/ui/Container';
import { Title } from '@shared/ui/Title';
import { Categories } from '@entities/Categories';

interface CategoriesPageProps {
  category?: ICategory & ISubcategory;
  goods?: Goods[];
}

export const CategoriesPage = ({ category, goods }: CategoriesPageProps) => {
  const subcategories = category?.subcategories ?? category?.children;
  return (
    <Container className={style.categoriesPage}>
      {/* <div className={style.breadcrubms}>
        <Breadcrumbs links={pathArray} />
      </div> */}
      {subcategories?.length &&
        <Title className={style.title}>{category?.name}</Title>
      }
      <Categories categories={subcategories} />
      <div className={style.titleContainer}>
        <Title>Объявления в категории {category?.name}</Title>
        {/* <Filters /> */}
      </div>
      <GoodsGrid goods={goods} />
    </Container>
  )
}