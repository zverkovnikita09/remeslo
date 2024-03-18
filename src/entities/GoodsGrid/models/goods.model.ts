export interface Goods {
  files?: { path: string }[]
  title: string
  price: string
  published_at: string
  id: string
  overall_rating: number
  isFavorite?: boolean
}