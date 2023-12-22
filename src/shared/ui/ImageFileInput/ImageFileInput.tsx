import { InputHTMLAttributes, useId, useMemo, useState } from 'react'
import style from './ImageFileInput.module.scss'
import camera from '../../assets/camera.svg'
import { classNames } from 'src/shared/lib/classNames/classNames';
import { CloseButton } from '../CloseButton/CloseButton';
import { GreyText } from '../GreyText/GreyText';
import { labelsCounterFormatter } from 'src/shared/lib/labelsCounterFormatter/labelsCounterFormatter';
import { FieldError } from 'react-hook-form';

interface ImageFileInputProps extends InputHTMLAttributes<HTMLInputElement> {
  files: FileList | null
  setFiles: (files: FileList | null) => void
  setError: (message: string) => void
  allowedFileTypes?: string[]
  allowedFileSize?: number
  allowedFileCount?: number
  error?: FieldError
  clearErrors?: () => void
}

export const ImageFileInput = (props: ImageFileInputProps) => {
  const {
    files,
    setFiles,
    setError,
    allowedFileCount = 10,
    allowedFileSize = 10 * 1024 * 1024,
    allowedFileTypes = ['png', 'jpg', 'jpeg', 'svg', 'webp'],
    error,
    clearErrors,
    ...otherProps
  } = props;

  const previews = useMemo(() => (
    [...(files || [])].map(file => URL.createObjectURL(file))
  ), [files])

  const [isDrag, setDrag] = useState(false);
  const id = useId();

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filesArray = [...(files ?? [])];

    const newFilesArray = [...filesArray, ...(e.target.files ?? [])];

    !checkError(newFilesArray) &&

      setFiles(arrayToFilelist(newFilesArray));
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
    let filesArray = [...(files ?? [])];

    const newFilesArray = [...filesArray, ...(e.dataTransfer.files ?? [])];

    !checkError(newFilesArray) &&

      setFiles(arrayToFilelist(newFilesArray));

    setDrag(false)
  }

  const arrayToFilelist = (files: File[]): FileList => {
    let dt = new DataTransfer();

    files.forEach(file => {
      dt.items.add(file);

    })

    return dt.files;
  }

  const onFileDelete = (index: number) => () => {
    let filesArray = [...(files ?? [])];
    const newFiles = [...filesArray.slice(0, index), ...filesArray.slice(index + 1)]
    setFiles(arrayToFilelist(newFiles));

  }

  const checkError = (files: File[]): boolean => {
    if (
      files.reduce((acc, file) => (
        acc + file.size
      ), 0) > allowedFileSize
    ) {
      setError(`Суммарный размер файлов не должен превышать: ${allowedFileSize / 1024 / 1024} МБ`)
      return true;
    }

    if (
      !(files.every(file => (
        allowedFileTypes.includes(file.type.split('/')[1])
      )))
    ) {
      setError(`Допустимые форматы загружаемых файлов: ${allowedFileTypes.join(', ')}`)
      return true;
    }

    if (files.length > allowedFileCount) {
      setError(`Вы можете прикрепить не более ${labelsCounterFormatter(allowedFileCount, ['файла', 'файлов', 'файлов'])}`)
      return true
    }

    clearErrors?.();

    return false;
  }

  return (
    <div className={style.imageFileInput}>
      <div className={style.imageFileInput__errorMessage}>
        {error?.message}
      </div>
      <div className={style.imageFileInput__preview}>
        {previews.map((src, index) =>
          <div
            key={index}
            className={style.imageFileInput__imageWrapper}
          >

            <CloseButton onClick={onFileDelete(index)} className={style.imageFileInput__removeImage} />
            <img src={src} className={style.imageFileInput__previewImage} />
          </div>
        )}
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
            <><img className='no-pointer-events' src={camera} alt="Камера" width={32} height={32} />Нажмите или перетащите сюда изображения</>
        }
      </label>
      <div className={style.imageFileInput__loadInfo}>
        <div className={style.imageFileInput__loadTitle}>Вы можете загрузить до 10 фотографий</div>
        <GreyText>Допустимые форматы {allowedFileTypes.map((item) => (
          item.toUpperCase()
        )).join(', ')}
        </GreyText>
      </div>
    </div>
  )
}