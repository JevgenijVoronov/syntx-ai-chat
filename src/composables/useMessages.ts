import { ref, computed } from 'vue'
import { useChatStore } from '@/stores/chat'
import { sendMessageToGemini } from '@/services/gemini'
import type { Ref } from 'vue'

export function useMessages(chatId: Ref<string>) {
  const store = useChatStore()
  const isSending = ref(false)
  const error = ref<string | null>(null)

  const messages = computed(() => store.getMessages(chatId.value))

  const celebrityName = computed(
    () => store.chats.find((c) => c.id === chatId.value)?.name ?? '',
  )

  async function send(text: string) {
    if (!text.trim() || isSending.value) return

    isSending.value = true
    error.value = null

    store.addMessage(chatId.value, text, 'user')

    try {
      let historyRaw = messages.value
        .slice(-21, -1)
        .map((msg) => ({
          role: msg.author === 'user' ? ('user' as const) : ('model' as const),
          parts: msg.text,
        }))

      while (historyRaw.length > 0 && historyRaw[0]?.role !== 'user') {
        historyRaw = historyRaw.slice(1)
      }

      const history = historyRaw

      const reply = await sendMessageToGemini(celebrityName.value, text, history)
      store.addMessage(chatId.value, reply, 'bot')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ошибка при получении ответа'
      error.value = message
      store.addMessage(
        chatId.value,
        `⚠️ Ошибка: ${message}`,
        'bot',
      )
    } finally {
      isSending.value = false
    }
  }

  return { messages, isSending, error, send }
}
