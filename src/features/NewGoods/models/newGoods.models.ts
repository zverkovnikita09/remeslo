export interface NewGoodsForm {
  files: FileList | null
  title: string
  description: string
  tag_id: string
  price: number
  price_old?: number
}