import type { Sales } from '~/server/utils'
import type { Range } from '~/types'

export const useSalesStore = defineStore('sales', () => {
  const sales = ref<Sales>([])
  const isLoading = ref(false)

  const fetchSales = async (dateRange?: Range) => {
    isLoading.value = true
    const data = await $fetch('/api/sales', {
      query: {
        ...(dateRange
          ? {
              ...(dateRange.start ? { startDate: dateRange.start } : {}),
              ...(dateRange.end ? { endDate: dateRange.end } : {}),
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
