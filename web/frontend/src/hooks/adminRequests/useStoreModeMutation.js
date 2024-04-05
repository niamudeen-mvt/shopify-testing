import { useMutation, useQueryClient } from 'react-query'
import { useAuthContext } from '../../AdminApp.jsx'

export const useStoreModeMutation = () => {
  const queryClient = useQueryClient()
  const { accessToken, removeToken } = useAuthContext()

  const mutate = async data => {
    if (!accessToken) {
      return
    }

    const response = await fetch('/admin/changeMode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
      body: JSON.stringify(data),
    })

    if (!response.ok && response.status === 401) {
      removeToken()
    }

    return await response.json()
  }

  return useMutation(mutate, {
    onSuccess: async response => {
      await queryClient.invalidateQueries('StoreList')
    },
  })
}
