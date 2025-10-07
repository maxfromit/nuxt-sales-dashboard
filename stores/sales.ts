import type { Sales } from '~/server/utils'
import type { Range } from '~/types'
import l from 'lodash'

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

  const stats = computed(() => {
    const total = l.sumBy(sales.value, 'amount')
    const count = l.size(sales.value)
    const average = !!count && !!total ? l.round(total / count, 2) : null
    const uniqueCustomers = l
      .chain(sales.value)
      .uniqBy('customer_id')
      .size()
      .value()

    return [
      {
        label: 'Общий доход',
        value: total ?? null,
        prefix: '₽',
        icon: 'i-lucide-badge-russian-ruble',
      },
      {
        label: 'Количество заказов',
        value: count ?? null,
        icon: 'i-lucide-shopping-cart',
      },
      {
        label: 'Средний чек',
        value: average ?? null,
        prefix: '₽',
        icon: 'i-lucide-receipt-russian-ruble',
      },
      {
        label: 'Уникальные пользователи',
        value: uniqueCustomers ?? null,
        icon: 'i-lucide-users-round',
      },
    ]
  })

  return { sales: sales, fetchSales, stats, isLoading }
})
