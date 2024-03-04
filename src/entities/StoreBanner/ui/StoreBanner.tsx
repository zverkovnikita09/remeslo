import Image from 'next/image'
import style from './StoreBanner.module.scss'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import { Button } from '@shared/ui/Button'
import { CloseButton } from '@shared/ui/CloseButton'

interface StoreBannerProps {
  imageSrc?: string | StaticImport
  withDownloadButton?: boolean
  onClose?: () => void
  hideCloseButton?: boolean
}

export const StoreBanner = ({ withDownloadButton, imageSrc, onClose, hideCloseButton }: StoreBannerProps) => {
  return (
    <div className={style.storeBanner}>
      {!hideCloseButton && <CloseButton className={style.close} onClick={onClose} />}
      {imageSrc && <Image src={imageSrc} fill alt='' />}
      {withDownloadButton && <Button>Загрузить</Button>}
    </div>
  )
}