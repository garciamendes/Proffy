export const isObjectEmpty = (data: object) => {
  if (!data)
    return false

  return Object.keys(data).length === 0
}


export const formatMaskPhone = (value: string) => {
  if (!value)
    return

  value = value.replace(/\D/g, '')
  value = value.replace(/(\d{2})(\d)/, "($1) $2")
  value = value.replace(/(\d)(\d{4})$/, "$1-$2")

  return value
}
