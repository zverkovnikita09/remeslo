/**
 * Доработать как расширение IGoods
 */

export interface SingleGoods {
  all_time_views: number
  description: string
  files: { path: string }[] | null
  id: string
  marks: number
  moderate: number
  overall_rating: number
  price: number
  price_old: number
  publish: number
  published_at: string
  store_id: string
  tags: TagType[]
  title: string
  views_today: number
}

export interface TagType {
  name: string
  slug: string
  image: string
  subcategories: []
}