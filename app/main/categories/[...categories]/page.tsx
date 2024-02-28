import { ICategory } from "@entities/Categories/models/categories.model"
import { CategoriesPage } from "@fullpages/CategoriesPage"
import { getData } from "@shared/lib/api"

export default async function Category({ params: { categories: categoriesList } }: { params: { categories: string[] } }) {
  const category = await getData<ICategory[]>({ url: '/api/v1/tags', dataFlag: true, next: { revalidate: 3600 }, params: { slug: categoriesList.at(-1) } })

  return <CategoriesPage />
}