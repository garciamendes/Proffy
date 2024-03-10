import { createApi } from '@reduxjs/toolkit/query/react'
import {
  IGetAllConnectionsResponse,
  IGetAllEducatorsResponse,
  IListEducatorsRequest,
  IListEducatorsResponse,
  ISaveProfileRequest,
  IUserResponse,
} from './types'
import { baseQuery } from '../../query'

export const userApi = createApi({
  reducerPath: 'user',
  baseQuery: baseQuery,
  tagTypes: [
    'current-user',
    'get-all-connections',
    'current-user-avatar',
    'all-educators',
    'list-educators'
  ],
  endpoints: (builder) => ({
    currentUser: builder.query<IUserResponse, void>({
      query: () => ({
        url: '/user/current-user',
        method: 'GET',
      }),
      providesTags: ['current-user']
    }),
    getAvatar: builder.query<any, void>({
      query: () => ({
        url: '/user/current-user/avatar',
        method: 'GET',
      }),
      providesTags: ['current-user-avatar']
    }),
    getAllConnections: builder.query<IGetAllConnectionsResponse, void>({
      query: () => ({
        url: '/user/get-all-connections',
        method: 'GET',
      }),
      providesTags: ['get-all-connections']
    }),
    getAllEducators: builder.query<IGetAllEducatorsResponse, void>({
      query: () => ({
        url: '/user/all-educators',
        method: 'GET',
      }),
      providesTags: ['all-educators']
    }),
    saveProfile: builder.mutation<void, ISaveProfileRequest>({
      query: (data) => ({
        url: '/user/profile',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['current-user']
    }),
    listEducators: builder.query<IListEducatorsResponse, IListEducatorsRequest>({
      query: ({ filters }) => ({
        url: '/user/list-educators',
        method: 'GET',
        params: filters
      }),
      providesTags: ['list-educators']
    }),
  }),
})

export const {
  useCurrentUserQuery,
  useGetAllConnectionsQuery,
  useSaveProfileMutation,
  useGetAllEducatorsQuery,
  useListEducatorsQuery
} = userApi