import { GoodEstimaions } from 'src/features/Reviews/ui/Reviews'
import style from './ReviewsList.module.scss'
import { Rating } from 'src/features/Rating'
import { ImageSize, UserPhoto } from '../../../shared/ui/UserPhoto/UserPhoto'
import { Gallery } from 'src/features/Gallery'
import { useGalleryState } from 'src/shared/hooks/useGalleryState'
import { useCallback, useState } from 'react'
import { ReviewSortDropdown } from './ReviewSortDropdown/ReviewSortDropdown'

interface ReviewsListProps {
    reviews?: GoodEstimaions[]
}



export const ReviewsList = ({ reviews }: ReviewsListProps) => {
    const { currentGalleryImage, galleryClose, galleryOpen } = useGalleryState();
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
            <Gallery currentImage={currentGalleryImage} files={reviewFiles} onGalleryClose={currentGalleryClose} />
            <ReviewSortDropdown />
            <div className={style.reviewsList__reviews}>
                {reviews?.map(({ estimation, user, review, files }, index) => {
                    /*const files = [
                                            {
                    
                                                path: "https://remeslo.pisateli-studio.ru/storage/strokatest.png"
                                            },
                                            {
                                                path: "https://w.forfun.com/fetch/03/03f8cd3f6796daaacc1fe43ffb7704b7.jpeg"
                                            },
                                            {
                                                path: "https://w.forfun.com/fetch/56/5656d35727009cabea6ce79973a9702c.jpeg"
                                            },
                                            {
                                                path: "https://gas-kvas.com/uploads/posts/2023-02/1675489758_gas-kvas-com-p-izobrazheniya-i-kartinki-na-fonovii-risuno-41.jpg"
                                            }
                                        ] */
                    return (

                        <div key={index} className={style.reviewsList__item}>
                            <div className={style.reviewsList__itemHeading}>
                                <div className={style.reviewsList__user}>
                                    <UserPhoto profileInfo={user.profile} imageSize={ImageSize.S} />
                                    {user.profile?.firstname}
                                </div>
                                <div className={style.reviewsList__rightCol}>
                                    <span className={style.reviewsList__date}>1 Ноября</span>
                                    <Rating overall_rating={estimation ?? 0}></Rating>
                                </div>
                            </div>
                            <div className={style.reviewsList__infoSection}>
                                <div className={style.reviewsList__itemInfo}>
                                    <div className={style.reviewsList__infoTitle}>
                                        Достоинства
                                    </div>
                                    <div className={style.reviewsList__infoContent}>
                                        Небольшие габариты
                                    </div>
                                </div>
                                <div className={style.reviewsList__itemInfo}>
                                    <div className={style.reviewsList__infoTitle}>
                                        Недостатки
                                    </div>
                                    <div className={style.reviewsList__infoContent}>
                                        Нет
                                    </div>
                                </div>
                                <div className={style.reviewsList__itemInfo}>
                                    <div className={style.reviewsList__infoTitle}>
                                        Комментарий
                                    </div>
                                    <div className={style.reviewsList__infoContent}>
                                        {review}
                                    </div>
                                </div>
                                {!!files.length &&
                                    <div className={style.reviewsList__itemInfo}>
                                        <div className={style.reviewsList__infoTitle}>
                                            Фотографии
                                        </div>
                                        <div className={style.reviewsList__infoContent}>
                                            <div className={style.reviewsList__imagesContainer}>
                                                {files.map((file, index) => (
                                                    <div onClick={currentGalleryOpen(index, files)} key={index} className={style.reviewsList__imageItem}>
                                                        <img src={file.path} alt="Отзыв пользователя" />
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