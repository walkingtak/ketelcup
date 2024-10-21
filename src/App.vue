<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="nav-brand">Racing Scores</router-link>
      <div class="nav-links">
        <template v-if="!user">
          <router-link to="/login">Login</router-link>
          <router-link to="/register">Register</router-link>
        </template>
        <template v-else>
          <router-link :to="'/profile/' + user.uid">Profile</router-link>
          <button @click="handleLogout" class="nav-button">Logout</button>
        </template>
      </div>
    </nav>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
// import { logoutUser } from './firebase/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'App',
  setup() {
    const store = useStore()
    const router = useRouter()
    const user = computed(() => store.state.user)

    const handleLogout = async () => {
      try {
        await logoutUser()
        store.commit('setUser', null)
        router.push('/login')
      } catch (error) {
        console.error('Logout error:', error)
      }
    }

    return {
      user,
      handleLogout,
    }
  },
}
</script>

<style>
.navbar {
  background-color: var(--primary-color);
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-links a {
  color: white;
  text-decoration: none;
}

.nav-button {
  background: none;
  border: 1px solid white;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}
</style>
