import { useQuery } from 'react-query'
import { useAuthContext } from '../../AdminApp.jsx'

export const useStoreListQuery = () => {
  const { accessToken, removeToken } = useAuthContext()

  const getStoreList = async () => {
    const response = await fetch('/admin/storeList', {
      headers: {
        Authorization: accessToken,
      },
    })

    if (!response.ok && response.status === 401) {
      removeToken()
    }

    return response.json()
  }

  return useQuery('StoreList', getStoreList, {
    refetchOnWindowFocus: false,
    enabled: !!accessToken,
    select: data => {
      return data?.data || []
    },
  })
}
