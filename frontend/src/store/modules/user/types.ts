import { CHOICES_MATTERS_ENUM, CHOICE_DAY_WEEK_ENUM } from "../../../utils/types"

export interface IDayWeek {
  id: string
  dayWeek: string
  from: Date
  to: Date
}

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
  dayWeek: IDayWeek[]
  isEducator: boolean
}

export interface IGetAllConnectionsResponse {
  count: number
}

export type IGetAllEducatorsResponse = IGetAllConnectionsResponse

export interface IDayWeekSaveProfile {
  id: string
  dayWeek: CHOICE_DAY_WEEK_ENUM
  from: Date
  to: Date
  userId: string
}

export interface IDataDayWeek {
  creates: Array<Omit<IDayWeekSaveProfile, 'id'>>
  updates: Array<IDayWeekSaveProfile>
  deletes: Array<string>
}

export interface ISaveProfileRequest {
  id: string
  bio: string
  dayWeek: IDataDayWeek
  email: string
  fullname: string
  matter: CHOICES_MATTERS_ENUM
  valueByhours: string
  whatsapp: string
  isEducator?: boolean
}

export interface IFiltersListEducators {
  matter?: string
  dayWeek?: string
  valueByhours?: string
}


export interface IListEducatorsRequest {
  filters?: IFiltersListEducators
}

export interface IListEducatorsResponse {
  listEducators: IUserResponse[]
}