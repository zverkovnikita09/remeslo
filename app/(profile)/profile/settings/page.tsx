import { EditProfile } from "@entities/EditProfile/ui/EditProfile";
import { authConfig } from "@providers/Auth";
import { getData } from "@shared/lib/api";
import { User } from "@shared/models/user.model";
import { getServerSession } from "next-auth";

export default async function Settings() {
  const session = await getServerSession(authConfig);
  const userData = await getData<User>({
    url: '/api/v1/user_profile',
    headers: { Authorization: `Bearer ${session?.user.token}` },
    dataFlag: true,
    cache: 'no-store',
  });

  return <EditProfile user={userData} />
}