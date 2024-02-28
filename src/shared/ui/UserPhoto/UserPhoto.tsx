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
  avatar?: ProfileInfo['avatar']
  imageSize?: UserPhotoSize
}

export const UserPhoto = ({ avatar, imageSize = UserPhotoSize.M }: UserPhotoProps) => {
  const hasPhoto = !!avatar;
  return (
    <div className={cn(style.imageContainer, style[imageSize])}>
      <Image
        src={hasPhoto ? avatar : userImg}
        alt="Фото профиля"
        className={style.image}
        fill={hasPhoto}
      />
    </div>
  )
}