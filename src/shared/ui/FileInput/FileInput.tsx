import {PropsWithChildren, useId, useRef} from 'react'
import style from './FileInput.module.scss'
import {FieldError} from "react-hook-form";
import {checkFileInputError} from "@shared/lib/checkFileInputError";
import {arrayToFilelist} from "@shared/lib/arrayToFileList";
import cn from "classnames";

interface FileInputProps {
  file: File | null
  setFile: (file: File | null) => void
  setError: (message: string) => void
  allowedFileTypes?: string[]
  allowedFileSize?: number
  allowedFileCount?: number
  error?: FieldError
  clearErrors?: () => void
  className?: string
}

export const FileInput = (props: PropsWithChildren<FileInputProps>) => {
  const {
    file,
    setFile,
    setError,
    error,
    clearErrors,
    allowedFileTypes,
    allowedFileSize,
    allowedFileCount,
    className,
    children
  } = props

  const id = useId();

  const inputRef = useRef<HTMLInputElement>(null);

  const checkError = (files: File[]) => checkFileInputError({
    files,
    setError,
    allowedFileTypes,
    clearErrors,
    allowedFileCount,
    allowedFileSize
  })

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      !checkError([e.target.files[0]]) &&
      setFile(e.target.files?.[0]);
      inputRef.current && (inputRef.current.value = '');
    }
  }

  return (
    <div className={style.fileInput}>
      <label htmlFor={id} className={cn(style.label, className)}>
        {children}
      </label>
      <input
        id={id}
        type="file"
        className='hiddenInput'
        onChange={onInputChange}
        ref={inputRef}
      />
    </div>
  )
}