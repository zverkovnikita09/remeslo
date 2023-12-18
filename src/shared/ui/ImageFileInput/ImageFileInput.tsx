import { InputHTMLAttributes, useId, useMemo, useState } from 'react'
import style from './ImageFileInput.module.scss'
import camera from '../../assets/camera.svg'
import { classNames } from 'src/shared/lib/classNames/classNames';

interface ImageFileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  files: FileList | null
  setFiles: (files: FileList | null) => void
}

export const ImageFileInput = (props: ImageFileInputProps) => {
  const {
    files, setFiles,
    ...otherProps
  } = props;

  const previews = useMemo(() => (
    [...(files || [])].map(file => URL.createObjectURL(file))
  ), [files])
  const [isDrag, setDrag] = useState(false);
  const id = useId();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files)
  }

  const onDragStart = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDrag(true)
  }

  const onDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDrag(false);
  }

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setFiles(e.dataTransfer.files)
    setDrag(false)
  }

  return (
    <div className={style.imageFileInput}>
      <div className={style.imageFileInput__preview}>
        {previews.map((src) => <img src={src} className={style.imageFileInput__previewImage} />)}
      </div>
      <label
        htmlFor={id}
        className={classNames(style.imageFileInput__label, { [style.isDrag]: isDrag })}
        onDragStart={onDragStart}
        onDragOver={onDragStart}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          className={style.imageFileInput__input}
          type="file"
          id={id}
          onChange={onInputChange}
          {...otherProps}
          multiple
        />
        {
          isDrag ? 'Отпустите файл для загрузки' :
            <><img src={camera} alt="Камера" width={32} height={32} />Нажмите или перетащите сюда изображения</>
        }
      </label>
    </div>
  )
}