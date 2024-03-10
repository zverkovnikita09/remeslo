import {ICategory, ISubcategory} from "@entities/Categories/models/categories.model"
import {CategoriesPage} from "@fullpages/CategoriesPage"
import {getData} from "@shared/lib/api"
import {redirect} from "next/navigation";
import {Goods} from "@entities/GoodsGrid";

export default async function Category({params: {categories: categoriesList}}: { params: { categories: string[] } }) {
  const category = await Promise.all(categoriesList.map((category, index) => {
    if (index === 0) return getData<ICategory>({url: `/api/v1/tags/${category}`, dataFlag: true});

    return getData<ISubcategory>({url: `/api/v1/subcategory/by-slug/${category}`, dataFlag: true});
  }))
    .then((result) => result.at(-1))
  const goods = await getData<Goods[]>
  (
    {
      url: '/api/v1/good',
      dataFlag: true,
      params: {[categoriesList.length > 1 ? 'subcategory' : 'category']: category!.id}
    });

  console.log(goods)
  return <CategoriesPage category={category as (ICategory & ISubcategory)} goods={goods}/>
}