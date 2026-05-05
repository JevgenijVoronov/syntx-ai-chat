<script setup lang="ts">
import { NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
import ThemeToggle from '@/components/ThemeToggle.vue'
import ChatSidebar from '@/components/ChatSidebar.vue'
</script>

<template>
  <NLayout has-sider class="desktop-layout">
    <NLayoutSider :width="260" :native-scrollbar="false" bordered>
      <ChatSidebar />
    </NLayoutSider>
    <NLayoutContent
      class="desktop-layout__content"
      :content-style="{ overflow: 'hidden', display: 'flex', flexDirection: 'column', height: '100%' }"
    >
      <ThemeToggle />
      <RouterView />
    </NLayoutContent>
  </NLayout>
</template>

<style scoped>
.desktop-layout {
  height: 100vh;
}

.desktop-layout__content :deep(> *) {
  flex: 1;
  min-height: 0;
}
</style>
