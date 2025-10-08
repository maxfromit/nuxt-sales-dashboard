<script setup lang="ts">
import type { ApexOptions } from 'apexcharts'
import VueApexCharts, { type VueApexChartsComponent } from 'vue3-apexcharts'
import l from 'lodash'
import ru from 'apexcharts/dist/locales/ru.json'

const props = defineProps<{
  type: NonNullable<ApexOptions['chart']>['type']
  series: ApexOptions['series']
  height: VueApexChartsComponent['height']
  options: Partial<ApexOptions>
  loading?: boolean
}>()

const apexChartInstance = ref<VueApexChartsComponent | null>(null)

const colorMode = useColorMode()
const theme = computed(() => colorMode.preference)

const defaultOptions = computed(
  (): ApexOptions => ({
    chart: {
      locales: [ru],
      defaultLocale: 'ru',
      type: props.type,
      zoom: {
        enabled: false,
      },
      animations: {
        enabled: true,
        speed: 500,
        animateGradually: {
          enabled: true,
          delay: 100,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 250,
        },
      },
    },

    ...(theme.value === 'dark' || theme.value === 'light'
      ? {
          theme: { mode: theme.value },
        }
      : {}),

    markers: {
      hover: { sizeOffset: 4 },
      strokeWidth: 1,
      colors: theme.value === 'dark' ? '#f3f3f3' : '#f1f1f1',
      strokeColors: theme.value === 'dark' ? '#f9f9f9' : '#c1c1c1',
    },

    grid: {
      padding: {
        left: 30,
        right: 60,
      },
    },

    stroke: {
      width: 1,
      curve: 'smooth',
    },

    yaxis: {
      title: {
        style: {
          fontSize: '10px',
          fontWeight: 400,
          cssClass: 'apexcharts-yaxis-title',
        },
      },
    },
  })
)

const mergedOptions = computed(() =>
  l.merge({}, defaultOptions.value, props.options)
)

const getHeightClass = computed(() =>
  props.height ? `h-[${l.toNumber(props.height)}px]` : 'h-[250px]'
)
</script>

<template>
  <div class="relative">
    <VueApexCharts
      ref="apexChartInstance"
      :type="type"
      :series="series"
      :height="height"
      :options="mergedOptions"
    />

    <USkeleton
      v-if="loading"
      :class="getHeightClass"
      class="absolute inset-0 z-10 opacity-25"
    />
  </div>
</template>

<style scoped>
:deep(.apexcharts-tooltip) {
  border: 1px solid var(--ui-secondary) !important;
}
</style>
