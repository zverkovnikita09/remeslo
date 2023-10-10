import { Input } from 'src/shared/ui/Input/Input'
import style from './SearchInput.module.scss'
import { FC } from 'react'


interface SearchInputProps {
  className?: string
}

export const SearchInput: FC<SearchInputProps> = () => {
  return (
    <div className={style.searchInput}>
      <img src="" alt="" />
      <Input />
    </div>
  )
}