export interface ICategory {
  name: string
  image: string
  slug: string
  id: string
  subcategories: ISubcategory[]
}

export interface ISubcategory extends Omit<ICategory, 'subcategories'> {
  children: ISubcategory[]
}