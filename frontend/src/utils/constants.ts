import { IOption, choiceDayWeek, choiceMatter } from "./types"

export const ART = 'ART'
export const BIOLOGY = 'BIOLOGY'
export const SCIENCE = 'SCIENCE'
export const PHYSICAL_EDUCATION = 'PHYSICAL_EDUCATION'
export const PHYSICAL = 'PHYSICAL'
export const GEOGRAPHY = 'GEOGRAPHY'
export const HISTORY = 'HISTORY'
export const MATHEMATICS = 'MATHEMATICS'
export const PORTUGUESE = 'PORTUGUESE'
export const CHEMICAL = 'CHEMICAL'

export const CHOICES_MATTERS: choiceMatter = {
  [ART]: {
    key: ART,
    text: 'Artes'
  },
  [BIOLOGY]: {
    key: BIOLOGY,
    text: 'Biologia'
  },
  [SCIENCE]: {
    key: SCIENCE,
    text: 'Ciências'
  },
  [PHYSICAL_EDUCATION]: {
    key: PHYSICAL_EDUCATION,
    text: 'Educação Física'
  },
  [PHYSICAL]: {
    key: PHYSICAL,
    text: 'Física'
  },
  [GEOGRAPHY]: {
    key: GEOGRAPHY,
    text: 'Geografia'
  },
  [HISTORY]: {
    key: HISTORY,
    text: 'História'
  },
  [MATHEMATICS]: {
    key: MATHEMATICS,
    text: 'Matemática'
  },
  [PORTUGUESE]: {
    key: PORTUGUESE,
    text: 'Português'
  },
  [CHEMICAL]: {
    key: CHEMICAL,
    text: 'Química'
  },
}

export const MATTERS_OPTIONS: IOption[] = Object.values(CHOICES_MATTERS).map(row => {
  return { value: row.key, label: row.text }
})

export const SECOND = 'SECOND'
export const THIRD = 'THIRD'
export const FOURTH = 'FOURTH'
export const FIFTH = 'FIFTH'
export const FRIDAY = 'FRIDAY'

const sufix = '-feira'
export const CHOICE_DAY_WEEK: choiceDayWeek = {
  [SECOND]: {
    key: SECOND,
    text: 'Segunda',
    textWithSufix: 'Segunda'.concat(sufix)
  },
  [THIRD]: {
    key: THIRD,
    text: 'Terça',
    textWithSufix: 'Terça'.concat(sufix)
  },
  [FOURTH]: {
    key: FOURTH,
    text: 'Quarta',
    textWithSufix: 'Quarta'.concat(sufix)
  },
  [FIFTH]: {
    key: FIFTH,
    text: 'Quinta',
    textWithSufix: 'Quinta'.concat(sufix)
  },
  [FRIDAY]: {
    key: FRIDAY,
    text: 'Sexta',
    textWithSufix: 'Sexta'.concat(sufix)
  },
}

export const DAY_WEEK_OPTIONS: IOption[] = Object.values(CHOICE_DAY_WEEK).map(row => {
  return { value: row.key, label: row.textWithSufix }
})

export const FORMAT_REF = 'YYYY-MM-DDTHH:mm:ss.SSSSZ'