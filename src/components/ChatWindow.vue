<script setup lang="ts">
import { ref, watch, nextTick, computed, toRef, onMounted } from 'vue'
import { NEmpty } from 'naive-ui'
import { useChatStore } from '@/stores/chat'
import { useMessages } from '@/composables/useMessages'
import MessageItem from '@/components/MessageItem.vue'
import MessageInput from '@/components/MessageInput.vue'

const props = defineProps<{
  chatId: string
}>()

const store = useChatStore()
const chatName = computed(() => store.chats.find((c) => c.id === props.chatId)?.name ?? '')

const { messages, isSending, send } = useMessages(toRef(props, 'chatId'))

const messagesRef = ref<HTMLDivElement | null>(null)

async function scrollToBottom() {
  await nextTick()
  if (messagesRef.value) {
    messagesRef.value.scrollTop = messagesRef.value.scrollHeight
  }
}

onMounted(scrollToBottom)
watch(messages, scrollToBottom, { deep: true })
</script>

<template>
  <div class="chat-window">
    <div class="chat-window__header">
      <span class="chat-window__title">{{ chatName }}</span>
    </div>

    <div ref="messagesRef" class="chat-window__messages">
      <div class="chat-window__messages-inner">
        <NEmpty v-if="messages.length === 0" description="Нет сообщений" />
        <MessageItem
          v-for="message in messages"
          :key="message.id"
          :message="message"
        />
      </div>
    </div>

    <MessageInput :is-sending="isSending" @send="send" />
  </div>
</template>

<style scoped>
.chat-window {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chat-window__header {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(128, 128, 128, 0.2);
  flex-shrink: 0;
}

.chat-window__title {
  font-size: 16px;
  font-weight: 600;
}

.chat-window__messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.chat-window__messages-inner {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;
}
</style>
