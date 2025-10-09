<script setup lang="ts">
import { ru } from '@nuxt/ui/locale'
</script>

<template>
  <NuxtLoadingIndicator />

  <UApp :locale="ru">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
