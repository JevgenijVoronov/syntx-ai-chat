<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import ChatWindow from '@/components/ChatWindow.vue'

const route = useRoute()
const chatId = computed(() => route.params.id as string)
</script>

<template>
  <ChatWindow :chat-id="chatId" />
</template>
