"use client"
import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper/types';
import cn from 'classnames'
import style from './SliderGallery.module.scss'
import { useState } from 'react';
import { useGalleryState } from '@shared/hooks/useGalleryState';
import Image from 'next/image';
import { ModalGallery } from '@entities/ModalGallery/ui/ModalGallery';

interface SliderGalleryProps {
  files?: { path: string }[]
  title?: string
}

export const SliderGallery = ({ files = [], title }: SliderGalleryProps) => {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType>();
  const [activeThumbSlide, setActiveThumbSlide] = useState(0);
  const [mainSwiper, setMainSwiper] = useState<SwiperType>();
  const { currentGalleryImage, galleryClose, galleryOpen } = useGalleryState();

  return (
    <div className={style.sliderGallery}>
      <ModalGallery files={files} currentImage={currentGalleryImage} onGalleryClose={galleryClose} />
      <Swiper className={style.bigSlider}
        spaceBetween={50}
        slidesPerView={1}
        thumbs={{ swiper: thumbsSwiper }}
        onSwiper={setMainSwiper}
        onSlideChange={() => setActiveThumbSlide(mainSwiper?.activeIndex ?? 0)}
        modules={[Thumbs]}
      >
        {files?.map((img, index) => (
          <SwiperSlide onClick={galleryOpen(index)} key={index} className={style.bigItem}>
            <Image src={img.path} alt={title ?? ''} className={style.mainImage} fill />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper className={style.smallSlider}
        spaceBetween={12}
        slidesPerView={4.5}
        onSwiper={setThumbsSwiper}
        modules={[Thumbs]}
      >
        {files?.map((img, index) => (
          <SwiperSlide key={index} className={cn(style.smallItem, { [style.activeItem]: activeThumbSlide === index })}>
            <Image src={img.path} alt={title ?? ''} className={style.mainImage} width={145} height={123} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}