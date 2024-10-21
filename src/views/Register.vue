<template>
  <div class="auth-container">
    <form @submit.prevent="handleRegister" class="auth-form">
      <h2>Register</h2>
      <div class="form-group">
        <label for="username">Username</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? 'Creating account...' : 'Register' }}
      </button>
      <p v-if="error" class="error">{{ error }}</p>
      <p>
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { registerUser } from '../firebase/auth'

export default {
  name: 'Register',
  setup() {
    const router = useRouter()
    const username = ref('')
    const email = ref('')
    const password = ref('')
    const error = ref('')
    const isLoading = ref(false)

    const handleRegister = async () => {
      try {
        isLoading.value = true
        await registerUser(email.value, password.value, username.value)
        router.push('/')
      } catch (err) {
        error.value = err.message
      } finally {
        isLoading.value = false
      }
    }

    return {
      username,
      email,
      password,
      error,
      isLoading,
      handleRegister,
    }
  },
}
</script>
