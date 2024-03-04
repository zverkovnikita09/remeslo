import { VendorProduct } from "@entities/VendorProduct"
import { MessagePanel } from "@features/MessagePanel"
import style from './ChatBlock.module.scss'

export const ChatBlock = () => {
  return (
    <div className={style.chatBlock}>
      <div className={style.heading}>
        <VendorProduct />
      </div>
      <div className={style.body}>

      </div>
      <MessagePanel />
    </div>
  )
}