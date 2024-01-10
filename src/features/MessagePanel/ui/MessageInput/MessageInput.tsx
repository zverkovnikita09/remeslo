import { KeyboardEvent } from 'react'
import style from './MessageInput.module.scss'
import { TextArea } from 'src/shared/ui/TextArea/TextArea'

interface MessageInputProps {
    value: string
    onChange: (value: string) => void
    onSubmit: () => void
}


export const MessageInput = ({ onChange, value, onSubmit }: MessageInputProps) => {

    const onEnterClick = (e: KeyboardEvent<HTMLTextAreaElement>) => {
        if ((e.code === 'Enter' && e.shiftKey) || (e.code === "NumpadEnter" && e.shiftKey)) {
            return
        }
        if (e.code === 'Enter' || e.code === "NumpadEnter") {
            e.preventDefault();
            onSubmit();
        }
    }

    return (
        <div className={style.messageInput}>
            <TextArea
                value={value}
                className={style.messageInput__input}
                autosize
                onChange={(e) => onChange(e.target.value)}
                onKeyDown={onEnterClick}
                defaultHeight={58}
                maxSize={200}
            />
        </div>
    )
}