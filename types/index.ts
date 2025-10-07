import type { CalendarDate } from '@internationalized/date'

export type Period = 'daily' | 'weekly' | 'monthly'

export type CalendarRange = {
  start: CalendarDate | undefined
  end: CalendarDate | undefined
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
