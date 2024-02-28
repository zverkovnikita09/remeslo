import style from './UserFavorites.module.scss'
import {Goods, GoodsGrid} from "@entities/GoodsGrid";
import {Title} from "@shared/ui/Title";
import cn from "classnames";

interface UserFavoritesProps {
  goods: Goods[]
}

export const UserFavorites = ({goods}: UserFavoritesProps) => {
  return (
    <div className={style.userFavorites}>
      <Title>Избранное</Title>
      {!goods?.length ?
        <p className={cn(style.emptyFavorites, 'greyText')}>В избранном пока ничего нет</p> :
        <GoodsGrid goods={goods} />
      }
    </div>
  );
};
