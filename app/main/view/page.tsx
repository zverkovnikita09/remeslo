import { RedirectType, redirect } from 'next/navigation'

export default function View() {
  redirect("/main", RedirectType.replace)
}
