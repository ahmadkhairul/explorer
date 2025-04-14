import { defineStore } from 'pinia'
import { auth } from '@/services'
import { clearStorages, getToken, setToken } from '@/utils/storage';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: '',
    user: null as null | { id: number; name: string; role: string }
  }),
  actions: {
    setToken(token: string) {
      this.token = token
      setToken(token)
    },
    setUser(userData: { id: number; name: string; role: string }) {
      this.user = userData
    },
    async initialize() {
      const token = getToken();
      if (token) {
        this.token = token
        try {
          const data = await auth() 
          this.user = data
        } catch (err) {
          this.token = ''
          this.user = null
          clearStorages()
        }
      }
    },
    logout() {
      this.token = ''
      this.user = null
      clearStorages()
    }
  }
})
