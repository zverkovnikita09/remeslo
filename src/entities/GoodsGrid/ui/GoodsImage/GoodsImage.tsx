"use client"
import { Swiper, SwiperSlide } from "swiper/react"
import templateLogo from '@images/templateLogo.png'
import cn from "classnames"
import { Autoplay, Pagination } from "swiper/modules"
import Image from "next/image"
import { Goods } from "@entities/GoodsGrid"
import style from './GoodsImage.module.scss'

interface GoodsImageProps extends Pick<Goods, "files" | "title"> {
}

export const GoodsImage = ({ files, title }: GoodsImageProps) => {

  if (!files?.length) return (
    <Image
      src={templateLogo}
      className={cn(style.img, style.templateLogo)}
      alt={title}
      fill
    />
  )
  if (files.length === 1) return (
    <Image
      src={files[0].path}
      className={style.img}
      alt={title}
      fill
    />
  )
  return (
    <Swiper
      className={style.slider}
      followFinger={false}
      modules={[Pagination, Autoplay]}
      loop
      autoplay={{
        delay: 3000,
        disableOnInteraction: false
      }}
      pagination={{
        clickable: false,
        bulletClass: style.customBullets,
        bulletActiveClass: style.activeCustomBullets,
        el: `.${style.bulletContainer}`,
        renderBullet: (_, className) => {
          return `<button tab-index="-1" aria-label='Кнопка пагинации' class="${className}"></button>`;
        }
      }}
    >
      {files.map(({ path }) => (
        <SwiperSlide
          key={path}
          className={style.slide}
        >
          <Image
            src={path}
            className={style.img}
            alt={title}
            fill
          />
        </SwiperSlide>
      ))}
      <div className={style.bulletContainer} />
    </Swiper>
  )
}