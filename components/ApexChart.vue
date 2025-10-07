<script setup lang="ts">
import l from 'lodash'
import VueApexCharts, { type VueApexChartsComponent } from 'vue3-apexcharts'
import type { ApexOptions } from 'apexcharts'
import ru from 'apexcharts/dist/locales/ru.json'

const props = defineProps<{
  series?: ApexOptions['series']
  categories?: string[]
  options: Partial<ApexOptions>
  type: NonNullable<ApexOptions['chart']>['type']
  height: VueApexChartsComponent['height']
  styles?: string
  width?: VueApexChartsComponent['width']
  colors?: string[]
  loading?: boolean
  title?: string
}>()

const colorMode = useColorMode()
const theme = computed(() => colorMode.preference)

const apexChartInstance = ref<VueApexChartsComponent | null>(null)

type ApexThemeMode = NonNullable<ApexOptions['theme']>['mode']

const getDefaultOptions = (themeMode?: ApexThemeMode): ApexOptions => ({
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

  ...(!!themeMode
    ? {
        theme: { mode: themeMode },
      }
    : {}),

  grid: {
    padding: {
      left: 30,
      right: 60,
    },
  },
  stroke: {
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

const mergedOptions = computed(() =>
  l.merge(
    l.cloneDeep(props.options),
    getDefaultOptions(theme.value as ApexThemeMode)
  )
)
</script>

<template>
  <div class="relative">
    <VueApexCharts
      ref="apexChartInstance"
      :type="type"
      :height="height"
      :width="width"
      :style="styles"
      :options="mergedOptions"
      :series="series"
    />

    <div v-if="loading" class="absolute inset-0 z-10">
      <USkeleton :class="`h-[${height}px]`" />
    </div>
  </div>
</template>

<style scoped>
:deep(.apexcharts-tooltip) {
  border: 1px solid var(--ui-secondary) !important;
}
</style>
