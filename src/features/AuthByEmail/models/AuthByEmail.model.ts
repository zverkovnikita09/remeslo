export interface EmailAuth {
  email: string
  password: string
}

export interface ResponseUserData {
  data: {
    token: string
    /* user: IUser */
  }
}