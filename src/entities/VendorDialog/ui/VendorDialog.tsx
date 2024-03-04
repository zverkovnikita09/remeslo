import { VendorProduct } from '@entities/VendorProduct'
import style from './VendorDialog.module.scss'
import cn from 'classnames'
import Image from 'next/image'

export const VendorDialog = () => {
  return (
    <div className={style.vendorDialog}>
      <div className={style.media}>
        <Image
          src=""
          alt="Изображение товара"
          width={96}
          height={82}
        />
      </div>
      <div className={style.content}>
        <VendorProduct />
        <p className={cn(style.textPreview, 'greyText')}>Нет сообщений</p>
      </div>
      <div className={style.metaInfo}>
        <div className={style.date}>вчера</div>
        <div className={style.actions}>удалить</div>
      </div>
    </div>
  )
}