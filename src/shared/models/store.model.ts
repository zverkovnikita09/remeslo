import { User } from "./user.model"

export interface Store {
  address: string
  avatar: { path: string }[] | null
  banner: { path: string }[] | null
  description: string
  id: string
  moderate: number
  phone_number: string
  published_at: string
  title: string
  user: User
}