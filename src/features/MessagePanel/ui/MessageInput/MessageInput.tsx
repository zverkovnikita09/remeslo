import { ClipboardEvent, FormEvent, KeyboardEvent, useCallback, useEffect, useRef } from 'react'
import style from './MessageInput.module.scss'
import { TextArea } from 'src/shared/ui/TextArea/TextArea'

interface MessageInputProps {
    value: string
    onChange: (value: string) => void
    onSubmit: () => void
}

function replaceTags(text: string) {
    // Заменяем открывающие теги на пустую строку
    text = text.replace(/<[^\/>][^>]*>/g, '');

    // Заменяем закрывающие блочные теги на <br>
    text = text.replace(/<\/(p|section|article|li)[^>]*>/g, '<br><br>');

    text = text.replace(/<\/[^>]+>/g, '');

    /*  text = text.replace() */

    return text;
}

export const MessageInput = ({ onChange, value, onSubmit }: MessageInputProps) => {
    const inputRef = useRef<HTMLDivElement>(null);

    /* useEffect(() => {
        if (inputRef.current && inputRef.current.innerHTML !== value) {
            inputRef.current!.textContent = value;
        }
    });

    const onInputChange = useCallback((e: FormEvent<HTMLDivElement>) => {
        onChange(replaceTags((e.target as HTMLElement).innerHTML ?? '').trim());
        console.log(replaceTags((e.target as HTMLElement).innerHTML ?? '').trim());
    }, [onChange])

    const onPaste = (e: ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault()
        console.log(e.clipboardData.getData("text/html"));
        
        onChange(replaceTags(e.clipboardData.getData("text/html")).trim())
    } */

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
            {/* <div
                contentEditable
                className={style.messageInput__input}
                ref={inputRef}
                onInput={onInputChange}
                onPaste={onPaste}
                onKeyDown={onEnterClick}
            /> */}
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