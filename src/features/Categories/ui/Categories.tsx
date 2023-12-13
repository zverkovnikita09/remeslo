import style from './Categories.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { ICategory, ISubcategory } from 'src/app/providers/CategoriesProvider'

interface CategoriesProps {
  categories?: ICategory[] | ISubcategory[]
}

export const Categories = ({ categories }: CategoriesProps) => {
  const path = useLocation();
  const createLinkPath = (slug: string) => {
    return path.pathname.includes('tags') ? `${path.pathname}/${slug}` : `/main/tags/${slug}`
  }
  return (
    <div className={style.categories}>
      {categories?.map(({ name, slug, image }, index) => {
        return (
          <Link to={createLinkPath(slug)} key={index} className={style.categories__item}>
            <img src={image} alt={name} className={style.categories__itemImg} />
            <div className={style.categories__itemTitle}>
              {name}
            </div>
          </Link>
        )
      })}
    </div>
  )
}