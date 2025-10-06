<script setup lang="ts">
defineProps<{
  datetime?: string
}>()
</script>

<template>
  <NuxtTime
    v-if="datetime"
    :datetime="datetime"
    :locale="ruLocale"
    date-style="medium"
  />
</template>
