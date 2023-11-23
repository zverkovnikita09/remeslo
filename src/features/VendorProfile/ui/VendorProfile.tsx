import { UserPhoto } from 'src/shared/ui/UserPhoto/UserPhoto'
import style from './VendorProfile.module.scss'
import { StoreType } from 'src/pages/ViewPage/ui/ViewPage'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'

interface VendorProfileProps {
    store: StoreType
}

export const VendorProfile = ({store}: VendorProfileProps) => {
    return (
        <div className={style.vendor}>
            <UserPhoto profileInfo={store?.user.profile} />
            <div className={style.vendor__info}>
                <div className={style.vendor__name}>
                    {store?.user.profile?.firstname}
                </div>
                <div className={style.vendor__date}>
                    <GreyText>
                        На сайте c {new Date(store?.user.email_verified || '').toLocaleString('ru', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </GreyText>
                </div>
            </div>
        </div>
    )
}