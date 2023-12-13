import { VendorProduct } from 'src/shared/ui/VendorProduct/VendorProduct'
import style from './VendorDialog.module.scss'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'

export const VendorDialog = () => {
    return (
        <div className={style.vendorDialog}>
            <div className={style.vendorDialog__media}>
                <img src="http://priroda.club/uploads/posts/2022-07/1658478016_13-priroda-club-p-krasivie-prirodnie-peizazhi-priroda-krasiv-13.jpg" alt="Изображение товара" />
            </div>
            <div className={style.vendorDialog__content}>
                <VendorProduct />
                <GreyText className={style.vendorDialog__textPreview}>Нет сообщений</GreyText>
            </div>
            <div className={style.vendorDialog__metaInfo}>
                <div className={style.vendorDialog__date}>вчера</div>
                <div className={style.vendorDialog__actions}>удалить</div>
            </div>
        </div>
    )
}