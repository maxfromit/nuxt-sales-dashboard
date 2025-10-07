<script setup lang="ts">
import l from 'lodash'
import type { ApexOptions } from 'apexcharts'
import type { Sales } from '~/server/utils'

const props = defineProps<{
  loading: boolean
  sales: Sales
}>()

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

const chartOptions = computed(
  (): ApexOptions => ({
    stroke: {
      width: [4, 4],
      // use a single curve type for simplicity
      curve: 'smooth',
    },
    tooltip: {
      x: { show: true },
      y: {},
      shared: true,
      enabled: true,
      inverseOrder: true,
    },

    markers: {
      hover: { sizeOffset: 4 },
      strokeColors: ['#E0E0E0', '#FFF'],
      colors: ['#D3D3D3', '#2E93fA'],
      size: [1, 5],
    },
    xaxis: {
      type: 'datetime',
      categories: categories.value,
      labels: { show: true },
      axisTicks: { show: false },
    },
    yaxis: [{ show: false, min: 0 }],
    annotations: {
      xaxis: [
        { x: 'Январь', borderColor: '#D3D3D3', strokeDashArray: 3 },
        { x: 'Февраль', borderColor: '#D3D3D3', strokeDashArray: 3 },
        { x: 'Март', borderColor: '#D3D3D3', strokeDashArray: 3 },
        { x: 'Апрель', borderColor: '#D3D3D3', strokeDashArray: 3 },
        { x: 'Май', borderColor: '#D3D3D3', strokeDashArray: 3 },
        { x: 'Июнь', borderColor: '#D3D3D3', strokeDashArray: 3 },
        { x: 'Июль', borderColor: '#D3D3D3', strokeDashArray: 3 },
        { x: 'Август', borderColor: '#D3D3D3', strokeDashArray: 3 },
        { x: 'Сентябрь', borderColor: '#D3D3D3', strokeDashArray: 3 },
        { x: 'Октябрь', borderColor: '#D3D3D3', strokeDashArray: 3 },
        { x: 'Ноябрь', borderColor: '#D3D3D3', strokeDashArray: 3 },
        { x: 'Декабрь', borderColor: '#D3D3D3', strokeDashArray: 3 },
      ],
    },
    legend: {
      show: true,
      inverseOrder: true,
    },
    chart: { id: 'pc-pharmaview-dynamic-disposal-chart' },
    colors: ['#E0E0E0', '#2E93fA'],
  })
)

const uniqueDateEntries = computed(() =>
  l
    .chain(props.sales)
    .map((sale) => sale?.date)
    .uniq()
    .size()
    .value()
)
const backboneOptions = computed((): ApexOptions => {
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
    :series="series"
    type="line"
    :height="dashboardChartHeight"
    :options="backboneOptions"
    :loading="loading"
  />

  <!-- <ApexChart
    :key="categories[0]"
    :series="series2"
    type="line"
    :height="250"
    :options="backboneOptions"
    :loading="loading"
  /> -->
</template>
