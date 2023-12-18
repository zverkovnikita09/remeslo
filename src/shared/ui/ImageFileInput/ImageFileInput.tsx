import { InputHTMLAttributes, useId, useMemo, useState } from 'react'
import style from './ImageFileInput.module.scss'
import camera from '../../assets/camera.svg'
import { classNames } from 'src/shared/lib/classNames/classNames';

interface ImageFileInputProps extends InputHTMLAttributes<HTMLInputElement> {

}

export const ImageFileInput = (props: ImageFileInputProps) => {
  const {
    onChange,
    ...otherProps
  } = props;

  const [files, setFiles] = useState<FileList | null>(null);
  const previews = useMemo(() => (
    [...(files || [])].map(file => URL.createObjectURL(file))
  ), [files])
  const [filesError, setFilesError] = useState("");
  const [isDrag, setDrag] = useState(false);
  const id = useId();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
    console.log(e.target.files);
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