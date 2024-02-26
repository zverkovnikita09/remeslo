import ViewPage from '@fullpages/ViewPage';
import { SingleGoods } from '@fullpages/ViewPage/model/singleGoods.model';
import { getData } from '@shared/lib/api';
import { Store } from '@shared/models/store.model';

export default async function SingleGoods({ params: { slug } }: { params: { slug: string } }) {
  const goodInfo = await getData<SingleGoods>({ url: `/api/v1/good/${slug}`, dataFlag: true });
  const store = await getData<Store>({ url: `/api/v1/store/${goodInfo.store_id}` });

  return <ViewPage goodInfo={goodInfo} store={store} />;
}
