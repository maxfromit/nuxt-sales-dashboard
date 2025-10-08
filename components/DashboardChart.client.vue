<script setup lang="ts">
import l from 'lodash'
import type { ApexOptions } from 'apexcharts'
import type { Sale } from '~/types'

const props = defineProps<{
  loading: boolean
  sales: Sale[]
}>()

// Unique data entries:
// used to create x-axis categories for each date in the sales data
// hide x-axis labels when there are fewer than 4 dates to avoid unnecessary labels.
const uniqueDateEntries = computed(() =>
  l
    .chain(props.sales)
    .map((sale) => sale?.date)
    .orderBy()
    .sortedUniq()
    .value()
)

// create series of paired values for each category, per the ApexCharts docs.
// first group by category, then sum amounts for each uniqueDateEntries within that category.
const series = computed(() =>
  l
    .chain(props.sales)
    .groupBy('category')
    .map((categoryItems, category) => {
      const categoryItemsByDate = l.groupBy(categoryItems, 'date')

      const pointsByDate = l.map(uniqueDateEntries.value, (date) => {
        const itemsOnDate = l.get(categoryItemsByDate, date)
        return {
          x: date,
          y: itemsOnDate ? l.sumBy(itemsOnDate, 'amount') : 0,
        }
      })

      return {
        name: category,
        data: pointsByDate,
      }
    })
    .value()
)

const options = computed((): ApexOptions => {
  return {
    chart: {
      id: 'sales',
    },
    tooltip: {
      enabled: true,
      shared: true,
    },

    xaxis: {
      type: 'datetime',
      labels: { show: l.size(uniqueDateEntries.value) > 3 ? true : false },
    },
    yaxis: {
      labels: { show: true },
      title: {
        text: 'Доход, ₽',
      },
    },
  }
})
</script>

<template>
  <ApexChart
    type="line"
    :series="series"
    :height="dashboardChartHeight"
    :options="options"
    :loading="loading"
  />
</template>
