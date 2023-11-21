import { Rating as MaterialRating } from "@mui/material";
import style from './Rating.module.scss'
import { StarIcon } from "src/shared/ui/StarIcon";
import { classNames } from "src/shared/lib/classNames/classNames";
/* import { styled } from '@mui/material/styles'; */

/* const StyledRating = styled(MaterialRating)({
    '& .MuiRating-iconFilled': {
      color: '#FCAC38',
    },
    '& .MuiRating-iconHover': {
      color: '#FCAC38',
    },
  }); */

export enum RatingType {
    Numeric = 'numeric',
    Readonly = 'readonly',
    Editable = 'editable'
}

interface RatingProps {
    type?: RatingType
    className?: string
    overall_rating?: string
}

export const Rating = ({className = '', type = RatingType.Readonly, overall_rating='0,0'}:RatingProps) => {

    if (type === RatingType.Editable) {
        return (
            <MaterialRating 
            
            />
        )
    }

    if (type === RatingType.Numeric) {
        return (
            <div className={classNames(style.rating__numeric, {}, [className])}>
                <StarIcon fillColor="#FCAC38"/>
                <span>{overall_rating}</span>
            </div>
        )
    }

    return (
        <MaterialRating 
        
        />
    )

}