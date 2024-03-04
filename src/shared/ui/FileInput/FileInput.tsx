import { useId } from 'react'
import style from './FileInput.module.scss'

export const FileInput = () => {
  const id = useId();

  return (
    <div className={style.fileInput}>
      <input type="file" className='hiddenInput' />
    </div>
  )
}