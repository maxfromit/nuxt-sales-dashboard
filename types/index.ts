import type { CalendarDate, DateValue } from '@internationalized/date'

export type Period = 'daily' | 'weekly' | 'monthly'

export type Range = {
  start: Date
  end: Date
}

export type CalendarRange = {
  start: CalendarDate | undefined
  end: CalendarDate | undefined
}
