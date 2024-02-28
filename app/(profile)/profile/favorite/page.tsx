import {UserFavorites} from "@entities/UserFavorites";
import {getServerSession} from "next-auth";
import {authConfig} from "@providers/Auth";
import {getData} from "@shared/lib/api";
import {User} from "@shared/models/user.model";

export default async function Favorite() {
  const session = await getServerSession(authConfig);

  const userData = await getData<User>({
    url: '/api/v1/user_profile',
    headers: {Authorization: `Bearer ${session?.user.token}`},
    dataFlag: true,
    cache: 'no-store',
  });

  return <UserFavorites goods={userData.favorites}/>
}