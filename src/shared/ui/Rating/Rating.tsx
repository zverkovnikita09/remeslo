import { Rating as MaterialRating } from "@mui/material";
import style from './Rating.module.scss'
import cn from "classnames";
import { StarIcon } from "@shared/ui/StarIcon";

export enum RatingType {
  Numeric = 'numeric',
  Readonly = 'readonly',
  Editable = 'editable'
}

interface RatingProps {
  type?: RatingType
  className?: string
  overall_rating?: number
  onChange?: (event: React.SyntheticEvent<Element, Event>, value: number | null) => void
}

export const Rating = ({ className, type = RatingType.Readonly, overall_rating, onChange }: RatingProps) => {
  if (type === RatingType.Editable) {
    return (
      <MaterialRating
        name="controlled"
        value={overall_rating}
        icon={<StarIcon fillColor="#FCAC38" />}
        emptyIcon={<StarIcon fillColor="transparent" />}
        onChange={onChange}
      />
    )
  }

  if (type === RatingType.Numeric) {
    return (
      <div className={cn(style.numeric, className)}>
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