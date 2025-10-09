import type { Range, Sale } from '~/types'

import l from 'lodash'

export const useSalesStore = defineStore('sales', () => {
  const sales = ref<Sale[]>([])
  const loading = ref(false)

  const fetchSales = async (dateRange?: Range) => {
    loading.value = true
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
    loading.value = false
    sales.value = data || []
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

    //create an object with stat values to reference values by values[key]
    const values = { total, count, average, uniqueCustomers }

    type StatKey = keyof typeof values

    type StatItem = {
      key: StatKey
      label: string
      value: number | null | string
      prefix?: string
      icon: string
    }

    // Define the stats backbone with null values to be easy filled with dash if no sales data
    const statsBackbone: StatItem[] = [
      {
        key: 'total',
        label: 'Общий доход',
        value: null,
        prefix: '₽',
        icon: 'i-lucide-badge-russian-ruble',
      },
      {
        key: 'count',
        label: 'Количество заказов',
        value: null,
        icon: 'i-lucide-shopping-cart',
      },
      {
        key: 'average',
        label: 'Средний чек',
        value: null,
        prefix: '₽',
        icon: 'i-lucide-receipt-russian-ruble',
      },
      {
        key: 'uniqueCustomers',
        label: 'Уникальные пользователи',
        value: null,
        icon: 'i-lucide-users-round',
      },
    ]

    return l.map(statsBackbone, (stat) => {
      return {
        ...stat,
        value: l.isEmpty(sales.value) ? '–' : values[stat.key],
      }
    })
  })

  return { sales: sales, fetchSales, stats, loading }
})
