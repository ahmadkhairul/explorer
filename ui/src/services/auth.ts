import fetch from '@/utils/fetch'
import { getToken } from '@/utils/storage'

const API_BASE_URL = 'http://localhost:3000/api/v1'

const config = {
  headers: { Authorization: `Bearer ${getToken()}` }
}

export const login = async (params: {
  username: string
  password: string
  rememberMe: boolean
}) => {
  const response = await fetch.post(`${API_BASE_URL}/login`, params)
  return response.data
}

export const auth = async () => {
  const response = await fetch.get(`${API_BASE_URL}/auth`, { ...config })
  return response.data
}
