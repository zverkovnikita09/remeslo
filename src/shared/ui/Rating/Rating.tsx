import { Rating as MaterialRating } from "@mui/material";
import style from './Rating.module.scss'
import cn from "classnames";
import { StarIcon } from "@shared/ui/StarIcon";
import { FieldError } from "react-hook-form";
import { ErrorBlock } from "../ErrorBlock";

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
  error?: FieldError
}

export const Rating = ({ className, type = RatingType.Readonly, overall_rating, onChange, error }: RatingProps) => {
  if (type === RatingType.Editable) {
    return (
      <div>
        <MaterialRating
          name="controlled"
          value={overall_rating}
          icon={<StarIcon fillColor="#FCAC38" />}
          emptyIcon={<StarIcon fillColor="transparent" />}
          onChange={onChange}
        />
        {error?.message && <ErrorBlock>{error.message}</ErrorBlock>}
      </div>
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