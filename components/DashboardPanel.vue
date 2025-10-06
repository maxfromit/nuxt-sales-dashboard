<script setup lang="ts">
import { storeToRefs } from 'pinia'
import type { Period, Range, CalendarRange } from '~/types'
import l from 'lodash'
import {
  type CalendarDate,
  today,
  getLocalTimeZone,
  parseDate,
} from '@internationalized/date'

const store = useSalesStore()
const { isLoading, sales } = storeToRefs(store)

const range = ref<Range>({
  start: new Date(),
  end: new Date(),
})
const minDate = ref<CalendarDate | null>(null)
const maxDate = ref<CalendarDate | null>(null)
const calendarRange = ref<CalendarRange>(getTodayRange())

await callOnce(() =>
  store.fetchSales().then(() => {
    console.log('Initial sales fetched', sales.value)
    const sortedSalesByDate = sortSalesByDate(sales.value)

    console.log(
      'Sorted sales by date:',
      l.first(sortedSalesByDate),
      l.last(sortedSalesByDate)
    )

    const firstDate = l.first(sortedSalesByDate)?.date
    const lastDate = l.last(sortedSalesByDate)?.date

    if (firstDate) {
      minDate.value = parseDate(firstDate)
      range.value.start = new Date(firstDate)
      calendarRange.value.start = minDate.value.copy()
    }
    if (lastDate) {
      maxDate.value = parseDate(lastDate)
      range.value.end = new Date(lastDate)
      calendarRange.value.end = maxDate.value.copy()
      console.log('Last date set to', calendarRange.value.end)
    }
  })
)
const refetchSales = () => store.fetchSales(calendarRange.value)
</script>

<template>
  <div class="flex flex-1 flex-col">
    <div class="p-4 sm:px-6">
      <div class="flex flex-col">
        calendarRange {{ calendarRange?.start?.toString() }}
        {{ calendarRange?.end?.toString() }}
        <DateRangePicker
          v-model="calendarRange"
          :min-date="minDate"
          :max-date="maxDate"
          @apply-date-range="refetchSales()"
        />
      </div>
    </div>
    <USeparator />

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
