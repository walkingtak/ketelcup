import { createStore } from 'vuex'
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../firebase/auth'

export default createStore({
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
    async fetchLeaderboard({ commit }) {
      commit('setLoading', true)
      try {
        const q = query(
          collection(db, 'games'),
          orderBy('score', 'desc'),
          limit(10),
        )
        const snapshot = await getDocs(q)
        const leaderboard = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }))
        commit('setLeaderboard', leaderboard)
      } catch (error) {
        console.error('Error fetching leaderboard:', error)
      }
      commit('setLoading', false)
    },

    async updateProfile({ commit }, { userId, userData }) {
      try {
        await updateDoc(doc(db, 'users', userId), userData)
      } catch (error) {
        console.error('Error updating profile:', error)
        throw error
      }
    },
  },
})
