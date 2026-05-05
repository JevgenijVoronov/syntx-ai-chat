<script setup lang="ts">
import { NConfigProvider, NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
import { provideTheme } from '@/composables/useTheme'
import ThemeToggle from '@/components/ThemeToggle.vue'
import ChatSidebar from '@/components/ChatSidebar.vue'

const { theme } = provideTheme()
</script>

<template>
  <NConfigProvider :theme="theme">
    <NLayout has-sider class="app-layout">
      <NLayoutSider
        :width="260"
        :native-scrollbar="false"
        bordered
      >

        <ChatSidebar />
      </NLayoutSider>

      <NLayoutContent class="app-content">
        <ThemeToggle />
        <RouterView />
      </NLayoutContent>
    </NLayout>
  </NConfigProvider>
</template>

<style scoped>
.app-layout {
  height: 100vh;
}

.app-content {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* RouterView рендерит обёртку — пробрасываем высоту */
.app-content :deep(> *) {
  flex: 1;
  min-height: 0;
}
</style>
