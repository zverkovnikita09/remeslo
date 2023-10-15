import style from './Categories.module.scss'
import categoryImage from '../assets/category.png'
import { Link } from 'react-router-dom'

interface ICategory {
  imageLink: string
  title: string
  href: ''
}

const categories: ICategory[] = [
  { imageLink: '', title: 'Изделия из кожи', href: '' },
  { imageLink: '', title: 'Изделия из кожи', href: '' },
  { imageLink: '', title: 'Изделия из кожи', href: '' },
  { imageLink: '', title: 'Изделия из кожи', href: '' },
  { imageLink: '', title: 'Изделия из кожи', href: '' },
  { imageLink: '', title: 'Изделия из кожи', href: '' },
  { imageLink: '', title: 'Изделия из кожи', href: '' },
  { imageLink: '', title: 'Изделия из кожи', href: '' },
  { imageLink: '', title: 'Изделия из кожи', href: '' },
  { imageLink: '', title: 'Изделия из кожи', href: '' }
]

export const Categories = () => {
  return (
    <div className={style.categories}>
      {categories?.map(({ title, href }) => {
        return (
          <Link to={href} className={style.categories__item}>
            <img src={categoryImage} alt={title} className={style.categories__itemImg} />
            <div className={style.categories__itemTitle}>
              {title}
            </div>
          </Link>
        )
      })}
    </div>
  )
}