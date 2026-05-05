<script setup lang="ts">
import { ref } from 'vue'
import { NAvatar, NScrollbar, NText, NIcon, NButton } from 'naive-ui'
import { AddOutline } from '@vicons/ionicons5'
import { useRouter, useRoute } from 'vue-router'
import { useChatStore } from '@/stores/chat'
import NewChatModal from '@/components/NewChatModal.vue'

const store = useChatStore()
const router = useRouter()
const route = useRoute()

const showModal = ref(false)

function selectChat(id: string) {
  router.push(`/chat/${id}`)
}

function isActive(id: string) {
  return route.params.id === id
}
</script>

<template>
  <div class="sidebar">
    <div class="sidebar__header">
      <NText class="sidebar__title">Чаты</NText>
      <NButton text title="Новый чат" @click="showModal = true">
        <template #icon>
          <NIcon :component="AddOutline" size="20" />
        </template>
      </NButton>
    </div>

    <NScrollbar class="sidebar__list">
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

    <NewChatModal v-model:show="showModal" />
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.sidebar__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  flex-shrink: 0;
}

.sidebar__title {
  font-size: 16px;
  font-weight: 600;
}

.sidebar__list {
  flex: 1;
}

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
  min-width: 0;
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
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
