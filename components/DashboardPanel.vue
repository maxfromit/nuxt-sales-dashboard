<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { CalendarRange } from '~/types'

const store = useSalesStore()
const { isLoading, sales } = storeToRefs(store)

const calendarRange = ref<CalendarRange>({
  start: null,
  end: null,
})

await callOnce(() => store.fetchSales())

const refetchSales = () => store.fetchSales(calendarRange.value)
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div class="p-4 sm:px-6">
      <div class="flex flex-col">
        <DateRangePicker
          v-model="calendarRange"
          @apply-date-range="refetchSales()"
        />
      </div>
    </div>
    <USeparator />

    <div v-if="isLoading" class="p-4 text-sm text-muted-foreground">
      Loading sales data...
    </div>

    <div
      v-if="!isLoading && sales.length === 0"
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
</template>
