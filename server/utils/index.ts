import l from 'lodash'
import { sortSalesByDate } from '~/utils'
import type { Query } from '~/server/api/sales'

const salesData = [
  {
    id: 1,
    date: '2025-09-01',
    amount: 1200,
    category: 'Электроника',
    user_id: 1,
  },
  { id: 2, date: '2025-09-01', amount: 800, category: 'Одежда', user_id: 2 },
  {
    id: 3,
    date: '2025-09-02',
    amount: 1500,
    category: 'Электроника',
    user_id: 1,
  },
  { id: 4, date: '2025-09-02', amount: 600, category: 'Книги', user_id: 3 },
  { id: 5, date: '2025-09-03', amount: 900, category: 'Одежда', user_id: 2 },
  {
    id: 6,
    date: '2025-09-03',
    amount: 2000,
    category: 'Электроника',
    user_id: 4,
  },
  { id: 7, date: '2025-09-04', amount: 700, category: 'Книги', user_id: 3 },

  {
    id: 8,
    date: '2025-09-04',
    amount: 400,
    category: 'Аксессуары',
    user_id: 5,
  },
  {
    id: 9,
    date: '2025-09-05',
    amount: 1100,
    category: 'Электроника',
    user_id: 1,
  },
  { id: 10, date: '2025-09-05', amount: 250, category: 'Книги', user_id: 6 },
  {
    id: 11,
    date: '2025-09-06',
    amount: 1300,
    category: 'Электроника',
    user_id: 2,
  },
  { id: 12, date: '2025-09-06', amount: 450, category: 'Одежда', user_id: 5 },
  { id: 13, date: '2025-09-07', amount: 980, category: 'Книги', user_id: 3 },
  {
    id: 14,
    date: '2025-09-07',
    amount: 2200,
    category: 'Электроника',
    user_id: 4,
  },
  {
    id: 15,
    date: '2025-09-08',
    amount: 560,
    category: 'Аксессуары',
    user_id: 6,
  },
  { id: 16, date: '2025-09-08', amount: 300, category: 'Одежда', user_id: 2 },
  {
    id: 17,
    date: '2025-09-09',
    amount: 1750,
    category: 'Электроника',
    user_id: 1,
  },
  { id: 18, date: '2025-09-09', amount: 610, category: 'Книги', user_id: 5 },
  {
    id: 19,
    date: '2025-09-10',
    amount: 420,
    category: 'Аксессуары',
    user_id: 4,
  },
  { id: 20, date: '2025-09-10', amount: 900, category: 'Одежда', user_id: 2 },
  {
    id: 21,
    date: '2025-09-10',
    amount: 1400,
    category: 'Электроника',
    user_id: 1,
  },
  { id: 22, date: '2025-09-11', amount: 770, category: 'Книги', user_id: 6 },
]

type Sales = typeof salesData

const filterSales = (startDate?: string | null, endDate?: string | null) => {
  if (!startDate && !endDate) return salesData
  const sorted = sortSalesByDate(salesData)

  return l.filter(sorted, (sale: Sales[number]) => {
    if (startDate && sale.date < startDate) return false
    if (endDate && sale.date > endDate) return false
    return true
  })
}

const fetchSales = async (query?: Query) => {
  let sales: Sales = []
  await new Promise((resolve) => {
    setTimeout(() => {
      sales = query
        ? filterSales(
            l.isString(query?.startDate) ? query?.startDate : null,
            l.isString(query?.endDate) ? query?.endDate : null
          )
        : filterSales()
      resolve(true)
    }, 1000)
  })
  return { sales }
}

export { type Sales, fetchSales }
