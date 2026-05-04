<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const chatId = route.params.id as string
</script>

<template>
  <div class="chat-view">
    <p>Chat {{ chatId }}</p>
    <!-- ChatWindow  -->
  </div>
</template>

<style scoped>
.chat-view {
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
