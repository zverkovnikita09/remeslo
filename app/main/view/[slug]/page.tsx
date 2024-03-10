import {GoodEstimaions} from '@features/Reviews/ui/Reviews';
import ViewPage from '@fullpages/ViewPage';
import {SingleGoods} from '@fullpages/ViewPage/model/singleGoods.model';
import {getData, sendData} from '@shared/lib/api';
import {Store} from '@shared/models/store.model';
import {getServerSession} from "next-auth";
import {authConfig} from "@providers/Auth";

export default async function SingleGoods({params: {slug}}: { params: { slug: string } }) {
  const session = await getServerSession(authConfig);
  const goodInfo = await getData<SingleGoods>({url: `/api/v1/good/${slug}`, dataFlag: true});
  const store = await getData<Store>({url: `/api/v1/store/${goodInfo.store_id}`, dataFlag: true});
  const estimations = await getData<GoodEstimaions[]>({url: `/api/v1/mark?markable_id=${slug}`, dataFlag: true});

  const chat = await sendData({
    url: `/api/v1/chat/check`,
    data: {
      buyer_id: session?.user.user?.id as string,
      seller_id: store?.user.id as string,
      good_id: goodInfo.id as string,
    },
    headers: {Authorization: `Bearer ${session?.user.token}`},
  })

  return <ViewPage goodInfo={goodInfo} store={store} estimations={estimations} isChatExist={chat.data.id}/>;
}
