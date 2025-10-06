<script setup lang="ts">
import DashboardPanel from '~/components/DashboardPanel.vue'
</script>

<template>
  <div class="flex flex-1 flex-col">
    <header class="p-4 sm:px-6 flex flex-row items-center justify-between">
      <div class="text-xl font-semibold">Dashboard</div>
      <ThemeSettingsDropdown />
    </header>

    <USeparator />

    <DashboardPanel />
  </div>

  <!-- <UCard
    :ui="{
      body: 'flex-1 flex flex-col',
      root: 'flex-1',
    }"
    class="flex-1 flex flex-col"
  >
    <template #header>
      <div class="flex flex-row items-center justify-between">
        <div class="text-xl font-semibold">Dashboard</div>
        <ThemeSettingsDropdown />
      </div>
    </template>

    <DashboardPanel />
     <template #footer>
      <Placeholder class="h-8" />
    </template> 
  </UCard> -->
</template>
