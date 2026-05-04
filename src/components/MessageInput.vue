<script setup lang="ts">
import { ref } from 'vue'
import { NInput, NButton, NIcon } from 'naive-ui'
import { SendOutline } from '@vicons/ionicons5'

const props = defineProps<{
  isSending: boolean
}>()

const emit = defineEmits<{
  send: [text: string]
}>()

const text = ref('')

function handleSend() {
  const trimmed = text.value.trim()
  if (!trimmed) return
  emit('send', trimmed)
  text.value = ''
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSend()
  }
}
</script>

<template>
  <div class="message-input">
    <NInput
      v-model:value="text"
      type="textarea"
      placeholder="Написать сообщение... (Enter — отправить)"
      :autosize="{ minRows: 1, maxRows: 4 }"
      :disabled="props.isSending"
      @keydown="handleKeydown"
    />
    <NButton
      type="primary"
      :disabled="!text.trim() || props.isSending"
      :loading="props.isSending"
      @click="handleSend"
    >
      <template #icon>
        <NIcon :component="SendOutline" />
      </template>
    </NButton>
  </div>
</template>

<style scoped>
.message-input {
  display: flex;
  align-items: flex-end;
  gap: 8px;
  padding: 12px 16px;
  border-top: 1px solid rgba(128, 128, 128, 0.2);
}

.message-input .n-input {
  flex: 1;
}
</style>
