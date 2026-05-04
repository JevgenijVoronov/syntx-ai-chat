<script setup lang="ts">
import { NButton, NIcon } from 'naive-ui'
import { SunnyOutline, MoonOutline } from '@vicons/ionicons5'
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <div class="theme-toggle">
    <NButton text @click="toggleTheme">
      <template #icon>
        <NIcon :component="isDark ? SunnyOutline : MoonOutline" />
      </template>
    </NButton>
  </div>
</template>

<style scoped>
.theme-toggle {
  display: flex;
  justify-content: flex-end;
  padding: 12px;
}
</style>
