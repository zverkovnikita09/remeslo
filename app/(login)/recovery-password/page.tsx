import { RecoveryPassword } from "@features/RecoveryPassword"

interface RecoveryPasswordPageProps {
  searchParams: {
    pass_reset_token: string
    email: string
  }
}

export default function RecoveryPasswordPage({ searchParams: { pass_reset_token, email } }: RecoveryPasswordPageProps) {

  return (
    <RecoveryPassword tokenQuery={pass_reset_token} emailQuery={email} />
  )
}