<template>
  <div class="flex min-h-screen bg-white">
    <!-- Left Section -->
    <div
      class="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-b from-indigo-500 to-blue-500 text-white p-8">
      <div class="max-w-xl text-center">
        <h2 class="text-4xl font-bold mb-4">Welcome Back!</h2>
        <p class="mb-6 text-2xl">Access your files and manage your documents securely with our file management system.
        </p>
        <div class="text-6xl">📄</div>
      </div>
    </div>

    <!-- Right Section -->
    <div class="flex w-full md:w-1/2 items-center justify-center p-8">
      <div class="w-full max-w-md">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Sign in to your account</h2>
        <p class="text-sm text-gray-500 mb-6">Enter your credentials to access your account</p>
        <p v-if="message" class="text-sm text-red-500 mb-6">{{ message }}</p>
        <form @submit.prevent="" v-on:submit="handleLogin">
          <div class="mb-4">
            <label class="block mb-1 text-sm font-medium text-gray-700">Username</label>
            <input type="text" v-model="username" placeholder="username"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
          </div>

          <div class="mb-4">
            <div class="flex justify-between items-center">
              <label class="block mb-1 text-sm font-medium text-gray-700">Password</label>
            </div>
            <input type="password" v-model="password" placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
          </div>

          <div class="mb-6 flex items-center">
            <input type="checkbox" v-model="rememberMe" id="remember" class="mr-2" />
            <label for="remember" class="text-sm text-gray-700">Remember me</label>
          </div>

          <button type="submit"
            class="w-full border-1 border-solid bg-white hover:bg-blue-700 text-blue-700 hover:text-white font-semibold py-2 rounded-lg transition">
            Sign in
          </button>

          <p class="mt-4 text-sm text-center text-gray-600">
            Don’t have an account?
            <a href="#" class="text-blue-600 hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'
import { login } from '@/services'
import { setToken as setStorageToken } from '@/utils/storage'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const username = ref('')
const password = ref('')
const rememberMe = ref(false)
const message = ref('')

const handleLogin = async () => {
  try {
    const { token, ...result } = await login({
      username: username.value,
      password: password.value,
      rememberMe: rememberMe.value,
    });
    setStorageToken(token)
    auth.setToken(token)
    auth.setUser(result)

    await nextTick();

    window.location.reload()
  } catch (error: { message: string }) {
    message.value = error.message
  }
}
</script>