import { Swiper, SwiperSlide } from 'swiper/react'
import { Thumbs } from 'swiper/modules'
import { Swiper as SwiperType } from 'swiper/types';
import { classNames } from 'src/shared/lib/classNames/classNames'
import style from './SliderGallery.module.scss'
import { useState } from 'react';
import { Gallery } from 'src/features/Gallery';
import { useGalleryState } from 'src/shared/hooks/useGalleryState';

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
            <Gallery files={files} currentImage={currentGalleryImage} onGalleryClose={galleryClose} />
            <Swiper className={style.sliderGallery__bigSlider}
                spaceBetween={50}
                slidesPerView={1}
                thumbs={{ swiper: thumbsSwiper }}
                onSwiper={setMainSwiper}
                onSlideChange={() => setActiveThumbSlide(mainSwiper?.activeIndex ?? 0)}
                modules={[Thumbs]}
            >
                {files?.map((img, index) => (

                    <SwiperSlide onClick={galleryOpen(index)} key={index} className={style.sliderGallery__bigItem}>
                        <img src={img.path} alt={title} className={style.sliderGallery__mainImage} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper className={style.sliderGallery__smallSlider}
                spaceBetween={12}
                slidesPerView={4.5}
                onSwiper={setThumbsSwiper}
                modules={[Thumbs]}
            >
                {files?.map((img, index) => (
                    <SwiperSlide key={index} className={classNames(style.sliderGallery__smallItem, { [style.activeItem]: activeThumbSlide === index })}>
                        <img src={img.path} alt={title} className={style.sliderGallery__mainImage} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}