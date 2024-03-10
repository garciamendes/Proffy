import { ParsedQuery } from 'query-string'
import React from 'react'
import { useLocation } from 'react-router-dom'

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

export const getQueryParams = (params: URLSearchParams, filters: string[]) => {
  const queryParams: Record<string, string | null | undefined> = {}

  filters.forEach((filter) => {
    if (params.get(filter)) {
      queryParams[filter] = params.get(filter)
    }
  })

  return queryParams
}