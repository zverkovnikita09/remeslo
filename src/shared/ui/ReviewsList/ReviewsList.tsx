import { GoodEstimaions } from 'src/features/Reviews/ui/Reviews'
import style from './ReviewsList.module.scss'
import { Rating } from 'src/features/Rating'
import { ImageSize, UserPhoto } from '../UserPhoto/UserPhoto'

interface ReviewsListProps {
    reviews?: GoodEstimaions[]
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {

    return (
        <div className={style.reviewsList}>
            <div className={style.reviewsList__sort}>Сначала новые</div>
            <div className={style.reviewsList__reviews}>
                {reviews?.map(({ estimation, user }, index) => {
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
                                        Очень лаконичная и стильная ваза, рекомендую
                                    </div>
                                </div>
                                <div className={style.reviewsList__itemInfo}>
                                    <div className={style.reviewsList__infoTitle}>
                                        Фотографии
                                    </div>
                                    <div className={style.reviewsList__infoContent}>
                                        <div className={style.reviewsList__imagesContainer}>
                                            <div className={style.reviewsList__imageItem}>
                                                <img src="" alt="" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                }
                )}
            </div>
        </div>
    )
}