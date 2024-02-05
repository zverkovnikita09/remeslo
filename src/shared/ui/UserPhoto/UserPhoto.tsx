import cn from 'classnames'
import userImg from '@images/user.svg'
import Image from 'next/image'
import { ProfileInfo } from '@shared/models/user.model'
import style from './UserPhoto.module.scss'

export enum UserPhotoSize {
  L = 'size_l',
  M = 'size_m',
  S = 'size_s'
}

interface UserPhotoProps {
  profileInfo?: ProfileInfo
  imageSize?: UserPhotoSize
}

export const UserPhoto = ({ profileInfo, imageSize = UserPhotoSize.M }: UserPhotoProps) => {
  const hasPhoto = !!profileInfo?.avatar;
  return (
    <div className={cn(style.imageContainer, style[imageSize])}>
      <Image
        src={hasPhoto ? profileInfo.avatar : userImg}
        alt="Фото профиля"
        className={style.image}
        fill={hasPhoto}
      />
    </div>
  )
}