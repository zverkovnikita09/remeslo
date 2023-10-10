import { Input } from 'src/shared/ui/Input/Input'
import { FC } from 'react'
import searchIcon from 'src/shared/assets/search.svg'
import style from './SearchInput.module.scss'

interface SearchInputProps {
  className?: string
}

export const SearchInput: FC<SearchInputProps> = () => {
  return (
    <div className={style.searchInput}>
      <img
        src={searchIcon}
        alt="Поиск"
        className={style.searchInput__icon}
        width={24}
        height={24}
      />
      <Input className={style.searchInput__textField} placeholder='Поиск ..'/>
    </div>
  )
}