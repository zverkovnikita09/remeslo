

import { Title } from "src/shared/ui/Title/TItle"
import { Categories } from "src/features/Categories"
import { Filters } from "src/features/Filters"
import { GoodsGrid, IGoods } from "src/entities/GoodsGrid"
import { useCategoriesContext } from "src/app/providers/CategoriesProvider"
import { useQuery } from "react-query"
import { getData } from "src/shared/lib/api/api"
import { Container } from 'src/shared/ui/Container/Container'
import style from './CategoriesPage.module.scss'
import { Breadcrumbs } from "src/features/Breadcrumbs"

export const CategoriesPage = () => {
    const { data: goods, isLoading } = useQuery({
        queryKey: 'goodsQuery',
        queryFn: () => getData<IGoods[]>({
            url: `/api/v1/good`,
            dataFlag: true,
        }),
    })
    const { currentCategories, pathArray } = useCategoriesContext()

    if (!currentCategories?.length) {
        return null;
    }
    return (
        <Container className={style.categoriesPage}>
            <div className={style.categoriesPage__breadcrubms}>
                <Breadcrumbs links={pathArray} />
            </div>
            {!!currentCategories?.[1]?.length &&
                <Title className={style.categoriesPage__title}>{currentCategories?.[0]}</Title>
            }
            <Categories categories={currentCategories?.[1]} />
            <div className={style.categoriesPage__titleContainer}>
                <Title>Объявления в категории {currentCategories?.[0]}</Title>
                <Filters />
            </div>
            <GoodsGrid goods={goods} isLoading={isLoading} categoryState={pathArray} />
        </Container>
    )
}