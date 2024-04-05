// import { useAuthenticatedFetch } from './useAuthenticatedFetch.js'
import { useMemo } from 'react'
import { useInfiniteQuery } from 'react-query'
import api from '../utils/axios'

export const useAppInfinityQuery = ({ url, fetchInit = {}, reactQueryOptions }) => {
  // const authenticatedFetch = useAuthenticatedFetch()
  const fetch = useMemo(() => {
    return async page => {
      const pageParam = new URLSearchParams({ page })
      const response = await api.get(`${url}&${pageParam}`, fetchInit)
      console.log('response: ', response);
      return response
    }
  }, [url, JSON.stringify(fetchInit)])


  return useInfiniteQuery(url, ({ pageParam = 1 }) => fetch(pageParam), {
    ...reactQueryOptions,
    refetchOnWindowFocus: false,
  })
}
