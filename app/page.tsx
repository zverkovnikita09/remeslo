import { RedirectType, redirect } from 'next/navigation'

export default function Home() {
  redirect("/main", RedirectType.replace)
}
