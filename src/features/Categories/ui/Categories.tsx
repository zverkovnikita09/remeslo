import style from './Categories.module.scss'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getData } from 'src/shared/lib/api/api'

interface ICategory {
  name: string
  image: string
  slug: string
}

export const Categories = () => {
  const { data: categories } = useQuery({
    
    queryFn: () => getData<ICategory[]>({
      url: `api/v1/tags`,
      dataFlag: true
    }),
  })
  
  return (
    <div className={style.categories}>
      {categories?.map(({ name, slug, image }, index) => {
        return (
          <Link to={`/tag/${slug}`} key={index} className={style.categories__item}>
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