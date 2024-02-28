import type { AuthOptions, User } from 'next-auth';
import VKProvider from 'next-auth/providers/vk';
import Credentials from 'next-auth/providers/credentials'
import { sendData } from '@shared/lib/api';

export const authConfig: AuthOptions = {
  providers: [
    /* VKProvider({
      clientId: process.env.VK_CLIENT_ID,
      clientSecret: process.env.VK_CLIENT_SECRET
    }) */
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Password",
          type: "password",
        }
      },
      async authorize(credentials) {
        const res = await sendData(credentials!, "api/v1/login")
        const dataJson = await res.json()

        if (res.ok) return dataJson.data;
        const error = dataJson.message || "Произошла ошибка при отправке данных"
        return { error }
      },
    })
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user }) {
      // @ts-ignore
      if (user?.error) {
        // @ts-ignore
        throw new Error(user?.error)
      }
      return true
    },
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token;
      return session
    },
  }
}