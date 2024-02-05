import { Store } from '@shared/models/store.model'
import style from './VendorProfile.module.scss'
import { UserPhoto, UserPhotoSize } from '@shared/ui/UserPhoto'
import { OverallRating } from '@shared/ui/OverallRating'

interface VendorProfileWithoutRatingProps {
  store: Partial<Store>
  photoSize?: UserPhotoSize
  withRating?: false
  overallRating?: number
  marks?: number
}

interface VendorProfileWithRatingProps {
  store: Partial<Store>
  photoSize?: UserPhotoSize
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
          <p className="greyText">
            На сайте c {new Date(store?.user?.email_verified || '').toLocaleString('ru', {
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
        </div>
        {withRating && <OverallRating overall_rating={overallRating} marks={marks} />}
      </div>
    </div>
  )
}