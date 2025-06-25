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
      rememberMe: rememberMe.value
    })
    setStorageToken(token)
    auth.setToken(token)
    auth.setUser(result)

    await nextTick()

    window.location.reload()
  } catch (_e: unknown) {
    const error: Error = _e as Error;
    message.value = error.message
  }
}
</script>

<template>
  <div class="container">
    <!-- Left Section -->
    <div class="left-section">
      <div class="left-content">
        <h2 class="heading">Welcome Back!</h2>
        <p class="description">
          Access your files and manage your documents securely with our file management system.
        </p>
        <div class="icon">📄</div>
      </div>
    </div>

    <!-- Right Section -->
    <div class="right-section">
      <div class="form-wrapper">
        <h2 class="form-heading">Sign in to your account</h2>
        <p class="form-subtext">Enter your credentials to access your account</p>
        <p v-if="message" class="error">{{ message }}</p>

        <form @submit.prevent="handleLogin">
          <div class="form-group">
            <label class="label">Username</label>
            <input type="text" v-model="username" placeholder="username" class="input" required />
          </div>

          <div class="form-group">
            <label class="label">Password</label>
            <input type="password" v-model="password" placeholder="••••••••" class="input" required />
          </div>

          <div class="form-remember">
            <input type="checkbox" v-model="rememberMe" id="remember" class="checkbox" />
            <label for="remember" class="remember-label">Remember me</label>
          </div>

          <button type="submit" class="submit-button">
            Sign in
          </button>

          <p class="footer-text">
            Don’t have an account?
            <a href="#" class="signup-link">Sign up</a>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  min-height: 100vh;
  background-color: white;
}

.left-section {
  display: none;
}

@media (min-width: 768px) {
  .left-section {
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: center;
    background: linear-gradient(to bottom, #6366f1, #3b82f6);
    color: white;
    padding: 2rem;
  }
}

.left-content {
  max-width: 36rem;
  text-align: center;
}

.heading {
  font-size: 2.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.description {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
}

.icon {
  font-size: 3.75rem;
}

.right-section {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

@media (min-width: 768px) {
  .right-section {
    width: 50%;
  }
}

.form-wrapper {
  width: 100%;
  max-width: 28rem;
}

.form-heading {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
}

.form-subtext {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.error {
  font-size: 0.875rem;
  color: #ef4444;
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1rem;
}

.label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.input {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  background-color: white;
  font-size: 0.875rem;
  color: #1f2937;
  outline: none;
}

.input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.form-remember {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkbox {
  margin-right: 0.5rem;
}

.remember-label {
  font-size: 0.875rem;
  color: #374151;
}

.submit-button {
  width: 100%;
  background-color: white;
  border: 1px solid #3b82f6;
  color: #3b82f6;
  font-weight: 600;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.3s;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #3b82f6;
  color: white;
}

.footer-text {
  margin-top: 1rem;
  font-size: 0.875rem;
  text-align: center;
  color: #4b5563;
}

.signup-link {
  color: #2563eb;
  text-decoration: underline;
  margin-left: 0.25rem;
}
</style>
