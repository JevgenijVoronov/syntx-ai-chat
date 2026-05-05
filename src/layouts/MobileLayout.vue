<script setup lang="ts">
import { ref, watch } from 'vue'
import { NLayout, NLayoutHeader } from 'naive-ui'
import { useRoute } from 'vue-router'
import ThemeToggle from '@/components/ThemeToggle.vue'
import ChatSidebar from '@/components/ChatSidebar.vue'

const route = useRoute()
const showSidebar = ref(true)

watch(() => route.params.id, () => {
  showSidebar.value = false
})

function openSidebar() {
  showSidebar.value = true
}
</script>

<template>
  <div class="mobile-layout">
    <!-- Sidebar panel -->
    <NLayout class="mobile-panel" :class="{ 'mobile-panel--visible': showSidebar }">
      <NLayoutHeader class="mobile-header" bordered>
        <span class="mobile-header__title">Чаты</span>
        <ThemeToggle />
      </NLayoutHeader>
      <ChatSidebar />
    </NLayout>

    <!-- Chat panel -->
    <NLayout class="mobile-panel" :class="{ 'mobile-panel--visible': !showSidebar }">
      <RouterView v-slot="{ Component }">
        <component :is="Component" @back="openSidebar" />
      </RouterView>
    </NLayout>
  </div>
</template>

<style scoped>
.mobile-layout {
  height: 100dvh;
  position: relative;
  overflow: hidden;
}

.mobile-panel {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform 0.3s ease;
}

.mobile-panel--visible {
  transform: translateX(0);
}

.mobile-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 16px;
  flex-shrink: 0;
}

.mobile-header__title {
  font-size: 18px;
  font-weight: 600;
}
</style>
