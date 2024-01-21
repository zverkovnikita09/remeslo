import { AuthLayout } from '@widgets/AuthLayout'
import { type PropsWithChildren } from 'react'
import regImage from '@images/registration_background.png'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main>
      <AuthLayout image={regImage} imageAlt=''>
        {children}
      </AuthLayout>
    </main>
  )
}