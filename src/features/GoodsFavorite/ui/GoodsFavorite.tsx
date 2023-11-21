import { classNames } from "src/shared/lib/classNames/classNames"
import { Button } from "src/shared/ui/Button/Button"
import { HeartIcon } from "src/shared/ui/HeartIcon"
import style from './GoodsFavorite.module.scss'
import { useState } from 'react'

interface GoodsFavoriteProps {
    className?: string
}

export const GoodsFavorite = ({ className = '', }: GoodsFavoriteProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(isFavorite ? false : true);
    }

    return (
        <Button
            className={classNames(style.goodsFavorite, {}, [className])}
            onClick={toggleFavorite}

        >
            <HeartIcon fillColor= {isFavorite ? '#122533' : '#ffffff'} />
        </Button>
    )
}