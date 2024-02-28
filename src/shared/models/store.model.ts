import { Goods } from "@entities/GoodsGrid"
import { User } from "./user.model"

export interface Store {
  address: string
  avatar: string | null
  baner: string | null
  description: string
  id: string
  goods: Goods[]
  moderate: number
  phone_number: string
  published_at: string
  title: string
  user: User
}