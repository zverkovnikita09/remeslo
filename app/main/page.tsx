import { Goods } from "@entities/GoodsGrid";
import MainPage from "@pages/MainPage";
import { getData } from "@shared/lib/api";

export default async function Main() {
  const goods = await getData<Goods[]>({ url: '/api/v1/good', dataFlag: true, next: { revalidate: 3600 } })
  return (
    <MainPage goods={goods} />
  )
}
