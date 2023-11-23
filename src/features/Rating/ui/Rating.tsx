import { Rating as MaterialRating } from "@mui/material";
import style from './Rating.module.scss'
import { StarIcon } from "src/shared/ui/StarIcon";
import { classNames } from "src/shared/lib/classNames/classNames";

export enum RatingType {
    Numeric = 'numeric',
    Readonly = 'readonly',
    Editable = 'editable'
}

interface RatingProps {
    type?: RatingType
    className?: string
    overall_rating: number
}

export const Rating = ({ className = '', type = RatingType.Readonly, overall_rating }: RatingProps) => {

    if (type === RatingType.Editable) {
        return (
            <MaterialRating

            />
        )
    }

    if (type === RatingType.Numeric) {
        return (
            <div className={classNames(style.rating__numeric, {}, [className])}>
                <StarIcon fillColor="#FCAC38" />
                <span>{overall_rating}</span>
            </div>
        )
    }

    return (
        <MaterialRating
            name="read-only"
            value={overall_rating}
            icon={<StarIcon fillColor="#FCAC38" />}
            emptyIcon={<StarIcon fillColor="transparent" />}
            readOnly
        />
    )

}