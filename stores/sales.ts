import type { Sales } from '~/server/api/sales'
import type { CalendarRange } from '~/types'

export const useSalesStore = defineStore('sales', () => {
  const sales = ref<Sales>([])
  const isLoading = ref(false)

  const fetchSales = async (dateRange?: CalendarRange) => {
    console.log('fetchSales called with', dateRange)
    isLoading.value = true
    const data = await $fetch('/api/sales', {
      query: {
        ...(dateRange
          ? {
              ...(dateRange?.start
                ? { startDate: dateRange.start.toString() }
                : {}),
              ...(dateRange?.end ? { endDate: dateRange.end.toString() } : {}),
            }
          : {}),
      },
    })
    isLoading.value = false
    sales.value = data?.sales || []
    // console.log('sales after', sales.value)
  }

  return { sales: sales, fetchSales, isLoading }
})
