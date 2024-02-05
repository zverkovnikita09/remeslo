import Link from 'next/link'
import style from './Breadcrumbs.module.scss'
import { IBreadcrumb } from '..'

interface BreadcrumbsProps {
  links: IBreadcrumb[]
}

export const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  return (
    <div className={style.breadcrumbs}>
      <Link className={style.item} href={'/main'}>
        <p className={style.name}>
          Главная
        </p>
      </Link>
      {links.map(({ link, name }, index) => (
        <Link className={style.item} key={index} href={link}>
          <p className={style.name}>
            {name}
          </p>
        </Link>
      ))}
    </div>
  )
}