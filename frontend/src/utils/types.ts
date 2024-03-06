export interface IOption {
  value: string
  label: string
}

export type CHOICES_MATTERS_ENUM =
  'ART'
  | 'BIOLOGY'
  | 'SCIENCE'
  | 'PHYSICAL_EDUCATION'
  | 'PHYSICAL'
  | 'GEOGRAPHY'
  | 'HISTORY'
  | 'MATHEMATICS'
  | 'PORTUGUESE'
  | 'CHEMICAL'

export type CHOICE_DAY_WEEK_ENUM =
  'SECOND'
  | 'THIRD'
  | 'FOURTH'
  | 'FIFTH'
  | 'FRIDAY'

export type choiceMatter = Record<string, { key: string, text: string }>
export type choiceDayWeek = Record<string, { key: string, text: string }>