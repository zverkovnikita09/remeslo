import { PropsWithChildren } from 'react'
import style from './AuthLayout.module.scss'
import { Container } from '@shared/ui/Container'
import { MainLogo } from '@shared/ui/MainLogo'
import Image from 'next/image'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'

interface AuthLayoutProps {
  image: string | StaticImport
  imageAlt: string
}

export const AuthLayout = ({ children, image, imageAlt }: PropsWithChildren<AuthLayoutProps>) => {
  return (
    <Container className={style.authLayout}>
      <div className={style.content}>
        <MainLogo className={style.logo} />
        <div className={style.formWrapper}>
          {children}
        </div>
        <p className='greyText'>© 2023 Remeslo</p>
      </div>
      <div className={style.image}>
        <Image src={image} alt={imageAlt} />
      </div>
    </Container>
  )
}