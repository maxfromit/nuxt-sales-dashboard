<script setup lang="ts">
import l from 'lodash'
import type { ApexOptions } from 'apexcharts'
import type { Sale } from '~/types'

const props = defineProps<{
  loading: boolean
  sales: Sale[]
}>()

// create series paired values for each category as recommended in Apex Charts docs
// at first we group by category and then we sum amounts for each date in that category

const series = computed(() =>
  l
    .chain(props.sales)
    .groupBy('category')
    .map((items, category) => ({
      name: category,
      data: l
        .chain(items)
        .groupBy('date')
        .map((dateItems, date) => ({
          x: date,
          y: l.sumBy(dateItems, 'amount'),
        }))
        .value(),
    }))
    .value()
)

const uniqueDateEntries = computed(() =>
  l
    .chain(props.sales)
    .map((sale) => sale?.date)
    .uniq()
    .size()
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
      labels: { show: uniqueDateEntries.value > 3 ? true : false },
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
