<script setup lang="ts">
import l from 'lodash'
import type { ApexOptions } from 'apexcharts'
import type { Sale } from '~/types'

const props = defineProps<{
  loading: boolean
  sales: Sale[]
}>()

// create series paired values for each category as recommended in Apex Charts docs
const series = computed(() => {
  const groupedByCategory = l.groupBy(props.sales, 'category')

  return l.map(groupedByCategory, (items, category) => ({
    name: category,
    data: l.map(items, (item) => ({
      x: item.date,
      y: item.amount,
    })),
  }))
})

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
    tooltip: {
      enabled: true,
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
