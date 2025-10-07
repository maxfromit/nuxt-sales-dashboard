<script setup lang="ts">
import type { Stats } from '~/components/DashboardPanel.vue'

const props = defineProps<{
  stats: Stats
  isLoading: boolean
}>()
</script>

<template>
  <div
    class="lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-px relative grid grid-cols-1 sm:grid-cols-2"
  >
    <div
      v-for="(stat, index) in stats"
      :key="index"
      class="lg:rounded-none first:rounded-l-lg last:rounded-r-lg items-start relative flex rounded-lg bg-elevated/50 ring ring-default"
    >
      <div
        class="gap-y-1.5 relative flex flex-col flex-1 gap-x-8 p-4 sm:p-6 justify-items-start"
      >
        <UAvatar
          :icon="stat.icon"
          size="xl"
          :ui="{ icon: 'size-4 text-primary' }"
          class="rounded-full bg-primary/10 ring ring-inset ring-primary/25"
        />
        <div class="font-normal text-muted text-xs uppercase text-pretty">
          {{ stat.label }}
        </div>
        <div class="text-2xl font-semibold text-highlighted">
          {{
            !isLoading
              ? `${stat.prefix ? `${stat.prefix} ` : ''}${stat.value}`
              : '...'
          }}
        </div>
      </div>
    </div>
  </div>
</template>
