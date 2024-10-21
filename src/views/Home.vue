<template>
  <div class="home">
    <h1>Racing Game Leaderboard</h1>
    <div class="leaderboard">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Player</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(score, index) in leaderboard" :key="score.id">
            <td>{{ index + 1 }}</td>
            <td>{{ score.username }}</td>
            <td>{{ score.score }}</td>
            <td>{{ formatDate(score.date) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="user" class="new-game">
      <router-link to="/game/new" class="button">Record New Score</router-link>
    </div>
  </div>
</template>

<script>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'Home',
  setup() {
    const store = useStore()
    const leaderboard = computed(() => store.state.leaderboard)
    const user = computed(() => store.state.user)

    onMounted(() => {
      // Fetch leaderboard data
    })

    const formatDate = date => {
      return new Date(date).toLocaleDateString()
    }

    return {
      leaderboard,
      user,
      formatDate,
    }
  },
}
</script>
