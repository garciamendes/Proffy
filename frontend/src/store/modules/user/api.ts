import { createApi } from '@reduxjs/toolkit/query/react'
import {
  IGetAllConnectionsResponse,
  IUserResponse,
} from './types'
import { baseQuery } from '../../query'

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: baseQuery,
  tagTypes: ['current-user', 'get-all-connections'],
  endpoints: (builder) => ({
    currentUser: builder.query<IUserResponse, void>({
      query: () => ({
        url: '/user/current-user',
        method: 'GET',
      }),
      providesTags: ['current-user']
    }),
    getAllConnections: builder.query<IGetAllConnectionsResponse, void>({
      query: () => ({
        url: '/user/get-all-connections',
        method: 'GET',
      }),
      providesTags: ['get-all-connections']
    })
  }),
})

export const {
  useCurrentUserQuery,
  useGetAllConnectionsQuery
} = userApi