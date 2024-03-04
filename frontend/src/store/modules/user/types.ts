export interface IUserResponse {
  id: string
  fullname: string
  email: string
  whatsapp: string | null
  bio: string | null
  avatar: string | null
  valueByhours: number
  matter: string
  modified: Date
  created: Date
}

export interface IGetAllConnectionsResponse {
  count: number
}