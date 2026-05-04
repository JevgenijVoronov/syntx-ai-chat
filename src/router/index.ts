import { createRouter, createWebHistory } from 'vue-router'
import ChatView from '@/views/ChatView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/chat/1',
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: ChatView,
    },
  ],
})

export default router
