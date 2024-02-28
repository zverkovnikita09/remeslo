import { RedirectType, redirect } from 'next/navigation'

export default function Shop() {
  redirect("/main", RedirectType.replace)
}