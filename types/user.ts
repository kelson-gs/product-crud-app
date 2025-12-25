
export interface RegisterUser {
  name: string
  email: string
  password: string
}

export type ErrorsRegister = {
  name?: string
  email?: string
  password?: string
}
