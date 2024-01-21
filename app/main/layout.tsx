import { type PropsWithChildren } from 'react'
import { Header } from '@widgets/Header'
import { Footer } from '@widgets/Footer'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}