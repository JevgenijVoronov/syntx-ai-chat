<script setup lang="ts">
import { NConfigProvider } from 'naive-ui'
import { provideTheme } from '@/composables/useTheme'
import DesktopLayout from '@/layouts/DesktopLayout.vue'
import MobileLayout from '@/layouts/MobileLayout.vue'

const { theme } = provideTheme()
</script>

<template>
  <NConfigProvider :theme="theme">
    <DesktopLayout class="layout--desktop" />
    <MobileLayout class="layout--mobile" />
  </NConfigProvider>
</template>

<style scoped>
.layout--mobile {
  display: none;
}

@media (max-width: 640px) {
  .layout--desktop {
    display: none;
  }

  .layout--mobile {
    display: block;
  }
}
</style>
