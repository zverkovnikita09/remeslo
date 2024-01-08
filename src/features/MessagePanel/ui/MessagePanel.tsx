
import { Controller, useForm } from 'react-hook-form';
import { AttachFileButton } from './AttachFileButton/AttachFileButton';
import { MessageInput } from './MessageInput/MessageInput';
import style from './MessagePanel.module.scss'
import { Button } from 'src/shared/ui/Button/Button';

interface MessageForm {
    files: FileList | null
    text: string
}

export const MessagePanel = () => {
    const {
        control,
        handleSubmit,
        setValue,
        setError,
        watch,
        reset,
        formState: { errors, /* touchedFields */ },
        clearErrors
    } = useForm<MessageForm>({ defaultValues: { files: null } });
    const files: FileList | null = watch('files');

    const onSubmit = (data: MessageForm) => {
        console.log(data.text);
        reset();
    }

    return (
        <form className={style.messagePanel} onSubmit={handleSubmit(onSubmit)}>
            <AttachFileButton
                files={files}
                setFiles={(files) =>
                    setValue('files', files)
                }
                setError={(message) => setError('files', { type: 'custom', message })}
                error={errors.files}
                clearErrors={() => clearErrors('files')}
            />
            <Controller
                name="text"
                control={control}
                rules={{ required: true }}
                render={(props) => <MessageInput value={props.field.value} onChange={props.field.onChange} onSubmit={handleSubmit(onSubmit)} />}
            />
            <Button className={style.messagePanel__sendButton} type="submit">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M9.86625 8.42663L21.1862 4.65329C26.2662 2.95996 29.0262 5.73329 27.3462 10.8133L23.5729 22.1333C21.0396 29.7466 16.8796 29.7466 14.3462 22.1333L13.2262 18.7733L9.86625 17.6533C2.25292 15.12 2.25292 10.9733 9.86625 8.42663Z" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.4805 18.2L18.2538 13.4133" stroke="#292D32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Button>
        </form>
    )
} 