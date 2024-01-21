import cn from 'classnames'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@images/logo.svg'
import style from './MainLogo.module.scss'

interface MainLogoProps {
  className?: string
}

export const MainLogo = ({ className }: MainLogoProps) => {
  return (
    <Link href='/' className={cn(style.mainLogo, className)}>
      <Image 
      src={logo} 
      alt="Логотип Ремесло" 
      height={53} 
      width={128}
      sizes='(max-width: 768px) 86px 35px'
      />
    </Link>
  )
}