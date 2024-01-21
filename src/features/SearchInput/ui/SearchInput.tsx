import Image from 'next/image'
import { Input } from '@shared/ui/Input'
import searchIcon from '@images/search.svg'
import cn from 'classnames'
import style from './SearchInput.module.scss'

interface SearchInputProps {
  className?: string
}

export const SearchInput = ({ className }: SearchInputProps) => {
  return (
    <div className={cn(style.searchInput, className)}>
      <Image
        src={searchIcon}
        alt="Поиск"
        className={style.icon}
        width={24}
        height={24}
      />
      <Input className={style.textField} placeholder='Поиск ..' />
    </div>
  )
}