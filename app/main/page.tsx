import { ICategory } from "@entities/Categories/models/categories.model";
import { Goods } from "@entities/GoodsGrid";
import MainPage from "@fullpages/MainPage";
import { getData } from "@shared/lib/api";

export default async function Main() {
  const goods = await getData<Goods[]>({ url: '/api/v1/good', dataFlag: true, next: { revalidate: 3600 } })
  const categories = await getData<ICategory[]>({ url: '/api/v1/tags', dataFlag: true, next: { revalidate: 3600 } })
  
  return <MainPage goods={goods} categories={categories}/>
}
