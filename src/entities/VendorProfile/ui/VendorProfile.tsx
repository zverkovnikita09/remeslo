import style from './VendorProfile.module.scss'
import { UserPhoto, UserPhotoSize } from '@shared/ui/UserPhoto'
import { OverallRating } from '@shared/ui/OverallRating'
import cn from 'classnames'
import { ProfileInfo } from '@shared/models/user.model'

interface VendorProfileWithoutRatingProps {
  profile?: ProfileInfo
  registered_at?: string
  photoSize?: UserPhotoSize
  withRating?: false
  overallRating?: number
  marks?: number
  column?: boolean
}

interface VendorProfileWithRatingProps {
  profile?: ProfileInfo
  registered_at?: string
  photoSize?: UserPhotoSize
  withRating: true
  overallRating: number
  marks?: number
  column?: boolean
}

type VendorProfileProps = VendorProfileWithoutRatingProps | VendorProfileWithRatingProps

export const VendorProfile = ({ profile, photoSize, registered_at, withRating = false, overallRating, marks, column }: VendorProfileProps) => {
  return (
    <div className={cn(style.vendor, { [style.column]: column })}>
      <UserPhoto avatar={profile?.avatar} imageSize={photoSize} />
      <div className={style.info}>
        <div className={style.name}>
          {profile?.firstname} {profile?.lastname}
        </div>
        <div className={style.date}>
          <p className="greyText">
            На сайте c {new Date(registered_at || '').toLocaleString('ru', {
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