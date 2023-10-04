import { FC } from 'react'
import style from './MainLogo.module.scss'
import { classNames } from 'src/shared/lib/classNames/classNames'
import logo from 'src/shared/assets/logo.svg'

interface MainLogoProps {
  className?: string
}

export const MainLogo: FC<MainLogoProps> = ({ className = '' }) => {
  return (
    <div className={classNames(style.mainLogo, {}, [className])}>
      <img src={logo} alt="" height={53} />
    </div>
  )
}