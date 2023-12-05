import { ImageSize, UserPhoto } from 'src/shared/ui/UserPhoto/UserPhoto'
import style from './VendorProfile.module.scss'
import { StoreType } from 'src/pages/ViewPage/ui/ViewPage'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { OverallRating } from 'src/shared/ui/OverallRating/OverallRating'

interface VendorProfileWithoutRatingProps {
    store: Partial<StoreType>
    photoSize?: ImageSize
    withRating?: false
    overallRating?: number
    marks?: number
}

interface VendorProfileWithRatingProps {
    store: Partial<StoreType>
    photoSize?: ImageSize
    withRating: true
    overallRating: number
    marks?: number
}

type VendorProfileProps = VendorProfileWithoutRatingProps | VendorProfileWithRatingProps

export const VendorProfile = ({ store, photoSize, withRating = false, overallRating, marks }: VendorProfileProps) => {
    return (
        <div className={style.vendor}>
            <UserPhoto profileInfo={store?.user?.profile} imageSize={photoSize} />
            <div className={style.vendor__info}>
                <div className={style.vendor__name}>
                    {store?.user?.profile?.firstname}
                </div>
                <div className={style.vendor__date}>
                    <GreyText>
                        На сайте c {new Date(store?.user?.email_verified || '').toLocaleString('ru', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}
                    </GreyText>
                </div>
                {withRating && <OverallRating overall_rating={overallRating} marks={marks} />}
            </div>
        </div>
    )
}