<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Range } from '~/types'
import l from 'lodash'

const store = useSalesStore()
const { loading, sales, stats } = storeToRefs(store)

await callOnce(() => store.fetchSales())

export type Stats = typeof stats.value

const fetchSales = (range: Range) => {
  store.fetchSales(range)
}
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div class="p-4 sm:px-6">
      <div class="flex flex-col">
        <DateRangePicker @apply-date-range="fetchSales" />
      </div>
    </div>

    <USeparator />

    <div
      v-if="!loading && l.isEmpty(sales)"
      class="p-4 text-center font-bold text-sm text-muted-foreground"
    >
      В выбранные даты нет данных для отображения.
    </div>

    <div class="flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6">
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

      <DashboardStats :stats="stats" :loading="loading" class="max-sm:hidden" />
      <DashboardChart :loading="loading" :sales="sales" />
    </div>
  </div>
</template>
