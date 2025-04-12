<template>
  <div class="flex min-h-screen bg-white dark:bg-gray-900">
    <!-- Left Section -->
    <div
      class="hidden md:flex w-1/2 items-center justify-center bg-gradient-to-b from-indigo-500 to-blue-500 text-white p-8">
      <div class="text-center">
        <h2 class="text-3xl font-bold mb-4">Welcome Back!</h2>
        <p class="mb-6">Access your files and manage your documents securely with our file management system.</p>
        <div class="text-6xl">📄</div>
      </div>
    </div>

    <!-- Right Section -->
    <div class="flex w-full md:w-1/2 items-center justify-center p-8">
      <div class="w-full max-w-md">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-2">Sign in to your account</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Enter your credentials to access your account</p>

        <form @submit.prevent="login">
          <div class="mb-4">
            <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input type="email" v-model="email" placeholder="name@example.com"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
          </div>

          <div class="mb-4">
            <div class="flex justify-between items-center">
              <label class="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <a href="#" class="text-sm text-blue-600 hover:underline">Forgot password?</a>
            </div>
            <input type="password" v-model="password" placeholder="••••••••"
              class="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required />
          </div>

          <div class="mb-6 flex items-center">
            <input type="checkbox" v-model="rememberMe" id="remember" class="mr-2" />
            <label for="remember" class="text-sm text-gray-700 dark:text-gray-300">Remember me</label>
          </div>

          <button type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition">
            Sign in
          </button>

          <p class="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            Don’t have an account?
            <a href="#" class="text-blue-600 hover:underline">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const login = () => {
  console.log('Email:', email.value)
  console.log('Password:', password.value)
  console.log('Remember Me:', rememberMe.value)
  // TODO: Integrate with auth logic
}
</script>