"use client"
import { Swiper, SwiperSlide } from 'swiper/react'
import { IoClose } from "react-icons/io5";
import style from './ModalGallery.module.scss'
import { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper/types';
import cn from 'classnames';
import { Navigation } from 'swiper/modules';
import { Portal } from '@shared/ui/Portal';
import { Button } from '@shared/ui/Button';
import Image from 'next/image';

interface GalleryProps {
  files: { path: string }[]
  currentImage: number | null
  onGalleryClose: () => void
}

export const ModalGallery = ({ files, currentImage, onGalleryClose }: GalleryProps) => {
  const [slider, setSlider] = useState<SwiperType>();
  const [loadedImage, setLoadedImage] = useState(false);
  const prevArrow = useRef<HTMLButtonElement>(null);
  const nextArrow = useRef<HTMLButtonElement>(null);

  useEffect(() => {

    if (!!slider && currentImage === slider.activeIndex) {
      setTimeout(() => {
        setLoadedImage(true);
      }, 0);
    }
  }, [currentImage, slider])

  if (typeof currentImage === 'number') {

    return (
      <Portal>
        <div className={style.gallery}>
          <Button
            className={style.close}
            onClick={onGalleryClose}
          >
            <IoClose color={'#ffffff'} size={'32'} />
          </Button>
          <Swiper
            className={style.slider}
            modules={[Navigation]}
            spaceBetween={200}
            onSwiper={setSlider}
            initialSlide={currentImage}
            navigation={{ prevEl: prevArrow.current, nextEl: nextArrow.current }}
          >
            {files.map(({ path }) => (
              <SwiperSlide key={path} className={style.slide}>
                <div className={style.mediaBlock}>
                  <Image className={cn(style.image, { [style.loaded]: loadedImage })} src={path} alt="Изображение галлереи" fill />
                </div>
              </SwiperSlide>

            ))}
          </Swiper>
          <Button buttonRef={prevArrow} className={cn(style.prevArrow)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M10.07 6.84668L4 12.9167L10.07 18.9867" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 12.9166H4.17004" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
          <Button buttonRef={nextArrow} className={style.nextArrow}>
            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
              <path d="M10.07 6.84668L4 12.9167L10.07 18.9867" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 12.9166H4.17004" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Button>
        </div>
      </Portal>
    )
  }

  return null
}