"use client"
import {Store} from "@shared/models/store.model";
import {SingleGoods} from "../model/singleGoods.model";
import {Container} from "@shared/ui/Container";
import {Breadcrumbs} from "@entities/Breadcrumbs";
import style from './ViewPage.module.scss';
import {Title} from "@shared/ui/Title";
import {labelsCounterFormatter} from "@shared/lib/labelsCounterFormatter";
import {ViewPageRightBlock} from "./ViewPageRigthBlock/ViewPageRightBlock";
import {SliderGallery} from "@entities/SliderGallery";
import {Button, ButtonSize, ButtonTheme} from "@shared/ui/Button";
import {TextArea} from "@shared/ui/TextArea";
import {useSession} from "next-auth/react";
import {GoodEstimaions} from "@features/Reviews/ui/Reviews";
import {sendMessage} from "next/dist/client/dev/error-overlay/websocket";
import {useRef, useState} from "react";
import {useSendData} from "@shared/hooks/useSendData";
import {ChatMessage, CreateChat} from "@shared/models/chat.model";
import {useForm} from "react-hook-form";
import Link from "next/link";

interface ViewPageProps {
  goodInfo?: SingleGoods;
  store?: Store;
  estimations?: GoodEstimaions[]
  isChatExist?: boolean
}

export const ViewPage = ({goodInfo, store, estimations, isChatExist}: ViewPageProps) => {
  const {
    title,
    description,
    files,
    all_time_views,
    views_today,
    store_id,
    id,
  } = goodInfo ?? {};


  const {handleSubmit, register, formState: {errors, touchedFields}, getValues, reset} = useForm<{ message: string }>()

  const sendMessageRef = useRef<HTMLHeadingElement>(null);

  const {status, data} = useSession();

  const isAuthed = status === 'authenticated';

  const [isSendMessageHidden, setIsSendMessageHidden] = useState(isChatExist);

  const onSendMessageSuccess = () => {
    setIsSendMessageHidden(true);
    reset();
  }

  const {handleSendData: handleSendMessage, isSending} = useSendData<ChatMessage>({
    url: '/api/v1/chat/message',
    withAuthToken: true,
    onSuccess: onSendMessageSuccess,
    successNotification: "Ваше сообщение успешно отправлено продавцу",
  })

  const {handleSendData: handleCreateChat, isSending: isCreating} = useSendData<CreateChat>({
    url: '/api/v1/chat',
    withAuthToken: true,
    onSuccess: (data: { data: { id: string } }) => handleSendMessage({
      store_chat_id: data.data.id,
      message: getValues('message')
    })
  })

  const scrollToMessageBlock = () => {
    sendMessageRef?.current?.scrollIntoView();
  }


  /*  const breadcrubms = useMemo(() => {
     if (Array.isArray(state)) {
       return [...(state as IBreadcrumb[]), { name: title ?? '', link: '' }]
     }
 
     return [{ name: title ?? '', link: '' }]
   }, [state, title]) */

  return (
    <Container className={style.viewPage}>
      {/* <Breadcrumbs links={breadcrubms} /> */}
      <div className={style.content}>
        <div className={style.main}>
          <SliderGallery title={title} files={files ?? []}/>
          <Title as="h2" className={style.title}>Адрес</Title>
          <div className={style.addressBlock}>
            {store?.address}
          </div>
          <Title as="h2" className={style.title}>Характеристики</Title>
          <div className={style.feature}></div>
          <Title as="h2" className={style.title}>Описание</Title>
          <div className={style.description} dangerouslySetInnerHTML={{__html: description ?? ''}}/>
          {(!isSendMessageHidden && isAuthed) ?
            <form onSubmit={
              handleSubmit(() => handleCreateChat({
                buyer_id: data?.user.user?.id as string,
                seller_id: store?.user.id as string,
                good_id: id as string,
              }))}
            >
              <Title className={style.title} titleRef={sendMessageRef}>Написать продавцу</Title>
              <TextArea
                className={style.textArea}
                placeholder='Что вы хотите спросить?'
                {...register('message', {required: true})}
              />
              <Button
                theme={ButtonTheme.RED}
                size={ButtonSize.M}
                className={style.sendMessage}
                type='submit'
                isLoading={isSending || isCreating}
              >
                Отправить
              </Button>
            </form>
            : <Button
              theme={ButtonTheme.RED}
              size={ButtonSize.M}
              className={style.sendMessage}
              as={Link}
              href={`/chat/${goodInfo?.id}/${store_id}`}
            >
              Перейти к диалогу с продавцом
            </Button>
          }
          <div className={style.views}>
            {labelsCounterFormatter(all_time_views ?? 0, ['просмотр', 'просмотра', 'просмотров'])}
            <p className="greyText">(+{views_today} сегодня)</p>
          </div>
        </div>
        <ViewPageRightBlock goodInfo={goodInfo} store={store} estimations={estimations}
                            scrollToMessage={scrollToMessageBlock}
        />
      </div>
    </Container>
  )
}