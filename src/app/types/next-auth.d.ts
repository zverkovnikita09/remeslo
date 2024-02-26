import { User } from "@shared/models/user.model"
import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user: {
      token?: string
      user?: User
    } & DefaultSession["user"]
  }
}