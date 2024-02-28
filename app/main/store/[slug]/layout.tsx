
import { getData } from '@shared/lib/api';
import { Store } from '@shared/models/store.model';
import { ProfileLayout } from '@widgets/ProfileLayout'
import { type PropsWithChildren } from 'react'

export default async function Layout({ children, params: { slug } }: PropsWithChildren<{ params: { slug: string } }>) {
  const store = await getData<Store>({ url: `/api/v1/store/${slug}`, dataFlag: true });

  return (
    <main>
      <ProfileLayout profile={{ firstname: store?.title, lastname: '', avatar: store?.avatar }} registered_at={store?.user?.email_verified ?? ''}>
        {children}
      </ProfileLayout>
    </main>
  )
}