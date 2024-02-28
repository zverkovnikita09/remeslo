"use client"
import cn from "classnames"
import {useState} from 'react'
import style from './GoodsFavorite.module.scss'
import {Button} from "@shared/ui/Button"
import {HeartIcon} from "@shared/ui/HeartIcon"

interface GoodsFavoriteProps {
  className?: string
  isFavorite?: boolean
}

export const GoodsFavorite = ({className, isFavorite}: GoodsFavoriteProps) => {


  const toggleFavorite = () => {

  }

  return (
    <Button
      className={cn(style.goodsFavorite, {[style.active]: isFavorite}, className)}
      onClick={toggleFavorite}
    >
      <HeartIcon fillColor={isFavorite ? '#122533' : '#ffffff'}/>
    </Button>
  )
}