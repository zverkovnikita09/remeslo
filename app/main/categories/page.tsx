import { RedirectType, redirect } from 'next/navigation'

export default function Categories() {
  redirect("/main", RedirectType.replace)
}
