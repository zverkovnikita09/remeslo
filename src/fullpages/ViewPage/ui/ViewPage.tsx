import { Store } from "@shared/models/store.model";
import { SingleGoods } from "../model/singleGoods.model";
import { Container } from "@shared/ui/Container";
import { Breadcrumbs } from "@entities/Breadcrumbs";
import style from './ViewPage.module.scss';
import { Title } from "@shared/ui/Title";
import { labelsCounterFormatter } from "@shared/lib/labelsCounterFormatter";
import { ViewPageRightBlock } from "./ViewPageRigthBlock/ViewPageRightBlock";
import { SliderGallery } from "@entities/SliderGallery";

interface ViewPageProps {
  goodInfo?: SingleGoods;
  store?: Store;
}

export const ViewPage = ({ goodInfo, store }: ViewPageProps) => {
  /* const { isAuthed } = useAuth() */

  const {
    title,
    description,
    files,
    all_time_views,
    views_today,
    store_id,
  } = goodInfo ?? {};

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
          <SliderGallery title={title} files={files ?? []} />
          <Title as="h2" className={style.title}>Адрес</Title>
          <div className={style.addressBlock}>
            {store?.address}
          </div>
          <Title as="h2" className={style.title}>Характеристики</Title>
          <div className={style.feature}></div>
          <Title as="h2" className={style.title}>Описание</Title>
          <div className={style.description} dangerouslySetInnerHTML={{ __html: description ?? '' }} />
          {/* {isAuthed &&
            <>
              <Title className={style.viewPage__title}>Написать продавцу</Title>
              <TextArea
                className={style.viewPage__textArea}
                placeholder='Что вы хотите спросить?'
              />
              <Button
                theme={ButtonTheme.RED}
                size={ButtonSize.M}
                className={style.viewPage__sendMessage}
              >
                Отправить
              </Button>
            </>} */}
          <div className={style.views}>
            {labelsCounterFormatter(all_time_views ?? 0, ['просмотр', 'просмотра', 'просмотров'])} <p className="greyText">(+{views_today} сегодня)</p>
          </div>
        </div>
        <ViewPageRightBlock goodInfo={goodInfo} store={store} />
      </div>
    </Container>
  )
}