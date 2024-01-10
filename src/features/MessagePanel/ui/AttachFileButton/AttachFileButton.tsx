import { useId } from 'react'
import style from './AttachFileButton.module.scss'
import { FileInputProps } from 'src/shared/ui/ImageFileInput/ImageFileInput';
import { checkFileInputError } from 'src/shared/lib/checkFileInputError/checkFileInputError';
import { arrayToFilelist } from 'src/shared/lib/arrayToFilesList/arrayToFileList';

export const AttachFileButton = (props: FileInputProps) => {
    const {
        files,
        setFiles,
        setError,
        clearErrors,
    } = props;

    const attachId = useId();
    const checkError = (files: File[]) => checkFileInputError({ files, setError, clearErrors })

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const filesArray = [...(files ?? [])];

        const newFilesArray = [...filesArray, ...(e.target.files ?? [])];

        !checkError(newFilesArray) &&
            setFiles(arrayToFilelist(newFilesArray));
    }

    return (
        <label htmlFor={attachId} className={style.attachFileButton}>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16.4393 16.1999L13.1459 19.4932C11.3193 21.3199 11.3193 24.2666 13.1459 26.0932C14.9726 27.9199 17.9193 27.9199 19.7459 26.0932L24.9326 20.9066C28.5726 17.2666 28.5726 11.3466 24.9326 7.70656C21.2926 4.06656 15.3726 4.06656 11.7326 7.70656L6.07926 13.3599C2.95926 16.4799 2.95926 21.5466 6.07926 24.6799" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input id={attachId} onChange={onInputChange} type="file" className='hiddenInput' />
        </label>
    )
}