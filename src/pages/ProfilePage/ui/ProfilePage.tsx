import { Container } from 'src/shared/ui/Container/Container'
import style from './ProfilePage.module.scss'
import { Title } from 'src/shared/ui/Title/TItle'
import { NavLink, Outlet, useParams } from 'react-router-dom'
import { VendorProfile } from 'src/features/VendorProfile'
import { StoreType } from 'src/pages/ViewPage/ui/ViewPage'
import { useQuery } from 'react-query'
import { getData } from 'src/shared/lib/api/api'
import { classNames } from 'src/shared/lib/classNames/classNames'
import { ImageSize } from 'src/shared/ui/UserPhoto/UserPhoto'
import { OverallRating } from 'src/shared/ui/OverallRating/OverallRating'

export const ProfilePage = () => {
    const { slug } = useParams();
    const { data } = useQuery({
        queryKey: slug,
        queryFn: () => getData<StoreType>({
            url: `/api/v1/store/${slug}`,
            dataFlag: true
        }),
    })

    return (
        <Container className={style.profilePage}>
            <div className={style.profilePage__heading}>
                <Title className={style.profilePage__title}>Объявления пользователя</Title>
                <div className={style.profilePage__toggler}>
                    <NavLink to={`/main/profile/${slug}`} end
                        className={({ isActive }) => classNames(style.profilePage__link, { [style.profilePage__activeLink]: isActive })}>
                        Активные
                    </NavLink>
                    <NavLink to={`/main/profile/${slug}/complete`}
                        className={({ isActive }) => classNames(style.profilePage__link, { [style.profilePage__activeLink]: isActive })}>
                        Завершенные
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
                <Outlet />
            </div>
        </Container>
    )
}