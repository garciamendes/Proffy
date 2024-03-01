export interface IUserProps {
  id: string
  fullname: string
  email: string
  whatsapp: string
  bio: string
  avatar?: string | null
  password?: string
  valueByhours?: number
  matter: any
  created?: Date | null
  modified?: Date | null
}

export class User {
  private props: IUserProps

  constructor(props: IUserProps) {}
}