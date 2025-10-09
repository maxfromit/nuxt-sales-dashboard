import type { CalendarRange } from '~/types'

import l from 'lodash'

export const useSalesStore = defineStore('sales', () => {
  const range = ref<CalendarRange>({})

  const rangeToString = computed(() => {
    return {
      ...(range.value?.start
        ? {
            startDate: range.value.start.toString(),
            endDate: range.value?.end?.toString() ?? calendarToday.toString(),
          }
        : {}),
    }
  })

  const { data, status } = useFetch('/api/sales', {
    query: rangeToString,
  })

  const sales = computed(() => data.value || [])
  const loading = computed(() => status.value === 'pending')

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

  return { sales, stats, loading, range }
})
