// src/main.js
import { createApp } from 'vue'
import { createStore } from 'vuex'
import { createRouter, createWebHistory } from 'vue-router'
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import App from './App.vue'

// Firebase configuration
const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: 'AIzaSyBOQiNs8u3sZzkj9yqKm7G7YCiGcwsWqBw',
  authDomain: 'ketelcup.firebaseapp.com',
  projectId: 'ketelcup',
  storageBucket: 'ketelcup.appspot.com',
  messagingSenderId: '91322207670',
  appId: '1:91322207670:web:ebcbfaf9dc645c2ee34517',
  measurementId: 'G-E762ESBR7Z',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)
const analytics = getAnalytics(firebaseApp)

// Vuex Store
const store = createStore({
  state: {
    user: null,
    games: [],
    leaderboard: [],
    isLoading: false,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setGames(state, games) {
      state.games = games
    },
    setLeaderboard(state, leaderboard) {
      state.leaderboard = leaderboard
    },
    setLoading(state, status) {
      state.isLoading = status
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      // Firebase login implementation
    },
    async register({ commit }, { email, password, username }) {
      // Firebase registration implementation
    },
    async updateProfile({ commit }, userData) {
      // Profile update implementation
    },
  },
})

// Router Configuration
const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/login',
    component: () => import('./views/Login.vue'),
  },
  {
    path: '/register',
    component: () => import('./views/Register.vue'),
  },
  {
    path: '/profile/:id',
    component: () => import('./views/Profile.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/game/new',
    component: () => import('./views/NewGame.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

export { firebaseApp }
