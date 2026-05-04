import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/chat'
import type { Ref } from 'vue'

const BOT_REPLIES = [
  'Понял, спасибо!',
  'Интересно, расскажи подробнее.',
  'Хорошо, я разберусь с этим.',
  'Окей, принято!',
  'Дай подумаю...',
  'Согласен с тобой.',
  'Не уверен, но попробую помочь.',
]

export function useMessages(chatId: Ref<string>) {
  const store = useChatStore()
  const isSending = ref(false)

  const messages = computed(() => store.getMessages(chatId.value))

  async function send(text: string) {
    if (!text.trim() || isSending.value) return

    isSending.value = true
    
    await new Promise((resolve) => setTimeout(resolve, 300))
    store.addMessage(chatId.value, text, 'user')

    isSending.value = false

    setTimeout(() => {
      const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)] ?? 'Окей!'
      store.addMessage(chatId.value, reply, 'bot')
    }, 1000 + Math.random() * 1000)
  }

  return { messages, isSending, send }
}
