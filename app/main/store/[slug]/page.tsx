import { Goods } from "@entities/GoodsGrid";
import { StoreGoodsBlock } from "@entities/StoreGoodsBlock";
import { getData } from "@shared/lib/api";

export default async function StoreItem() {
  const goods = await getData<Goods[]>({ url: '/api/v1/good', dataFlag: true, next: { revalidate: 3600 } })
  return <StoreGoodsBlock goods={goods} />
}