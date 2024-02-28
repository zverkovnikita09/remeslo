import { authConfig } from '@providers/Auth';
import { getData } from '@shared/lib/api';
import { User } from '@shared/models/user.model';
import { ProfileLayout } from '@widgets/ProfileLayout';
import { getServerSession } from 'next-auth';
import { type PropsWithChildren } from 'react'

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(authConfig);
  const userData = await getData<User>({ url: '/api/v1/user_profile', headers: { Authorization: `Bearer ${session?.user?.token}` }, dataFlag: true });

  return (
    <main>
      <ProfileLayout profile={userData.profile} registered_at={userData.email_verified}>
        {children}
      </ProfileLayout>
    </main>
  )
}