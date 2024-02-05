export interface ProfileInfo {
  firstname: string
  lastname: string
  avatar: string | null
}

export interface User {
  email?: string
  email_verified?: string
  id?: string
  profile?: ProfileInfo
}