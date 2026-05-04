<script setup lang="ts">
import { NAvatar, NScrollbar, NText, NIcon } from 'naive-ui'
import { useRouter, useRoute } from 'vue-router'
import { useChatStore } from '@/stores/chat'

const store = useChatStore()
const router = useRouter()
const route = useRoute()

function selectChat(id: string) {
  router.push(`/chat/${id}`)
}

function isActive(id: string) {
  return route.params.id === id
}
</script>

<template>
  <NScrollbar>
    <div class="chat-list">
      <div
        v-for="chat in store.chats"
        :key="chat.id"
        class="chat-item"
        :class="{ 'chat-item--active': isActive(chat.id) }"
        @click="selectChat(chat.id)"
      >
        <NAvatar round size="medium">
          <NIcon :component="chat.icon" />
        </NAvatar>
        <NText class="chat-item__name">{{ chat.name }}</NText>
      </div>
    </div>
  </NScrollbar>
</template>

<style scoped>
.chat-list {
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.chat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.chat-item:hover {
  background: rgba(128, 128, 128, 0.1);
}

.chat-item--active {
  background: rgba(99, 226, 183, 0.15);
}

.chat-item__name {
  font-size: 14px;
  font-weight: 500;
}
</style>
