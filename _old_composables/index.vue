<script setup lang="ts">
import DashboardPanel from '~/components/DashboardPanel.vue'
</script>

<template>
  <div class="flex flex-1 flex-col">
    <header class="p-4 sm:px-6 flex flex-row items-center justify-between">
      <div class="flex flex-row items-baseline gap-2">
        <UIcon name="i-lucide-chart-no-axes-column" class="text-secondary" />
        <div class="text-xl font-semibold">Продажи</div>
        <NuxtLink
          :to="{ name: 'index-composable' }"
          class="text-blue-500 underline"
        >
          Composable
        </NuxtLink>
      </div>
      <SettingsDropdown />
    </header>

    <USeparator />

    <DashboardPanel />
  </div>
</template>
