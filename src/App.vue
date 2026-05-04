<script setup lang="ts">
import { NConfigProvider, NLayout, NLayoutSider, NLayoutContent } from 'naive-ui'
import { provideTheme } from '@/composables/useTheme'
import ThemeToggle from '@/components/ThemeToggle.vue'

const { theme } = provideTheme()
</script>

<template>
  <NConfigProvider :theme="theme">
    <NLayout has-sider style="height: 100vh">
      <NLayoutSider
        :width="260"
        :native-scrollbar="false"
        bordered
      >
        <ThemeToggle />
        <!-- ChatSidebar -->
      </NLayoutSider>

      <NLayoutContent :native-scrollbar="false">
        <RouterView />
      </NLayoutContent>
    </NLayout>
  </NConfigProvider>
</template>


