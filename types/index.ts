import type { CalendarDate } from '@internationalized/date'

export type Period = 'daily' | 'weekly' | 'monthly'

export type CalendarRange = {
  start?: CalendarDate
  end?: CalendarDate
}

export type Range = {
  start: string | null
  end: string | null
}

export type Sale = {
  id: number
  date: string
  amount: number
  category: string
  customer_id: number
}
