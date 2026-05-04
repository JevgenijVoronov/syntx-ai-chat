import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  PersonOutline,
  PeopleOutline,
  HelpCircleOutline,
  MegaphoneOutline,
  ChatbubbleOutline,
} from '@vicons/ionicons5'
import type { Component } from 'vue'

export interface Chat {
  id:   string
  name: string
  icon: Component
}

export const useChatStore = defineStore('chat', () => {
  const chats = ref<Chat[]>([
    { id: '1', name: 'Elvis Presley',   icon: PersonOutline },
    { id: '2', name: 'Michael Jackson', icon: PersonOutline },
    { id: '3', name: 'The Beatles',     icon: PeopleOutline },
    { id: '4', name: 'Bob Marley',      icon: PersonOutline },
    { id: '5', name: 'Eminem',          icon: PersonOutline },
    { id: '6', name: 'Adele',           icon: PersonOutline },
  ])

  return { chats }
})
