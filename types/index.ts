import type { CalendarDate, DateValue } from '@internationalized/date'

export type Period = 'daily' | 'weekly' | 'monthly'

export type CalendarRange = {
  start: CalendarDate | undefined
  end: CalendarDate | undefined
}

export type Range = {
  start: string | null
  end: string | null
}
