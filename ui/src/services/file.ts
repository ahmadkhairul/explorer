import fetch from '@/utils/fetch'
import { getToken } from '@/utils/storage'

const API_BASE_URL = 'http://localhost:3000/api/v1'

const config = {
  headers: { Authorization: `Bearer ${getToken()}` }
}

export const getFiles = async (
  id: number | undefined,
  params: {
    name?: string
    type?: string
    all?: boolean
  }
) => {
  const response = await fetch.get(`${API_BASE_URL}/files${id ? `/${id}` : ''}`, { params, ...config })
  return response.data
}

interface UpsertFileParams {
  name?: string
  file?: File
  parent_id?: number
}

export const upsertFile = async (params: UpsertFileParams): Promise<any> => {
  const formData = new FormData()

  if (params.name) formData.append('name', params.name)
  if (params.file) formData.append('file', params.file)
  if (params.parent_id !== undefined) formData.append('parent_id', String(params.parent_id))

  const response = await fetch.post(`${API_BASE_URL}/files`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      'Content-Type': 'multipart/form-data'
    }
  })

  return response.data
}

export const updateFile = async (
  id: number,
  params: {
    name: string
  }
) => {
  const response = await fetch.put(`${API_BASE_URL}/files/${id}`, params, { ...config })
  return response.data
}

export const destroyFile = async (id: number) => {
  const response = await fetch.delete(`${API_BASE_URL}/files/${id}`, { ...config })
  return response.data
}
