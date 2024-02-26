import { type PropsWithChildren } from 'react'
import { Header } from '@widgets/Header'
import { Footer } from '@widgets/Footer'
import { getServerSession } from 'next-auth/next'
import { authConfig } from '@providers/Auth'

export default async function Layout({ children }: PropsWithChildren) {
  const session = await getServerSession(authConfig)
  return (
    <>
      <Header isAuthed={!!session?.user} />
      <main>{children}</main>
      <Footer />
    </>
  )
}