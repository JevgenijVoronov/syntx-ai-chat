<script setup lang="ts">
import { ref, watch } from 'vue'
import { NModal, NCard, NForm, NFormItem, NInput, NButton } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useChatStore } from '@/stores/chat'

const props = defineProps<{
  show: boolean
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
}>()

const store = useChatStore()
const router = useRouter()

const newChatName = ref('')
const isCreating = ref(false)

watch(
  () => props.show,
  (val) => {
    if (val) newChatName.value = ''
  },
)

async function createChat() {
  const name = newChatName.value.trim()
  if (!name || isCreating.value) return

  isCreating.value = true

  await new Promise((resolve) => setTimeout(resolve, 300))

  const id = store.addChat(name)

  isCreating.value = false
  emit('update:show', false)

  router.push(`/chat/${id}`)
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter') createChat()
}
</script>

<template>
  <NModal :show="props.show" :mask-closable="true" @update:show="emit('update:show', $event)">
    <NCard
      title="Новый чат"
      :bordered="false"
      style="width: 360px; max-width: 90vw"
      role="dialog"
      aria-modal="true"
    >
      <NForm @submit.prevent="createChat">
        <NFormItem label="Имя персонажа" :show-feedback="false">
          <NInput
            v-model:value="newChatName"
            placeholder="Например: Freddie Mercury"
            :maxlength="60"
            show-count
            autofocus
            @keydown="handleKeydown"
          />
        </NFormItem>
      </NForm>

      <template #footer>
        <div class="modal-footer">
          <NButton @click="emit('update:show', false)">Отмена</NButton>
          <NButton
            type="primary"
            :disabled="!newChatName.trim()"
            :loading="isCreating"
            @click="createChat"
          >
            Создать
          </NButton>
        </div>
      </template>
    </NCard>
  </NModal>
</template>

<style scoped>
.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
</style>
