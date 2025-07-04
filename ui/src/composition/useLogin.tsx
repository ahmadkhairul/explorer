import { ref, nextTick } from 'vue'
import type { Ref } from 'vue'
import { login } from '@/services'
import { setToken as setStorageToken } from '@/utils/storage'
import { useAuthStore } from '@/stores/auth'

export function useLoginForm() {
  const auth = useAuthStore()

  const username: Ref<string> = ref('')
  const password: Ref<string> = ref('')
  const rememberMe: Ref<boolean> = ref(false)
  const message: Ref<string> = ref('')

  const handleLogin = async () => {
    try {
      const { token, ...result } = await login({
        username: username.value,
        password: password.value,
        rememberMe: rememberMe.value,
      })

      setStorageToken(token)
      auth.setToken(token)
      auth.setUser(result)

      await nextTick()
      window.location.reload()
    } catch (_e: unknown) {
      const error: Error = _e as Error
      message.value = error.message
    }
  }

  return {
    username,
    password,
    rememberMe,
    message,
    handleLogin,
  }
}
