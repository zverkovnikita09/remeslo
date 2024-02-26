import { authConfig } from "@providers/Auth";
import NextAuth from "next-auth/next"

const authHandler = NextAuth(authConfig);

export { authHandler as GET, authHandler as POST }