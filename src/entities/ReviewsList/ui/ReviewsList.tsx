import style from './ReviewsList.module.scss'
import {useCallback, useState} from "react";
import {Rating} from "@shared/ui/Rating";
import {UserPhoto, UserPhotoSize} from "@shared/ui/UserPhoto";
import {useGalleryState} from "@shared/hooks/useGalleryState";
import {GoodEstimaions} from "@features/Reviews/ui/Reviews";
import {ModalGallery} from "@entities/ModalGallery";
import {ReviewSortDropdown} from "@features/ReviewSortDropdown";
import Image from 'next/image';


interface ReviewsListProps {
  reviews?: GoodEstimaions[]
}


export const ReviewsList = ({reviews}: ReviewsListProps) => {
  const {currentGalleryImage, galleryClose, galleryOpen} = useGalleryState();
  const [reviewFiles, setReviewFiles] = useState<{ path: string }[]>([]);

  const currentGalleryOpen = useCallback((imageIndex: number, files: { path: string }[]) => () => {
    setReviewFiles(files);
    galleryOpen(imageIndex)();
  }, [])

  const currentGalleryClose = useCallback(() => {
    galleryClose();
    setReviewFiles([]);
  }, [])

  return (
    <div className={style.reviewsList}>
      <ModalGallery currentImage={currentGalleryImage} files={reviewFiles} onGalleryClose={currentGalleryClose}/>
      <ReviewSortDropdown/>
      <div className={style.reviews}>
        {reviews?.map(({estimation, user, review, files}, index) => {
            return (
              <div key={index} className={style.item}>
                <div className={style.itemHeading}>
                  <div className={style.user}>
                    <UserPhoto avatar={user.profile?.avatar} imageSize={UserPhotoSize.S}/>
                    {user.profile?.firstname}
                  </div>
                  <div className={style.rightCol}>
                    <span className={style.date}>1 Ноября</span>
                    <Rating overall_rating={estimation ?? 0}></Rating>
                  </div>
                </div>
                <div className={style.infoSection}>
                  <div className={style.itemInfo}>
                    <div className={style.infoTitle}>
                      Достоинства
                    </div>
                    <div className={style.infoContent}>
                      Небольшие габариты
                    </div>
                  </div>
                  <div className={style.itemInfo}>
                    <div className={style.infoTitle}>
                      Недостатки
                    </div>
                    <div className={style.infoContent}>
                      Нет
                    </div>
                  </div>
                  <div className={style.itemInfo}>
                    <div className={style.infoTitle}>
                      Комментарий
                    </div>
                    <div className={style.infoContent}>
                      {review}
                    </div>
                  </div>
                  {!!files.length &&
                      <div className={style.itemInfo}>
                          <div className={style.infoTitle}>
                              Фотографии
                          </div>
                          <div className={style.infoContent}>
                              <div className={style.imagesContainer}>
                                {files.map((file, index) => (
                                  <div onClick={currentGalleryOpen(index, files)} key={index} className={style.imageItem}>
                                    <Image src={file.path} alt="Отзыв пользователя" fill/>
                                  </div>
                                ))}

                              </div>
                          </div>
                      </div>
                  }
                </div>
              </div>
            )
          }
        )}
      </div>
    </div>
  )
}