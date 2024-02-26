"use client"

import { SessionProvider as Provider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

export const SessionProvider = ({ children }: PropsWithChildren) => {
  return (
    <Provider>
      {children}
    </Provider>
  )
}