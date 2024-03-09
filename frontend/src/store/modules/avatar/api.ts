import { createApi } from '@reduxjs/toolkit/query/react'
import { axiosBaseQuery } from '../../query'

export const avatarApi = createApi({
  reducerPath: 'avatar',
  baseQuery: axiosBaseQuery,
  tagTypes: ['current-user-avatar'],
  endpoints: (builder) => ({
    getAvatar: builder.query<any, void>({
      query: () => ({
        url: '/user/current-user/avatar',
        method: 'GET',
      }),
      providesTags: ['current-user-avatar']
    }),
  }),
})

export const {
  useGetAvatarQuery
} = avatarApi