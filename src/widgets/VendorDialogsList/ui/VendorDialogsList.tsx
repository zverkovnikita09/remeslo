import { VendorDialog } from 'src/features/VendorDialog'
import style from './VendorDialogsList.module.scss'

export const VendorDialogList = () => {
    return(
        <div className={style.vendorDialogList}>
            <VendorDialog />
        </div>
    )
}