import { ref, computed, provide, inject } from 'vue'
import { darkTheme } from 'naive-ui'
import type { InjectionKey, Ref, ComputedRef } from 'vue'
import type { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'

interface ThemeContext {
  isDark: Ref<boolean>
  theme: ComputedRef<BuiltInGlobalTheme | null>
  toggleTheme: () => void
}

export const themeKey = Symbol('theme') as InjectionKey<ThemeContext>

export function provideTheme() {
  const isDark = ref(true)
  const theme = computed(() => (isDark.value ? darkTheme : null))

  function toggleTheme() {
    isDark.value = !isDark.value
  }

  provide(themeKey, { isDark, theme, toggleTheme })

  return { isDark, theme, toggleTheme }
}

export function useTheme() {
  const context = inject(themeKey)
  if (!context) throw new Error('useTheme() must be used inside App.vue')
  return context
}
