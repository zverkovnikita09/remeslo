import style from './VendorProduct.module.scss'
import cn from 'classnames'

export interface VendorProducProps {

}

export const VendorProduct = (props: VendorProducProps) => {
  return (
    <div className={style.vendorProduct}>
      <div className={style.userName}>Валентина</div>
      <div className={style.productInfo}>
        <div className={style.productName}>Партмоне (Кожа)</div>
        <p className={cn(style.productPrice, "greyText")}>1459.00 ₽</p>
      </div>
    </div>
  )
}