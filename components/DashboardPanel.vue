<script setup lang="ts">
import type { Range } from '~/types'
import { storeToRefs } from 'pinia'
import l from 'lodash'

const store = useSalesStore()
const { loading, sales, stats } = storeToRefs(store)

export type Stats = typeof stats.value

await callOnce(() => store.fetchSales())

const fetchSales = (range: Range) => {
  store.fetchSales(range)
}
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div class="flex flex-row items-center p-4 sm:px-6">
      <DateRangePicker @apply-date-range="fetchSales" />
    </div>

    <USeparator />

    <div
      v-if="!loading && l.isEmpty(sales)"
      class="p-4 text-center font-bold text-sm text-muted-foreground"
    >
      В выбранные даты нет данных для отображения.
    </div>

    <div class="flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6">
      <!--Stats collapse for mobile screens -->
      <UCollapsible class="sm:hidden">
        <UButton
          label="Статистика"
          color="neutral"
          variant="outline"
          trailing-icon="i-lucide-chevron-down"
          class="group mb-2"
          :ui="{
            trailingIcon:
              'group-data-[state=open]:rotate-180 transition-transform duration-200',
          }"
          block
        />

        <template #content>
          <DashboardStats :stats="stats" :loading="loading" />
        </template>
      </UCollapsible>

      <!-- Stats for sm+ screens -->

      <DashboardStats :stats="stats" :loading="loading" class="max-sm:hidden" />

      <DashboardChart :loading="loading" :sales="sales" />
    </div>
  </div>
</template>
