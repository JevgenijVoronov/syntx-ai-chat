<script setup lang="ts">
import { NText } from 'naive-ui'
import type { Message } from '@/stores/chat'

const props = defineProps<{
  message: Message
}>()

function formatTime(date: Date): string {
  return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
}
</script>

<template>
  <div class="message" :class="`message--${props.message.author}`">
    <div class="message__bubble">
      <NText>{{ props.message.text }}</NText>
      <NText class="message__time" depth="3">
        {{ formatTime(props.message.createdAt) }}
      </NText>
    </div>
  </div>
</template>

<style scoped>
.message {
  display: flex;
  margin-bottom: 8px;
}

.message--user {
  justify-content: flex-end;
}

.message--bot {
  justify-content: flex-start;
}

.message__bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message--user .message__bubble {
  background: #63e2b7;
  color: #000;
  border-bottom-right-radius: 4px;
}

.message--bot .message__bubble {
  background: rgba(128, 128, 128, 0.15);
  border-bottom-left-radius: 4px;
}

.message__time {
  font-size: 11px;
  align-self: flex-end;
}
</style>
