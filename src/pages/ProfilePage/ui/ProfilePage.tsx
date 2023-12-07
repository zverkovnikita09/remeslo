import { Container } from 'src/shared/ui/Container/Container'
import style from './ProfilePage.module.scss'
import { Title } from 'src/shared/ui/Title/TItle'
import { NavLink, useLocation, useParams } from 'react-router-dom'
import { VendorProfile } from 'src/features/VendorProfile'
import { StoreType } from 'src/pages/ViewPage/ui/ViewPage'
import { useQuery } from 'react-query'
import { getData } from 'src/shared/lib/api/api'
import { classNames } from 'src/shared/lib/classNames/classNames'
import { ImageSize } from 'src/shared/ui/UserPhoto/UserPhoto'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'
import { GoodsGrid, IGoods } from 'src/entities/GoodsGrid'

export const ProfilePage = () => {
    const location = useLocation();
    const { slug } = useParams();
    const { data } = useQuery({
        queryKey: slug,
        queryFn: () => getData<StoreType>({
            url: `/api/v1/store/${slug}`,
            dataFlag: true
        }),
    })

    const { data: goods, isLoading: isGoodsLoading } = useQuery({
        queryKey: 'goodsQuery',
        queryFn: () => getData<IGoods[]>({
            url: `/api/v1/good`,
            dataFlag: true,
        }),
    })

    return (
        <Container className={style.profilePage}>
            <div className={style.profilePage__heading}>
                <Title className={style.profilePage__title}>Объявления пользователя</Title>
                <div className={style.profilePage__toggler}>
                    <NavLink to={`/main/profile/${slug}`} end
                        className={({ isActive }) => classNames(style.profilePage__link, { [style.profilePage__activeLink]: isActive })}>
                        Активные {!isGoodsLoading && `(${goods?.length ?? 0})`}
                    </NavLink>
                    <NavLink to={`/main/profile/${slug}/complete`}
                        className={({ isActive }) => classNames(style.profilePage__link, { [style.profilePage__activeLink]: isActive })}>
                        Завершенные {!isGoodsLoading && `(${goods?.length ?? 0})`}
                    </NavLink>
                </div>
            </div>
            <div className={style.profilePage__content}>
                <div className={style.profilePage__vendorProfile}>
                    <VendorProfile
                        store={data ?? {}}
                        photoSize={ImageSize.L}
                        withRating
                        overallRating={5}
                        marks={0}
                    />
                </div>
                <div className={style.profilePage__vendorGoods}>
                    {
                        !isGoodsLoading && !goods?.length ? 
                        <GreyText>У пользователя нет объявлений</GreyText> :
                        <GoodsGrid goods={goods} isLoading={isGoodsLoading} isArchived={location.pathname.includes('/complete')} />
                    }
                </div>
            </div>
        </Container>
    )
}