import { Swiper, SwiperSlide } from 'swiper/react'
import { IoClose } from "react-icons/io5";
import { Portal } from 'src/shared/ui/Portal/Portal'
import style from './Gallery.module.scss'
import { Button } from 'src/shared/ui/Button/Button';
import { useEffect, useRef, useState } from 'react';
import { Swiper as SwiperType } from 'swiper/types';
import { classNames } from 'src/shared/lib/classNames/classNames';
import { Navigation } from 'swiper/modules';

interface GalleryProps {
    files: { path: string }[]
    currentImage: number | null
    onGalleryClose: () => void
}

export const Gallery = ({ files, currentImage, onGalleryClose }: GalleryProps) => {
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
    }, [slider])

    if (typeof currentImage === 'number') {

        return (
            <Portal>
                <div className={style.gallery}>
                    <Button
                        className={style.gallery__close}
                        onClick={onGalleryClose}
                    >
                        <IoClose color={'#ffffff'} size={'32'} />
                    </Button>
                    <Swiper
                        className={style.gallery__slider}
                        modules={[Navigation]}
                        spaceBetween={200}
                        onSwiper={setSlider}
                        initialSlide={currentImage}
                        navigation={{ prevEl: prevArrow.current, nextEl: nextArrow.current }}
                    >
                        {files.map(({ path }) => (
                            <SwiperSlide key={path} className={style.gallery__item}>
                                <div className={style.gallery__mediaBlock}>
                                    <img className={classNames(style.gallery__slide, { [style.loaded]: loadedImage })} src={path} alt="Изображение галлереи" />
                                </div>
                            </SwiperSlide>

                        ))}
                    </Swiper>
                    <Button buttonRef={prevArrow} className={classNames(style.gallery__prevArrow)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 25 25" fill="none">
                            <path d="M10.07 6.84668L4 12.9167L10.07 18.9867" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M21 12.9166H4.17004" stroke="#ffffff" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Button>
                    <Button buttonRef={nextArrow} className={style.gallery__nextArrow}>
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