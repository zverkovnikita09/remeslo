import { GreyText } from '../GreyText/GreyText'
import style from './VendorProduct.module.scss'

export interface VendorProducProps {
    
}

export const VendorProduct = ({}:VendorProducProps) => {
    return (
        <div className={style.vendorProduct}>
            <div className={style.vendorProduct__userName}>Валентина</div>
            <div className={style.vendorProduct__productInfo}>
                <div className={style.vendorProduct__productName}>Партмоне (Кожа)</div>
                <GreyText className={style.vendorProduct__productPrice}>1459.00 ₽</GreyText>
            </div>
        </div>
    )
}