import l from 'lodash'
import type { Query } from '~/server/api/sales'

const salesData = [
  // 2025-09-01
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
    id: 12,
    date: '2025-09-01',
    amount: 600,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 13,
    date: '2025-09-01',
    amount: 450,
    category: 'Книги',
    customer_id: 4,
  },

  // 2025-09-02
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

  // 2025-09-03
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
    id: 15,
    date: '2025-09-03',
    amount: 400,
    category: 'Книги',
    customer_id: 6,
  },

  // 2025-09-04
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
  {
    id: 16,
    date: '2025-09-04',
    amount: 550,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 17,
    date: '2025-09-04',
    amount: 300,
    category: 'Книги',
    customer_id: 4,
  },

  // 2025-09-05
  {
    id: 18,
    date: '2025-09-05',
    amount: 1300,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 19,
    date: '2025-09-05',
    amount: 750,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 20,
    date: '2025-09-05',
    amount: 520,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 21,
    date: '2025-09-05',
    amount: 380,
    category: 'Книги',
    customer_id: 5,
  },

  // 2025-09-06

  {
    id: 23,
    date: '2025-09-06',
    amount: 780,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 24,
    date: '2025-09-06',
    amount: 540,
    category: 'Одежда',
    customer_id: 4,
  },
  {
    id: 25,
    date: '2025-09-06',
    amount: 410,
    category: 'Книги',
    customer_id: 6,
  },

  // 2025-09-07
  {
    id: 26,
    date: '2025-09-07',
    amount: 1250,
    category: 'Электроника',
    customer_id: 3,
  },
  {
    id: 27,
    date: '2025-09-07',
    amount: 720,
    category: 'Одежда',
    customer_id: 4,
  },
  {
    id: 28,
    date: '2025-09-07',
    amount: 500,
    category: 'Одежда',
    customer_id: 5,
  },
  {
    id: 29,
    date: '2025-09-07',
    amount: 360,
    category: 'Книги',
    customer_id: 1,
  },

  // 2025-09-08
  {
    id: 30,
    date: '2025-09-08',
    amount: 1350,
    category: 'Электроника',
    customer_id: 4,
  },
  {
    id: 31,
    date: '2025-09-08',
    amount: 760,
    category: 'Одежда',
    customer_id: 5,
  },
  {
    id: 32,
    date: '2025-09-08',
    amount: 530,
    category: 'Одежда',
    customer_id: 6,
  },
  {
    id: 33,
    date: '2025-09-08',
    amount: 390,
    category: 'Книги',
    customer_id: 2,
  },

  // 2025-09-09
  {
    id: 34,
    date: '2025-09-09',
    amount: 1450,
    category: 'Электроника',
    customer_id: 5,
  },
  {
    id: 35,
    date: '2025-09-09',
    amount: 790,
    category: 'Одежда',
    customer_id: 6,
  },
  {
    id: 36,
    date: '2025-09-09',
    amount: 560,
    category: 'Одежда',
    customer_id: 1,
  },
  {
    id: 37,
    date: '2025-09-09',
    amount: 420,
    category: 'Книги',
    customer_id: 3,
  },

  // 2025-09-10
  {
    id: 38,
    date: '2025-09-10',
    amount: 1200,
    category: 'Электроника',
    customer_id: 6,
  },
  {
    id: 39,
    date: '2025-09-10',
    amount: 730,
    category: 'Одежда',
    customer_id: 1,
  },
  {
    id: 40,
    date: '2025-09-10',
    amount: 510,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 41,
    date: '2025-09-10',
    amount: 370,
    category: 'Книги',
    customer_id: 4,
  },

  // 2025-09-11
  {
    id: 42,
    date: '2025-09-11',
    amount: 1500,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 43,
    date: '2025-09-11',
    amount: 800,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 44,
    date: '2025-09-11',
    amount: 580,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 45,
    date: '2025-09-11',
    amount: 440,
    category: 'Книги',
    customer_id: 5,
  },

  // 2025-09-12
  {
    id: 46,
    date: '2025-09-12',
    amount: 1280,
    category: 'Электроника',
    customer_id: 2,
  },
  {
    id: 47,
    date: '2025-09-12',
    amount: 740,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 48,
    date: '2025-09-12',
    amount: 520,
    category: 'Одежда',
    customer_id: 4,
  },
  {
    id: 49,
    date: '2025-09-12',
    amount: 380,
    category: 'Книги',
    customer_id: 6,
  },

  // 2025-09-13
  {
    id: 50,
    date: '2025-09-13',
    amount: 1400,
    category: 'Электроника',
    customer_id: 3,
  },
  {
    id: 51,
    date: '2025-09-13',
    amount: 770,
    category: 'Одежда',
    customer_id: 4,
  },
  {
    id: 52,
    date: '2025-09-13',
    amount: 550,
    category: 'Одежда',
    customer_id: 5,
  },
  {
    id: 53,
    date: '2025-09-13',
    amount: 410,
    category: 'Книги',
    customer_id: 1,
  },

  // 2025-09-14
  {
    id: 54,
    date: '2025-09-14',
    amount: 1320,
    category: 'Электроника',
    customer_id: 4,
  },
  {
    id: 55,
    date: '2025-09-14',
    amount: 720,
    category: 'Одежда',
    customer_id: 5,
  },
  {
    id: 56,
    date: '2025-09-14',
    amount: 500,
    category: 'Одежда',
    customer_id: 6,
  },
  {
    id: 57,
    date: '2025-09-14',
    amount: 360,
    category: 'Книги',
    customer_id: 2,
  },

  // 2025-09-15
  {
    id: 58,
    date: '2025-09-15',
    amount: 1480,
    category: 'Электроника',
    customer_id: 5,
  },
  {
    id: 59,
    date: '2025-09-15',
    amount: 780,
    category: 'Одежда',
    customer_id: 6,
  },
  {
    id: 60,
    date: '2025-09-15',
    amount: 560,
    category: 'Одежда',
    customer_id: 1,
  },
  {
    id: 61,
    date: '2025-09-15',
    amount: 420,
    category: 'Книги',
    customer_id: 3,
  },

  // 2025-09-16
  {
    id: 62,
    date: '2025-09-16',
    amount: 1250,
    category: 'Электроника',
    customer_id: 6,
  },
  {
    id: 63,
    date: '2025-09-16',
    amount: 730,
    category: 'Одежда',
    customer_id: 1,
  },
  {
    id: 64,
    date: '2025-09-16',
    amount: 510,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 65,
    date: '2025-09-16',
    amount: 370,
    category: 'Книги',
    customer_id: 4,
  },

  // 2025-09-17
  {
    id: 66,
    date: '2025-09-17',
    amount: 1550,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 67,
    date: '2025-09-17',
    amount: 800,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 68,
    date: '2025-09-17',
    amount: 580,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 69,
    date: '2025-09-17',
    amount: 440,
    category: 'Книги',
    customer_id: 5,
  },

  // 2025-09-18
  {
    id: 70,
    date: '2025-09-18',
    amount: 1380,
    category: 'Электроника',
    customer_id: 2,
  },
  {
    id: 71,
    date: '2025-09-18',
    amount: 750,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 72,
    date: '2025-09-18',
    amount: 530,
    category: 'Одежда',
    customer_id: 4,
  },

  // 2025-09-19
  {
    id: 74,
    date: '2025-09-19',
    amount: 1420,
    category: 'Электроника',
    customer_id: 3,
  },
  {
    id: 75,
    date: '2025-09-19',
    amount: 770,
    category: 'Одежда',
    customer_id: 4,
  },
  {
    id: 76,
    date: '2025-09-19',
    amount: 550,
    category: 'Одежда',
    customer_id: 5,
  },
  {
    id: 77,
    date: '2025-09-19',
    amount: 410,
    category: 'Книги',
    customer_id: 1,
  },

  // 2025-09-20
  {
    id: 78,
    date: '2025-09-20',
    amount: 1300,
    category: 'Электроника',
    customer_id: 4,
  },
  {
    id: 79,
    date: '2025-09-20',
    amount: 720,
    category: 'Одежда',
    customer_id: 5,
  },
  {
    id: 80,
    date: '2025-09-20',
    amount: 500,
    category: 'Одежда',
    customer_id: 6,
  },
  {
    id: 81,
    date: '2025-09-20',
    amount: 360,
    category: 'Книги',
    customer_id: 2,
  },

  // 2025-09-21
  {
    id: 82,
    date: '2025-09-21',
    amount: 1520,
    category: 'Электроника',
    customer_id: 5,
  },
  {
    id: 83,
    date: '2025-09-21',
    amount: 790,
    category: 'Одежда',
    customer_id: 6,
  },
  {
    id: 84,
    date: '2025-09-21',
    amount: 570,
    category: 'Одежда',
    customer_id: 1,
  },
  {
    id: 85,
    date: '2025-09-21',
    amount: 430,
    category: 'Книги',
    customer_id: 3,
  },

  // 2025-09-22
  {
    id: 86,
    date: '2025-09-22',
    amount: 1260,
    category: 'Электроника',
    customer_id: 6,
  },
  {
    id: 87,
    date: '2025-09-22',
    amount: 740,
    category: 'Одежда',
    customer_id: 1,
  },
  {
    id: 88,
    date: '2025-09-22',
    amount: 520,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 89,
    date: '2025-09-22',
    amount: 380,
    category: 'Книги',
    customer_id: 4,
  },

  // 2025-09-23
  {
    id: 90,
    date: '2025-09-23',
    amount: 1600,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 91,
    date: '2025-09-23',
    amount: 820,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 92,
    date: '2025-09-23',
    amount: 600,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 93,
    date: '2025-09-23',
    amount: 460,
    category: 'Книги',
    customer_id: 5,
  },

  // 2025-09-24
  {
    id: 94,
    date: '2025-09-24',
    amount: 1340,
    category: 'Электроника',
    customer_id: 2,
  },
  {
    id: 95,
    date: '2025-09-24',
    amount: 760,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 96,
    date: '2025-09-24',
    amount: 540,
    category: 'Одежда',
    customer_id: 4,
  },
  {
    id: 97,
    date: '2025-09-24',
    amount: 400,
    category: 'Книги',
    customer_id: 6,
  },

  // 2025-09-25
  {
    id: 98,
    date: '2025-09-25',
    amount: 1460,
    category: 'Электроника',
    customer_id: 3,
  },
  {
    id: 99,
    date: '2025-09-25',
    amount: 780,
    category: 'Одежда',
    customer_id: 4,
  },
  {
    id: 100,
    date: '2025-09-25',
    amount: 560,
    category: 'Одежда',
    customer_id: 5,
  },
  {
    id: 101,
    date: '2025-09-25',
    amount: 420,
    category: 'Книги',
    customer_id: 1,
  },

  // 2025-09-26
  {
    id: 102,
    date: '2025-09-26',
    amount: 1280,
    category: 'Электроника',
    customer_id: 4,
  },
  {
    id: 103,
    date: '2025-09-26',
    amount: 720,
    category: 'Одежда',
    customer_id: 5,
  },
  {
    id: 104,
    date: '2025-09-26',
    amount: 500,
    category: 'Одежда',
    customer_id: 6,
  },
  {
    id: 105,
    date: '2025-09-26',
    amount: 360,
    category: 'Книги',
    customer_id: 2,
  },

  // 2025-09-27
  {
    id: 106,
    date: '2025-09-27',
    amount: 1580,
    category: 'Электроника',
    customer_id: 5,
  },
  {
    id: 107,
    date: '2025-09-27',
    amount: 800,
    category: 'Одежда',
    customer_id: 6,
  },
  {
    id: 108,
    date: '2025-09-27',
    amount: 580,
    category: 'Одежда',
    customer_id: 1,
  },
  {
    id: 109,
    date: '2025-09-27',
    amount: 440,
    category: 'Книги',
    customer_id: 3,
  },

  // 2025-09-28
  {
    id: 110,
    date: '2025-09-28',
    amount: 1360,
    category: 'Электроника',
    customer_id: 6,
  },
  {
    id: 111,
    date: '2025-09-28',
    amount: 740,
    category: 'Одежда',
    customer_id: 1,
  },
  {
    id: 112,
    date: '2025-09-28',
    amount: 520,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 113,
    date: '2025-09-28',
    amount: 380,
    category: 'Книги',
    customer_id: 4,
  },

  // 2025-09-29
  {
    id: 114,
    date: '2025-09-29',
    amount: 1500,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 115,
    date: '2025-09-29',
    amount: 780,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 116,
    date: '2025-09-29',
    amount: 560,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 117,
    date: '2025-09-29',
    amount: 420,
    category: 'Книги',
    customer_id: 5,
  },

  // 2025-09-30
  {
    id: 118,
    date: '2025-09-30',
    amount: 1320,
    category: 'Электроника',
    customer_id: 2,
  },
  {
    id: 119,
    date: '2025-09-30',
    amount: 720,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 120,
    date: '2025-09-30',
    amount: 500,
    category: 'Одежда',
    customer_id: 4,
  },
  {
    id: 121,
    date: '2025-09-30',
    amount: 360,
    category: 'Книги',
    customer_id: 6,
  },

  // 2025-10-01

  {
    id: 123,
    date: '2025-10-01',
    amount: 820,
    category: 'Одежда',
    customer_id: 4,
  },
  {
    id: 124,
    date: '2025-10-01',
    amount: 600,
    category: 'Одежда',
    customer_id: 5,
  },
  {
    id: 125,
    date: '2025-10-01',
    amount: 460,
    category: 'Книги',
    customer_id: 1,
  },

  // 2025-10-02
  {
    id: 126,
    date: '2025-10-02',
    amount: 1380,
    category: 'Электроника',
    customer_id: 4,
  },
  {
    id: 127,
    date: '2025-10-02',
    amount: 760,
    category: 'Одежда',
    customer_id: 5,
  },
  {
    id: 128,
    date: '2025-10-02',
    amount: 540,
    category: 'Одежда',
    customer_id: 6,
  },
  {
    id: 129,
    date: '2025-10-02',
    amount: 400,
    category: 'Книги',
    customer_id: 2,
  },

  // 2025-10-03
  {
    id: 130,
    date: '2025-10-03',
    amount: 1520,
    category: 'Электроника',
    customer_id: 5,
  },
  {
    id: 131,
    date: '2025-10-03',
    amount: 790,
    category: 'Одежда',
    customer_id: 6,
  },
  {
    id: 132,
    date: '2025-10-03',
    amount: 570,
    category: 'Одежда',
    customer_id: 1,
  },
  {
    id: 133,
    date: '2025-10-03',
    amount: 430,
    category: 'Книги',
    customer_id: 3,
  },

  // 2025-10-04
  {
    id: 134,
    date: '2025-10-04',
    amount: 1300,
    category: 'Электроника',
    customer_id: 6,
  },

  {
    id: 137,
    date: '2025-10-04',
    amount: 380,
    category: 'Книги',
    customer_id: 4,
  },

  // 2025-10-05
  {
    id: 138,
    date: '2025-10-05',
    amount: 1680,
    category: 'Электроника',
    customer_id: 1,
  },
  {
    id: 139,
    date: '2025-10-05',
    amount: 840,
    category: 'Одежда',
    customer_id: 2,
  },
  {
    id: 140,
    date: '2025-10-05',
    amount: 620,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 141,
    date: '2025-10-05',
    amount: 480,
    category: 'Книги',
    customer_id: 5,
  },

  // 2025-10-06
  {
    id: 142,
    date: '2025-10-06',
    amount: 1400,
    category: 'Электроника',
    customer_id: 2,
  },
  {
    id: 143,
    date: '2025-10-06',
    amount: 770,
    category: 'Одежда',
    customer_id: 3,
  },
  {
    id: 144,
    date: '2025-10-06',
    amount: 550,
    category: 'Одежда',
    customer_id: 4,
  },
  {
    id: 145,
    date: '2025-10-06',
    amount: 410,
    category: 'Книги',
    customer_id: 6,
  },

  // 2025-10-07
  {
    id: 146,
    date: '2025-10-07',
    amount: 1560,
    category: 'Электроника',
    customer_id: 3,
  },
  {
    id: 147,
    date: '2025-10-07',
    amount: 800,
    category: 'Одежда',
    customer_id: 4,
  },
  {
    id: 148,
    date: '2025-10-07',
    amount: 580,
    category: 'Одежда',
    customer_id: 5,
  },
  {
    id: 149,
    date: '2025-10-07',
    amount: 440,
    category: 'Книги',
    customer_id: 1,
  },

  // 2025-10-08
  {
    id: 150,
    date: '2025-10-08',
    amount: 1340,
    category: 'Электроника',
    customer_id: 4,
  },
  {
    id: 151,
    date: '2025-10-08',
    amount: 760,
    category: 'Одежда',
    customer_id: 5,
  },
  {
    id: 152,
    date: '2025-10-08',
    amount: 540,
    category: 'Одежда',
    customer_id: 6,
  },
  {
    id: 153,
    date: '2025-10-08',
    amount: 400,
    category: 'Книги',
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
  return sales
}

export { fetchSales }
