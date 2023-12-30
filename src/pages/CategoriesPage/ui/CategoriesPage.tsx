

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
import { useLocation } from "react-router-dom"
import { parseQueryString } from "src/shared/lib/parseQueryString/parseQueryString"

export const CategoriesPage = () => {
    const { search, pathname } = useLocation();
    const { currentCategory, pathArray } = useCategoriesContext();
    const tagOrSubcategory = pathArray.length > 1 ? 'subcategory_id' : 'tag_id';

    const { data: goods, isLoading } = useQuery({
        queryKey: ['goodsQuery', search, pathname],
        queryFn: () => getData<IGoods[]>({
            url: `/api/v1/good`,
            dataFlag: true,
            params: search ? { ...parseQueryString(search), [tagOrSubcategory]: currentCategory[2] ?? '' } : {},
        }),
        enabled: !!currentCategory[2]
    })

    if (!currentCategory?.length) {
        return null;
    }
    return (
        <Container className={style.categoriesPage}>
            <div className={style.categoriesPage__breadcrubms}>
                <Breadcrumbs links={pathArray} />
            </div>
            {!!currentCategory?.[1]?.length &&
                <Title className={style.categoriesPage__title}>{currentCategory?.[0]}</Title>
            }
            <Categories categories={currentCategory?.[1]} />
            <div className={style.categoriesPage__titleContainer}>
                <Title>Объявления в категории {currentCategory?.[0]}</Title>
                <Filters />
            </div>
            <GoodsGrid goods={goods} isLoading={isLoading} categoryState={pathArray} />
        </Container>
    )
}