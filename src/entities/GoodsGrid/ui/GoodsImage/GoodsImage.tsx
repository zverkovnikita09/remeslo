import { Swiper, SwiperSlide } from "swiper/react"
import { IGoods } from "../GoodsGrid"
import style from './GoodsImage.module.scss'
import templateLogo from 'src/shared/assets/templateLogo.png'
import { classNames } from "src/shared/lib/classNames/classNames"
import { Autoplay, Pagination } from "swiper/modules"

interface GoodsImageProps extends Pick<IGoods, "files" | "title"> {
}

export const GoodsImage = ({ files, title }: GoodsImageProps) => {

  if (!files?.length) return (
    <img
      src={templateLogo}
      className={classNames(style.goodsImage__img, {}, [style.templateLogo])}
      alt={title}
    />
  )
  if (files.length === 1) return (
    <img
      src={files[0].path}
      className={style.goodsImage__img}
      alt={title}
    />
  )
  return (
    <Swiper
      className={style.goodsImage__slider}
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
          className={style.goodsImage__slide}
        >
          <img
            src={path}
            className={style.goodsImage__img}
            alt={title}
          />
        </SwiperSlide>
      ))}
      <div className={style.bulletContainer} />
    </Swiper>
  )
}