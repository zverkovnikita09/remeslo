"use client"
import Image from 'next/image'
import style from './Categories.module.scss'
import Link from 'next/link'
import { ICategory, ISubcategory } from '../models/categories.model'
import { usePathname } from 'next/navigation'

interface CategoriesProps {
  categories?: ICategory[] | ISubcategory[]
}

export const Categories = ({ categories }: CategoriesProps) => {
  const pathname = usePathname();
  const createLinkPath = (slug: string) => {
    return pathname.includes('categories') ? `${pathname}/${slug}` : `/main/categories/${slug}`
  }
  
  return (
    <div className={style.categories}>
      {categories?.map(({ name, slug, image }, index) => {
        return (
          <Link href={createLinkPath(slug)} key={index} className={style.item}>
            <Image src={image} alt={name} className={style.categories__itemImg} fill />
            <div className={style.itemTitle}>
              {name}
            </div>
          </Link>
        )
      })}
    </div>
  )
}