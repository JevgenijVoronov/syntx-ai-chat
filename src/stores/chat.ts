import { ref } from 'vue'
import { defineStore } from 'pinia'
import { PersonOutline, PeopleOutline } from '@vicons/ionicons5'
import type { Component } from 'vue'

export interface Chat {
  id: string
  name: string
  icon: Component
  iconName?: string
}

export type MessageAuthor = 'user' | 'bot'

export interface Message {
  id: string
  chatId: string
  text: string
  author: MessageAuthor
  createdAt: Date
}

const ICON_MAP: Record<string, Component> = {
  PersonOutline,
  PeopleOutline,
}

function resolveIcon(iconName?: string): Component {
  return iconName && ICON_MAP[iconName] ? ICON_MAP[iconName] : PersonOutline
}

const persistSerializer = {
  serialize: (state: Record<string, unknown>) => {
    return JSON.stringify(state, (_key, value) => {
      if (value instanceof Date) return { __type: 'Date', iso: value.toISOString() }
      return value
    })
  },
  deserialize: (raw: string) => {
    const state = JSON.parse(raw, (_key, value) => {
      if (value && typeof value === 'object' && value.__type === 'Date') {
        return new Date(value.iso)
      }
      return value
    })

    if (Array.isArray(state.chats)) {
      state.chats = state.chats.map((chat: Chat) => ({
        ...chat,
        icon: resolveIcon(chat.iconName),
      }))
    }

    return state
  },
}

export const useChatStore = defineStore(
  'chat',
  () => {
    const chats = ref<Chat[]>([
      { id: '1', name: 'Elvis Presley', icon: PersonOutline, iconName: 'PersonOutline' },
      { id: '2', name: 'Michael Jackson', icon: PersonOutline, iconName: 'PersonOutline' },
      { id: '3', name: 'The Beatles', icon: PeopleOutline, iconName: 'PeopleOutline' },
      { id: '4', name: 'Bob Marley', icon: PersonOutline, iconName: 'PersonOutline' },
      { id: '5', name: 'Eminem', icon: PersonOutline, iconName: 'PersonOutline' },
      { id: '6', name: 'Adele', icon: PersonOutline, iconName: 'PersonOutline' },
    ])

    const messages = ref<Record<string, Message[]>>({
      '1': [
        {
          id: '1',
          chatId: '1',
          text: 'Привет! зацени мой трэк?',
          author: 'bot',
          createdAt: new Date(),
        },
      ],
      '2': [{ id: '2', chatId: '2', text: 'Что по вайбу', author: 'bot', createdAt: new Date() }],
      '3': [],
      '4': [{ id: '3', chatId: '4', text: 'Давай фитанём', author: 'bot', createdAt: new Date() }],
      '5': [],
      '6': [],
    })

    function getMessages(chatId: string): Message[] {
      return messages.value[chatId] ?? []
    }

    function addMessage(chatId: string, text: string, author: MessageAuthor = 'user') {
      if (!messages.value[chatId]) {
        messages.value[chatId] = []
      }
      messages.value[chatId].push({
        id: crypto.randomUUID(),
        chatId,
        text,
        author,
        createdAt: new Date(),
      })
    }

    function addChat(name: string): string {
      const id = crypto.randomUUID()
      chats.value.push({ id, name, icon: PersonOutline, iconName: 'PersonOutline' })
      messages.value[id] = []
      return id
    }

    return { chats, messages, getMessages, addMessage, addChat }
  },
  {
    persist: {
      key: 'syntx-chat-store',
      serializer: persistSerializer,
    },
  },
)
