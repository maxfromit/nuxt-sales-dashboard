<script setup lang="ts">
import { ru } from '@nuxt/ui/locale'

const { locale } = useI18n()

const meta = computed(() => {
  return {
    title: $t('app.title'),
    description: $t('app.description'),
    content: $t('app.content'),
  }
})

useHead(meta)
</script>

<template>
  <UApp :locale="locale === 'ru' ? ru : undefined">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
