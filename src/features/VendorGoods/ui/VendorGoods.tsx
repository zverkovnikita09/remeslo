import { GoodsGrid, IGoods } from 'src/entities/GoodsGrid'
import style from './VendorGoods.module.scss'
import { useQuery } from 'react-query'
import { getData } from 'src/shared/lib/api/api'
import { GreyText } from 'src/shared/ui/GreyText/GreyText'



export const VendorGoods = () => {

    let { data: goods, isLoading } = useQuery({
        queryKey: 'goodsQuery',
        queryFn: () => getData<IGoods[]>({
            url: `/api/v1/good`,
            dataFlag: true,
        }),
    })
    
    if (!isLoading && !goods?.length) {
        return (
            <div className={style.vendorGoods}>
                <GreyText>У пользователя нет объявлений</GreyText>
            </div>
        )
    }
    return (
        <div className={style.vendorGoods}>
            <GoodsGrid goods={goods} isLoading={isLoading} />
        </div>
    )
}