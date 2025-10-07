import l from 'lodash'
import type { Query } from '~/server/api/sales'

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
    id: 3,
    date: '2025-09-02',
    amount: 1500,
    category: 'Электроника',
    customer_id: 1,
  },
  { id: 4, date: '2025-09-02', amount: 600, category: 'Книги', customer_id: 3 },
  {
    id: 5,
    date: '2025-09-03',
    amount: 900,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 6,
    date: '2025-09-03',
    amount: 2000,
    category: 'Электроника',
    customer_id: 4,
  },
  { id: 7, date: '2025-09-04', amount: 700, category: 'Книги', customer_id: 3 },

  {
    id: 8,
    date: '2025-09-04',
    amount: 400,
    category: 'Аксессуары',
    customer_id: 5,
  },
  {
    id: 9,
    date: '2025-09-05',
    amount: 1100,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 10,
    date: '2025-09-05',
    amount: 250,
    category: 'Книги',
    customer_id: 6,
  },
  {
    id: 11,
    date: '2025-09-06',
    amount: 1300,
    category: 'Электроника',
    customer_id: 2,
  },
  {
    id: 12,
    date: '2025-09-06',
    amount: 450,
    category: 'Одежда',
    customer_id: 5,
  },
  {
    id: 13,
    date: '2025-09-07',
    amount: 980,
    category: 'Книги',
    customer_id: 3,
  },
  {
    id: 14,
    date: '2025-09-07',
    amount: 2200,
    category: 'Электроника',
    customer_id: 4,
  },
  {
    id: 15,
    date: '2025-09-08',
    amount: 560,
    category: 'Аксессуары',
    customer_id: 6,
  },
  {
    id: 16,
    date: '2025-09-08',
    amount: 300,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 17,
    date: '2025-09-09',
    amount: 1750,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 18,
    date: '2025-09-09',
    amount: 610,
    category: 'Книги',
    customer_id: 5,
  },
  {
    id: 19,
    date: '2025-09-10',
    amount: 420,
    category: 'Аксессуары',
    customer_id: 4,
  },
  {
    id: 20,
    date: '2025-09-10',
    amount: 900,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 21,
    date: '2025-09-10',
    amount: 1400,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 22,
    date: '2025-09-11',
    amount: 770,
    category: 'Книги',
    customer_id: 6,
  },
  {
    id: 23,
    date: '2025-09-12',
    amount: 980,
    category: 'Электроника',
    customer_id: 2,
  },
  {
    id: 24,
    date: '2025-09-13',
    amount: 450,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 25,
    date: '2025-09-14',
    amount: 1250,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 26,
    date: '2025-09-15',
    amount: 300,
    category: 'Книги',
    customer_id: 5,
  },
  {
    id: 27,
    date: '2025-09-16',
    amount: 670,
    category: 'Аксессуары',
    customer_id: 4,
  },
  {
    id: 28,
    date: '2025-09-17',
    amount: 2100,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 29,
    date: '2025-09-18',
    amount: 540,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 30,
    date: '2025-09-19',
    amount: 760,
    category: 'Книги',
    customer_id: 6,
  },
  {
    id: 31,
    date: '2025-09-20',
    amount: 1320,
    category: 'Электроника',
    customer_id: 3,
  },
  { id: 32, date: '2025-09-21', amount: 480, category: 'Дом', customer_id: 5 },
  {
    id: 33,
    date: '2025-09-22',
    amount: 990,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 34,
    date: '2025-09-23',
    amount: 250,
    category: 'Аксессуары',
    customer_id: 2,
  },
  {
    id: 35,
    date: '2025-09-24',
    amount: 1450,
    category: 'Электроника',
    customer_id: 4,
  },
  {
    id: 36,
    date: '2025-09-25',
    amount: 610,
    category: 'Одежда',
    customer_id: 6,
  },
  {
    id: 37,
    date: '2025-09-26',
    amount: 330,
    category: 'Книги',
    customer_id: 3,
  },
  {
    id: 38,
    date: '2025-09-27',
    amount: 1780,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 39,
    date: '2025-09-28',
    amount: 420,
    category: 'Аксессуары',
    customer_id: 5,
  },
  {
    id: 40,
    date: '2025-09-29',
    amount: 860,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 41,
    date: '2025-09-30',
    amount: 1500,
    category: 'Электроника',
    customer_id: 4,
  },
  {
    id: 42,
    date: '2025-10-01',
    amount: 700,
    category: 'Книги',
    customer_id: 6,
  },
  {
    id: 43,
    date: '2025-10-02',
    amount: 520,
    category: 'Аксессуары',
    customer_id: 5,
  },
  {
    id: 44,
    date: '2025-10-03',
    amount: 2400,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 45,
    date: '2025-10-04',
    amount: 390,
    category: 'Одежда',
    customer_id: 2,
  },
  { id: 46, date: '2025-10-05', amount: 870, category: 'Дом', customer_id: 3 },
  {
    id: 47,
    date: '2025-10-06',
    amount: 980,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 48,
    date: '2025-10-07',
    amount: 450,
    category: 'Книги',
    customer_id: 6,
  },
  {
    id: 49,
    date: '2025-10-08',
    amount: 1200,
    category: 'Электроника',
    customer_id: 4,
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
