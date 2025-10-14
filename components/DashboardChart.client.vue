<script setup lang="ts">
import l from 'lodash'
import type { ApexOptions } from 'apexcharts'

const store = useSalesStore()
const { loading, sales } = storeToRefs(store)

// Unique data entries:
// used to create x-axis categories for each date in the sales data
// hide x-axis labels when there are fewer than 4 dates to avoid unnecessary labels.
const uniqueDateEntries = computed(() =>
  l
    .chain(sales.value)
    .map((sale) => sale?.date)
    .uniq()
    .value()
)

// create series of paired values for each category, per the ApexCharts docs.
// first group by category, then sum amounts for each uniqueDateEntries within that category.
const series = computed(() =>
  l
    .chain(sales.value)
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

const colorMode = useColorMode()
const theme = computed(() => colorMode.preference)
const options = computed((): ApexOptions => {
  return {
    chart: {
      id: 'sales',
    },

    legend: {
      formatter: (seriesName, opts) => [
        $t(`dashboard.chart.xaxis.${seriesName}`),
      ],
    },
    tooltip: {
      enabled: true,
      shared: true,
      y: {
        title: {
          formatter: (seriesName) => $t(`dashboard.chart.xaxis.${seriesName}`),
        },
      },
    },

    // hide marker if too much entries to avoid cluttering
    ...(l.size(uniqueDateEntries.value) > 10
      ? {}
      : {
          markers: {
            // make marker bigger and brighter if only one date entry to make it more visible
            ...(l.size(uniqueDateEntries.value) > 1
              ? { size: 3 }
              : {
                  size: 5,
                  colors: theme.value === 'dark' ? '#FFF' : '#c9c9c9',
                  strokeColors: theme.value === 'dark' ? '#f9f9f9' : '#4f4f4f',
                }),
          },
        }),

    xaxis: {
      type: 'datetime',
      // hide labels if < 4 entries to avoid unnecessary labels
      labels: { show: l.size(uniqueDateEntries.value) > 3 ? true : false },
    },

    yaxis: {
      labels: { show: true },
      title: {
        text: $t('dashboard.chart.yaxisTitle'),
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
