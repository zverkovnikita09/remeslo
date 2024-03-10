import { ChatBlock } from '@features/ChatBlock';
import { SingleGoods } from '@fullpages/ViewPage/model/singleGoods.model';

export default async function SingleGoods({ params: { ids } }: { params: { ids: string[] } }) {

  return <ChatBlock />;
}
