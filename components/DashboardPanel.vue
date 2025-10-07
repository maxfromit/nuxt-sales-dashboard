<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Range } from '~/types'

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

    <div class="flex flex-col gap-4 sm:gap-6 flex-1 overflow-y-auto p-4 sm:p-6">
      <DashboardStats :stats="stats" :loading="loading" />

      <div v-if="loading" class="p-4 text-sm text-muted-foreground">
        Loading sales data...
      </div>

      <div
        v-if="!loading && sales.length === 0"
        class="p-4 text-center text-sm text-muted-foreground"
      >
        No sales data available.
      </div>

      <div v-else class="p-4">
        <table class="w-full table-auto border-collapse">
          <thead>
            <tr class="border-b">
              <th class="text-left p-2">ID</th>
              <th class="text-left p-2">Amount</th>
              <th class="text-left p-2">Date</th>
              <th class="text-left p-2">Category</th>
            </tr>
          </thead>

          <tbody>
            <tr
              v-for="sale in sales"
              :key="sale.id"
              class="border-b hover:bg-accent"
            >
              <td class="p-2">{{ sale.id }}</td>
              <td class="p-2">{{ sale.amount }}</td>
              <td class="p-2">
                {{ new Date(sale.date).toLocaleDateString() }}
              </td>
              <td class="p-2">{{ sale.category }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
