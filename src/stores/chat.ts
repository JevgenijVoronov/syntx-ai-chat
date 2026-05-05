import { ref } from 'vue'
import { defineStore } from 'pinia'
import { PersonOutline, PeopleOutline } from '@vicons/ionicons5'
import type { Component } from 'vue'

export interface Chat {
  id: string
  name: string
  icon: Component
}

export type MessageAuthor = 'user' | 'bot'

export interface Message {
  id: string
  chatId: string
  text: string
  author: MessageAuthor
  createdAt: Date
}

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([
    { id: '1', name: 'Elvis Presley', icon: PersonOutline },
    { id: '2', name: 'Michael Jackson', icon: PersonOutline },
    { id: '3', name: 'The Beatles', icon: PeopleOutline },
    { id: '4', name: 'Bob Marley', icon: PersonOutline },
    { id: '5', name: 'Eminem', icon: PersonOutline },
    { id: '6', name: 'Adele', icon: PersonOutline },
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
    chats.value.push({ id, name, icon: PersonOutline })
    messages.value[id] = []
    return id
  }

  return { chats, messages, getMessages, addMessage, addChat }
})
