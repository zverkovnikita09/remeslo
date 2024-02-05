"use client"
import cn from "classnames"
import { useState } from 'react'
import style from './GoodsFavorite.module.scss'
import { Button } from "@shared/ui/Button"
import { HeartIcon } from "@shared/ui/HeartIcon"

interface GoodsFavoriteProps {
  className?: string
}

export const GoodsFavorite = ({ className }: GoodsFavoriteProps) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [firstChecked, setFirstChecked] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(pr => !pr);
    setFirstChecked(pr => !pr)
  }

  return (
    <Button
      className={cn(style.goodsFavorite, { [style.active]: firstChecked }, className)}
      onClick={toggleFavorite}
    >
      <HeartIcon fillColor={isFavorite ? '#122533' : '#ffffff'} />
    </Button>
  )
}