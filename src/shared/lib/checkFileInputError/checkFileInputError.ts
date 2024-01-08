
import { FileInputProps } from "src/shared/ui/ImageFileInput/ImageFileInput";
import { labelsCounterFormatter } from "../labelsCounterFormatter/labelsCounterFormatter"

interface FnArgs extends Omit<FileInputProps, "files" | "setFiles" | "error"> {
    files: File[]
}

export const checkFileInputError = (args: FnArgs): boolean => {
    const {
        files,
        allowedFileCount = 10,
        allowedFileSize = 10 * 1024 * 1024,
        allowedFileTypes = ['png', 'jpg', 'jpeg', 'svg', 'webp'],
        setError,
        clearErrors
    } = args;

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