<template>
  <div class="profile">
    <div class="profile-header">
      <div class="profile-picture">
        <img
          :src="profileData.profilePicture || '/default-avatar.png'"
          alt="Profile Picture"
        />
        <input type="file" @change="uploadPicture" accept="image/*" />
      </div>

      <div class="profile-info">
        <h2>{{ profileData.username }}</h2>
        <p>Member since: {{ formatDate(profileData.createdAt) }}</p>
      </div>
    </div>

    <div class="profile-stats">
      <h3>Statistics</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">Total Games</span>
          <span class="stat-value">{{ profileData.stats.totalGames }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Best Score</span>
          <span class="stat-value">{{ profileData.stats.bestScore }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Average Score</span>
          <span class="stat-value">{{ profileData.stats.averageScore }}</span>
        </div>
      </div>
    </div>

    <div class="recent-games">
      <h3>Recent Games</h3>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Track</th>
            <th>Vehicle</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="game in userGames" :key="game.id">
            <td>{{ formatDate(game.date) }}</td>
            <td>{{ game.trackName }}</td>
            <td>{{ game.vehicle }}</td>
            <td>{{ game.score }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

export default {
  name: 'Profile',
  setup() {
    const store = useStore()
    const route = useRoute()
    const profileData = ref({
      username: '',
      profilePicture: '',
      createdAt: Date.now(),
      stats: {
        totalGames: 0,
        bestScore: 0,
        averageScore: 0,
      },
    })
    const userGames = ref([])

    onMounted(async () => {
      // Fetch user profile and games data
    })

    const uploadPicture = async event => {
      // Implement profile picture upload
    }

    const formatDate = date => {
      return new Date(date).toLocaleDateString()
    }

    return {
      profileData,
      userGames,
      uploadPicture,
      formatDate,
    }
  },
}
</script>
