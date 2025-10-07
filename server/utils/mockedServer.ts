import l from 'lodash'
import type { Query } from '~/server/api/sales'

// Plain sales data: one event per category (Электроника, Одежда, Книги)
// for each date from 2025-09-01 to 2025-10-08 (inclusive).
const salesData = [
  {
    id: 1,
    date: '2025-09-01',
    amount: 1200,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 2,
    date: '2025-09-01',
    amount: 800,
    category: 'Одежда',
    customer_id: 2,
  },

  {
    id: 4,
    date: '2025-09-02',
    amount: 1200,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 5,
    date: '2025-09-02',
    amount: 800,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 6,
    date: '2025-09-02',
    amount: 500,
    category: 'Одежда',
    customer_id: 3,
  },

  {
    id: 7,
    date: '2025-09-03',
    amount: 1200,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 8,
    date: '2025-09-03',
    amount: 800,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 9,
    date: '2025-09-03',
    amount: 500,
    category: 'Одежда',
    customer_id: 3,
  },

  {
    id: 10,
    date: '2025-09-04',
    amount: 1200,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 11,
    date: '2025-09-04',
    amount: 800,
    category: 'Одежда',
    customer_id: 2,
  },
]

type Sales = typeof salesData

const filterSales = (startDate?: string | null, endDate?: string | null) => {
  if (!startDate && !endDate) return salesData

  return l.filter(salesData, (sale: Sales[number]) => {
    if (startDate && sale.date < startDate) return false
    if (endDate && sale.date > endDate) return false
    return true
  })
}

const fetchSales = async (query?: Query) => {
  let sales: Sales = []
  await new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      // Fetch sales data based on query if query provided
      sales = query
        ? filterSales(
            l.isString(query?.startDate) ? query?.startDate : null,
            l.isString(query?.endDate) ? query?.endDate : null
          )
        : filterSales()
      resolve(true)
    }, 300)
  })
  return { sales }
}

export { fetchSales }
