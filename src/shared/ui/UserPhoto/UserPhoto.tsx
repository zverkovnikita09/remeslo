import { ProfileInfo } from 'src/app/providers/AuthProvider'
import style from './UserPhoto.module.scss'
import { classNames } from 'src/shared/lib/classNames/classNames'

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
            {
                profileInfo?.avatar ?
                    <img src={profileInfo.avatar} alt="Фото профиля" className={style.imageContainer__image} />
                    : `${profileInfo?.firstname[0] ?? ''}${profileInfo?.lastname[0] ?? ''}`
            }
        </div>
    )
}