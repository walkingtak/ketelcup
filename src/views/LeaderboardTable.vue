<template>
  <div class="leaderboard-table">
    <h3>Top Scores</h3>
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Track</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(game, index) in games" :key="game.id">
          <td>{{ index + 1 }}</td>
          <td>{{ game.username }}</td>
          <td>{{ game.trackName }}</td>
          <td>{{ game.score }}</td>
          <td>{{ formatDate(game.date) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'LeaderboardTable',
  props: {
    games: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const formatDate = date => {
      return new Date(date).toLocaleDateString()
    }

    return {
      formatDate,
    }
  },
}
</script>
