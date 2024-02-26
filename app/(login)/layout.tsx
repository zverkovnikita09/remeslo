import { AuthLayout } from '@widgets/AuthLayout'
import loginImage from '@images/login_background.png'
import { type PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return (
    <main>
      <AuthLayout image={loginImage} imageAlt=''>
        {children}
      </AuthLayout>
    </main>
  )
}