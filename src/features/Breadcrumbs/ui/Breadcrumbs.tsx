import { Link } from 'react-router-dom'
import style from './Breadcrumbs.module.scss'

interface BreadcrumbsProps {
    links: IBreadcrumb[]
}

export interface IBreadcrumb {
    link: string
    name: string
}

export const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
    return (
        <div className={style.breadcrumbs}>
            <Link className={style.breadcrumbs__item} to={'/main'}>
                <p className={style.breadcrumbs__name}>
                    Главная
                </p>
            </Link>
            {links.map((linkItem, index) => (
                <Link className={style.breadcrumbs__item} key={index} to={linkItem.link}>
                    <p className={style.breadcrumbs__name}>
                        {linkItem.name}
                    </p>
                </Link>
            ))}
        </div>
    )
}