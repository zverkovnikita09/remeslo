import { ProfileInfo } from 'src/app/providers/AuthProvider'
import style from './UserPhoto.module.scss'
import { classNames } from 'src/shared/lib/classNames/classNames'
import userImg from './assets/user.svg'

export enum ImageSize {
    L = 'size_l',
    M = 'size_m',
    S = 'size_s'
}

interface UserPhotoProps {
    profileInfo?: ProfileInfo
    imageSize?: ImageSize
}

export const UserPhoto = ({ profileInfo, imageSize = ImageSize.M }: UserPhotoProps) => {
    return (
        <div className={classNames(style.imageContainer, {}, [style[imageSize]])}>
            <img src={profileInfo?.avatar ? profileInfo.avatar : userImg} alt="Фото профиля" className={style.imageContainer__image} />
        </div>
    )
}