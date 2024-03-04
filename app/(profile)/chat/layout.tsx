import { type PropsWithChildren } from 'react'
import { ChatLayout } from '@widgets/ChatLayout'

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <ChatLayout>{children}</ChatLayout>
  )
}